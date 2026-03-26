import { GoogleGenAI, ThinkingLevel, Modality } from "@google/genai";

export const getAI = () => {
  // For Pro/Veo models, the platform injects the user-selected key into process.env.API_KEY
  // Fallback to GEMINI_API_KEY for standard models if needed.
  const key = process.env.API_KEY || process.env.GEMINI_API_KEY || "";
  return new GoogleGenAI({ apiKey: key });
};

export async function generateSafetyImage(prompt: string, size: "1K" | "2K" | "4K" = "1K") {
  const ai = getAI();
  const response = await ai.models.generateContent({
    model: "gemini-3-pro-image-preview",
    contents: [{ parts: [{ text: `Professional fire safety equipment: ${prompt}` }] }],
    config: {
      imageConfig: {
        imageSize: size,
        aspectRatio: "16:9"
      }
    }
  });

  for (const part of response.candidates?.[0]?.content?.parts || []) {
    if (part.inlineData) {
      return `data:image/png;base64,${part.inlineData.data}`;
    }
  }
  return null;
}

export async function generateSafetyVideo(imageBytes: string, prompt: string, aspectRatio: "16:9" | "9:16" = "16:9") {
  const ai = getAI();
  let operation = await ai.models.generateVideos({
    model: "veo-3.1-fast-generate-preview",
    prompt: `A professional fire safety demonstration: ${prompt}`,
    image: {
      imageBytes: imageBytes.split(",")[1],
      mimeType: "image/png",
    },
    config: {
      numberOfVideos: 1,
      resolution: "720p",
      aspectRatio: aspectRatio
    }
  });

  while (!operation.done) {
    await new Promise(resolve => setTimeout(resolve, 5000));
    operation = await ai.operations.getVideosOperation({ operation });
  }

  const downloadLink = operation.response?.generatedVideos?.[0]?.video?.uri;
  if (!downloadLink) return null;

  const key = process.env.API_KEY || process.env.GEMINI_API_KEY || "";
  const response = await fetch(downloadLink, {
    method: 'GET',
    headers: {
      'x-goog-api-key': key,
    },
  });
  
  const blob = await response.blob();
  return URL.createObjectURL(blob);
}

export async function getSafetyAdvice(query: string) {
  const ai = getAI();
  const response = await ai.models.generateContent({
    model: "gemini-3.1-pro-preview",
    contents: [{ parts: [{ text: query }] }],
    config: {
      thinkingConfig: { thinkingLevel: ThinkingLevel.HIGH },
      systemInstruction: "Você é um especialista sênior em segurança contra incêndios da Pro Extintores e Serviços em Moçambique. Forneça conselhos técnicos, precisos e profissionais em português."
    }
  });
  return response.text;
}
