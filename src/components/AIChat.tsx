import React, { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Canvas } from '@react-three/fiber'
import { Sphere, MeshDistortMaterial } from '@react-three/drei'
import { Mic, Send, MessageSquare, Zap } from 'lucide-react'

interface AIChatProps {
  isVoiceActive: boolean
  setIsVoiceActive: (active: boolean) => void
}

interface Message {
  id: string
  text: string
  isUser: boolean
  timestamp: Date
  hasSmartReply?: boolean
}

// 3D AI Avatar Component
function AIAvatar({ isListening }: { isListening: boolean }) {
  return (
    <div className="w-24 h-24 mx-auto mb-6">
      <Canvas>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1} color="#FF0033" />
        <Sphere args={[1, 32, 32]} scale={isListening ? 1.2 : 1}>
          <MeshDistortMaterial
            color="#FF0033"
            attach="material"
            distort={isListening ? 0.6 : 0.3}
            speed={isListening ? 5 : 2}
            roughness={0.2}
            transparent
            opacity={0.8}
          />
        </Sphere>
      </Canvas>
    </div>
  )
}

// Voice Wave Animation Component
function VoiceWave({ isActive }: { isActive: boolean }) {
  return (
    <div className="flex items-center justify-center space-x-1">
      {[...Array(5)].map((_, i) => (
        <motion.div
          key={i}
          className="w-1 bg-neon-red rounded-full"
          animate={{
            height: isActive ? [4, 20, 4] : 4,
          }}
          transition={{
            duration: 0.5,
            repeat: isActive ? Infinity : 0,
            delay: i * 0.1,
          }}
        />
      ))}
    </div>
  )
}

// Smart Reply Popup Component
function SmartReplyPopup({ message, onAccept, onDismiss }: {
  message: string
  onAccept: () => void
  onDismiss: () => void
}) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.8, y: 20 }}
      className="glass rounded-xl p-4 border border-neon-red/30 max-w-sm mx-auto mt-4"
    >
      <div className="flex items-start space-x-3">
        <div className="w-8 h-8 rounded-full bg-neon-red/20 flex items-center justify-center">
          <Zap className="w-4 h-4 text-neon-red" />
        </div>
        <div className="flex-1">
          <p className="text-sm text-gray-300 mb-3">
            I detected a task in your message. Want me to create this as a task?
          </p>
          <div className="flex space-x-2">
            <button
              onClick={onAccept}
              className="px-3 py-1 bg-neon-red/20 border border-neon-red/50 rounded-lg text-xs text-neon-red hover:bg-neon-red/30 transition-colors"
            >
              Yes, create task
            </button>
            <button
              onClick={onDismiss}
              className="px-3 py-1 border border-gray-600 rounded-lg text-xs text-gray-400 hover:border-gray-500 transition-colors"
            >
              No, thanks
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default function AIChat({ isVoiceActive, setIsVoiceActive }: AIChatProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: 'Hello! I\'m your AI productivity assistant. I can help you extract tasks from your WhatsApp, Gmail, Notion, Slack, and other apps. Try saying something like "I need to finish the project by Friday"',
      isUser: false,
      timestamp: new Date(),
    }
  ])
  const [inputText, setInputText] = useState('')
  const [isListening, setIsListening] = useState(false)
  const [showSmartReply, setShowSmartReply] = useState<string | null>(null)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSendMessage = () => {
    if (!inputText.trim()) return

    const newMessage: Message = {
      id: Date.now().toString(),
      text: inputText,
      isUser: true,
      timestamp: new Date(),
    }

    setMessages(prev => [...prev, newMessage])
    
    // Check for task keywords
    const taskKeywords = ['task', 'deadline', 'finish', 'complete', 'due', 'schedule', 'meeting', 'call']
    const hasTaskKeyword = taskKeywords.some(keyword => 
      inputText.toLowerCase().includes(keyword)
    )

    if (hasTaskKeyword) {
      setShowSmartReply(inputText)
    }

    // Simulate AI response
    setTimeout(() => {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: hasTaskKeyword 
          ? `I've analyzed your message and detected a potential task. I can help you organize this and set reminders. Would you like me to extract the key details?`
          : `I understand. I'm here to help you stay organized and productive. Feel free to share any tasks or deadlines you have.`,
        isUser: false,
        timestamp: new Date(),
      }
      setMessages(prev => [...prev, aiResponse])
    }, 1000)

    setInputText('')
  }

  const handleVoiceToggle = () => {
    setIsListening(!isListening)
    setIsVoiceActive(!isVoiceActive)
    
    if (!isListening) {
      // Simulate voice recognition
      setTimeout(() => {
        setIsListening(false)
        setIsVoiceActive(false)
        setInputText('I need to prepare the presentation for Monday\'s client meeting')
      }, 3000)
    }
  }

  const handleSmartReplyAccept = () => {
    const taskMessage: Message = {
      id: Date.now().toString(),
      text: '✅ Task created: "Prepare presentation for Monday\'s client meeting" - Due: Monday. I\'ve added this to your timeline and will remind you.',
      isUser: false,
      timestamp: new Date(),
    }
    setMessages(prev => [...prev, taskMessage])
    setShowSmartReply(null)
  }

  return (
    <div className="max-w-4xl mx-auto">
      {/* AI Avatar */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
        className="text-center mb-8"
      >
        <AIAvatar isListening={isListening} />
        <h1 className="text-4xl font-bold holographic mb-2">MemoMate AI</h1>
        <p className="text-gray-400">Your intelligent productivity assistant</p>
      </motion.div>

      {/* Chat Interface */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.3 }}
        className="glass rounded-2xl p-6 max-w-2xl mx-auto"
      >
        {/* Messages */}
        <div className="h-96 overflow-y-auto mb-4 space-y-4 scrollbar-thin scrollbar-thumb-neon-red">
          {messages.map((message) => (
            <motion.div
              key={message.id}
              initial={{ opacity: 0, x: message.isUser ? 20 : -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3 }}
              className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-xs lg:max-w-md px-4 py-2 rounded-2xl ${
                  message.isUser
                    ? 'bg-neon-red/20 border border-neon-red/50 text-white'
                    : 'bg-gray-800/50 border border-gray-700 text-gray-200'
                }`}
              >
                <p className="text-sm">{message.text}</p>
                <p className="text-xs text-gray-500 mt-1">
                  {message.timestamp.toLocaleTimeString()}
                </p>
              </div>
            </motion.div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        {/* Smart Reply Popup */}
        <AnimatePresence>
          {showSmartReply && (
            <SmartReplyPopup
              message={showSmartReply}
              onAccept={handleSmartReplyAccept}
              onDismiss={() => setShowSmartReply(null)}
            />
          )}
        </AnimatePresence>

        {/* Input Area */}
        <div className="flex items-center space-x-3">
          <div className="flex-1 relative">
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
              placeholder="Type your message or click the mic to speak..."
              className="w-full bg-gray-900/50 border border-gray-700 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-neon-red/50 focus:ring-1 focus:ring-neon-red/50"
            />
          </div>
          
          {/* Voice Button */}
          <motion.button
            onClick={handleVoiceToggle}
            className={`p-3 rounded-xl border transition-all duration-300 ${
              isListening
                ? 'bg-neon-red/20 border-neon-red neon-glow'
                : 'bg-gray-900/50 border-gray-700 hover:border-neon-red/50'
            }`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {isListening ? (
              <VoiceWave isActive={true} />
            ) : (
              <Mic className="w-5 h-5 text-gray-400" />
            )}
          </motion.button>

          {/* Send Button */}
          <motion.button
            onClick={handleSendMessage}
            disabled={!inputText.trim()}
            className="p-3 bg-neon-red/20 border border-neon-red/50 rounded-xl hover:bg-neon-red/30 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Send className="w-5 h-5 text-neon-red" />
          </motion.button>
        </div>

        {/* Integration Status */}
        <div className="mt-4 flex items-center justify-center space-x-4 text-xs text-gray-500">
          <span className="flex items-center space-x-1">
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            <span>WhatsApp Connected</span>
          </span>
          <span className="flex items-center space-x-1">
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            <span>Gmail Connected</span>
          </span>
          <span className="flex items-center space-x-1">
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            <span>Notion Connected</span>
          </span>
        </div>
      </motion.div>
    </div>
  )
}