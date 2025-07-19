import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Canvas } from '@react-three/fiber'
import { OrbitControls, Sphere, MeshDistortMaterial } from '@react-three/drei'
import { 
  Mic, 
  Send, 
  Settings, 
  Globe, 
  User, 
  Moon, 
  Brain, 
  Calendar, 
  Bell, 
  BarChart3,
  MessageSquare,
  Mail,
  Slack,
  Video,
  Smartphone,
  CheckCircle,
  Trash2,
  RotateCcw,
  Clock,
  Target,
  Zap,
  TrendingUp
} from 'lucide-react'

// Components
import AIChat from './components/AIChat'
import Timeline from './components/Timeline'
import SmartReminders from './components/SmartReminders'
import Analytics from './components/Analytics'
import AppDock from './components/AppDock'
import SettingsPanel from './components/SettingsPanel'
import GlobalControls from './components/GlobalControls'

// 3D Background Component
function Background3D() {
  return (
    <div className="fixed inset-0 -z-10">
      <Canvas camera={{ position: [0, 0, 5] }}>
        <ambientLight intensity={0.1} />
        <pointLight position={[10, 10, 10]} intensity={0.3} color="#FF0033" />
        <Sphere args={[1, 100, 200]} scale={2.5} position={[0, 0, 0]}>
          <MeshDistortMaterial
            color="#FF0033"
            attach="material"
            distort={0.3}
            speed={2}
            roughness={0.4}
            transparent
            opacity={0.05}
          />
        </Sphere>
        <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.5} />
      </Canvas>
    </div>
  )
}

function App() {
  const [currentSection, setCurrentSection] = useState(0)
  const [isSettingsOpen, setIsSettingsOpen] = useState(false)
  const [isVoiceActive, setIsVoiceActive] = useState(false)
  const [language, setLanguage] = useState('English')

  // Scroll handling for section navigation
  useEffect(() => {
    const handleScroll = () => {
      const sections = document.querySelectorAll('.snap-section')
      const scrollPosition = window.scrollY + window.innerHeight / 2

      sections.forEach((section, index) => {
        const rect = section.getBoundingClientRect()
        const sectionTop = rect.top + window.scrollY
        const sectionBottom = sectionTop + rect.height

        if (scrollPosition >= sectionTop && scrollPosition <= sectionBottom) {
          setCurrentSection(index)
        }
      })
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToSection = (index: number) => {
    const sections = document.querySelectorAll('.snap-section')
    if (sections[index]) {
      sections[index].scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden">
      {/* 3D Background */}
      <Background3D />
      
      {/* Global Controls */}
      <GlobalControls 
        onSettingsClick={() => setIsSettingsOpen(true)}
        onVoiceClick={() => setIsVoiceActive(!isVoiceActive)}
        onReminderClick={() => scrollToSection(2)}
        language={language}
        setLanguage={setLanguage}
      />

      {/* App Integration Dock */}
      <AppDock />

      {/* Main Content Sections */}
      <main className="relative z-10">
        {/* Section 1: AI Chat Interface */}
        <section className="snap-section" id="ai-chat">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="container mx-auto px-4"
          >
            <AIChat isVoiceActive={isVoiceActive} setIsVoiceActive={setIsVoiceActive} />
          </motion.div>
        </section>

        {/* Section 2: Timeline Interface */}
        <section className="snap-section" id="timeline">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="container mx-auto px-4"
          >
            <Timeline />
          </motion.div>
        </section>

        {/* Section 3: Smart Reminders */}
        <section className="snap-section" id="reminders">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="container mx-auto px-4"
          >
            <SmartReminders />
          </motion.div>
        </section>

        {/* Section 4: Analytics Dashboard */}
        <section className="snap-section" id="analytics">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="container mx-auto px-4"
          >
            <Analytics />
          </motion.div>
        </section>
      </main>

      {/* Settings Panel */}
      <SettingsPanel 
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
        language={language}
        setLanguage={setLanguage}
      />

      {/* Floating Navigation Dots */}
      <div className="fixed right-8 top-1/2 transform -translate-y-1/2 z-50 space-y-4">
        {['AI Chat', 'Timeline', 'Reminders', 'Analytics'].map((label, index) => (
          <motion.button
            key={index}
            onClick={() => scrollToSection(index)}
            className={`w-3 h-3 rounded-full border-2 transition-all duration-300 ${
              currentSection === index 
                ? 'bg-neon-red border-neon-red neon-glow' 
                : 'bg-transparent border-gray-600 hover:border-neon-red'
            }`}
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.9 }}
            title={label}
          />
        ))}
      </div>
    </div>
  )
}

export default App