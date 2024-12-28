'use client'

import Image from 'next/image'
import { 
  IoHomeOutline,
  IoGridOutline,
  IoPricetagOutline,
  IoChatbubblesOutline,
  IoMailOutline,
  IoPersonOutline,
  IoSpeedometerOutline,
  IoAnalyticsOutline,
  IoLinkOutline,
  IoDocumentTextOutline,
  IoHeadsetOutline,
  IoStarOutline,
  IoCheckmarkCircleOutline // Add this import
} from 'react-icons/io5'
import { IconType } from 'react-icons'
import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'
import Link from 'next/link'

const sections = {
  home: 'home',
  features: 'features',
  pricing: 'pricing',
  testimonials: 'testimonials',
  contact: 'contact'
} as const

type SectionType = keyof typeof sections

export default function Home() {
  const [activeSection, setActiveSection] = useState<SectionType>('home')

  return (
    <div className="flex h-screen">
      {/* Background Image */}
      <div className="fixed inset-0 -z-10">
        <Image
          src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80"
          alt="Background"
          fill
          className="object-cover"
          unoptimized
        />
        <div className="absolute inset-0 bg-navy-900/80 backdrop-blur-sm"></div>
      </div>

      {/* Sidebar Navigation */}
      <nav className="w-20 bg-navy-900 h-screen flex flex-col items-center py-8 space-y-8 relative z-10">
        <div className="w-12 h-12 bg-orange-500 rounded-xl flex items-center justify-center">
          <span className="text-white text-2xl font-bold" title="CRM System">C</span>
        </div>
        <div className="flex flex-col space-y-6">
          <NavIcon 
            Icon={IoHomeOutline} 
            active={activeSection === 'home'} 
            title="Início" 
            onClick={() => setActiveSection('home')}
          />
          <NavIcon 
            Icon={IoGridOutline} 
            active={activeSection === 'features'} 
            title="Funcionalidades" 
            onClick={() => setActiveSection('features')}
          />
          <NavIcon 
            Icon={IoPricetagOutline} 
            active={activeSection === 'pricing'} 
            title="Preços" 
            onClick={() => setActiveSection('pricing')}
          />
          <NavIcon 
            Icon={IoChatbubblesOutline} 
            active={activeSection === 'testimonials'} 
            title="Depoimentos" 
            onClick={() => setActiveSection('testimonials')}
          />
          <NavIcon 
            Icon={IoMailOutline} 
            active={activeSection === 'contact'} 
            title="Contato" 
            onClick={() => setActiveSection('contact')}
          />
        </div>
      </nav>

      {/* Main Content */}
      <main className="flex-1 p-8 relative z-10 overflow-hidden">
        <AnimatePresence mode="wait">
          {activeSection === 'home' && <HomeSection key="home" />}
          {activeSection === 'features' && <FeaturesSection key="features" />}
          {activeSection === 'pricing' && <PricingSection key="pricing" />}
          {activeSection === 'testimonials' && <TestimonialsSection key="testimonials" />}
          {activeSection === 'contact' && <ContactSection key="contact" />}
        </AnimatePresence>
      </main>
    </div>
  )
}

interface NavIconProps {
  Icon: IconType;
  active?: boolean;
  title?: string;
  onClick?: () => void;
}

const NavIcon = ({ Icon, active = false, title, onClick }: NavIconProps) => (
  <div 
    className={`p-3 rounded-xl cursor-pointer transition-colors ${
      active ? 'bg-orange-500 text-white' : 'text-slate-400 hover:bg-navy-800 hover:text-white'
    }`}
    title={title}
    onClick={onClick}
  >
    <Icon size={24} />
  </div>
)

const slideVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 1000 : -1000,
    opacity: 0
  }),
  center: {
    zIndex: 1,
    x: 0,
    opacity: 1
  },
  exit: (direction: number) => ({
    zIndex: 0,
    x: direction < 0 ? 1000 : -1000,
    opacity: 0
  })
};

const updateTextClasses = {
  heading: "text-[rgb(255,255,255)] text-shadow-slate font-bold", // Main headings
  subheading: "text-[rgb(255,255,255)] text-shadow-slate", // Section titles
  body: "text-[rgb(255,255,255)] text-shadow-slate", // Body text
  features: "text-[rgb(255,255,255)] text-shadow-slate", // Feature lists
  label: "text-[rgb(255,255,255)] text-shadow-slate" // Form labels
};

const HomeSection = () => (
  <motion.div
    initial="enter"
    animate="center"
    exit="exit"
    variants={slideVariants}
    transition={{
      x: { type: "spring", stiffness: 300, damping: 30 },
      opacity: { duration: 0.2 }
    }}
  >
    <div className="max-w-6xl mx-auto">
      <div className="mb-12">
        <div className="max-w-3xl">
          <h1 className="text-[rgb(255,255,255)] text-6xl font-extrabold mb-8 leading-tight tracking-wide text-shadow-slate">
            Transforme o Relacionamento com seus Clientes
          </h1>
          <p className="text-[rgb(255,255,255)] text-2xl mb-10 leading-relaxed font-medium text-shadow-slate">
            Nossa plataforma CRM inovadora ajuda sua empresa a construir conexões mais fortes e duradouras com seus clientes.
          </p>
          <Link 
            href="/dashboard" 
            className="bg-orange-500 hover:bg-orange-600 text-white px-10 py-5 rounded-xl text-xl font-bold transition-colors w-fit shadow-lg focus:ring-4 focus:ring-orange-300 inline-block"
          >
            Desbloqueie o potencial do seu negócio
          </Link>
        </div>
      </div>
    </div>
  </motion.div>
)

// Update text colors and add shadows in feature cards
const FeaturesSection = () => (
  <motion.div
    initial="enter"
    animate="center"
    exit="exit"
    variants={slideVariants}
    transition={{
      x: { type: "spring", stiffness: 300, damping: 30 },
      opacity: { duration: 0.2 }
    }}
  >
    <div className="max-w-6xl mx-auto">
      <h1 className={`${updateTextClasses.heading} text-4xl font-bold mb-8 drop-shadow-lg`}>Funcionalidades</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[
          { icon: IoPersonOutline, title: "Gestão de Contatos", desc: "Organize e acompanhe todos seus clientes em um só lugar" },
          { icon: IoSpeedometerOutline, title: "Automação", desc: "Automatize tarefas repetitivas e aumente sua produtividade" },
          { icon: IoAnalyticsOutline, title: "Análise de Dados", desc: "Insights poderosos para tomada de decisões" },
          { icon: IoLinkOutline, title: "Integração", desc: "Conecte com suas ferramentas favoritas" },
          { icon: IoDocumentTextOutline, title: "Relatórios", desc: "Relatórios detalhados e personalizáveis" },
          { icon: IoHeadsetOutline, title: "Suporte 24/7", desc: "Assistência especializada sempre que precisar" }
        ].map((feature, i) => (
          <div key={i} className="bg-navy-800/90 p-6 rounded-xl backdrop-blur-sm hover:bg-navy-800/95 transition-all shadow-lg hover:shadow-xl border border-white/10">
            <div className="bg-orange-500/20 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
              <feature.icon size={24} className="text-orange-500" />
            </div>
            <h3 className={`${updateTextClasses.subheading} text-xl font-bold mb-2 drop-shadow-md`}>{feature.title}</h3>
            <p className={`${updateTextClasses.body} drop-shadow`}>{feature.desc}</p>
          </div>
        ))}
      </div>
    </div>
  </motion.div>
)

// Update text colors and add shadows in pricing cards
const PricingSection = () => (
  <motion.div
    initial="enter"
    animate="center"
    exit="exit"
    variants={slideVariants}
    transition={{
      x: { type: "spring", stiffness: 300, damping: 30 },
      opacity: { duration: 0.2 }
    }}
  >
    <div className="max-w-6xl mx-auto">
      <h1 className={`${updateTextClasses.heading} text-4xl font-bold mb-8 drop-shadow-lg`}>Planos e Preços</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { icon: IoStarOutline, title: "Básico", price: "R$ 99", features: ["5 usuários", "Recursos básicos", "Suporte por email"] },
          { icon: IoStarOutline, title: "Profissional", price: "R$ 199", features: ["15 usuários", "Recursos avançados", "Suporte prioritário"] },
          { icon: IoStarOutline, title: "Enterprise", price: "Sob consulta", features: ["Usuários ilimitados", "Recursos personalizados", "Suporte 24/7"] }
        ].map((plan, i) => (
          <div key={i} className="bg-navy-800/95 p-8 rounded-xl backdrop-blur-sm text-center shadow-lg hover:shadow-xl transition-all border border-white/10 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-orange-500 to-orange-600"></div>
            <div className="bg-orange-500/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
              <plan.icon size={32} className="text-orange-500" />
            </div>
            <h3 className={`${updateTextClasses.subheading} text-2xl font-bold mb-4 drop-shadow-md`}>{plan.title}</h3>
            <p className="text-4xl font-bold text-orange-500 mb-6 drop-shadow-md">{plan.price}</p>
            <ul className={`${updateTextClasses.features} space-y-3 mb-6 drop-shadow`}>
              {plan.features.map((feature, j) => (
                <li key={j} className="flex items-center justify-center gap-2">
                  <IoCheckmarkCircleOutline size={20} className="text-orange-500" />
                  {feature}
                </li>
              ))}
            </ul>
            <button className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-3 rounded-xl font-bold w-full transition-all">
              Começar agora
            </button>
          </div>
        ))}
      </div>
    </div>
  </motion.div>
)

// Update text colors and add shadows in testimonial cards
const TestimonialsSection = () => (
  <motion.div
    initial="enter"
    animate="center"
    exit="exit"
    variants={slideVariants}
    transition={{
      x: { type: "spring", stiffness: 300, damping: 30 },
      opacity: { duration: 0.2 }
    }}
  >
    <div className="max-w-6xl mx-auto">
      <h1 className={`${updateTextClasses.heading} text-4xl font-bold mb-8 drop-shadow-lg`}>Depoimentos</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {[
          { name: "João Silva", role: "CEO", text: "Aumentamos nossa produtividade em 200% após implementar o sistema." },
          { name: "Maria Souza", role: "Gerente de Vendas", text: "A ferramenta é intuitiva e fácil de usar." },
          { name: "Carlos Pereira", role: "Analista de Marketing", text: "Os relatórios são detalhados e ajudam na tomada de decisões." },
          { name: "Ana Costa", role: "Suporte ao Cliente", text: "O suporte é excelente e sempre disponível." }
        ].map((testimonial, i) => (
          <div key={i} className="bg-navy-800/90 p-6 rounded-xl backdrop-blur-sm shadow-lg hover:shadow-xl transition-all border border-white/10">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 bg-orange-500/10 rounded-full flex items-center justify-center">
                <IoPersonOutline size={24} className="text-orange-500" />
              </div>
              <div>
                <p className={`${updateTextClasses.subheading} font-bold drop-shadow-md`}>{testimonial.name}</p>
                <p className={`${updateTextClasses.body} drop-shadow`}>{testimonial.role}</p>
              </div>
            </div>
            <p className={`${updateTextClasses.body} drop-shadow`}>"{testimonial.text}"</p>
          </div>
        ))}
      </div>
    </div>
  </motion.div>
)

// Update text colors and add shadows in contact form
const ContactSection = () => (
  <motion.div
    initial="enter"
    animate="center"
    exit="exit"
    variants={slideVariants}
    transition={{
      x: { type: "spring", stiffness: 300, damping: 30 },
      opacity: { duration: 0.2 }
    }}
  >
    <div className="max-w-6xl mx-auto">
      <h1 className={`${updateTextClasses.heading} text-4xl font-bold mb-8 drop-shadow-lg`}>Contato</h1>
      <div className="bg-navy-800/90 p-8 rounded-xl backdrop-blur-sm shadow-lg border border-white/10">
        <p className={`${updateTextClasses.subheading} text-xl mb-6 drop-shadow-md`}>Entre em contato conosco</p>
        <form className="space-y-4 max-w-lg">
          <div>
            <label className={`block ${updateTextClasses.label} mb-2 font-medium drop-shadow`} htmlFor="name">Nome</label>
            <input 
              className="w-full p-3 rounded-xl bg-white/10 text-white placeholder-white/50 border border-white/10 focus:border-orange-500 transition-all outline-none" 
              type="text" 
              id="name" 
              name="name"
              placeholder="Seu nome" 
            />
          </div>
          <div>
            <label className={`block ${updateTextClasses.label} mb-2 font-medium drop-shadow`} htmlFor="email">Email</label>
            <input 
              className="w-full p-3 rounded-xl bg-white/10 text-white placeholder-white/50 border border-white/10 focus:border-orange-500 transition-all outline-none" 
              type="email" 
              id="email" 
              name="email"
              placeholder="Seu email" 
            />
          </div>
          <div>
            <label className={`block ${updateTextClasses.label} mb-2 font-medium drop-shadow`} htmlFor="message">Mensagem</label>
            <textarea 
              className="w-full p-3 rounded-xl bg-white/10 text-white placeholder-white/50 border border-white/10 focus:border-orange-500 transition-all outline-none" 
              id="message" 
              name="message" 
              rows={4}
              placeholder="Sua mensagem"
            ></textarea>
          </div>
          <button className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-3 rounded-xl font-bold w-full transition-all">
            Enviar mensagem
          </button>
        </form>
      </div>
    </div>
  </motion.div>
)
