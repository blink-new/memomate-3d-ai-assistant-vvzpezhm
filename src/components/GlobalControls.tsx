import React from 'react'
import { motion } from 'framer-motion'
import { Settings, Globe, User, Moon, Brain, Zap, Clock } from 'lucide-react'

interface GlobalControlsProps {
  onSettingsClick: () => void
  onVoiceClick: () => void
  onReminderClick: () => void
  language: string
  setLanguage: (language: string) => void
}

function FloatingButton({ 
  icon: Icon, 
  onClick, 
  position, 
  color = 'gray',
  isActive = false,
  tooltip 
}: {
  icon: React.ElementType
  onClick: () => void
  position: 'top-right' | 'bottom-right'
  color?: string
  isActive?: boolean
  tooltip: string
}) {
  const positionClasses = {
    'top-right': 'top-6 right-6',
    'bottom-right': 'bottom-6 right-6'
  }

  const colorClasses = {
    gray: 'bg-gray-800/50 border-gray-700 text-gray-400 hover:border-gray-600 hover:text-gray-300',
    red: 'bg-neon-red/20 border-neon-red/50 text-neon-red hover:bg-neon-red/30',
    blue: 'bg-blue-500/20 border-blue-500/50 text-blue-400 hover:bg-blue-500/30'
  }

  return (
    <motion.button
      onClick={onClick}
      className={`fixed ${positionClasses[position]} z-30 p-3 glass rounded-xl border transition-all duration-300 group ${
        isActive ? colorClasses.red : colorClasses[color]
      } ${isActive ? 'neon-glow-soft' : ''}`}
      whileHover={{ scale: 1.1, y: -2 }}
      whileTap={{ scale: 0.95 }}
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3, delay: 0.5 }}
      title={tooltip}
    >
      <Icon className="w-5 h-5" />
      
      {/* Tooltip */}
      <div className="absolute right-full mr-3 top-1/2 transform -translate-y-1/2 px-2 py-1 bg-black/80 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
        {tooltip}
      </div>
    </motion.button>
  )
}

function LanguageSelector({ language, setLanguage }: {
  language: string
  setLanguage: (language: string) => void
}) {
  const [isOpen, setIsOpen] = React.useState(false)
  
  const languages = [
    { name: 'English', flag: '🇺🇸' },
    { name: 'Hindi', flag: '🇮🇳' },
    { name: 'Tamil', flag: '🇮🇳' },
    { name: 'Telugu', flag: '🇮🇳' },
    { name: 'Marathi', flag: '🇮🇳' },
    { name: 'Gujarati', flag: '🇮🇳' }
  ]

  const currentLang = languages.find(l => l.name === language) || languages[0]

  return (
    <div className="fixed top-20 right-6 z-30">
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="p-3 glass rounded-xl border border-gray-700 text-gray-400 hover:border-gray-600 hover:text-gray-300 transition-all duration-300 flex items-center space-x-2"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3, delay: 0.6 }}
      >
        <span className="text-lg">{currentLang.flag}</span>
        <Globe className="w-4 h-4" />
      </motion.button>

      {/* Language Dropdown */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="absolute top-full mt-2 right-0 glass rounded-xl border border-gray-700 p-2 min-w-[150px]"
        >
          {languages.map((lang) => (
            <motion.button
              key={lang.name}
              onClick={() => {
                setLanguage(lang.name)
                setIsOpen(false)
              }}
              className={`w-full flex items-center space-x-3 p-2 rounded-lg transition-all ${
                language === lang.name
                  ? 'bg-neon-red/20 text-neon-red'
                  : 'text-gray-300 hover:bg-gray-800/50'
              }`}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <span className="text-lg">{lang.flag}</span>
              <span className="text-sm">{lang.name}</span>
            </motion.button>
          ))}
        </motion.div>
      )}
    </div>
  )
}

function QuickActions({ onVoiceClick, onReminderClick }: {
  onVoiceClick: () => void
  onReminderClick: () => void
}) {
  return (
    <div className="fixed bottom-20 right-6 z-30 space-y-3">
      {/* Voice AI Button */}
      <motion.button
        onClick={onVoiceClick}
        className="w-14 h-14 glass rounded-full border border-gray-700 text-gray-400 hover:border-neon-red/50 hover:text-neon-red transition-all duration-300 flex items-center justify-center group"
        whileHover={{ scale: 1.1, y: -2 }}
        whileTap={{ scale: 0.95 }}
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3, delay: 0.8 }}
      >
        <Brain className="w-6 h-6" />
        
        {/* Tooltip */}
        <div className="absolute right-full mr-3 px-2 py-1 bg-black/80 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
          Activate Voice AI
        </div>
      </motion.button>

      {/* Quick Access Apps */}
      <motion.button
        className="w-14 h-14 glass rounded-full border border-gray-700 text-gray-400 hover:border-blue-500/50 hover:text-blue-400 transition-all duration-300 flex items-center justify-center group"
        whileHover={{ scale: 1.1, y: -2 }}
        whileTap={{ scale: 0.95 }}
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3, delay: 0.9 }}
      >
        <Zap className="w-6 h-6" />
        
        {/* Tooltip */}
        <div className="absolute right-full mr-3 px-2 py-1 bg-black/80 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
          Quick Actions
        </div>
      </motion.button>

      {/* Jump to Reminders */}
      <motion.button
        onClick={onReminderClick}
        className="w-14 h-14 glass rounded-full border border-gray-700 text-gray-400 hover:border-yellow-500/50 hover:text-yellow-400 transition-all duration-300 flex items-center justify-center group"
        whileHover={{ scale: 1.1, y: -2 }}
        whileTap={{ scale: 0.95 }}
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3, delay: 1.0 }}
      >
        <Clock className="w-6 h-6" />
        
        {/* Tooltip */}
        <div className="absolute right-full mr-3 px-2 py-1 bg-black/80 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
          Today's Reminders
        </div>
      </motion.button>
    </div>
  )
}

export default function GlobalControls({ 
  onSettingsClick, 
  onVoiceClick, 
  onReminderClick, 
  language, 
  setLanguage 
}: GlobalControlsProps) {
  const [isDarkMode, setIsDarkMode] = React.useState(true)

  return (
    <>
      {/* Top Right Controls */}
      <FloatingButton
        icon={Settings}
        onClick={onSettingsClick}
        position="top-right"
        tooltip="Settings"
      />

      <LanguageSelector language={language} setLanguage={setLanguage} />

      <motion.button
        onClick={() => setIsDarkMode(!isDarkMode)}
        className="fixed top-32 right-6 z-30 p-3 glass rounded-xl border border-gray-700 text-gray-400 hover:border-gray-600 hover:text-gray-300 transition-all duration-300 group"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3, delay: 0.7 }}
      >
        <Moon className="w-5 h-5" />
        
        {/* Tooltip */}
        <div className="absolute right-full mr-3 top-1/2 transform -translate-y-1/2 px-2 py-1 bg-black/80 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
          Theme Toggle
        </div>
      </motion.button>

      <motion.button
        className="fixed top-44 right-6 z-30 p-3 glass rounded-xl border border-gray-700 text-gray-400 hover:border-gray-600 hover:text-gray-300 transition-all duration-300 group"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3, delay: 0.8 }}
      >
        <User className="w-5 h-5" />
        
        {/* Tooltip */}
        <div className="absolute right-full mr-3 top-1/2 transform -translate-y-1/2 px-2 py-1 bg-black/80 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
          Profile
        </div>
      </motion.button>

      {/* Bottom Right Quick Actions */}
      <QuickActions onVoiceClick={onVoiceClick} onReminderClick={onReminderClick} />
    </>
  )
}