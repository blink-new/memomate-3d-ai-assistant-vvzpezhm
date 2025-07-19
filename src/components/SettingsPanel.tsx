import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Globe, Cloud, HardDrive, Trash2, Palette, Shield, Bell, Zap } from 'lucide-react'

interface SettingsPanelProps {
  isOpen: boolean
  onClose: () => void
  language: string
  setLanguage: (language: string) => void
}

const languages = [
  { code: 'en', name: 'English', flag: '🇺🇸' },
  { code: 'hi', name: 'Hindi', flag: '🇮🇳' },
  { code: 'ta', name: 'Tamil', flag: '🇮🇳' },
  { code: 'te', name: 'Telugu', flag: '🇮🇳' },
  { code: 'mr', name: 'Marathi', flag: '🇮🇳' },
  { code: 'gu', name: 'Gujarati', flag: '🇮🇳' }
]

const themes = [
  { id: 'dark-red', name: 'Dark Red', primary: '#FF0033', secondary: '#FF3366' },
  { id: 'dark-blue', name: 'Dark Blue', primary: '#0066FF', secondary: '#3388FF' },
  { id: 'dark-purple', name: 'Dark Purple', primary: '#8B5CF6', secondary: '#A78BFA' },
  { id: 'dark-green', name: 'Dark Green', primary: '#10B981', secondary: '#34D399' }
]

function SettingSection({ icon: Icon, title, children }: {
  icon: React.ElementType
  title: string
  children: React.ReactNode
}) {
  return (
    <div className="mb-8">
      <div className="flex items-center space-x-3 mb-4">
        <div className="p-2 bg-neon-red/20 border border-neon-red/50 rounded-xl">
          <Icon className="w-5 h-5 text-neon-red" />
        </div>
        <h3 className="text-lg font-semibold text-white">{title}</h3>
      </div>
      <div className="space-y-4">
        {children}
      </div>
    </div>
  )
}

function ToggleSwitch({ enabled, onChange, label, description }: {
  enabled: boolean
  onChange: (enabled: boolean) => void
  label: string
  description?: string
}) {
  return (
    <div className="flex items-center justify-between">
      <div className="flex-1">
        <div className="font-medium text-white">{label}</div>
        {description && (
          <div className="text-sm text-gray-400">{description}</div>
        )}
      </div>
      <motion.button
        onClick={() => onChange(!enabled)}
        className={`relative w-12 h-6 rounded-full transition-colors ${
          enabled ? 'bg-neon-red' : 'bg-gray-600'
        }`}
        whileTap={{ scale: 0.95 }}
      >
        <motion.div
          className="absolute top-1 w-4 h-4 bg-white rounded-full"
          animate={{ x: enabled ? 26 : 2 }}
          transition={{ type: 'spring', stiffness: 500, damping: 30 }}
        />
      </motion.button>
    </div>
  )
}

export default function SettingsPanel({ isOpen, onClose, language, setLanguage }: SettingsPanelProps) {
  const [storageType, setStorageType] = useState<'cloud' | 'local'>('cloud')
  const [selectedTheme, setSelectedTheme] = useState('dark-red')
  const [notifications, setNotifications] = useState(true)
  const [autoSync, setAutoSync] = useState(true)
  const [smartReminders, setSmartReminders] = useState(true)

  const handleDataDeletion = () => {
    // Simulate data deletion
    alert('All data has been cleared from local storage.')
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
            onClick={onClose}
          />

          {/* Settings Panel */}
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed right-0 top-0 h-full w-full max-w-md glass border-l border-gray-700 z-50 overflow-y-auto"
          >
            {/* Header */}
            <div className="sticky top-0 glass border-b border-gray-700 p-6">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold holographic">Settings</h2>
                <motion.button
                  onClick={onClose}
                  className="p-2 hover:bg-gray-800/50 rounded-xl transition-colors"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <X className="w-6 h-6 text-gray-400" />
                </motion.button>
              </div>
            </div>

            {/* Content */}
            <div className="p-6">
              {/* Language Settings */}
              <SettingSection icon={Globe} title="Language">
                <div className="grid grid-cols-2 gap-3">
                  {languages.map((lang) => (
                    <motion.button
                      key={lang.code}
                      onClick={() => setLanguage(lang.name)}
                      className={`p-3 rounded-xl border transition-all ${
                        language === lang.name
                          ? 'border-neon-red bg-neon-red/20 text-neon-red'
                          : 'border-gray-700 bg-gray-800/50 text-gray-300 hover:border-gray-600'
                      }`}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <div className="text-lg mb-1">{lang.flag}</div>
                      <div className="text-sm font-medium">{lang.name}</div>
                    </motion.button>
                  ))}
                </div>
              </SettingSection>

              {/* Storage Settings */}
              <SettingSection icon={Cloud} title="Storage">
                <div className="space-y-3">
                  <motion.button
                    onClick={() => setStorageType('cloud')}
                    className={`w-full p-4 rounded-xl border transition-all flex items-center space-x-3 ${
                      storageType === 'cloud'
                        ? 'border-neon-red bg-neon-red/20'
                        : 'border-gray-700 bg-gray-800/50 hover:border-gray-600'
                    }`}
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                  >
                    <Cloud className={`w-5 h-5 ${storageType === 'cloud' ? 'text-neon-red' : 'text-gray-400'}`} />
                    <div className="text-left">
                      <div className="font-medium text-white">Cloud Storage</div>
                      <div className="text-sm text-gray-400">Sync across all devices</div>
                    </div>
                  </motion.button>

                  <motion.button
                    onClick={() => setStorageType('local')}
                    className={`w-full p-4 rounded-xl border transition-all flex items-center space-x-3 ${
                      storageType === 'local'
                        ? 'border-neon-red bg-neon-red/20'
                        : 'border-gray-700 bg-gray-800/50 hover:border-gray-600'
                    }`}
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                  >
                    <HardDrive className={`w-5 h-5 ${storageType === 'local' ? 'text-neon-red' : 'text-gray-400'}`} />
                    <div className="text-left">
                      <div className="font-medium text-white">Local Storage</div>
                      <div className="text-sm text-gray-400">Store data locally only</div>
                    </div>
                  </motion.button>
                </div>
              </SettingSection>

              {/* Theme Settings */}
              <SettingSection icon={Palette} title="Theme">
                <div className="grid grid-cols-2 gap-3">
                  {themes.map((theme) => (
                    <motion.button
                      key={theme.id}
                      onClick={() => setSelectedTheme(theme.id)}
                      className={`p-3 rounded-xl border transition-all ${
                        selectedTheme === theme.id
                          ? 'border-neon-red bg-neon-red/20'
                          : 'border-gray-700 bg-gray-800/50 hover:border-gray-600'
                      }`}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <div className="flex items-center space-x-2 mb-2">
                        <div 
                          className="w-4 h-4 rounded-full"
                          style={{ backgroundColor: theme.primary }}
                        />
                        <div 
                          className="w-4 h-4 rounded-full"
                          style={{ backgroundColor: theme.secondary }}
                        />
                      </div>
                      <div className="text-sm font-medium text-white">{theme.name}</div>
                    </motion.button>
                  ))}
                </div>
              </SettingSection>

              {/* Notification Settings */}
              <SettingSection icon={Bell} title="Notifications">
                <div className="space-y-4">
                  <ToggleSwitch
                    enabled={notifications}
                    onChange={setNotifications}
                    label="Push Notifications"
                    description="Receive notifications for reminders and updates"
                  />
                  <ToggleSwitch
                    enabled={smartReminders}
                    onChange={setSmartReminders}
                    label="Smart Reminders"
                    description="AI-powered intelligent reminder suggestions"
                  />
                </div>
              </SettingSection>

              {/* Sync Settings */}
              <SettingSection icon={Zap} title="Sync & Performance">
                <div className="space-y-4">
                  <ToggleSwitch
                    enabled={autoSync}
                    onChange={setAutoSync}
                    label="Auto Sync"
                    description="Automatically sync data across connected apps"
                  />
                </div>
              </SettingSection>

              {/* Data Management */}
              <SettingSection icon={Shield} title="Data Management">
                <motion.button
                  onClick={handleDataDeletion}
                  className="w-full p-4 bg-red-500/20 border border-red-500/50 rounded-xl text-red-400 hover:bg-red-500/30 transition-all flex items-center space-x-3"
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                >
                  <Trash2 className="w-5 h-5" />
                  <div className="text-left">
                    <div className="font-medium">Clear All Data</div>
                    <div className="text-sm text-red-300">Permanently delete all stored data</div>
                  </div>
                </motion.button>
              </SettingSection>

              {/* App Info */}
              <div className="mt-12 pt-6 border-t border-gray-700">
                <div className="text-center text-gray-500">
                  <div className="text-sm">MemoMate AI Assistant</div>
                  <div className="text-xs">Version 1.0.0</div>
                  <div className="text-xs mt-2">
                    Built with ❤️ using React & Three.js
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}