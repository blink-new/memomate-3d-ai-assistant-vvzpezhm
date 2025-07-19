import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { CheckCircle, Trash2, RotateCcw, Calendar, Clock, AlertCircle } from 'lucide-react'

interface Task {
  id: string
  title: string
  description: string
  dueDate: Date
  priority: 'low' | 'medium' | 'high'
  source: 'whatsapp' | 'gmail' | 'notion' | 'slack' | 'manual'
  completed: boolean
  category: 'today' | 'tomorrow' | 'thisWeek' | 'thisMonth'
}

const mockTasks: Task[] = [
  {
    id: '1',
    title: 'Prepare client presentation',
    description: 'Create slides for Monday\'s client meeting',
    dueDate: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000),
    priority: 'high',
    source: 'gmail',
    completed: false,
    category: 'tomorrow'
  },
  {
    id: '2',
    title: 'Review project proposal',
    description: 'Go through the Q4 project proposal document',
    dueDate: new Date(),
    priority: 'medium',
    source: 'slack',
    completed: false,
    category: 'today'
  },
  {
    id: '3',
    title: 'Team standup meeting',
    description: 'Daily standup at 10 AM',
    dueDate: new Date(),
    priority: 'medium',
    source: 'notion',
    completed: true,
    category: 'today'
  },
  {
    id: '4',
    title: 'Update documentation',
    description: 'Update API documentation for new features',
    dueDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
    priority: 'low',
    source: 'whatsapp',
    completed: false,
    category: 'thisWeek'
  },
  {
    id: '5',
    title: 'Quarterly review',
    description: 'Prepare quarterly performance review',
    dueDate: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000),
    priority: 'high',
    source: 'gmail',
    completed: false,
    category: 'thisMonth'
  }
]

const timeCategories = [
  { key: 'today', label: 'Today', icon: Clock },
  { key: 'tomorrow', label: 'Tomorrow', icon: Calendar },
  { key: 'thisWeek', label: 'This Week', icon: Calendar },
  { key: 'thisMonth', label: 'This Month', icon: Calendar }
] as const

const sourceColors = {
  whatsapp: 'bg-green-500',
  gmail: 'bg-red-500',
  notion: 'bg-gray-500',
  slack: 'bg-purple-500',
  manual: 'bg-blue-500'
}

const priorityColors = {
  low: 'border-green-500/50',
  medium: 'border-yellow-500/50',
  high: 'border-red-500/50'
}

function TaskCard({ task, onComplete, onDelete, onReschedule }: {
  task: Task
  onComplete: (id: string) => void
  onDelete: (id: string) => void
  onReschedule: (id: string) => void
}) {
  const isOverdue = new Date() > task.dueDate && !task.completed

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.8 }}
      whileHover={{ y: -5 }}
      className={`glass rounded-xl p-4 min-w-[280px] border transition-all duration-300 hover:neon-glow-soft ${
        task.completed ? 'opacity-60' : ''
      } ${priorityColors[task.priority]} ${
        isOverdue ? 'border-red-500 pulse-red' : ''
      }`}
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center space-x-2">
          <div className={`w-3 h-3 rounded-full ${sourceColors[task.source]}`} />
          <span className="text-xs text-gray-400 uppercase tracking-wide">
            {task.source}
          </span>
          {isOverdue && (
            <AlertCircle className="w-4 h-4 text-red-500" />
          )}
        </div>
        <div className={`px-2 py-1 rounded-full text-xs ${
          task.priority === 'high' ? 'bg-red-500/20 text-red-400' :
          task.priority === 'medium' ? 'bg-yellow-500/20 text-yellow-400' :
          'bg-green-500/20 text-green-400'
        }`}>
          {task.priority}
        </div>
      </div>

      {/* Content */}
      <div className="mb-4">
        <h3 className={`font-semibold mb-2 ${task.completed ? 'line-through text-gray-500' : 'text-white'}`}>
          {task.title}
        </h3>
        <p className="text-sm text-gray-400 mb-2">{task.description}</p>
        <div className="flex items-center space-x-2 text-xs text-gray-500">
          <Clock className="w-3 h-3" />
          <span>{task.dueDate.toLocaleDateString()}</span>
          <span>{task.dueDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center space-x-2">
        <motion.button
          onClick={() => onComplete(task.id)}
          className={`flex-1 flex items-center justify-center space-x-1 py-2 px-3 rounded-lg text-xs transition-all ${
            task.completed
              ? 'bg-green-500/20 text-green-400 border border-green-500/50'
              : 'bg-gray-800/50 text-gray-400 border border-gray-700 hover:border-green-500/50 hover:text-green-400'
          }`}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <CheckCircle className="w-3 h-3" />
          <span>{task.completed ? 'Completed' : 'Complete'}</span>
        </motion.button>

        <motion.button
          onClick={() => onReschedule(task.id)}
          className="p-2 bg-gray-800/50 border border-gray-700 rounded-lg hover:border-neon-red/50 hover:text-neon-red transition-all"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          title="Reschedule"
        >
          <RotateCcw className="w-3 h-3" />
        </motion.button>

        <motion.button
          onClick={() => onDelete(task.id)}
          className="p-2 bg-gray-800/50 border border-gray-700 rounded-lg hover:border-red-500/50 hover:text-red-400 transition-all"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          title="Delete"
        >
          <Trash2 className="w-3 h-3" />
        </motion.button>
      </div>
    </motion.div>
  )
}

export default function Timeline() {
  const [tasks, setTasks] = useState<Task[]>(mockTasks)
  const [activeCategory, setActiveCategory] = useState<string>('today')

  const handleCompleteTask = (id: string) => {
    setTasks(prev => prev.map(task => 
      task.id === id ? { ...task, completed: !task.completed } : task
    ))
  }

  const handleDeleteTask = (id: string) => {
    setTasks(prev => prev.filter(task => task.id !== id))
  }

  const handleRescheduleTask = (id: string) => {
    // Simulate AI reschedule dialog
    const newDate = new Date(Date.now() + 24 * 60 * 60 * 1000) // Tomorrow
    setTasks(prev => prev.map(task => 
      task.id === id ? { ...task, dueDate: newDate } : task
    ))
  }

  const getTasksByCategory = (category: string) => {
    return tasks.filter(task => task.category === category)
  }

  const getTaskStats = () => {
    const total = tasks.length
    const completed = tasks.filter(t => t.completed).length
    const pending = total - completed
    const overdue = tasks.filter(t => new Date() > t.dueDate && !t.completed).length
    
    return { total, completed, pending, overdue }
  }

  const stats = getTaskStats()

  return (
    <div className="max-w-7xl mx-auto">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center mb-8"
      >
        <h2 className="text-4xl font-bold holographic mb-4">Timeline</h2>
        <p className="text-gray-400 mb-6">Manage your tasks and deadlines across all connected apps</p>
        
        {/* Stats */}
        <div className="flex justify-center space-x-6 mb-8">
          <div className="text-center">
            <div className="text-2xl font-bold text-neon-red">{stats.total}</div>
            <div className="text-xs text-gray-500">Total Tasks</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-green-400">{stats.completed}</div>
            <div className="text-xs text-gray-500">Completed</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-yellow-400">{stats.pending}</div>
            <div className="text-xs text-gray-500">Pending</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-red-400">{stats.overdue}</div>
            <div className="text-xs text-gray-500">Overdue</div>
          </div>
        </div>
      </motion.div>

      {/* Category Tabs */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="flex justify-center mb-8"
      >
        <div className="glass rounded-xl p-2 flex space-x-2">
          {timeCategories.map((category) => {
            const Icon = category.icon
            const categoryTasks = getTasksByCategory(category.key)
            
            return (
              <motion.button
                key={category.key}
                onClick={() => setActiveCategory(category.key)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all ${
                  activeCategory === category.key
                    ? 'bg-neon-red/20 text-neon-red border border-neon-red/50'
                    : 'text-gray-400 hover:text-white hover:bg-gray-800/50'
                }`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Icon className="w-4 h-4" />
                <span>{category.label}</span>
                <span className="bg-gray-700 text-xs px-2 py-1 rounded-full">
                  {categoryTasks.length}
                </span>
              </motion.button>
            )
          })}
        </div>
      </motion.div>

      {/* Tasks */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.4 }}
        className="overflow-x-auto pb-4"
      >
        <div className="flex space-x-4 min-w-max px-4">
          <AnimatePresence mode="wait">
            {getTasksByCategory(activeCategory).map((task) => (
              <TaskCard
                key={task.id}
                task={task}
                onComplete={handleCompleteTask}
                onDelete={handleDeleteTask}
                onReschedule={handleRescheduleTask}
              />
            ))}
          </AnimatePresence>
          
          {getTasksByCategory(activeCategory).length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="glass rounded-xl p-8 min-w-[280px] text-center"
            >
              <Calendar className="w-12 h-12 text-gray-600 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-400 mb-2">No tasks found</h3>
              <p className="text-sm text-gray-500">
                No tasks scheduled for {timeCategories.find(c => c.key === activeCategory)?.label.toLowerCase()}
              </p>
            </motion.div>
          )}
        </div>
      </motion.div>
    </div>
  )
}