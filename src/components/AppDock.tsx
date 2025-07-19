import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { MessageSquare, Mail, FileText, Slack, Video, Calendar, Smartphone, X, Plus } from 'lucide-react'

interface AppIntegration {
  id: string
  name: string
  icon: React.ElementType
  color: string
  connected: boolean
  taskCount: number
  recentTasks: string[]
}

const appIntegrations: AppIntegration[] = [
  {
    id: 'whatsapp',
    name: 'WhatsApp',
    icon: MessageSquare,
    color: '#25D366',
    connected: true,
    taskCount: 5,
    recentTasks: [
      'Call mom about weekend plans',
      'Send project update to team',
      'Schedule dentist appointment'
    ]
  },
  {
    id: 'gmail',
    name: 'Gmail',
    icon: Mail,
    color: '#EA4335',
    connected: true,
    taskCount: 8,
    recentTasks: [
      'Review quarterly report',
      'Respond to client inquiry',
      'Submit expense report'
    ]
  },
  {
    id: 'notion',
    name: 'Notion',
    icon: FileText,
    color: '#000000',
    connected: true,
    taskCount: 12,
    recentTasks: [
      'Update project documentation',
      'Plan next sprint',
      'Review team feedback'
    ]
  },
  {
    id: 'slack',
    name: 'Slack',
    icon: Slack,
    color: '#4A154B',
    connected: true,
    taskCount: 3,
    recentTasks: [
      'Follow up on bug report',
      'Schedule team standup',
      'Share design mockups'
    ]
  },
  {
    id: 'zoom',
    name: 'Zoom',
    icon: Video,
    color: '#2D8CFF',
    connected: false,
    taskCount: 0,
    recentTasks: []
  },
  {
    id: 'calendar',
    name: 'Calendar',
    icon: Calendar,
    color: '#4285F4',
    connected: true,
    taskCount: 6,
    recentTasks: [
      'Prepare for client meeting',
      'Block time for deep work',
      'Schedule team retrospective'
    ]
  },
  {
    id: 'sms',
    name: 'SMS',
    icon: Smartphone,
    color: '#34C759',
    connected: false,
    taskCount: 0,
    recentTasks: []
  }
]

function AppIcon({ app, onClick, isActive }: {
  app: AppIntegration
  onClick: () => void
  isActive: boolean
}) {
  const Icon = app.icon

  return (
    <motion.div
      className="relative"
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
    >
      <motion.button
        onClick={onClick}
        className={`w-14 h-14 rounded-2xl border-2 transition-all duration-300 flex items-center justify-center ${
          app.connected
            ? isActive
              ? 'border-neon-red bg-neon-red/20 neon-glow'
              : 'border-gray-600 bg-gray-800/50 hover:border-neon-red/50'
            : 'border-gray-700 bg-gray-900/50 opacity-50'
        }`}
        style={{
          backgroundColor: app.connected ? `${app.color}20` : undefined,
          borderColor: isActive ? '#FF0033' : app.connected ? `${app.color}50` : undefined
        }}
      >
        <Icon 
          className="w-6 h-6" 
          style={{ color: app.connected ? app.color : '#6B7280' }}
        />
      </motion.button>
      
      {/* Task Count Badge */}
      {app.connected && app.taskCount > 0 && (
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="absolute -top-2 -right-2 w-6 h-6 bg-neon-red rounded-full flex items-center justify-center"
        >
          <span className="text-xs font-bold text-white">{app.taskCount}</span>
        </motion.div>
      )}
      
      {/* Connection Status */}
      <div className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-black ${
        app.connected ? 'bg-green-500' : 'bg-gray-500'
      }`} />
    </motion.div>
  )
}

function AppPanel({ app, onClose }: {
  app: AppIntegration
  onClose: () => void
}) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.8, y: 20 }}
      className="absolute bottom-20 left-1/2 transform -translate-x-1/2 w-80 glass rounded-2xl p-6 border border-neon-red/30 z-50"
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div 
            className="w-10 h-10 rounded-xl flex items-center justify-center"
            style={{ backgroundColor: `${app.color}20`, border: `1px solid ${app.color}50` }}
          >
            <app.icon className="w-5 h-5" style={{ color: app.color }} />
          </div>
          <div>
            <h3 className="font-semibold text-white">{app.name}</h3>
            <p className="text-xs text-gray-400">
              {app.connected ? `${app.taskCount} tasks extracted` : 'Not connected'}
            </p>
          </div>
        </div>
        <motion.button
          onClick={onClose}
          className="text-gray-500 hover:text-gray-300 transition-colors"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <X className="w-4 h-4" />
        </motion.button>
      </div>

      {app.connected ? (
        <>
          {/* Recent Tasks */}
          <div className="mb-4">
            <h4 className="text-sm font-semibold text-gray-300 mb-3">Recent Tasks</h4>
            <div className="space-y-2">
              {app.recentTasks.map((task, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-center space-x-3 p-2 bg-gray-800/50 rounded-lg border border-gray-700"
                >
                  <div className="w-2 h-2 bg-neon-red rounded-full flex-shrink-0"></div>
                  <span className="text-sm text-gray-300 flex-1">{task}</span>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Actions */}
          <div className="flex space-x-2">
            <motion.button
              className="flex-1 bg-neon-red/20 border border-neon-red/50 text-neon-red py-2 px-3 rounded-lg text-sm hover:bg-neon-red/30 transition-all"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Sync Now
            </motion.button>
            <motion.button
              className="flex-1 bg-gray-800/50 border border-gray-700 text-gray-300 py-2 px-3 rounded-lg text-sm hover:border-gray-600 transition-all"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Settings
            </motion.button>
          </div>
        </>
      ) : (
        <>
          {/* Connection Setup */}
          <div className="text-center mb-4">
            <div className="w-16 h-16 mx-auto mb-3 rounded-full bg-gray-800/50 border border-gray-700 flex items-center justify-center">
              <Plus className="w-8 h-8 text-gray-500" />
            </div>
            <h4 className="font-semibold text-white mb-2">Connect {app.name}</h4>
            <p className="text-sm text-gray-400 mb-4">
              Connect your {app.name} account to automatically extract tasks and reminders.
            </p>
          </div>

          <motion.button
            className="w-full bg-neon-red/20 border border-neon-red/50 text-neon-red py-3 px-4 rounded-lg font-semibold hover:bg-neon-red/30 transition-all"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            Connect {app.name}
          </motion.button>
        </>
      )}
    </motion.div>
  )
}

export default function AppDock() {
  const [activeApp, setActiveApp] = useState<string | null>(null)

  const handleAppClick = (appId: string) => {
    setActiveApp(activeApp === appId ? null : appId)
  }

  const selectedApp = appIntegrations.find(app => app.id === activeApp)

  return (
    <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-40">
      {/* App Panel */}
      <AnimatePresence>
        {selectedApp && (
          <AppPanel 
            app={selectedApp} 
            onClose={() => setActiveApp(null)} 
          />
        )}
      </AnimatePresence>

      {/* Dock */}
      <motion.div
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 1 }}
        className="glass rounded-2xl p-4 border border-gray-700"
      >
        <div className="flex items-center space-x-3">
          {appIntegrations.map((app) => (
            <AppIcon
              key={app.id}
              app={app}
              onClick={() => handleAppClick(app.id)}
              isActive={activeApp === app.id}
            />
          ))}
        </div>
      </motion.div>

      {/* Dock Label */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 1.2 }}
        className="text-center mt-2"
      >
        <span className="text-xs text-gray-500">App Integrations</span>
      </motion.div>
    </div>
  )
}