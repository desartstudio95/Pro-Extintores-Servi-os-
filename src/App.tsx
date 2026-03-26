import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Phone, ShieldCheck, FireExtinguisher, MessageCircle, ArrowLeft, CheckCircle2, Shield, Info, Users, Award, MapPin, Mail, Clock, Building2, TrendingUp, Menu, X, Target, Eye, History, Heart, Flame } from "lucide-react";
import { StatCounter } from "./components/StatCounter";

interface Product {
  id: number;
  name: string;
  img: string;
  description: string;
  specs: string[];
  type: string;
}

const PRODUCTS: Product[] = [
  {
    id: 1,
    name: "Extintor ABC (Pó Químico)",
    img: "https://i.ibb.co/wZxq6Jzv/EXTPOQ9-GLO.jpg",
    description: "O extintor de pó químico ABC é a solução mais completa para segurança contra incêndios em Moçambique. Indicado para fogos de classe A (sólidos), B (liquidos inflamáveis) e C (equipamentos elétricos).",
    specs: ["Capacidade: 1kg a 12kg", "Agente: Pó Químico Seco (PQS)", "Validade: 1 ano", "Certificação: Normas de segurança vigentes"],
    type: "Pó Químico ABC"
  },
  {
    id: 2,
    name: "Extintor CO2 (Dióxido de Carbono)",
    img: "https://i.ibb.co/mC5DtJ96/watermarked-7ab03fb6-fe50-4060-afd5-f841ec066b72.jpg",
    description: "Ideal para combate a incêndios em equipamentos elétricos e líquidos inflamáveis. O extintor CO2 não deixa resíduos, sendo a escolha certa para escritórios e centros de dados em Maputo.",
    specs: ["Capacidade: 2kg, 5kg", "Agente: Dióxido de Carbono (CO2)", "Validade: 1 ano", "Não condutor de eletricidade"],
    type: "Dióxido de Carbono"
  },
  {
    id: 3,
    name: "Extintor de Água Pressurizada (H2O)",
    img: "https://i.ibb.co/0R9hdfpx/EXTABF6-FA.jpg",
    description: "Equipamento essencial para segurança contra incêndios em materiais sólidos como madeira e papel. Atua por resfriamento, garantindo proteção eficaz em armazéns e residências.",
    specs: ["Capacidade: 10 Litros", "Agente: Água Pressurizada", "Validade: 1 ano", "Uso: Classe A (Sólidos)"],
    type: "Água Pressurizada"
  },
  {
    id: 4,
    name: "Manta Ignífuga (Capa de Fogo)",
    img: "https://i.ibb.co/VWDrNRfw/TX-MANTA-IGNIFUGA-DE-SEGURIDAD-2.jpg",
    description: "Manta de fibra de vidro para abafar pequenos focos de incêndio, especialmente em cozinhas. Essencial para segurança doméstica e comercial.",
    specs: ["Material: Fibra de Vidro", "Tamanho: 1.2m x 1.2m", "Resistência: Até 550°C", "Uso único"],
    type: "Acessórios"
  },
  {
    id: 5,
    name: "Detetor de Fumo Autónomo",
    img: "https://images.unsplash.com/photo-1585130401366-fe05a8d813c4?q=80&w=800&auto=format,webp",
    description: "Detetor de fumo com alarme sonoro de alta intensidade. Alerta precoce crucial para evacuação segura em caso de incêndio.",
    specs: ["Alimentação: Bateria 9V", "Alarme: 85dB", "Sensor: Fotoelétrico", "Instalação: Teto/Parede"],
    type: "Deteção"
  },
  {
    id: 6,
    name: "Carretel de Mangueira de Incêndio",
    img: "https://images.unsplash.com/photo-1516733725897-1aa73b87c8e8?q=80&w=800&auto=format,webp",
    description: "Sistema fixo de combate a incêndios para edifícios comerciais e industriais. Fornece um suprimento contínuo de água.",
    specs: ["Comprimento: 30m", "Diâmetro: 25mm", "Pressão: Até 12 bar", "Norma: EN 671-1"],
    type: "Sistemas Fixos"
  },
  {
    id: 7,
    name: "Sinalização de Emergência Fotoluminescente",
    img: "https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=800&auto=format,webp",
    description: "Placas de sinalização que brilham no escuro para indicar saídas de emergência e localização de extintores.",
    specs: ["Material: PVC Rígido", "Propriedade: Fotoluminescente", "Norma: ISO 7010", "Vários tamanhos"],
    type: "Sinalização"
  },
  {
    id: 8,
    name: "Armário para Extintor",
    img: "https://images.unsplash.com/photo-1618335829737-2228915674e0?q=80&w=800&auto=format,webp",
    description: "Proteção metálica para extintores em áreas públicas ou industriais, prevenindo danos e uso indevido.",
    specs: ["Material: Aço Galvanizado", "Pintura: Epóxi Vermelha", "Porta: Com ou sem vidro", "Fixação: Parede"],
    type: "Acessórios"
  },
  {
    id: 9,
    name: "Machado de Bombeiro",
    img: "https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=800&auto=format,webp",
    description: "Ferramenta de aço forjado para arrombamento e ventilação em situações de emergência.",
    specs: ["Material: Aço Carbono", "Cabo: Fibra de Vidro", "Peso: 1.5kg", "Uso: Profissional"],
    type: "Ferramentas"
  },
  {
    id: 10,
    name: "Hidrante de Parede (Boca de Incêndio)",
    img: "https://images.unsplash.com/photo-1516733725897-1aa73b87c8e8?q=80&w=800&auto=format,webp",
    description: "Ponto de ligação para mangueiras de incêndio em sistemas de proteção predial.",
    specs: ["Material: Latão/Bronze", "Saída: 45mm/65mm", "Válvula: Globo/Angular", "Pressão: Alta"],
    type: "Sistemas Fixos"
  },
  {
    id: 11,
    name: "Balde de Incêndio (Areia)",
    img: "https://images.unsplash.com/photo-1599708139146-f2181482127e?q=80&w=800&auto=format,webp",
    description: "Método tradicional e eficaz para abafar pequenos fogos de líquidos inflamáveis ou metais.",
    specs: ["Material: Aço", "Capacidade: 10L", "Conteúdo: Areia Seca", "Cor: Vermelho"],
    type: "Acessórios"
  },
  {
    id: 12,
    name: "Extintor de Espuma Mecânica 9L",
    type: "Espuma",
    img: "https://images.unsplash.com/photo-1615461066159-fea0960485d5?q=80&w=1000&auto=format,webp",
    description: "Ideal para fogos de classe A (sólidos) e B (líquidos inflamáveis). A espuma forma uma película que abafa e arrefece o combustível.",
    specs: ["Capacidade: 9L", "Agente: Espuma AFFF", "Classe: A, B", "Pressão: 15 bar"],
  },
  {
    id: 13,
    name: "Extintor de Pó Químico D 9kg",
    type: "Pó Químico D",
    img: "https://images.unsplash.com/photo-1513224502586-d1e602410265?q=80&w=1000&auto=format,webp",
    description: "Especialmente concebido para fogos de metais combustíveis (Sódio, Magnésio, Potássio). Essencial para indústrias metalúrgicas.",
    specs: ["Capacidade: 9kg", "Agente: Pó Especial D", "Classe: D", "Material: Aço"],
  },
  {
    id: 14,
    name: "Mangueira de Incêndio 20m",
    type: "Acessórios",
    img: "https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?q=80&w=1000&auto=format,webp",
    description: "Mangueira de alta pressão para combate a incêndios. Revestimento têxtil resistente e interior em borracha.",
    specs: ["Comprimento: 20m", "Diâmetro: 45mm (1.5\")", "Pressão: 15 bar", "Acoplamento: Storz"],
  },
  {
    id: 15,
    name: "Agulheta de Jato Regulável",
    type: "Acessórios",
    img: "https://images.unsplash.com/photo-1584622781564-1d987f7333c1?q=80&w=1000&auto=format,webp",
    description: "Permite regular o fluxo de água entre jato sólido e neblina. Essencial para o controlo preciso do combate ao fogo.",
    specs: ["Material: Latão/Alumínio", "Tipo: Regulável", "Conexão: Storz 45mm", "Punho: Ergonómico"],
  },
  {
    id: 16,
    name: "Chave de Hidrante Universal",
    type: "Acessórios",
    img: "https://images.unsplash.com/photo-1581092160562-40aa08e78837?q=80&w=1000&auto=format,webp",
    description: "Ferramenta para abertura e fecho de válvulas de hidrantes e acoplamento de mangueiras.",
    specs: ["Material: Aço Forjado", "Tipo: Universal", "Acabamento: Zincado", "Peso: 1.2kg"],
  },
  {
    id: 17,
    name: "Central de Incêndio Convencional",
    type: "Deteção",
    img: "https://images.unsplash.com/photo-1585130401366-fe05a8d813c4?q=80&w=1000&auto=format,webp",
    description: "Central de monitorização para sistemas de deteção de incêndio. Gere alarmes e detetores em várias zonas do edifício.",
    specs: ["Zonas: 4 Zonas", "Alimentação: 230V AC", "Bateria: 2x 12V 7Ah", "Norma: EN 54-2/4"],
  },
  {
    id: 18,
    name: "Botão de Alarme Manual",
    type: "Deteção",
    img: "https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=1000&auto=format,webp",
    description: "Dispositivo de ativação manual do alarme de incêndio. Design robusto com vidro quebrável ou elemento rearmável.",
    specs: ["Material: ABS Vermelho", "Tipo: Convencional", "Proteção: IP42", "Reset: Com chave"],
  },
  {
    id: 19,
    name: "Luz de Emergência LED 3h",
    type: "Sinalização",
    img: "https://images.unsplash.com/photo-1582139329536-e7284fece509?q=80&w=1000&auto=format,webp",
    description: "Luminária de emergência autónoma com tecnologia LED. Garante iluminação de segurança durante cortes de energia.",
    specs: ["Autonomia: 3 Horas", "Fluxo: 150 Lúmenes", "Bateria: Ni-Cd", "Modo: Não permanente"],
  },
  {
    id: 20,
    name: "Armário para Mangueira de Incêndio",
    type: "Sistemas Fixos",
    img: "https://images.unsplash.com/photo-1618335829737-2228915674e0?q=80&w=1000&auto=format,webp",
    description: "Armário metálico para alojamento de mangueiras e acessórios de combate a incêndio em edifícios.",
    specs: ["Material: Chapa de Aço", "Pintura: Vermelho RAL 3000", "Dimensões: 600x600x200mm", "Porta: Com visor"],
  }
];

type ViewState = "home" | "details" | "contact" | "products" | "about";

const FireEffect = () => {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-0 opacity-20">
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={i}
          initial={{ y: "110%", x: `${Math.random() * 100}%`, opacity: 0 }}
          animate={{ 
            y: "-10%", 
            opacity: [0, 1, 1, 0],
            scale: [1, 1.2, 0.8, 1],
            rotate: [0, 10, -10, 0]
          }}
          transition={{ 
            duration: 10 + Math.random() * 10, 
            repeat: Infinity, 
            delay: Math.random() * 10,
            ease: "linear"
          }}
          className="absolute text-red-600"
        >
          {i % 2 === 0 ? <Flame className="w-8 h-8" /> : <FireExtinguisher className="w-8 h-8" />}
        </motion.div>
      ))}
    </div>
  );
};

export default function App() {
  const [view, setView] = useState<ViewState>("home");
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [selectedCategory, setSelectedCategory] = useState("Todos");
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const filteredProducts = selectedCategory === "Todos" 
    ? PRODUCTS 
    : PRODUCTS.filter(p => p.type === selectedCategory);

  const handleWhatsApp = (product?: Product) => {
    const text = product 
      ? `Olá! Gostaria de mais informações sobre o ${product.name}.`
      : "Olá! Gostaria de solicitar um orçamento.";
    const message = encodeURIComponent(text);
    window.open(`https://wa.me/258840000000?text=${message}`, "_blank");
  };

  const navigateToDetails = (product: Product) => {
    setSelectedProduct(product);
    setView("details");
    window.scrollTo(0, 0);
  };

  const navigateToHome = () => {
    setView("home");
    setSelectedProduct(null);
    window.scrollTo(0, 0);
  };

  const navigateToContact = () => {
    setView("contact");
    window.scrollTo(0, 0);
  };

  const navigateToProducts = () => {
    setView("products");
    window.scrollTo(0, 0);
  };

  const navigateToAbout = () => {
    setView("about");
    window.scrollTo(0, 0);
    setIsMenuOpen(false);
  };

  return (
    <div className="font-sans bg-white text-gray-800 text-sm md:text-base min-h-screen">
      {/* HEADER */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-6 h-16 md:h-20 flex items-center justify-between">
          <div 
            onClick={navigateToHome}
            className="flex items-center gap-2 cursor-pointer group"
          >
            <div className="bg-red-600 p-1.5 rounded-lg group-hover:rotate-12 transition-transform">
              <FireExtinguisher className="w-5 h-5 text-white" />
            </div>
            <span className="font-black text-xl tracking-tighter text-gray-900">PRO<span className="text-red-600">EXTINTORES</span></span>
          </div>

          <nav className="hidden md:flex items-center gap-8">
            <button onClick={navigateToHome} className={`font-bold text-sm uppercase tracking-widest hover:text-red-600 transition ${view === 'home' ? 'text-red-600' : 'text-gray-500'}`}>Início</button>
            <button onClick={navigateToAbout} className={`font-bold text-sm uppercase tracking-widest hover:text-red-600 transition ${view === 'about' ? 'text-red-600' : 'text-gray-500'}`}>Sobre Nós</button>
            <button onClick={navigateToProducts} className={`font-bold text-sm uppercase tracking-widest hover:text-red-600 transition ${view === 'products' ? 'text-red-600' : 'text-gray-500'}`}>Produtos</button>
            <button onClick={navigateToContact} className={`font-bold text-sm uppercase tracking-widest hover:text-red-600 transition ${view === 'contact' ? 'text-red-600' : 'text-gray-500'}`}>Contacto</button>
          </nav>

          {/* Mobile Menu Button */}
          <button 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 text-gray-600 hover:text-red-600 transition"
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu Dropdown */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden bg-white border-t border-gray-100 overflow-hidden"
            >
              <div className="flex flex-col p-6 gap-4">
                <button 
                  onClick={() => { navigateToHome(); setIsMenuOpen(false); }} 
                  className={`font-bold text-sm uppercase tracking-widest text-left ${view === 'home' ? 'text-red-600' : 'text-gray-500'}`}
                >
                  Início
                </button>
                <button 
                  onClick={() => { navigateToAbout(); setIsMenuOpen(false); }} 
                  className={`font-bold text-sm uppercase tracking-widest text-left ${view === 'about' ? 'text-red-600' : 'text-gray-500'}`}
                >
                  Sobre Nós
                </button>
                <button 
                  onClick={() => { navigateToProducts(); setIsMenuOpen(false); }} 
                  className={`font-bold text-sm uppercase tracking-widest text-left ${view === 'products' ? 'text-red-600' : 'text-gray-500'}`}
                >
                  Produtos
                </button>
                <button 
                  onClick={() => { navigateToContact(); setIsMenuOpen(false); }} 
                  className={`font-bold text-sm uppercase tracking-widest text-left ${view === 'contact' ? 'text-red-600' : 'text-gray-500'}`}
                >
                  Contacto
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      <div className="pt-16 md:pt-20">
        <AnimatePresence mode="wait">
        {view === "home" && (
          <motion.div
            key="home"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {/* HERO */}
            <section className="relative min-h-[600px] flex items-center overflow-hidden">
              {/* Background Image with Overlay */}
              <div className="absolute inset-0 z-0">
                <img 
                  src="https://i.ibb.co/qLXZ1pF8/images.jpg" 
                  alt="Background" 
                  loading="eager"
                  className="w-full h-full object-cover brightness-110"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-red-900/60 via-red-800/20 to-transparent"></div>
                <motion.div 
                  animate={{ opacity: [0.3, 0.5, 0.3] }}
                  transition={{ duration: 3, repeat: Infinity }}
                  className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-red-600/20 to-transparent pointer-events-none"
                />
              </div>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="max-w-5xl mx-auto px-8 md:px-16 relative z-10 w-full text-white"
              >
                <h1 className="text-3xl md:text-5xl font-extrabold mb-4 drop-shadow-lg">
                  Segurança Contra Incêndios em Moçambique - Pro Extintores
                </h1>
                <p className="text-base md:text-lg mb-6 opacity-100 drop-shadow-md font-semibold">
                  Especialistas em venda, recarga e manutenção de extintores em Maputo. Protegemos vidas e patrimónios com soluções modernas e certificadas.
                </p>
                <div className="flex gap-3 flex-wrap">
                  <button 
                    onClick={navigateToProducts}
                    className="bg-red-600 text-white px-5 py-2.5 rounded-xl font-bold hover:scale-105 transition shadow-lg border border-red-500"
                  >
                    Ver Produtos
                  </button>
                </div>
              </motion.div>
            </section>

            {/* SOBRE NÓS (HOME) */}
            <section className="py-16 md:py-24 px-6 md:px-12 bg-gray-50 relative overflow-hidden">
              <div className="max-w-3xl mx-auto text-center relative z-10">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                >
                  <h2 className="text-3xl md:text-4xl font-black mb-6">Sobre a Pro Extintores</h2>
                  <p className="text-gray-600 mb-6 leading-relaxed text-base md:text-lg">
                    Com anos de experiência no mercado moçambicano, a Pro Extintores é a sua parceira de confiança para todas as necessidades de segurança contra incêndios. 
                  </p>
                  <p className="text-gray-600 mb-8 leading-relaxed text-base md:text-lg">
                    Especializamo-nos em soluções completas, desde a venda de equipamentos certificados até à manutenção técnica rigorosa, garantindo que o seu património e, acima de tudo, vidas estejam sempre protegidos.
                  </p>
                  <div className="flex justify-center">
                    <button 
                      onClick={navigateToAbout}
                      className="text-red-600 font-bold flex items-center gap-2 group hover:scale-105 transition-transform"
                    >
                      Ler mais sobre a nossa história
                      <ArrowLeft className="w-4 h-4 rotate-180 group-hover:translate-x-1 transition-transform" />
                    </button>
                  </div>
                </motion.div>
              </div>
              <FireEffect />
            </section>

            {/* ESTATÍSTICAS */}
            <section className="bg-white py-12 md:py-24 px-8 overflow-hidden relative">
              <FireEffect />
              <div className="max-w-6xl mx-auto relative z-10">
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
                  <StatCounter 
                    value={5} 
                    label="Anos de Experiência" 
                    icon={<Award className="w-6 h-6" />} 
                    suffix="+"
                  />
                  <StatCounter 
                    value={200} 
                    label="Clientes Satisfeitos" 
                    icon={<Users className="w-6 h-6" />} 
                    suffix="+"
                  />
                  <StatCounter 
                    value={1000} 
                    label="Extintores Recarregados" 
                    icon={<TrendingUp className="w-6 h-6" />} 
                    suffix="+"
                  />
                  <StatCounter 
                    value={800} 
                    label="Extintores Vendidos" 
                    icon={<Building2 className="w-6 h-6" />} 
                    suffix="+"
                  />
                </div>
              </div>
            </section>

            {/* SERVIÇOS */}
            <section className="py-16 md:py-24 px-6 md:px-12 relative overflow-hidden">
              <FireEffect />
              <motion.h2 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="text-3xl md:text-4xl font-black text-center mb-12"
              >
                Soluções de Combate a Incêndios
              </motion.h2>
              <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto mb-12">
                {[
                  { title: "Venda de Extintores em Maputo", icon: <FireExtinguisher className="w-6 h-6" /> },
                  { title: "Recarga de Extintores Moçambique", icon: <ShieldCheck className="w-6 h-6" /> },
                  { title: "Manutenção e Inspeção Técnica", icon: <Phone className="w-6 h-6" /> },
                ].map((item, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: i * 0.1 }}
                    whileHover={{ y: -5 }}
                    className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100"
                  >
                    <div className="text-red-600 mb-3">{item.icon}</div>
                    <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
                    <p className="text-gray-500 text-xs md:text-sm">Serviço profissional com garantia de qualidade e certificação.</p>
                  </motion.div>
                ))}
              </div>
            </section>

            {/* PRODUTOS */}
            <section className="py-16 md:py-24 px-6 md:px-12 max-w-7xl mx-auto">
              <motion.h2 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="text-3xl md:text-4xl font-black text-center mb-12"
              >
                Equipamentos de Combate a Incêndios
              </motion.h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                {PRODUCTS.slice(0, 4).map((p, i) => (
                  <motion.div
                    key={p.id}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    whileHover={{ 
                      y: -10,
                      boxShadow: "0 0 25px rgba(220, 38, 38, 0.3)",
                      borderColor: "rgba(220, 38, 38, 0.5)"
                    }}
                    transition={{ duration: 0.5, delay: i * 0.1 }}
                    viewport={{ once: true }}
                    className="bg-white border border-gray-100 rounded-3xl p-4 shadow-sm transition-all overflow-hidden group cursor-pointer"
                    onClick={() => navigateToDetails(p)}
                  >
                    <div className="h-48 bg-gray-100 rounded-2xl mb-4 overflow-hidden relative">
                      <img 
                        src={p.img} 
                        alt={p.name} 
                        loading="lazy"
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" 
                        referrerPolicy="no-referrer" 
                      />
                      <div className="absolute top-3 right-3 bg-red-600 text-white text-[10px] font-bold px-2 py-1 rounded-full uppercase tracking-wider">
                        Disponível
                      </div>
                    </div>
                    <h3 className="font-bold text-base md:text-lg mb-1">{p.name}</h3>
                    <p className="text-gray-500 text-xs mb-4 line-clamp-2">{p.description}</p>
                    <div className="bg-gray-900 text-white px-4 py-3 rounded-xl w-full group-hover:bg-red-600 text-sm font-bold transition-all flex items-center justify-center gap-2">
                      Ver Detalhes
                    </div>
                  </motion.div>
                ))}
              </div>
              <div className="mt-12 text-center">
                <button 
                  onClick={navigateToProducts}
                  className="bg-red-600 text-white px-8 py-4 rounded-2xl font-black hover:bg-red-700 transition shadow-xl flex items-center gap-3 mx-auto"
                >
                  Ver Todos os Produtos
                  <ArrowLeft className="w-5 h-5 rotate-180" />
                </button>
              </div>
            </section>

            {/* CTA */}
            <section className="bg-red-600 text-white py-16 md:py-24 px-6 md:px-12 text-center overflow-hidden relative">
              <FireEffect />
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                className="max-w-4xl mx-auto relative z-10"
              >
                <h2 className="text-3xl md:text-5xl font-black mb-6">Proteja o seu património hoje mesmo</h2>
                <p className="text-lg md:text-xl mb-10 opacity-90">Não deixe para amanhã a segurança que pode garantir hoje. Peça já o seu orçamento gratuito.</p>
                <button 
                  onClick={navigateToContact}
                  className="bg-white text-red-600 px-10 py-4 rounded-2xl font-black hover:bg-gray-100 transition shadow-2xl hover:scale-105"
                >
                  Contactar Agora
                </button>
              </motion.div>
            </section>

            {/* FOOTER */}
            <footer className="bg-gray-900 text-white pt-16 pb-8 border-t border-white/5">
              <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-12 mb-12 text-left">
                <div className="col-span-1 md:col-span-2">
                  <div className="flex items-center gap-2 mb-6">
                    <div className="bg-red-600 p-1.5 rounded-lg">
                      <FireExtinguisher className="w-5 h-5 text-white" />
                    </div>
                    <span className="font-black text-xl tracking-tighter">PRO<span className="text-red-600">EXTINTORES</span></span>
                  </div>
                  <p className="text-gray-400 text-sm leading-relaxed mb-6 max-w-md">
                    Líderes em segurança contra incêndios em Moçambique. Especialistas em venda, recarga e manutenção de extintores e sistemas de segurança em Maputo.
                  </p>
                </div>
                
                <div>
                  <h4 className="font-bold mb-6 text-sm uppercase tracking-widest text-red-600">Navegação</h4>
                  <ul className="space-y-4 text-sm text-gray-400">
                    <li><button onClick={navigateToHome} className="hover:text-white transition">Início</button></li>
                    <li><button onClick={navigateToAbout} className="hover:text-white transition">Sobre Nós</button></li>
                    <li><button onClick={navigateToProducts} className="hover:text-white transition">Produtos</button></li>
                    <li><button onClick={navigateToContact} className="hover:text-white transition">Contacto</button></li>
                  </ul>
                </div>
                
                <div>
                  <h4 className="font-bold mb-6 text-sm uppercase tracking-widest text-red-600">Contacto</h4>
                  <ul className="space-y-4 text-sm text-gray-400">
                    <li className="flex items-center gap-3">
                      <MapPin className="w-4 h-4 text-red-600" />
                      Av. Eduardo Mondlane, Maputo
                    </li>
                    <li className="flex items-center gap-3">
                      <Phone className="w-4 h-4 text-red-600" />
                      +258 84 000 0000
                    </li>
                    <li className="flex items-center gap-3">
                      <Mail className="w-4 h-4 text-red-600" />
                      contacto@proextintores.co.mz
                    </li>
                  </ul>
                </div>
              </div>
              <div className="max-w-6xl mx-auto px-6 pt-8 border-t border-white/5 text-center">
                <p className="text-xs opacity-40">© 2026 Pro Extintores e Serviços - Moçambique. Todos os direitos reservados.</p>
              </div>
            </footer>
          </motion.div>
        )}

        {view === "details" && selectedProduct && (
          <motion.div
            key="details"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            className="max-w-6xl mx-auto px-6 md:px-12 py-12 md:py-20 min-h-screen"
          >
            <button 
              onClick={navigateToHome}
              className="flex items-center gap-2 text-gray-500 hover:text-red-600 transition mb-8 group"
            >
              <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
              <span className="font-semibold">Voltar aos produtos</span>
            </button>

            <div className="grid md:grid-cols-2 gap-8 md:gap-12">
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2 }}
                className="rounded-3xl overflow-hidden shadow-2xl bg-gray-100 aspect-square"
              >
                <img 
                  src={selectedProduct.img} 
                  alt={selectedProduct.name} 
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </motion.div>

              <div className="flex flex-col">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  <span className="inline-block bg-red-100 text-red-600 text-xs font-bold px-3 py-1 rounded-full mb-4">
                    {selectedProduct.type}
                  </span>
                  <h1 className="text-3xl md:text-4xl font-bold mb-4">{selectedProduct.name}</h1>
                  <p className="text-gray-600 leading-relaxed mb-8">
                    {selectedProduct.description}
                  </p>
                </motion.div>

                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="space-y-4 mb-8"
                >
                  <h3 className="font-bold flex items-center gap-2">
                    <Info className="w-5 h-5 text-red-600" />
                    Especificações Técnicas
                  </h3>
                  <ul className="grid grid-cols-1 gap-3">
                    {selectedProduct.specs.map((spec, idx) => (
                      <li key={idx} className="flex items-center gap-3 text-gray-600 bg-gray-50 p-3 rounded-xl border border-gray-100">
                        <CheckCircle2 className="w-4 h-4 text-green-500 shrink-0" />
                        <span className="text-sm">{spec}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="mt-auto space-y-3"
                >
                  <button 
                    onClick={() => handleWhatsApp(selectedProduct)}
                    className="w-full bg-green-500 text-white py-4 rounded-2xl font-bold flex items-center justify-center gap-3 hover:bg-green-600 transition-all shadow-lg hover:shadow-green-200 active:scale-95"
                  >
                    <MessageCircle className="w-6 h-6" />
                    Solicitar via WhatsApp
                  </button>
                  <div className="flex items-center justify-center gap-2 text-xs text-gray-400">
                    <Shield className="w-3 h-3" />
                    Produto certificado e garantido
                  </div>
                </motion.div>
              </div>
            </div>
          </motion.div>
        )}

        {view === "contact" && (
          <motion.div
            key="contact"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            className="max-w-6xl mx-auto px-6 md:px-12 py-12 md:py-20 min-h-screen"
          >
            <button 
              onClick={navigateToHome}
              className="flex items-center gap-2 text-gray-500 hover:text-red-600 transition mb-8 group"
            >
              <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
              <span className="font-semibold">Voltar ao início</span>
            </button>

            <div className="grid md:grid-cols-2 gap-12">
              <div>
                <h1 className="text-4xl font-bold mb-6">Contacte a Pro Extintores em Maputo</h1>
                <p className="text-gray-600 mb-8">Estamos prontos para oferecer as melhores soluções de segurança contra incêndios em Moçambique. Entre em contacto para orçamentos de venda, recarga ou manutenção de extintores.</p>
                
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="bg-red-50 p-3 rounded-xl text-red-600">
                      <MapPin className="w-6 h-6" />
                    </div>
                    <div>
                      <h4 className="font-bold">Nossa Localização em Maputo</h4>
                      <p className="text-gray-500 text-sm">Av. Eduardo Mondlane, Maputo, Moçambique</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4">
                    <div className="bg-red-50 p-3 rounded-xl text-red-600">
                      <Phone className="w-6 h-6" />
                    </div>
                    <div>
                      <h4 className="font-bold">Telefone</h4>
                      <p className="text-gray-500 text-sm">+258 84 000 0000</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4">
                    <div className="bg-red-50 p-3 rounded-xl text-red-600">
                      <Mail className="w-6 h-6" />
                    </div>
                    <div>
                      <h4 className="font-bold">E-mail</h4>
                      <p className="text-gray-500 text-sm">contacto@proextintores.co.mz</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4">
                    <div className="bg-red-50 p-3 rounded-xl text-red-600">
                      <Clock className="w-6 h-6" />
                    </div>
                    <div>
                      <h4 className="font-bold">Horário</h4>
                      <p className="text-gray-500 text-sm">Seg - Sex: 08:00 - 17:00</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-gray-50 p-8 rounded-3xl border border-gray-100 shadow-sm">
                <h3 className="text-xl font-bold mb-6">Envie uma Mensagem</h3>
                <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-gray-400 mb-2">Nome Completo</label>
                    <input type="text" className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-red-500 outline-none transition" placeholder="Seu nome" />
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-gray-400 mb-2">E-mail</label>
                    <input type="email" className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-red-500 outline-none transition" placeholder="seu@email.com" />
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-gray-400 mb-2">Mensagem</label>
                    <textarea rows={4} className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-red-500 outline-none transition resize-none" placeholder="Como podemos ajudar?"></textarea>
                  </div>
                  <button className="w-full bg-red-600 text-white py-4 rounded-xl font-bold hover:bg-red-700 transition shadow-lg">
                    Enviar Mensagem
                  </button>
                </form>
              </div>
            </div>
          </motion.div>
        )}

        {view === "about" && (
          <motion.div
            key="about"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="max-w-6xl mx-auto px-6 md:px-12 py-12 md:py-20 min-h-screen"
          >
            <div className="mb-16 text-center">
              <h1 className="text-4xl md:text-6xl font-black text-gray-900 mb-6">Sobre a Pro Extintores</h1>
              <p className="text-gray-500 max-w-3xl mx-auto text-lg leading-relaxed">
                Líderes em segurança contra incêndios em Moçambique, dedicados a proteger o que é mais importante para si.
              </p>
            </div>

            {/* Nossa História */}
            <section className="grid md:grid-cols-2 gap-12 items-center mb-24">
              <div className="rounded-[2.5rem] overflow-hidden shadow-2xl aspect-video md:aspect-square">
                <img 
                  src="https://images.unsplash.com/photo-1516733725897-1aa73b87c8e8?q=80&w=1000&auto=format,webp" 
                  alt="Nossa História" 
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div>
                <h2 className="text-3xl font-black mb-6 flex items-center gap-3">
                  <div className="w-10 h-10 bg-red-600 rounded-xl flex items-center justify-center">
                    <History className="w-6 h-6 text-white" />
                  </div>
                  Nossa História
                </h2>
                <div className="space-y-4 text-gray-600 leading-relaxed">
                  <p>
                    Fundada com a visão de elevar os padrões de segurança contra incêndios em Moçambique, a Pro Extintores e Serviços nasceu da necessidade de um serviço técnico especializado e confiável no mercado de Maputo.
                  </p>
                  <p>
                    Ao longo dos anos, crescemos de uma pequena operação local para uma empresa de referência, servindo centenas de clientes desde residências particulares a grandes complexos industriais e instituições governamentais.
                  </p>
                  <p>
                    O nosso percurso é marcado pelo compromisso inabalável com a qualidade e pela constante atualização tecnológica, garantindo que os nossos clientes tenham acesso aos melhores equipamentos e práticas de segurança mundial.
                  </p>
                </div>
              </div>
            </section>

            {/* Missão e Valores */}
            <div className="grid md:grid-cols-3 gap-8 mb-24">
              <div className="bg-gray-50 p-8 rounded-[2rem] border border-gray-100">
                <div className="bg-red-600 w-12 h-12 rounded-2xl flex items-center justify-center mb-6 shadow-lg shadow-red-200">
                  <Target className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-black mb-4">Missão</h3>
                <p className="text-gray-500 text-sm leading-relaxed">
                  Proporcionar tranquilidade e segurança máxima através de soluções de combate a incêndios de alta qualidade, salvaguardando vidas e patrimónios em todo o território nacional.
                </p>
              </div>

              <div className="bg-gray-50 p-8 rounded-[2rem] border border-gray-100">
                <div className="bg-red-600 w-12 h-12 rounded-2xl flex items-center justify-center mb-6 shadow-lg shadow-red-200">
                  <Eye className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-black mb-4">Visão</h3>
                <p className="text-gray-500 text-sm leading-relaxed">
                  Ser reconhecida como a empresa mais confiável e inovadora no setor de segurança contra incêndios em Moçambique, definindo novos padrões de excelência técnica.
                </p>
              </div>

              <div className="bg-gray-50 p-8 rounded-[2rem] border border-gray-100">
                <div className="bg-red-600 w-12 h-12 rounded-2xl flex items-center justify-center mb-6 shadow-lg shadow-red-200">
                  <Heart className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-black mb-4">Valores</h3>
                <ul className="text-gray-500 text-sm space-y-2">
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-red-600 rounded-full" />
                    Integridade e Transparência
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-red-600 rounded-full" />
                    Excelência Técnica
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-red-600 rounded-full" />
                    Compromisso com a Vida
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-red-600 rounded-full" />
                    Inovação Contínua
                  </li>
                </ul>
              </div>
            </div>

            {/* Banner Final */}
            <div className="bg-red-600 rounded-[3rem] p-12 text-white text-center">
              <h2 className="text-3xl font-black mb-4">Pronto para proteger o seu espaço?</h2>
              <p className="mb-8 opacity-90 max-w-xl mx-auto">Junte-se aos centenas de clientes que confiam na Pro Extintores para a sua segurança.</p>
              <button 
                onClick={navigateToContact}
                className="bg-white text-red-600 px-10 py-4 rounded-2xl font-black hover:bg-gray-100 transition shadow-xl"
              >
                Contactar Agora
              </button>
            </div>
          </motion.div>
        )}
        {view === "products" && (
          <motion.div
            key="products"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            className="max-w-6xl mx-auto px-6 md:px-12 py-12 md:py-20 min-h-screen"
          >
            <div className="mb-12">
              <h1 className="text-4xl font-black text-gray-900 mb-4">Catálogo de Equipamentos</h1>
              <p className="text-gray-500 max-w-2xl mb-8">Explore a nossa gama completa de extintores e equipamentos de segurança certificados para o mercado moçambicano.</p>
              
              {/* Filtros */}
              <div className="flex flex-wrap gap-2">
                {["Todos", "Pó Químico ABC", "Dióxido de Carbono", "Água Pressurizada", "Espuma", "Pó Químico D", "Deteção", "Sistemas Fixos", "Sinalização", "Ferramentas", "Acessórios"].map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-6 py-2 rounded-full text-sm font-bold border transition-all shadow-sm ${
                      selectedCategory === cat 
                        ? "bg-red-600 border-red-600 text-white" 
                        : "bg-white border-gray-100 hover:border-red-600 hover:text-red-600"
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredProducts.map((p, i) => (
                <motion.div
                  key={p.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  whileHover={{ y: -10 }}
                  className="bg-white border border-gray-100 rounded-[2rem] p-5 shadow-sm hover:shadow-2xl transition-all group cursor-pointer"
                  onClick={() => navigateToDetails(p)}
                >
                  <div className="aspect-[4/3] bg-gray-50 rounded-2xl mb-6 overflow-hidden relative">
                    <img 
                      src={p.img} 
                      alt={p.name} 
                      loading="lazy"
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" 
                      referrerPolicy="no-referrer" 
                    />
                    <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-md text-gray-900 text-[10px] font-black px-3 py-1.5 rounded-full uppercase tracking-widest shadow-sm">
                      {p.type}
                    </div>
                  </div>
                  <h3 className="font-black text-xl mb-2 text-gray-900">{p.name}</h3>
                  <p className="text-gray-500 text-sm mb-6 line-clamp-3 leading-relaxed">{p.description}</p>
                  <div className="flex items-center justify-between pt-4 border-t border-gray-50">
                    <span className="text-red-600 font-bold text-sm">Ver detalhes</span>
                    <div className="bg-gray-900 text-white p-2 rounded-xl group-hover:bg-red-600 transition-colors">
                      <ArrowLeft className="w-4 h-4 rotate-180" />
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Banner Informativo */}
            <div className="mt-20 bg-gray-900 rounded-[3rem] p-8 md:p-16 text-white relative overflow-hidden">
              <div className="absolute -right-20 -top-20 w-64 h-64 bg-red-600/20 rounded-full blur-3xl" />
              <div className="relative z-10 grid md:grid-cols-2 gap-12 items-center">
                <div>
                  <h2 className="text-3xl font-bold mb-4">Não sabe qual extintor escolher?</h2>
                  <p className="text-gray-400 mb-8">A nossa equipa técnica está disponível para realizar uma auditoria gratuita no seu espaço e recomendar os equipamentos ideais.</p>
                  <button 
                    onClick={navigateToContact}
                    className="bg-red-600 text-white px-8 py-4 rounded-2xl font-bold hover:bg-red-700 transition shadow-xl flex items-center gap-3"
                  >
                    <Mail className="w-6 h-6" />
                    Contactar Equipa
                  </button>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-white/5 backdrop-blur-sm p-6 rounded-2xl border border-white/10">
                    <ShieldCheck className="w-8 h-8 text-red-500 mb-3" />
                    <h4 className="font-bold mb-1">Certificação</h4>
                    <p className="text-xs text-gray-500">Normas internacionais</p>
                  </div>
                  <div className="bg-white/5 backdrop-blur-sm p-6 rounded-2xl border border-white/10">
                    <Clock className="w-8 h-8 text-red-500 mb-3" />
                    <h4 className="font-bold mb-1">Rapidez</h4>
                    <p className="text-xs text-gray-500">Entrega em 24h</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      </div>
    </div>
  );
}
