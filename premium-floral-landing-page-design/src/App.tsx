import { AnimatePresence, motion, useScroll, useTransform } from "framer-motion";
import { type FormEvent, useEffect, useMemo, useRef, useState } from "react";

const WHATSAPP_NUMBER = "523335072672";
const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}`;
const FACEBOOK_URL = "https://www.facebook.com/ImportadoradeFloresGloria";
const TIKTOK_URL = "https://www.tiktok.com/@importadora.deflores.m";
const TIKTOK_PLAYER =
  "https://www.tiktok.com/player/v1/7641715722317810965?autoplay=1&loop=1&controls=1&volume_control=1&fullscreen_button=0&native_context_menu=0&description=0&music_info=0&rel=0&muted=1";
const HERO_IMAGE =
  "https://images.pexels.com/photos/28302123/pexels-photo-28302123.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1100&w=1800";

// Logo real de la empresa
const LOGO_URL = "https://i.imgur.com/YCf3f0L.png";
// Foto de la fundadora Gloria
const GLORIA_PHOTO = "https://i.imgur.com/F5Vm1y8.jpeg";

type FormData = {
  nombre: string;
  telefono: string;
  cliente: string;
  interes: string;
};

type Step = {
  name: keyof FormData;
  label: string;
  helper: string;
  placeholder?: string;
  type?: "text" | "tel" | "select";
  options?: string[];
};

const formSteps: Step[] = [
  {
    name: "nombre",
    label: "👤 Nombre completo",
    helper: "Para atenderte con la elegancia y precisión que mereces.",
    placeholder: "Ej. Mariana López",
  },
  {
    name: "telefono",
    label: "📱 Teléfono de contacto",
    helper: "Un asesor experto podrá enviarte disponibilidad y precios especiales.",
    placeholder: "Ej. 33 1234 5678",
    type: "tel",
  },
  {
    name: "cliente",
    label: "🏢 Tipo de cliente",
    helper: "Así podemos recomendarte el esquema ideal: mayoreo, menudeo o distribución.",
    type: "select",
    options: [
      "Decorador de Eventos",
      "Negocio de Flores",
      "Emprendedor",
      "Comprador Particular",
      "Mayorista",
    ],
  },
  {
    name: "interes",
    label: "🌸 Producto o tipo de flor de interés",
    helper: "Cuéntanos si buscas rosas, follajes, orquídeas, temporada, centros de mesa o algo especial.",
    placeholder: "Ej. Rosas premium en tonos pastel para mayoreo",
  },
];

// Logo component using the real logo image
function LogoImage({ className = "", size = "md" }: { className?: string; size?: "sm" | "md" | "lg" | "xl" }) {
  const sizeClasses = {
    sm: "h-12 w-12",
    md: "h-16 w-16",
    lg: "h-24 w-24",
    xl: "h-32 w-32",
  };
  
  return (
    <img
      src={LOGO_URL}
      alt="Marce Distribuidora & Gloria Importadora"
      className={`${sizeClasses[size]} object-contain drop-shadow-2xl ${className}`}
    />
  );
}

// Spectacular full-screen preloader with real logo
function Preloader({ onComplete }: { onComplete: () => void }) {
  useEffect(() => {
    const timer = setTimeout(onComplete, 4000);
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <motion.div
      className="fixed inset-0 z-[9999] flex items-center justify-center overflow-hidden"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8, ease: [0.43, 0.13, 0.23, 0.96] }}
    >
      {/* Animated gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#f4d9dc] via-[#f8efe8] to-[#e8d5d0]" />
      
      {/* Floating particles */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(30)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 rounded-full bg-[#d4a574]/30"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -100, 0],
              opacity: [0, 1, 0],
              scale: [0, 1, 0],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      {/* Central content */}
      <div className="relative z-10 flex flex-col items-center">
        {/* Animated rings */}
        <div className="absolute inset-0 flex items-center justify-center">
          {[...Array(3)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute rounded-full border-2 border-[#a8783c]/20"
              style={{ width: 300 + i * 100, height: 300 + i * 100 }}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.1, 0.3] }}
              transition={{
                duration: 2,
                repeat: Infinity,
                delay: i * 0.3,
                ease: "easeInOut",
              }}
            />
          ))}
        </div>

        {/* Logo with dramatic animation */}
        <motion.div
          initial={{ scale: 0, rotate: -180, opacity: 0 }}
          animate={{ scale: 1, rotate: 0, opacity: 1 }}
          transition={{
            duration: 1.2,
            ease: [0.43, 0.13, 0.23, 0.96],
          }}
          className="relative"
        >
          <motion.div
            animate={{ 
              boxShadow: [
                "0 0 60px rgba(168, 120, 60, 0.3)",
                "0 0 100px rgba(168, 120, 60, 0.5)",
                "0 0 60px rgba(168, 120, 60, 0.3)",
              ]
            }}
            transition={{ duration: 2, repeat: Infinity }}
            className="rounded-full"
          >
            <img
              src={LOGO_URL}
              alt="Marce Distribuidora & Gloria Importadora"
              className="h-40 w-40 sm:h-56 sm:w-56 md:h-72 md:w-72 object-contain drop-shadow-2xl"
            />
          </motion.div>
        </motion.div>

        {/* Animated text reveal */}
        <motion.div
          initial={{ y: 40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.8 }}
          className="mt-8 text-center"
        >
          <motion.p
            className="font-serif text-2xl sm:text-3xl md:text-4xl font-semibold text-[#6e4a2c] tracking-wider"
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            25 Años de Excelencia
          </motion.p>
          <motion.div
            className="mt-4 h-1 w-32 mx-auto bg-gradient-to-r from-transparent via-[#a8783c] to-transparent rounded-full"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 1.2, duration: 1 }}
          />
        </motion.div>

        {/* Loading progress */}
        <motion.div
          className="absolute bottom-20 left-1/2 -translate-x-1/2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
        >
          <div className="flex items-center gap-2">
            {[...Array(4)].map((_, i) => (
              <motion.div
                key={i}
                className="w-3 h-3 rounded-full bg-[#a8783c]"
                animate={{
                  scale: [1, 1.5, 1],
                  opacity: [0.3, 1, 0.3],
                }}
                transition={{
                  duration: 0.8,
                  repeat: Infinity,
                  delay: i * 0.15,
                }}
              />
            ))}
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}

// Falling petals background
function PetalField() {
  const petals = useMemo(
    () =>
      Array.from({ length: 25 }, (_, index) => ({
        left: `${(index * 11 + Math.random() * 10) % 100}%`,
        delay: `${(index * 0.8) % 15}s`,
        duration: `${20 + (index % 8) * 4}s`,
        size: `${10 + (index % 6) * 6}px`,
        opacity: 0.1 + (index % 5) * 0.05,
        rotation: Math.random() * 360,
      })),
    []
  );

  return (
    <div className="pointer-events-none fixed inset-0 z-[5] overflow-hidden" aria-hidden="true">
      {petals.map((petal, index) => (
        <motion.span
          key={index}
          className="absolute rounded-full"
          style={{
            left: petal.left,
            width: petal.size,
            height: parseInt(petal.size) * 1.4 + "px",
            background: `radial-gradient(circle at 30% 20%, rgba(255, 250, 243, 0.9), rgba(229, 158, 169, 0.7) 60%, rgba(168, 120, 60, 0.2))`,
            borderRadius: "70% 30% 70% 30%",
            filter: "blur(0.5px)",
            opacity: petal.opacity,
          }}
          initial={{ y: "-10vh", rotate: 0, x: 0 }}
          animate={{
            y: "120vh",
            rotate: petal.rotation + 360,
            x: [0, 50, -30, 0],
          }}
          transition={{
            y: { duration: parseFloat(petal.duration), repeat: Infinity, ease: "linear", delay: parseFloat(petal.delay) },
            rotate: { duration: parseFloat(petal.duration), repeat: Infinity, ease: "linear", delay: parseFloat(petal.delay) },
            x: { duration: parseFloat(petal.duration), repeat: Infinity, ease: "easeInOut", delay: parseFloat(petal.delay) },
          }}
        />
      ))}
    </div>
  );
}

function Reveal({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

function Header() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.header
      className={`fixed left-0 right-0 top-0 z-50 transition-all duration-500 ${
        scrolled ? "bg-[#fffaf3]/95 backdrop-blur-md shadow-lg" : ""
      }`}
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.2, duration: 0.8, ease: "easeOut" }}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 sm:px-8 py-4">
        <motion.a 
          href="#inicio" 
          className="group flex items-center gap-3" 
          aria-label="Ir al inicio"
          whileHover={{ scale: 1.02 }}
        >
          <LogoImage size="sm" />
          <div className="hidden sm:block">
            <p className="font-serif text-xl font-semibold text-[#6e4a2c]">Marce</p>
            <p className="text-[0.6rem] font-semibold uppercase tracking-[0.3em] text-[#9a7444]">
              Distribuidora & Gloria Importadora
            </p>
          </div>
        </motion.a>
        
        <div className="hidden md:flex items-center gap-8">
          {["Inicio", "Herencia", "Catálogo", "Cotización"].map((item, i) => (
            <motion.a
              key={item}
              href={`#${item.toLowerCase()}`}
              className="relative text-sm font-semibold uppercase tracking-[0.15em] text-[#6f5a48] transition hover:text-[#a8783c]"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + i * 0.1 }}
              whileHover={{ y: -2 }}
            >
              {item}
              <motion.span
                className="absolute -bottom-1 left-0 h-0.5 bg-[#a8783c]"
                initial={{ width: 0 }}
                whileHover={{ width: "100%" }}
                transition={{ duration: 0.3 }}
              />
            </motion.a>
          ))}
          <motion.a
            href="#cotizacion"
            className="shimmer-button rounded-full px-6 py-2.5 text-xs font-bold uppercase tracking-[0.15em] text-white"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
          >
            Contáctanos
          </motion.a>
        </div>

        {/* Mobile menu button */}
        <button className="md:hidden p-2 text-[#6e4a2c]">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </nav>
    </motion.header>
  );
}

function Hero() {
  const { scrollY } = useScroll();
  const imageScale = useTransform(scrollY, [0, 700], [1, 1.2]);
  const imageOpacity = useTransform(scrollY, [0, 500], [1, 0.6]);
  const textY = useTransform(scrollY, [0, 600], [0, 100]);

  return (
    <section id="inicio" className="relative min-h-screen overflow-hidden bg-[#f8efe8]">
      {/* Background with parallax */}
      <motion.div className="absolute inset-0" style={{ scale: imageScale, opacity: imageOpacity }}>
        <img
          src={HERO_IMAGE}
          alt="Flores artificiales premium"
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#f9f1ea]/95 via-[#f9f1ea]/80 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#f9f1ea] via-transparent to-transparent" />
      </motion.div>

      {/* Decorative elements */}
      <div className="absolute top-20 right-10 w-64 h-64 rounded-full bg-[#f4d9dc]/30 blur-3xl" />
      <div className="absolute bottom-40 left-10 w-96 h-96 rounded-full bg-[#e8d5d0]/40 blur-3xl" />

      <motion.div
        className="relative z-10 mx-auto flex min-h-screen max-w-7xl items-center px-5 sm:px-8 lg:px-12"
        style={{ y: textY }}
      >
        <div className="max-w-3xl pt-20">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="flex items-center gap-4 mb-6"
          >
            <div className="h-px flex-1 max-w-20 bg-gradient-to-r from-[#a8783c] to-transparent" />
            <span className="text-sm font-semibold uppercase tracking-[0.3em] text-[#a8783c]">
              Desde 1999
            </span>
          </motion.div>

          <motion.h1
            className="font-serif text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-semibold leading-[0.95] tracking-tight text-[#392b24]"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.8 }}
          >
            La perfección
            <br />
            <span className="text-[#a8783c]">de la naturaleza</span>
            <br />
            hecha eterna
          </motion.h1>

          <motion.p
            className="mt-8 max-w-xl text-lg sm:text-xl leading-relaxed text-[#5f5047]"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.8 }}
          >
            Flores artificiales premium para espacios y negocios que merecen brillar siempre. 
            25 años liderando la importación directa con calidad internacional.
          </motion.p>

          <motion.div
            className="mt-10 flex flex-wrap gap-4"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.1, duration: 0.8 }}
          >
            <motion.a
              href="#catalogo"
              className="group shimmer-button inline-flex items-center gap-2 rounded-full px-8 py-4 text-sm font-bold uppercase tracking-wider text-white shadow-xl"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.98 }}
            >
              <span>✨ Explorar Catálogo</span>
              <motion.span
                animate={{ x: [0, 5, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                →
              </motion.span>
            </motion.a>
            <motion.a
              href="#cotizacion"
              className="inline-flex items-center gap-2 rounded-full border-2 border-[#a8783c] bg-white/50 px-8 py-4 text-sm font-bold uppercase tracking-wider text-[#6e4a2c] backdrop-blur-sm transition hover:bg-[#a8783c] hover:text-white"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.98 }}
            >
              🛍️ Cotizar Ahora
            </motion.a>
          </motion.div>

          {/* Stats */}
          <motion.div
            className="mt-16 grid grid-cols-3 gap-8 border-t border-[#c9a161]/30 pt-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.4 }}
          >
            {[
              { number: "25+", label: "Años de Experiencia" },
              { number: "10K+", label: "Clientes Satisfechos" },
              { number: "50+", label: "Variedades Premium" },
            ].map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.5 + i * 0.1 }}
              >
                <p className="font-serif text-3xl sm:text-4xl font-bold text-[#a8783c]">{stat.number}</p>
                <p className="mt-1 text-xs sm:text-sm text-[#6f5a48]">{stat.label}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Hero decorative image */}
        <motion.div
          className="hidden lg:block absolute right-12 top-1/2 -translate-y-1/2"
          initial={{ opacity: 0, x: 100, rotate: 10 }}
          animate={{ opacity: 1, x: 0, rotate: 6 }}
          transition={{ delay: 1, duration: 0.8 }}
        >
          <div className="relative">
            <div className="absolute -inset-4 bg-gradient-to-br from-[#a8783c]/20 to-[#f4d9dc]/30 rounded-full blur-2xl" />
            <LogoImage size="xl" />
          </div>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="flex flex-col items-center gap-2"
        >
          <span className="text-xs uppercase tracking-widest text-[#a8783c]">Scroll</span>
          <div className="w-6 h-10 border-2 border-[#a8783c] rounded-full flex justify-center pt-2">
            <motion.div
              animate={{ y: [0, 12, 0], opacity: [1, 0, 1] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="w-1.5 h-1.5 bg-[#a8783c] rounded-full"
            />
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}

function StorySection() {
  return (
    <section id="herencia" className="relative bg-[#fbf5ee] py-24 lg:py-32 overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-[#f4d9dc]/30 to-transparent" />
      
      <div className="relative z-10 mx-auto max-w-7xl px-5 sm:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Image side */}
          <Reveal className="relative">
            <motion.div
              className="relative"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.5 }}
            >
              {/* Decorative frame */}
              <div className="absolute -inset-4 border-2 border-[#a8783c]/30 rounded-[2.5rem]" />
              <div className="absolute -inset-8 border border-[#a8783c]/20 rounded-[3rem]" />
              
              {/* Main image */}
              <div className="relative overflow-hidden rounded-[2rem]">
                <img
                  src={GLORIA_PHOTO}
                  alt="Gloria - Fundadora de Marce Distribuidora & Gloria Importadora"
                  className="w-full h-[500px] lg:h-[600px] object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#392b24]/40 to-transparent" />
                
                {/* Caption overlay */}
                <div className="absolute bottom-6 left-6 right-6">
                  <p className="font-serif text-2xl text-white">Gloria</p>
                  <p className="text-white/80 text-sm uppercase tracking-wider">Fundadora & Visionaria</p>
                </div>
              </div>

              {/* Floating badge */}
              <motion.div
                className="absolute -bottom-6 -right-6 bg-white rounded-2xl p-6 shadow-xl"
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5 }}
              >
                <p className="font-serif text-4xl font-bold text-[#a8783c]">25</p>
                <p className="text-sm text-[#6f5a48] uppercase tracking-wider">Años de<br/>excelencia</p>
              </motion.div>
            </motion.div>
          </Reveal>

          {/* Content side */}
          <Reveal className="lg:pl-8">
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="h-px w-12 bg-[#a8783c]" />
                <span className="text-sm font-semibold uppercase tracking-[0.3em] text-[#a8783c]">
                  Nuestra Historia
                </span>
              </div>
              
              <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-semibold leading-tight text-[#392b24]">
                Nuestra Herencia:
                <span className="text-[#a8783c]"> 25 Años</span> de Excelencia
              </h2>

              <div className="mt-8 space-y-6 text-lg leading-relaxed text-[#5f5047]">
                <p>
                  Fundada por <strong className="text-[#a8783c]">Gloria</strong>, una mujer visionaria apasionada 
                  por el diseño y la decoración, Marce Distribuidora & Gloria Importadora nació con la promesa 
                  de transformar el mercado de la decoración floral en México.
                </p>
                <p>
                  Hoy, tras un cuarto de siglo liderando el ramo de la importación, seleccionamos minuciosamente 
                  cada pieza en los mercados internacionales más exigentes para garantizar texturas, colores y 
                  acabados idénticos a la naturaleza.
                </p>
                <p>
                  Facilitamos el éxito de tu negocio ofreciendo esquemas a tu medida: 
                  <span className="text-[#a8783c] font-semibold"> Ventas de Mayoreo, Menudeo y Precios Especiales para Distribuidores.</span>
                </p>
              </div>

              <div className="mt-10 flex flex-wrap gap-4">
                {["Mayoreo", "Menudeo", "Distribución"].map((tag, i) => (
                  <motion.span
                    key={tag}
                    className="px-6 py-3 bg-[#a8783c]/10 text-[#a8783c] rounded-full text-sm font-semibold uppercase tracking-wider"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 + i * 0.1 }}
                    whileHover={{ scale: 1.05, backgroundColor: "rgba(168, 120, 60, 0.2)" }}
                  >
                    {tag}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function FeaturesSection() {
  const features = [
    {
      icon: "🌸",
      title: "Calidad Premium",
      description: "Flores artificiales con texturas y colores idénticos a la naturaleza, importadas de los mercados más exigentes.",
    },
    {
      icon: "✨",
      title: "Durabilidad Garantizada",
      description: "Materiales de alta resistencia que mantienen su belleza por años, sin pérdida de color ni deformación.",
    },
    {
      icon: "🚚",
      title: "Importación Directa",
      description: "Sin intermediarios. Precios competitivos y acceso a las últimas tendencias internacionales en decoración floral.",
    },
    {
      icon: "💎",
      title: "Atención Personalizada",
      description: "Asesoría experta para decoradores, floristas y emprendedores. Te ayudamos a elegir lo mejor para tu negocio.",
    },
  ];

  return (
    <section className="relative bg-[#f8efe8] py-20 overflow-hidden">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <Reveal className="text-center mb-16">
          <span className="text-sm font-semibold uppercase tracking-[0.3em] text-[#a8783c]">¿Por qué elegirnos?</span>
          <h2 className="mt-4 font-serif text-4xl sm:text-5xl font-semibold text-[#392b24]">
            La diferencia está en <span className="text-[#a8783c]">los detalles</span>
          </h2>
        </Reveal>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, i) => (
            <motion.div
              key={feature.title}
              className="group relative bg-white/60 backdrop-blur-sm rounded-3xl p-8 border border-[#c9a161]/20 hover:border-[#a8783c]/40 transition-all duration-500"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ y: -8, boxShadow: "0 25px 50px -12px rgba(168, 120, 60, 0.2)" }}
            >
              <motion.div
                className="text-5xl mb-4"
                whileHover={{ scale: 1.2, rotate: 10 }}
              >
                {feature.icon}
              </motion.div>
              <h3 className="font-serif text-2xl font-semibold text-[#392b24] mb-3">
                {feature.title}
              </h3>
              <p className="text-[#6f5a48] leading-relaxed">
                {feature.description}
              </p>
              <motion.div
                className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-[#a8783c] to-[#f4d9dc] rounded-b-3xl"
                initial={{ scaleX: 0 }}
                whileHover={{ scaleX: 1 }}
                transition={{ duration: 0.3 }}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function escapePdfText(value: string) {
  return value.replace(/\\/g, "\\\\").replace(/\(/g, "\\(").replace(/\)/g, "\\)");
}

function createCatalogPdf() {
  const pages = [
    {
      title: "Coleccion Elite 2026",
      lines: [
        "Marce Distribuidora & Gloria Importadora",
        "Flores artificiales premium de importacion directa.",
        "Vista exclusiva para clientes de mayoreo, menudeo y distribuidores.",
      ],
    },
    {
      title: "Selecciones Premium",
      lines: [
        "Rosas, orquideas, follajes, peonias y disenos de temporada.",
        "Texturas realistas, colores estables y acabados de alta durabilidad.",
        "Consulta disponibilidad y precios especiales por WhatsApp.",
      ],
    },
    {
      title: "Importacion Directa",
      lines: [
        "25 anos liderando el arte de la flor eterna.",
        "Esquemas comerciales a la medida de decoradores y negocios.",
        "Catalogo completo disponible bajo atencion personalizada.",
      ],
    },
  ];

  const objects: string[] = [];
  const add = (body: string) => {
    objects.push(body);
    return objects.length;
  };

  const catalogId = add("<< /Type /Catalog /Pages 2 0 R >>");
  const pagesId = add("__PAGES__");
  const fontSansId = add("<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>");
  const fontSerifId = add("<< /Type /Font /Subtype /Type1 /BaseFont /Times-Roman >>");
  const pageIds: number[] = [];

  pages.forEach((page, index) => {
    const stream = [
      "q",
      "0.985 0.955 0.925 rg 0 0 612 792 re f",
      "0.925 0.785 0.805 rg 42 60 528 672 re f",
      "0.985 0.955 0.925 rg 54 72 504 648 re f",
      "0.66 0.45 0.23 RG 1.2 w 72 118 468 556 re S",
      "0.66 0.45 0.23 rg BT /F2 34 Tf 72 660 Td (" + escapePdfText(page.title) + ") Tj ET",
      "0.28 0.22 0.18 rg BT /F1 13 Tf 72 620 Td (" + escapePdfText(page.lines[0]) + ") Tj ET",
      "0.38 0.31 0.27 rg BT /F1 12 Tf 72 586 Td (" + escapePdfText(page.lines[1]) + ") Tj ET",
      "0.38 0.31 0.27 rg BT /F1 12 Tf 72 560 Td (" + escapePdfText(page.lines[2]) + ") Tj ET",
      "0.66 0.45 0.23 rg BT /F1 10 Tf 72 154 Td (Solo lectura - Vista exclusiva protegida) Tj ET",
      "0.72 0.58 0.40 rg BT /F1 9 Tf 450 92 Td (Pagina " + (index + 1) + ") Tj ET",
      "Q",
    ].join("\n");
    const contentId = add(`<< /Length ${stream.length} >>\nstream\n${stream}\nendstream`);
    const pageId = add(
      `<< /Type /Page /Parent ${pagesId} 0 R /MediaBox [0 0 612 792] /Resources << /Font << /F1 ${fontSansId} 0 R /F2 ${fontSerifId} 0 R >> >> /Contents ${contentId} 0 R >>`,
    );
    pageIds.push(pageId);
  });

  objects[pagesId - 1] = `<< /Type /Pages /Kids [${pageIds.map((id) => `${id} 0 R`).join(" ")}] /Count ${pageIds.length} >>`;

  let pdf = "%PDF-1.4\n";
  const offsets = [0];
  objects.forEach((body, index) => {
    offsets.push(pdf.length);
    pdf += `${index + 1} 0 obj\n${body}\nendobj\n`;
  });
  const xrefOffset = pdf.length;
  pdf += `xref\n0 ${objects.length + 1}\n0000000000 65535 f \n`;
  for (let index = 1; index <= objects.length; index += 1) {
    pdf += `${String(offsets[index]).padStart(10, "0")} 00000 n \n`;
  }
  pdf += `trailer\n<< /Size ${objects.length + 1} /Root ${catalogId} 0 R >>\nstartxref\n${xrefOffset}\n%%EOF`;
  return pdf;
}

function ProtectedCatalogViewer() {
  const [catalogUrl, setCatalogUrl] = useState("");

  useEffect(() => {
    const blob = new Blob([createCatalogPdf()], { type: "application/pdf" });
    const url = URL.createObjectURL(blob);
    setCatalogUrl(`${url}#toolbar=0&navpanes=0&scrollbar=0&view=FitH`);

    const blockShortcuts = (event: KeyboardEvent) => {
      const key = event.key.toLowerCase();
      if ((event.ctrlKey || event.metaKey) && ["s", "p"].includes(key)) {
        event.preventDefault();
      }
    };

    window.addEventListener("keydown", blockShortcuts);
    return () => {
      window.removeEventListener("keydown", blockShortcuts);
      URL.revokeObjectURL(url);
    };
  }, []);

  return (
    <div
      className="relative overflow-hidden rounded-[2rem] border-2 border-[#a8783c]/30 bg-[#fffaf3] shadow-2xl"
      onContextMenu={(event) => event.preventDefault()}
    >
      <div className="flex items-center justify-between border-b border-[#c9a161]/20 bg-gradient-to-r from-[#fffaf3] to-[#f4d9dc]/30 px-6 py-4">
        <div className="flex items-center gap-3">
          <LogoImage size="sm" />
          <span className="text-sm font-bold uppercase tracking-wider text-[#8a6634]">Catálogo Élite 2026</span>
        </div>
        <div className="flex items-center gap-4">
          <span className="px-3 py-1 bg-[#a8783c]/10 text-[#a8783c] rounded-full text-xs font-semibold uppercase">Solo Lectura</span>
          <span className="hidden sm:block text-xs text-[#8a6634]">Vista Protegida</span>
        </div>
      </div>
      <div className="relative h-[500px] sm:h-[600px] lg:h-[700px] bg-[#f8efe8]">
        {catalogUrl ? (
          <iframe
            title="Catálogo protegido Marce Distribuidora & Gloria Importadora"
            src={catalogUrl}
            className="h-full w-full select-none"
            sandbox="allow-same-origin allow-scripts"
          />
        ) : (
          <div className="flex h-full items-center justify-center">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              className="w-12 h-12 border-4 border-[#a8783c]/20 border-t-[#a8783c] rounded-full"
            />
          </div>
        )}
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center overflow-hidden">
          <motion.p
            className="whitespace-nowrap font-serif text-4xl sm:text-6xl font-bold uppercase tracking-[0.3em] text-[#a8783c]/10 -rotate-12"
            animate={{ x: ["-100%", "100%"] }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          >
            Marce Distribuidora & Gloria Importadora - Vista Exclusiva • 
            Marce Distribuidora & Gloria Importadora - Vista Exclusiva •
          </motion.p>
        </div>
      </div>
    </div>
  );
}

function CatalogSection() {
  return (
    <section id="catalogo" className="relative bg-[#fbf5ee] py-24 lg:py-32 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(244,217,220,0.4),transparent_70%)]" />
      
      <div className="relative z-10 mx-auto max-w-7xl px-5 sm:px-8">
        <Reveal className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-sm font-semibold uppercase tracking-[0.3em] text-[#a8783c]">Colección Élite</span>
          <h2 className="mt-4 font-serif text-4xl sm:text-5xl lg:text-6xl font-semibold text-[#392b24]">
            Descubre nuestra <span className="text-[#a8783c]">selección premium</span>
          </h2>
          <p className="mt-6 text-lg text-[#6f5a48] leading-relaxed">
            Explora nuestro catálogo exclusivo de flores artificiales de importación. 
            Cada pieza ha sido seleccionada cuidadosamente para ofrecerte la máxima calidad.
          </p>
        </Reveal>

        <Reveal>
          <ProtectedCatalogViewer />
        </Reveal>

        <div className="mt-12 grid sm:grid-cols-3 gap-6">
          {[
            { title: "Rosas Premium", desc: "La eterna belleza de las rosas en todas sus variedades" },
            { title: "Orquídeas Exóticas", desc: "Elegancia sofisticada para espacios únicos" },
            { title: "Follajes & Más", desc: "Complementos perfectos para tus arreglos" },
          ].map((item, i) => (
            <motion.div
              key={item.title}
              className="text-center p-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <h4 className="font-serif text-xl font-semibold text-[#392b24]">{item.title}</h4>
              <p className="mt-2 text-sm text-[#6f5a48]">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function QuoteForm() {
  const [step, setStep] = useState(0);
  const [form, setForm] = useState<FormData>({ nombre: "", telefono: "", cliente: "", interes: "" });
  const current = formSteps[step];
  const value = form[current.name];
  const isLast = step === formSteps.length - 1;

  const updateValue = (newValue: string) => {
    setForm((previous) => ({ ...previous, [current.name]: newValue }));
  };

  const submitToWhatsApp = () => {
    const text = [
      "Hola, Marce Distribuidora & Gloria Importadora 🌸",
      "Me gustaría recibir una cotización especial de flores artificiales premium.",
      "",
      `👤 Nombre: ${form.nombre}`,
      `📱 Teléfono: ${form.telefono}`,
      `🏢 Tipo de cliente: ${form.cliente}`,
      `🌸 Interés: ${form.interes}`,
      "",
      "Quedo atento/a a su asesoría. Muchas gracias ✨",
    ].join("\n");
    window.location.href = `${WHATSAPP_URL}?text=${encodeURIComponent(text)}`;
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!value.trim()) return;
    if (!isLast) {
      setStep((previous) => previous + 1);
      return;
    }
    submitToWhatsApp();
  };

  return (
    <section id="cotizacion" className="relative bg-[#f8efe8] py-24 lg:py-32 overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 left-0 w-1/2 h-full bg-gradient-to-r from-[#f4d9dc]/30 to-transparent" />
      
      <div className="relative z-10 mx-auto max-w-7xl px-5 sm:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <Reveal>
            <div className="flex items-center gap-4 mb-6">
              <div className="h-px w-12 bg-[#a8783c]" />
              <span className="text-sm font-semibold uppercase tracking-[0.3em] text-[#a8783c]">Cotización Especial</span>
            </div>
            <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-semibold leading-tight text-[#392b24]">
              Solicita tu <span className="text-[#a8783c]">cotización</span> personalizada
            </h2>
            <p className="mt-6 text-lg text-[#6f5a48] leading-relaxed">
              Cuéntanos qué necesitas y te conectaremos directamente con un asesor experto vía WhatsApp. 
              Recibe atención personalizada y precios especiales según tu tipo de negocio.
            </p>
            
            <div className="mt-10 space-y-4">
              {[
                { icon: "⚡", text: "Respuesta en menos de 24 horas" },
                { icon: "💰", text: "Precios especiales para mayoreo" },
                { icon: "🚚", text: "Envíos a todo México" },
              ].map((item, i) => (
                <motion.div
                  key={item.text}
                  className="flex items-center gap-4"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 + i * 0.1 }}
                >
                  <span className="text-2xl">{item.icon}</span>
                  <span className="text-[#5f5047]">{item.text}</span>
                </motion.div>
              ))}
            </div>
          </Reveal>

          <Reveal>
            <motion.form
              onSubmit={handleSubmit}
              className="bg-white/80 backdrop-blur-md rounded-[2.5rem] p-8 sm:p-10 shadow-2xl border border-[#c9a161]/20"
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
            >
              {/* Progress steps */}
              <div className="flex items-center justify-between mb-8">
                {formSteps.map((item, index) => (
                  <div key={item.name} className="flex items-center">
                    <motion.div
                      className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold transition-colors duration-300 ${
                        index <= step ? "bg-[#a8783c] text-white" : "bg-[#ead9cc] text-[#8a6634]"
                      }`}
                      animate={index === step ? { scale: [1, 1.1, 1] } : {}}
                      transition={{ duration: 0.5, repeat: index === step ? Infinity : 0, repeatDelay: 1 }}
                    >
                      {index < step ? "✓" : index + 1}
                    </motion.div>
                    {index < formSteps.length - 1 && (
                      <div
                        className={`w-12 sm:w-20 h-1 mx-2 transition-colors duration-300 ${
                          index < step ? "bg-[#a8783c]" : "bg-[#ead9cc]"
                        }`}
                      />
                    )}
                  </div>
                ))}
              </div>

              <AnimatePresence mode="wait">
                <motion.div
                  key={current.name}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <label className="block font-serif text-2xl sm:text-3xl text-[#392b24] mb-2" htmlFor={current.name}>
                    {current.label}
                  </label>
                  <p className="text-[#6f5a48] mb-6">{current.helper}</p>

                  {current.type === "select" ? (
                    <select
                      id={current.name}
                      required
                      value={value}
                      onChange={(event) => updateValue(event.target.value)}
                      className="w-full rounded-2xl border-2 border-[#c9a161]/30 bg-white px-5 py-4 text-lg text-[#392b24] outline-none transition focus:border-[#a8783c] focus:ring-4 focus:ring-[#a8783c]/10"
                    >
                      <option value="">Selecciona una opción</option>
                      {current.options?.map((option) => (
                        <option key={option} value={option}>
                          {option}
                        </option>
                      ))}
                    </select>
                  ) : (
                    <input
                      id={current.name}
                      required
                      type={current.type ?? "text"}
                      value={value}
                      onChange={(event) => updateValue(event.target.value)}
                      placeholder={current.placeholder}
                      className="w-full rounded-2xl border-2 border-[#c9a161]/30 bg-white px-5 py-4 text-lg text-[#392b24] outline-none transition placeholder:text-[#9b897d] focus:border-[#a8783c] focus:ring-4 focus:ring-[#a8783c]/10"
                    />
                  )}
                </motion.div>
              </AnimatePresence>

              <div className="mt-8 flex justify-between">
                <motion.button
                  type="button"
                  onClick={() => setStep((previous) => Math.max(previous - 1, 0))}
                  className="px-6 py-3 text-[#8a6634] font-semibold disabled:opacity-30"
                  disabled={step === 0}
                  whileHover={step !== 0 ? { x: -5 } : {}}
                >
                  ← Anterior
                </motion.button>
                <motion.button
                  type="submit"
                  className="shimmer-button rounded-full px-8 py-4 text-sm font-bold uppercase tracking-wider text-white shadow-xl"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {isLast ? "🛍️ ¡Solicitar Cotización!" : "Siguiente →"}
                </motion.button>
              </div>
            </motion.form>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function FloatingVideo() {
  const [visible, setVisible] = useState(false);
  const [audioEnabled, setAudioEnabled] = useState(false);
  const [closed, setClosed] = useState(false);
  const iframeRef = useRef<HTMLIFrameElement | null>(null);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 520);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const enableAudio = () => {
    setAudioEnabled(true);
    iframeRef.current?.contentWindow?.postMessage({ type: "unMute", "x-tiktok-player": true }, "*");
    iframeRef.current?.contentWindow?.postMessage({ type: "play", "x-tiktok-player": true }, "*");
  };

  const handleClose = () => {
    setClosed(true);
  };

  if (closed) return null;

  return (
    <AnimatePresence>
      {visible && (
        <motion.aside
          className="fixed bottom-5 right-4 z-[70] w-[180px] sm:w-[260px] overflow-hidden rounded-[1.5rem] border-2 border-[#a8783c]/30 bg-white shadow-2xl"
          initial={{ opacity: 0, y: 100, scale: 0.8 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 100, scale: 0.8 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          {/* Header with close button */}
          <div className="flex items-center justify-between bg-gradient-to-r from-[#a8783c] to-[#c49655] px-3 py-2">
            <span className="text-xs font-bold text-white truncate">TikTok Oficial</span>
            <div className="flex items-center gap-2">
              <button
                onClick={enableAudio}
                className="text-white/80 hover:text-white transition"
                title={audioEnabled ? "Audio activado" : "Activar audio"}
              >
                {audioEnabled ? "🔊" : "🔇"}
              </button>
              <button
                onClick={handleClose}
                className="text-white/80 hover:text-white transition text-lg leading-none"
                title="Cerrar video"
              >
                ×
              </button>
            </div>
          </div>

          {/* Video container */}
          <div className="aspect-[9/16] bg-[#f1ded8]">
            <iframe
              ref={iframeRef}
              title="Video TikTok Marce Distribuidora & Gloria Importadora"
              src={TIKTOK_PLAYER}
              allow="autoplay; encrypted-media; fullscreen"
              className="h-full w-full"
            />
          </div>
        </motion.aside>
      )}
    </AnimatePresence>
  );
}

function FloatingDock() {
  const [showTooltip, setShowTooltip] = useState(false);

  useEffect(() => {
    const timer = window.setTimeout(() => setShowTooltip(true), 3000);
    return () => window.clearTimeout(timer);
  }, []);

  const defaultMessage = encodeURIComponent(
    "Hola, Marce Distribuidora & Gloria Importadora 🌸\nMe gustaría hablar con un asesor experto.",
  );

  const links = [
    { 
      label: "WhatsApp", 
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.008-.57-.008-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
        </svg>
      ),
      href: `${WHATSAPP_URL}?text=${defaultMessage}`,
      pulse: true,
    },
    { 
      label: "Facebook", 
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
        </svg>
      ),
      href: FACEBOOK_URL,
    },
    { 
      label: "TikTok", 
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/>
        </svg>
      ),
      href: TIKTOK_URL,
    },
  ];

  return (
    <div className="fixed left-3 top-1/2 -translate-y-1/2 z-[90] hidden sm:block">
      <div className="flex flex-col gap-3">
        {links.map((link, index) => (
          <motion.a
            key={link.label}
            href={link.href}
            target="_blank"
            rel="noreferrer"
            aria-label={link.label}
            className={`relative flex h-12 w-12 items-center justify-center rounded-full border-2 border-[#a8783c]/30 bg-white/90 text-[#a8783c] shadow-lg backdrop-blur-sm transition-all hover:border-[#a8783c] hover:bg-[#a8783c] hover:text-white ${link.pulse ? "" : ""}`}
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0, y: [0, -3, 0] }}
            transition={{ 
              delay: 0.5 + index * 0.1, 
              y: { duration: 2, repeat: Infinity, ease: "easeInOut" } 
            }}
            whileHover={{ scale: 1.15, x: 5 }}
          >
            {link.icon}
            
            {link.label === "WhatsApp" && showTooltip && (
              <motion.span
                className="absolute left-14 top-1/2 w-max -translate-y-1/2 rounded-xl bg-[#a8783c] px-4 py-2 text-xs font-bold text-white shadow-xl"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
              >
                💬 ¿Hablamos?
              </motion.span>
            )}
          </motion.a>
        ))}
      </div>
    </div>
  );
}

function LocationSection() {
  const mapUrl =
    "https://www.google.com/maps?q=Calle%20Alvaro%20Obregon%20428A%2C%20Guadalajara%2C%20Jalisco%2044360%2C%20Mexico&output=embed";

  return (
    <section className="relative bg-[#fbf5ee] py-24 lg:py-32 overflow-hidden">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <Reveal className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-sm font-semibold uppercase tracking-[0.3em] text-[#a8783c]">Visítanos</span>
          <h2 className="mt-4 font-serif text-4xl sm:text-5xl lg:text-6xl font-semibold text-[#392b24]">
            Te esperamos en <span className="text-[#a8783c]">Guadalajara</span>
          </h2>
          <p className="mt-6 text-lg text-[#6f5a48]">
            Calle Alvaro Obregon #428A, Guadalajara, México, CP 44360
          </p>
        </Reveal>

        <Reveal>
          <motion.div
            className="relative overflow-hidden rounded-[2.5rem] border-2 border-[#a8783c]/30 shadow-2xl"
            whileHover={{ scale: 1.01 }}
            transition={{ duration: 0.5 }}
          >
            <div className="absolute -inset-1 bg-gradient-to-r from-[#a8783c]/20 via-[#f4d9dc]/30 to-[#a8783c]/20 blur-xl" />
            <iframe
              title="Mapa de Marce Distribuidora & Gloria Importadora"
              src={mapUrl}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="relative h-[400px] sm:h-[500px] w-full rounded-[2.3rem] border-0"
              allowFullScreen
            />
          </motion.div>
        </Reveal>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="bg-[#392b24] text-white py-16">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3 mb-6">
              <img src={LOGO_URL} alt="" className="h-16 w-16 object-contain rounded-full bg-white/10 p-2" />
              <div>
                <p className="font-serif text-2xl font-semibold">Marce</p>
                <p className="text-xs uppercase tracking-wider text-[#a8783c]">Distribuidora</p>
              </div>
            </div>
            <p className="text-white/70 text-sm leading-relaxed">
              25 años liderando la importación de flores artificiales premium en México. 
              Calidad internacional para tu negocio.
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 className="font-serif text-xl mb-6">Enlaces</h4>
            <ul className="space-y-3 text-white/70">
              {["Inicio", "Nuestra Historia", "Catálogo", "Cotización"].map((link) => (
                <li key={link}>
                  <a href={`#${link.toLowerCase().replace(/ /g, "-")}`} className="hover:text-[#a8783c] transition">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-serif text-xl mb-6">Contacto</h4>
            <ul className="space-y-3 text-white/70">
              <li>📍 Alvaro Obregon #428A</li>
              <li>Guadalajara, Jal. 44360</li>
              <li>📱 33 3507 2672</li>
              <li>✉️ info@marceimportadora.com</li>
            </ul>
          </div>

          {/* Social */}
          <div>
            <h4 className="font-serif text-xl mb-6">Síguenos</h4>
            <div className="flex gap-4">
              {[
                { icon: "📘", href: FACEBOOK_URL, label: "Facebook" },
                { icon: "📱", href: WHATSAPP_URL, label: "WhatsApp" },
                { icon: "🎵", href: TIKTOK_URL, label: "TikTok" },
              ].map((social) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noreferrer"
                  className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center text-2xl hover:bg-[#a8783c] transition"
                  whileHover={{ scale: 1.1, y: -3 }}
                  aria-label={social.label}
                >
                  {social.icon}
                </motion.a>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-white/10 text-center">
          <p className="text-white/50 text-sm">
            Marce Distribuidora & Gloria Importadora © 2026 — 25 Años Liderando el Arte de la Flor Eterna.
          </p>
        </div>
      </div>
    </footer>
  );
}

export default function App() {
  const [loading, setLoading] = useState(true);

  return (
    <div className="min-h-screen bg-[#fbf5ee] font-sans text-[#3f322b] selection:bg-[#e7c1c6] selection:text-[#3f322b]">
      <AnimatePresence>
        {loading && <Preloader onComplete={() => setLoading(false)} />}
      </AnimatePresence>

      {!loading && (
        <>
          <PetalField />
          <Header />
          <main>
            <Hero />
            <StorySection />
            <FeaturesSection />
            <CatalogSection />
            <QuoteForm />
            <LocationSection />
          </main>
          <Footer />
          <FloatingDock />
          <FloatingVideo />
        </>
      )}
    </div>
  );
}
