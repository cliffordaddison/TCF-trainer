'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Navigation from '@/components/Navigation'
import Dashboard from '@/components/Dashboard'
import PronunciationTrainer from '@/components/PronunciationTrainer'
import SRSTrainer from '@/components/SRSTrainer'
import TCFSimulator from '@/components/TCFSimulator'

export default function Home() {
  const [activeTab, setActiveTab] = useState('dashboard')

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard />
      case 'pronunciation':
        return <PronunciationTrainer />
      case 'srs':
        return <SRSTrainer />
      case 'tcf':
        return <TCFSimulator />
      case 'progress':
        return <div className="text-center p-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Progress Tracking</h2>
          <p className="text-gray-600">Coming soon! Track your learning progress with detailed analytics.</p>
        </div>
      case 'settings':
        return <div className="text-center p-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Settings</h2>
          <p className="text-gray-600">Configure your learning preferences and account settings.</p>
        </div>
      default:
        return <Dashboard />
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-french-50 to-blue-50">
      <Navigation activeTab={activeTab} onTabChange={setActiveTab} />
      
      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
        >
          {renderContent()}
        </motion.div>
      </AnimatePresence>
    </div>
  )
}
