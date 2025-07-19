import React, { useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Share2, 
  Mail, 
  MessageSquare, 
  Slack, 
  Users, 
  Clock, 
  CheckCircle, 
  X, 
  Plus,
  Mic,
  Send,
  UserPlus,
  History,
  Zap,
  Target,
  ArrowRight,
  Eye,
  MoreHorizontal
} from 'lucide-react'

interface SharedTask {
  id: string
  title: string
  sharedWith: string
  platform: 'email' | 'whatsapp' | 'slack'
  status: 'pending' | 'accepted' | 'completed' | 'declined'
  sharedAt: Date
  dueDate?: Date
}

interface Contact {
  id: string
  name: string
  email: string
  avatar: string
  platform: 'email' | 'whatsapp' | 'slack'
  isOnline: boolean
}

const mockSharedTasks: SharedTask[] = [
  {
    id: '1',
    title: 'Review Q4 Marketing Strategy',
    sharedWith: 'Riya Sharma',
    platform: 'slack',
    status: 'accepted',
    sharedAt: new Date('2024-01-15'),
    dueDate: new Date('2024-01-20')
  },
  {
    id: '2',
    title: 'Update Project Documentation',
    sharedWith: 'Alex Chen',
    platform: 'email',
    status: 'pending',
    sharedAt: new Date('2024-01-14')
  },
  {
    id: '3',
    title: 'Design System Audit',
    sharedWith: 'Sarah Wilson',
    platform: 'whatsapp',
    status: 'completed',
    sharedAt: new Date('2024-01-12'),
    dueDate: new Date('2024-01-18')
  }
]

const mockContacts: Contact[] = [
  {
    id: '1',
    name: 'Riya Sharma',
    email: 'riya@company.com',
    avatar: '👩‍💼',
    platform: 'slack',
    isOnline: true
  },
  {
    id: '2',
    name: 'Alex Chen',
    email: 'alex@company.com',
    avatar: '👨‍💻',
    platform: 'email',
    isOnline: false
  },
  {
    id: '3',
    name: 'Sarah Wilson',
    email: 'sarah@company.com',
    avatar: '👩‍🎨',
    platform: 'whatsapp',
    isOnline: true
  },
  {
    id: '4',
    name: 'Mike Johnson',
    email: 'mike@company.com',
    avatar: '👨‍🔬',
    platform: 'slack',
    isOnline: true
  }
]

// Floating Particle Component
function FloatingParticle({ delay = 0 }: { delay?: number }) {
  return (
    <motion.div
      className="absolute w-1 h-1 bg-neon-red rounded-full opacity-60"
      initial={{ 
        x: Math.random() * 400,
        y: Math.random() * 300,
        scale: 0
      }}
      animate={{
        x: Math.random() * 400,
        y: Math.random() * 300,
        scale: [0, 1, 0],
        opacity: [0, 0.6, 0]
      }}
      transition={{
        duration: 4,
        delay,
        repeat: Infinity,
        ease: "easeInOut"
      }}
    />
  )
}

// Smart Suggestion Chip
function SmartSuggestion({ suggestion, onAccept }: {
  suggestion: string
  onAccept: () => void
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.8 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -20, scale: 0.8 }}
      className="glass rounded-full px-4 py-2 border border-neon-red/30 hover:border-neon-red/60 transition-all duration-300 cursor-pointer group"
      onClick={onAccept}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <div className="flex items-center space-x-2">
        <Zap className="w-4 h-4 text-neon-red" />
        <span className="text-sm text-white">{suggestion}</span>
        <ArrowRight className="w-3 h-3 text-neon-red opacity-0 group-hover:opacity-100 transition-opacity" />
      </div>
    </motion.div>
  )
}

// Platform Icon Component
function PlatformIcon({ platform, size = 'w-5 h-5' }: {
  platform: 'email' | 'whatsapp' | 'slack'
  size?: string
}) {
  const icons = {
    email: Mail,
    whatsapp: MessageSquare,
    slack: Slack
  }
  
  const colors = {
    email: '#3B82F6',
    whatsapp: '#25D366',
    slack: '#4A154B'
  }
  
  const Icon = icons[platform]
  
  return <Icon className={`${size}`} style={{ color: colors[platform] }} />
}

// Status Badge Component
function StatusBadge({ status }: { status: SharedTask['status'] }) {
  const config = {
    pending: { color: '#F59E0B', bg: '#F59E0B20', text: 'Pending' },
    accepted: { color: '#3B82F6', bg: '#3B82F620', text: 'Accepted' },
    completed: { color: '#22C55E', bg: '#22C55E20', text: 'Completed' },
    declined: { color: '#EF4444', bg: '#EF444420', text: 'Declined' }
  }
  
  const { color, bg, text } = config[status]
  
  return (
    <div 
      className="px-2 py-1 rounded-full text-xs font-medium border"
      style={{ 
        color, 
        backgroundColor: bg,
        borderColor: `${color}50`
      }}
    >
      {text}
    </div>
  )
}

export default function TaskSharingHub() {
  const [selectedTask, setSelectedTask] = useState<string>('')
  const [showContactPicker, setShowContactPicker] = useState(false)
  const [selectedContacts, setSelectedContacts] = useState<string[]>([])
  const [sharedTasks] = useState<SharedTask[]>(mockSharedTasks)
  const [showSuggestions, setShowSuggestions] = useState(true)
  const [isVoiceActive, setIsVoiceActive] = useState(false)
  const dragRef = useRef<HTMLDivElement>(null)

  const handleContactSelect = (contactId: string) => {
    setSelectedContacts(prev => 
      prev.includes(contactId) 
        ? prev.filter(id => id !== contactId)
        : [...prev, contactId]
    )
  }

  const handleShareTask = (platform: 'email' | 'whatsapp' | 'slack') => {
    // Simulate task sharing
    console.log(`Sharing task via ${platform} to:`, selectedContacts)
    setSelectedContacts([])
    setShowContactPicker(false)
  }

  const suggestions = [
    "Share with Riya? She worked on similar task",
    "Alex is available for collaboration",
    "Sarah has expertise in this area"
  ]

  return (
    <div className="max-w-7xl mx-auto relative">
      {/* Floating Particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {Array.from({ length: 8 }).map((_, i) => (
          <FloatingParticle key={i} delay={i * 0.5} />
        ))}
      </div>

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center mb-12"
      >
        <motion.h2 
          className="text-5xl font-bold holographic mb-4 float"
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          Task Sharing Hub
        </motion.h2>
        <p className="text-gray-400 mb-8">Collaborate seamlessly with your team in 3D space</p>
      </motion.div>

      {/* Smart Suggestions */}
      <AnimatePresence>
        {showSuggestions && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="flex flex-wrap justify-center gap-3 mb-8"
          >
            {suggestions.map((suggestion, index) => (
              <SmartSuggestion
                key={index}
                suggestion={suggestion}
                onAccept={() => {
                  setShowContactPicker(true)
                  setShowSuggestions(false)
                }}
              />
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Cards Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
        
        {/* Card 1: Share Task */}
        <motion.div
          initial={{ opacity: 0, x: -50, rotateY: -15 }}
          animate={{ opacity: 1, x: 0, rotateY: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          whileHover={{ 
            y: -10, 
            rotateY: 5,
            transition: { duration: 0.3 }
          }}
          className="glass rounded-2xl p-8 border border-gray-700 hover:border-neon-red/50 transition-all duration-300 relative overflow-hidden group"
        >
          {/* Holographic overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-neon-red/5 via-transparent to-neon-red/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          
          <div className="relative z-10">
            <div className="flex items-center space-x-3 mb-6">
              <div className="p-3 bg-neon-red/20 border border-neon-red/50 rounded-xl neon-glow-soft">
                <Share2 className="w-6 h-6 text-neon-red" />
              </div>
              <h3 className="text-xl font-semibold text-white">Share Task</h3>
            </div>

            <p className="text-gray-400 mb-6">
              Share tasks instantly across platforms with smart collaboration features
            </p>

            <div className="space-y-3">
              {[
                { platform: 'email' as const, label: 'Email', icon: Mail },
                { platform: 'whatsapp' as const, label: 'WhatsApp', icon: MessageSquare },
                { platform: 'slack' as const, label: 'Slack', icon: Slack }
              ].map(({ platform, label, icon: Icon }) => (
                <motion.button
                  key={platform}
                  onClick={() => handleShareTask(platform)}
                  className="w-full flex items-center space-x-3 p-4 glass rounded-xl border border-gray-600 hover:border-neon-red/50 transition-all duration-300 group/btn"
                  whileHover={{ scale: 1.02, x: 5 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <PlatformIcon platform={platform} />
                  <span className="text-white font-medium">{label}</span>
                  <div className="ml-auto opacity-0 group-hover/btn:opacity-100 transition-opacity">
                    <ArrowRight className="w-4 h-4 text-neon-red" />
                  </div>
                </motion.button>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Card 2: Shared Task History */}
        <motion.div
          initial={{ opacity: 0, y: 50, rotateX: -15 }}
          animate={{ opacity: 1, y: 0, rotateX: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          whileHover={{ 
            y: -10, 
            rotateX: 5,
            transition: { duration: 0.3 }
          }}
          className="glass rounded-2xl p-8 border border-gray-700 hover:border-neon-red/50 transition-all duration-300 relative overflow-hidden group"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-neon-red/5 via-transparent to-neon-red/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          
          <div className="relative z-10">
            <div className="flex items-center space-x-3 mb-6">
              <div className="p-3 bg-neon-red/20 border border-neon-red/50 rounded-xl neon-glow-soft">
                <History className="w-6 h-6 text-neon-red" />
              </div>
              <h3 className="text-xl font-semibold text-white">Shared History</h3>
            </div>

            <div className="space-y-4 max-h-64 overflow-y-auto custom-scrollbar">
              {sharedTasks.map((task, index) => (
                <motion.div
                  key={task.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.6 + index * 0.1 }}
                  className="p-4 glass rounded-xl border border-gray-600 hover:border-neon-red/30 transition-all duration-300 group/task"
                  whileHover={{ scale: 1.02 }}
                >
                  <div className="flex items-start justify-between mb-2">
                    <h4 className="text-sm font-medium text-white line-clamp-2 flex-1">
                      {task.title}
                    </h4>
                    <StatusBadge status={task.status} />
                  </div>
                  
                  <div className="flex items-center space-x-2 text-xs text-gray-400">
                    <PlatformIcon platform={task.platform} size="w-3 h-3" />
                    <span>{task.sharedWith}</span>
                    <span>•</span>
                    <span>{task.sharedAt.toLocaleDateString()}</span>
                  </div>
                  
                  {task.dueDate && (
                    <div className="flex items-center space-x-1 mt-2 text-xs text-yellow-400">
                      <Clock className="w-3 h-3" />
                      <span>Due {task.dueDate.toLocaleDateString()}</span>
                    </div>
                  )}
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Card 3: Invite Collaborator */}
        <motion.div
          initial={{ opacity: 0, x: 50, rotateY: 15 }}
          animate={{ opacity: 1, x: 0, rotateY: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          whileHover={{ 
            y: -10, 
            rotateY: -5,
            transition: { duration: 0.3 }
          }}
          className="glass rounded-2xl p-8 border border-gray-700 hover:border-neon-red/50 transition-all duration-300 relative overflow-hidden group"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-neon-red/5 via-transparent to-neon-red/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          
          <div className="relative z-10">
            <div className="flex items-center space-x-3 mb-6">
              <div className="p-3 bg-neon-red/20 border border-neon-red/50 rounded-xl neon-glow-soft">
                <UserPlus className="w-6 h-6 text-neon-red" />
              </div>
              <h3 className="text-xl font-semibold text-white">Invite Collaborator</h3>
            </div>

            <p className="text-gray-400 mb-6">
              Select team members with holographic contact picker
            </p>

            <div className="grid grid-cols-2 gap-3">
              {mockContacts.slice(0, 4).map((contact, index) => (
                <motion.button
                  key={contact.id}
                  onClick={() => handleContactSelect(contact.id)}
                  className={`p-3 glass rounded-xl border transition-all duration-300 group/contact ${
                    selectedContacts.includes(contact.id)
                      ? 'border-neon-red bg-neon-red/10'
                      : 'border-gray-600 hover:border-neon-red/50'
                  }`}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.8 + index * 0.1 }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <div className="text-center">
                    <div className="text-2xl mb-1 relative">
                      {contact.avatar}
                      {contact.isOnline && (
                        <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-black pulse-red" />
                      )}
                    </div>
                    <div className="text-xs text-white font-medium truncate">
                      {contact.name.split(' ')[0]}
                    </div>
                    <div className="flex justify-center mt-1">
                      <PlatformIcon platform={contact.platform} size="w-3 h-3" />
                    </div>
                  </div>
                  
                  {selectedContacts.includes(contact.id) && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="absolute inset-0 flex items-center justify-center bg-neon-red/20 rounded-xl"
                    >
                      <CheckCircle className="w-6 h-6 text-neon-red" />
                    </motion.div>
                  )}
                </motion.button>
              ))}
            </div>

            {selectedContacts.length > 0 && (
              <motion.button
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="w-full mt-4 p-3 bg-neon-red/20 border border-neon-red rounded-xl text-neon-red font-medium hover:bg-neon-red/30 transition-all duration-300 neon-glow-soft"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Invite {selectedContacts.length} Collaborator{selectedContacts.length > 1 ? 's' : ''}
              </motion.button>
            )}
          </div>
        </motion.div>
      </div>

      {/* Voice Assistant Button */}
      <motion.div
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, delay: 1 }}
        className="fixed right-8 bottom-32 z-50"
      >
        <motion.button
          onClick={() => setIsVoiceActive(!isVoiceActive)}
          className={`w-16 h-16 rounded-full border-2 transition-all duration-300 ${
            isVoiceActive 
              ? 'bg-neon-red border-neon-red neon-glow pulse-red' 
              : 'glass border-neon-red/50 hover:border-neon-red'
          }`}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          animate={isVoiceActive ? { 
            boxShadow: [
              '0 0 20px rgba(255, 0, 51, 0.5)',
              '0 0 40px rgba(255, 0, 51, 0.8)',
              '0 0 20px rgba(255, 0, 51, 0.5)'
            ]
          } : {}}
          transition={{ duration: 1, repeat: isVoiceActive ? Infinity : 0 }}
        >
          <Mic className={`w-6 h-6 mx-auto ${isVoiceActive ? 'text-white' : 'text-neon-red'}`} />
        </motion.button>
        
        {isVoiceActive && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="absolute -top-16 right-0 glass rounded-lg px-3 py-2 border border-neon-red/50"
          >
            <div className="flex items-center space-x-2">
              <div className="flex space-x-1">
                {Array.from({ length: 3 }).map((_, i) => (
                  <motion.div
                    key={i}
                    className="w-1 h-4 bg-neon-red rounded-full voice-wave"
                    style={{ animationDelay: `${i * 0.2}s` }}
                  />
                ))}
              </div>
              <span className="text-xs text-white">Listening...</span>
            </div>
          </motion.div>
        )}
      </motion.div>

      {/* Drag and Drop Zone */}
      <motion.div
        ref={dragRef}
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 1.2 }}
        className="glass rounded-2xl p-8 border-2 border-dashed border-gray-600 hover:border-neon-red/50 transition-all duration-300 text-center"
      >
        <div className="flex flex-col items-center space-y-4">
          <div className="p-4 bg-neon-red/10 border border-neon-red/30 rounded-full">
            <Target className="w-8 h-8 text-neon-red" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-white mb-2">3D Drag & Drop Zone</h3>
            <p className="text-gray-400">
              Drag tasks here to share with team members in 3D space
            </p>
          </div>
          <motion.div
            className="flex items-center space-x-2 text-sm text-neon-red"
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <Zap className="w-4 h-4" />
            <span>AI-powered collaboration suggestions</span>
          </motion.div>
        </div>
      </motion.div>
    </div>
  )
}