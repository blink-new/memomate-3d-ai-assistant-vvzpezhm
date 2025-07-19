import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Bell, Clock, CheckCircle, RotateCcw, AlertTriangle, X } from 'lucide-react'

interface Reminder {
  id: string
  title: string
  description: string
  time: Date
  priority: 'low' | 'medium' | 'high' | 'urgent'
  type: 'task' | 'meeting' | 'deadline' | 'event'
  source: 'whatsapp' | 'gmail' | 'notion' | 'slack' | 'calendar'
  isActive: boolean
  snoozedUntil?: Date
}

const mockReminders: Reminder[] = [
  {
    id: '1',
    title: 'Client Meeting in 30 minutes',
    description: 'Quarterly review meeting with Johnson & Co.',
    time: new Date(Date.now() + 30 * 60 * 1000),
    priority: 'urgent',
    type: 'meeting',
    source: 'calendar',
    isActive: true
  },
  {
    id: '2',
    title: 'Project Deadline Today',
    description: 'Submit final designs for the mobile app project',
    time: new Date(Date.now() + 2 * 60 * 60 * 1000),
    priority: 'high',
    type: 'deadline',
    source: 'notion',
    isActive: true
  },
  {
    id: '3',
    title: 'Follow up with team',
    description: 'Check progress on the backend implementation',
    time: new Date(Date.now() + 4 * 60 * 60 * 1000),
    priority: 'medium',
    type: 'task',
    source: 'slack',
    isActive: true
  }
]

const priorityConfig = {
  urgent: {
    color: 'text-red-500',
    bg: 'bg-red-500/20',
    border: 'border-red-500',
    glow: 'neon-glow',
    pulse: 'pulse-red'
  },
  high: {
    color: 'text-orange-500',
    bg: 'bg-orange-500/20',
    border: 'border-orange-500/50',
    glow: 'neon-glow-soft',
    pulse: ''
  },
  medium: {
    color: 'text-yellow-500',
    bg: 'bg-yellow-500/20',
    border: 'border-yellow-500/50',
    glow: '',
    pulse: ''
  },
  low: {
    color: 'text-green-500',
    bg: 'bg-green-500/20',
    border: 'border-green-500/50',
    glow: '',
    pulse: ''
  }
}

const typeIcons = {
  task: CheckCircle,
  meeting: Clock,
  deadline: AlertTriangle,
  event: Bell
}

function ReminderOrb({ reminder, onSnooze, onReschedule, onMarkDone, onDismiss }: {
  reminder: Reminder
  onSnooze: (id: string, minutes: number) => void
  onReschedule: (id: string) => void
  onMarkDone: (id: string) => void
  onDismiss: (id: string) => void
}) {
  const config = priorityConfig[reminder.priority]
  const Icon = typeIcons[reminder.type]
  const timeUntil = Math.max(0, reminder.time.getTime() - Date.now())
  const minutesUntil = Math.floor(timeUntil / (1000 * 60))
  const isOverdue = timeUntil <= 0

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0, x: 100 }}
      animate={{ opacity: 1, scale: 1, x: 0 }}
      exit={{ opacity: 0, scale: 0, x: 100 }}
      className={`glass rounded-2xl p-6 border ${config.border} ${config.glow} ${
        reminder.priority === 'urgent' ? config.pulse : ''
      } max-w-sm`}
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className={`p-2 rounded-full ${config.bg}`}>
            <Icon className={`w-5 h-5 ${config.color}`} />
          </div>
          <div>
            <div className={`text-xs uppercase tracking-wide ${config.color} font-semibold`}>
              {reminder.priority} {reminder.type}
            </div>
            <div className="text-xs text-gray-500">
              {isOverdue ? 'Overdue' : `In ${minutesUntil}m`}
            </div>
          </div>
        </div>
        <motion.button
          onClick={() => onDismiss(reminder.id)}
          className="text-gray-500 hover:text-gray-300 transition-colors"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <X className="w-4 h-4" />
        </motion.button>
      </div>

      {/* Content */}
      <div className="mb-6">
        <h3 className="font-semibold text-white mb-2">{reminder.title}</h3>
        <p className="text-sm text-gray-400 mb-3">{reminder.description}</p>
        <div className="flex items-center space-x-2 text-xs text-gray-500">
          <Clock className="w-3 h-3" />
          <span>{reminder.time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
          <span>•</span>
          <span className="capitalize">{reminder.source}</span>
        </div>
      </div>

      {/* Actions */}
      <div className="space-y-2">
        <div className="flex space-x-2">
          <motion.button
            onClick={() => onMarkDone(reminder.id)}
            className="flex-1 bg-green-500/20 border border-green-500/50 text-green-400 py-2 px-3 rounded-lg text-sm hover:bg-green-500/30 transition-all"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            Mark Done
          </motion.button>
          <motion.button
            onClick={() => onReschedule(reminder.id)}
            className="flex-1 bg-gray-800/50 border border-gray-700 text-gray-300 py-2 px-3 rounded-lg text-sm hover:border-neon-red/50 hover:text-neon-red transition-all"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            Reschedule
          </motion.button>
        </div>
        
        {/* Snooze Options */}
        <div className="flex space-x-1">
          {[5, 15, 30, 60].map((minutes) => (
            <motion.button
              key={minutes}
              onClick={() => onSnooze(reminder.id, minutes)}
              className="flex-1 bg-gray-900/50 border border-gray-700 text-gray-400 py-1 px-2 rounded text-xs hover:border-gray-600 hover:text-gray-300 transition-all"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {minutes}m
            </motion.button>
          ))}
        </div>
      </div>
    </motion.div>
  )
}

function FloatingReminderOrb({ reminder, onClick }: {
  reminder: Reminder
  onClick: () => void
}) {
  const config = priorityConfig[reminder.priority]
  const Icon = typeIcons[reminder.type]

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0 }}
      className={`fixed bottom-6 right-6 z-50 cursor-pointer ${config.pulse}`}
      onClick={onClick}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
    >
      <div className={`w-16 h-16 rounded-full ${config.bg} border-2 ${config.border} ${config.glow} flex items-center justify-center`}>
        <Icon className={`w-6 h-6 ${config.color}`} />
      </div>
      <div className="absolute -top-2 -right-2 w-6 h-6 bg-neon-red rounded-full flex items-center justify-center">
        <span className="text-xs font-bold text-white">!</span>
      </div>
    </motion.div>
  )
}

export default function SmartReminders() {
  const [reminders, setReminders] = useState<Reminder[]>(mockReminders)
  const [selectedReminder, setSelectedReminder] = useState<string | null>(null)
  const [showFloatingOrb, setShowFloatingOrb] = useState(false)

  // Check for urgent reminders
  useEffect(() => {
    const urgentReminders = reminders.filter(r => 
      r.isActive && 
      r.priority === 'urgent' && 
      (!r.snoozedUntil || r.snoozedUntil <= new Date())
    )
    setShowFloatingOrb(urgentReminders.length > 0)
  }, [reminders])

  const handleSnooze = (id: string, minutes: number) => {
    const snoozeUntil = new Date(Date.now() + minutes * 60 * 1000)
    setReminders(prev => prev.map(reminder => 
      reminder.id === id 
        ? { ...reminder, snoozedUntil: snoozeUntil, isActive: false }
        : reminder
    ))
    
    // Reactivate after snooze period
    setTimeout(() => {
      setReminders(prev => prev.map(reminder => 
        reminder.id === id 
          ? { ...reminder, isActive: true, snoozedUntil: undefined }
          : reminder
      ))
    }, minutes * 60 * 1000)
  }

  const handleReschedule = (id: string) => {
    // Simulate AI reschedule
    const newTime = new Date(Date.now() + 2 * 60 * 60 * 1000) // 2 hours later
    setReminders(prev => prev.map(reminder => 
      reminder.id === id 
        ? { ...reminder, time: newTime }
        : reminder
    ))
  }

  const handleMarkDone = (id: string) => {
    setReminders(prev => prev.filter(reminder => reminder.id !== id))
  }

  const handleDismiss = (id: string) => {
    setReminders(prev => prev.map(reminder => 
      reminder.id === id 
        ? { ...reminder, isActive: false }
        : reminder
    ))
  }

  const activeReminders = reminders.filter(r => 
    r.isActive && (!r.snoozedUntil || r.snoozedUntil <= new Date())
  )

  const urgentReminder = activeReminders.find(r => r.priority === 'urgent')

  return (
    <div className="max-w-6xl mx-auto">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center mb-8"
      >
        <h2 className="text-4xl font-bold holographic mb-4">Smart Reminders</h2>
        <p className="text-gray-400 mb-6">AI-powered reminders that adapt to your schedule</p>
        
        {/* Stats */}
        <div className="flex justify-center space-x-8 mb-8">
          <div className="text-center">
            <div className="text-2xl font-bold text-neon-red">{activeReminders.length}</div>
            <div className="text-xs text-gray-500">Active Reminders</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-orange-400">
              {activeReminders.filter(r => r.priority === 'urgent' || r.priority === 'high').length}
            </div>
            <div className="text-xs text-gray-500">High Priority</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-green-400">
              {reminders.filter(r => !r.isActive).length}
            </div>
            <div className="text-xs text-gray-500">Completed Today</div>
          </div>
        </div>
      </motion.div>

      {/* Reminders Grid */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        <AnimatePresence>
          {activeReminders.map((reminder) => (
            <ReminderOrb
              key={reminder.id}
              reminder={reminder}
              onSnooze={handleSnooze}
              onReschedule={handleReschedule}
              onMarkDone={handleMarkDone}
              onDismiss={handleDismiss}
            />
          ))}
        </AnimatePresence>
        
        {activeReminders.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="col-span-full glass rounded-2xl p-12 text-center"
          >
            <Bell className="w-16 h-16 text-gray-600 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-400 mb-2">All caught up!</h3>
            <p className="text-gray-500">
              No active reminders right now. I'll notify you when something needs your attention.
            </p>
          </motion.div>
        )}
      </motion.div>

      {/* Floating Urgent Reminder Orb */}
      <AnimatePresence>
        {showFloatingOrb && urgentReminder && (
          <FloatingReminderOrb
            reminder={urgentReminder}
            onClick={() => setSelectedReminder(urgentReminder.id)}
          />
        )}
      </AnimatePresence>

      {/* AI Insights */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.4 }}
        className="mt-12 glass rounded-2xl p-6"
      >
        <h3 className="text-lg font-semibold text-neon-red mb-4">AI Insights</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <div className="flex items-start space-x-3">
            <div className="w-2 h-2 bg-neon-red rounded-full mt-2"></div>
            <div>
              <p className="text-gray-300">
                You have 3 high-priority items due today. Consider rescheduling the documentation update to focus on urgent tasks.
              </p>
            </div>
          </div>
          <div className="flex items-start space-x-3">
            <div className="w-2 h-2 bg-yellow-500 rounded-full mt-2"></div>
            <div>
              <p className="text-gray-300">
                Your meeting schedule is packed tomorrow. I've automatically suggested buffer time between meetings.
              </p>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  )
}