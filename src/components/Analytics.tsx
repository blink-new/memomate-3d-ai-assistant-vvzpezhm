import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { BarChart3, TrendingUp, Target, Zap, CheckCircle, Clock, Calendar, Award } from 'lucide-react'

interface AnalyticsData {
  completedTasks: number
  pendingTasks: number
  totalTasks: number
  productivityScore: number
  streakDays: number
  weeklyProgress: number[]
  categoryBreakdown: { category: string; count: number; color: string }[]
  timeDistribution: { hour: number; tasks: number }[]
}

const mockAnalytics: AnalyticsData = {
  completedTasks: 47,
  pendingTasks: 12,
  totalTasks: 59,
  productivityScore: 87,
  streakDays: 15,
  weeklyProgress: [85, 92, 78, 95, 88, 91, 87],
  categoryBreakdown: [
    { category: 'Work', count: 35, color: '#FF0033' },
    { category: 'Personal', count: 15, color: '#FF3366' },
    { category: 'Learning', count: 9, color: '#FF6699' }
  ],
  timeDistribution: [
    { hour: 9, tasks: 8 },
    { hour: 10, tasks: 12 },
    { hour: 11, tasks: 15 },
    { hour: 14, tasks: 10 },
    { hour: 15, tasks: 7 },
    { hour: 16, tasks: 5 }
  ]
}

// Animated Counter Component
function AnimatedCounter({ value, duration = 2000, suffix = '' }: {
  value: number
  duration?: number
  suffix?: string
}) {
  const [count, setCount] = useState(0)

  useEffect(() => {
    let startTime: number
    let animationFrame: number

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp
      const progress = Math.min((timestamp - startTime) / duration, 1)
      
      setCount(Math.floor(progress * value))
      
      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate)
      }
    }

    animationFrame = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(animationFrame)
  }, [value, duration])

  return <span>{count}{suffix}</span>
}

// Radial Progress Component
function RadialProgress({ value, size = 120, strokeWidth = 8, color = '#FF0033' }: {
  value: number
  size?: number
  strokeWidth?: number
  color?: string
}) {
  const radius = (size - strokeWidth) / 2
  const circumference = radius * 2 * Math.PI
  const offset = circumference - (value / 100) * circumference

  return (
    <div className="relative">
      <svg width={size} height={size} className="transform -rotate-90">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="rgba(255, 255, 255, 0.1)"
          strokeWidth={strokeWidth}
          fill="transparent"
        />
        <motion.circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={color}
          strokeWidth={strokeWidth}
          fill="transparent"
          strokeLinecap="round"
          strokeDasharray={circumference}
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset: offset }}
          transition={{ duration: 2, ease: "easeInOut" }}
          style={{
            filter: `drop-shadow(0 0 8px ${color})`
          }}
        />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="text-2xl font-bold text-white">
          <AnimatedCounter value={value} suffix="%" />
        </span>
      </div>
    </div>
  )
}

// Bar Chart Component
function BarChart({ data, color = '#FF0033' }: {
  data: number[]
  color?: string
}) {
  const maxValue = Math.max(...data)
  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']

  return (
    <div className="flex items-end space-x-2 h-32">
      {data.map((value, index) => (
        <div key={index} className="flex flex-col items-center space-y-2">
          <motion.div
            className="w-8 rounded-t-lg"
            style={{ backgroundColor: color }}
            initial={{ height: 0 }}
            animate={{ height: `${(value / maxValue) * 100}%` }}
            transition={{ duration: 1.5, delay: index * 0.1 }}
          />
          <span className="text-xs text-gray-500">{days[index]}</span>
        </div>
      ))}
    </div>
  )
}

// Stat Card Component
function StatCard({ icon: Icon, title, value, subtitle, color, delay = 0 }: {
  icon: React.ElementType
  title: string
  value: number | string
  subtitle: string
  color: string
  delay?: number
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.6, delay }}
      whileHover={{ y: -5, scale: 1.02 }}
      className="glass rounded-2xl p-6 border border-gray-700 hover:border-neon-red/50 transition-all duration-300"
    >
      <div className="flex items-center space-x-4 mb-4">
        <div 
          className="p-3 rounded-xl"
          style={{ backgroundColor: `${color}20`, border: `1px solid ${color}50` }}
        >
          <Icon className="w-6 h-6" style={{ color }} />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-white">{title}</h3>
          <p className="text-sm text-gray-400">{subtitle}</p>
        </div>
      </div>
      <div className="text-3xl font-bold" style={{ color }}>
        {typeof value === 'number' ? <AnimatedCounter value={value} /> : value}
      </div>
    </motion.div>
  )
}

export default function Analytics() {
  const [data] = useState<AnalyticsData>(mockAnalytics)
  const completionRate = Math.round((data.completedTasks / data.totalTasks) * 100)

  return (
    <div className="max-w-7xl mx-auto">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center mb-12"
      >
        <h2 className="text-4xl font-bold holographic mb-4">Productivity Analytics</h2>
        <p className="text-gray-400 mb-8">AI-powered insights into your productivity patterns</p>
      </motion.div>

      {/* Main Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        <StatCard
          icon={CheckCircle}
          title="Completed"
          value={data.completedTasks}
          subtitle="Tasks finished"
          color="#22C55E"
          delay={0.1}
        />
        <StatCard
          icon={Clock}
          title="Pending"
          value={data.pendingTasks}
          subtitle="Tasks remaining"
          color="#F59E0B"
          delay={0.2}
        />
        <StatCard
          icon={Target}
          title="Total Tasks"
          value={data.totalTasks}
          subtitle="This month"
          color="#FF0033"
          delay={0.3}
        />
        <StatCard
          icon={Award}
          title="Streak"
          value={`${data.streakDays} days`}
          subtitle="Current streak"
          color="#8B5CF6"
          delay={0.4}
        />
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
        {/* Productivity Score */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="glass rounded-2xl p-8 text-center"
        >
          <h3 className="text-xl font-semibold text-white mb-6">Productivity Score</h3>
          <div className="flex justify-center mb-6">
            <RadialProgress value={data.productivityScore} />
          </div>
          <div className="grid grid-cols-3 gap-4 text-sm">
            <div>
              <div className="text-green-400 font-semibold">Excellent</div>
              <div className="text-gray-500">80-100%</div>
            </div>
            <div>
              <div className="text-yellow-400 font-semibold">Good</div>
              <div className="text-gray-500">60-79%</div>
            </div>
            <div>
              <div className="text-red-400 font-semibold">Needs Work</div>
              <div className="text-gray-500">0-59%</div>
            </div>
          </div>
        </motion.div>

        {/* Weekly Progress */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="glass rounded-2xl p-8"
        >
          <h3 className="text-xl font-semibold text-white mb-6">Weekly Progress</h3>
          <div className="flex justify-center mb-4">
            <BarChart data={data.weeklyProgress} />
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-neon-red mb-1">
              <AnimatedCounter value={Math.round(data.weeklyProgress.reduce((a, b) => a + b) / data.weeklyProgress.length)} suffix="%" />
            </div>
            <div className="text-sm text-gray-400">Average this week</div>
          </div>
        </motion.div>
      </div>

      {/* Category Breakdown */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.7 }}
        className="glass rounded-2xl p-8 mb-12"
      >
        <h3 className="text-xl font-semibold text-white mb-6">Task Categories</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {data.categoryBreakdown.map((category, index) => (
            <motion.div
              key={category.category}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.8 + index * 0.1 }}
              className="text-center"
            >
              <div className="relative mb-4">
                <div className="w-24 h-24 mx-auto rounded-full border-4 border-gray-700 flex items-center justify-center">
                  <div 
                    className="w-16 h-16 rounded-full flex items-center justify-center"
                    style={{ backgroundColor: `${category.color}20`, border: `2px solid ${category.color}` }}
                  >
                    <span className="text-xl font-bold" style={{ color: category.color }}>
                      <AnimatedCounter value={category.count} />
                    </span>
                  </div>
                </div>
              </div>
              <h4 className="font-semibold text-white">{category.category}</h4>
              <p className="text-sm text-gray-400">
                {Math.round((category.count / data.totalTasks) * 100)}% of total
              </p>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* AI Insights */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.9 }}
        className="glass rounded-2xl p-8"
      >
        <div className="flex items-center space-x-3 mb-6">
          <div className="p-2 bg-neon-red/20 border border-neon-red/50 rounded-xl">
            <TrendingUp className="w-5 h-5 text-neon-red" />
          </div>
          <h3 className="text-xl font-semibold text-white">AI Insights</h3>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="flex items-start space-x-3">
              <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
              <div>
                <h4 className="font-semibold text-green-400 mb-1">Peak Performance</h4>
                <p className="text-sm text-gray-300">
                  Your most productive hours are 10-11 AM. Consider scheduling important tasks during this time.
                </p>
              </div>
            </div>
            
            <div className="flex items-start space-x-3">
              <div className="w-2 h-2 bg-yellow-500 rounded-full mt-2 flex-shrink-0"></div>
              <div>
                <h4 className="font-semibold text-yellow-400 mb-1">Improvement Area</h4>
                <p className="text-sm text-gray-300">
                  Task completion rate drops on Fridays. Try lighter workloads or different task types.
                </p>
              </div>
            </div>
          </div>
          
          <div className="space-y-4">
            <div className="flex items-start space-x-3">
              <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
              <div>
                <h4 className="font-semibold text-blue-400 mb-1">Streak Momentum</h4>
                <p className="text-sm text-gray-300">
                  You're on a 15-day streak! Maintain this momentum by setting smaller, achievable daily goals.
                </p>
              </div>
            </div>
            
            <div className="flex items-start space-x-3">
              <div className="w-2 h-2 bg-purple-500 rounded-full mt-2 flex-shrink-0"></div>
              <div>
                <h4 className="font-semibold text-purple-400 mb-1">Category Balance</h4>
                <p className="text-sm text-gray-300">
                  Consider allocating more time to learning tasks to maintain skill development.
                </p>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  )
}