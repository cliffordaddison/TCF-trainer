'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  BookOpen, 
  Mic, 
  Headphones, 
  FileText, 
  PenTool, 
  Trophy,
  Target,
  TrendingUp,
  Clock,
  Star
} from 'lucide-react'

export default function Dashboard() {
  const [currentLevel] = useState('A1')
  const [targetLevel] = useState('C1')
  const [streak] = useState(7)
  const [dueReviews] = useState(12)

  const learningModules = [
    {
      title: 'Pronunciation Training',
      description: 'Master French sounds, liaisons, and accent',
      icon: Mic,
      color: 'from-pink-500 to-rose-500',
      progress: 25,
      level: 'A1'
    },
    {
      title: 'Vocabulary Builder',
      description: 'Learn essential words and phrases',
      icon: BookOpen,
      color: 'from-blue-500 to-indigo-500',
      progress: 40,
      level: 'A1'
    },
    {
      title: 'Grammar Mastery',
      description: 'Understand French grammar structures',
      icon: FileText,
      color: 'from-green-500 to-emerald-500',
      progress: 15,
      level: 'A1'
    },
    {
      title: 'Listening Practice',
      description: 'Improve comprehension skills',
      icon: Headphones,
      color: 'from-purple-500 to-violet-500',
      progress: 30,
      level: 'A1'
    },
    {
      title: 'Speaking Practice',
      description: 'Practice pronunciation and fluency',
      icon: Mic,
      color: 'from-orange-500 to-amber-500',
      progress: 20,
      level: 'A1'
    },
    {
      title: 'Writing Skills',
      description: 'Develop written expression',
      icon: PenTool,
      color: 'from-teal-500 to-cyan-500',
      progress: 10,
      level: 'A1'
    }
  ]

  const tcfSections = [
    { name: 'Listening', items: 29, time: '25 min', icon: Headphones },
    { name: 'Reading', items: 29, time: '45 min', icon: BookOpen },
    { name: 'Grammar', items: 18, time: '15 min', icon: FileText },
    { name: 'Speaking', items: 'Optional', time: '5 min', icon: Mic },
    { name: 'Writing', items: 'Optional', time: '30 min', icon: PenTool }
  ]

  return (
    <div className="min-h-screen p-6">
      {/* Header */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-8"
      >
        <h1 className="text-4xl font-bold text-french-800 mb-2">
          🇫🇷 French TCF Trainer
        </h1>
        <p className="text-lg text-gray-600">
          Your journey from {currentLevel} to {targetLevel} mastery
        </p>
      </motion.div>

      {/* Progress Overview */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8"
      >
        <div className="card bg-gradient-to-r from-french-500 to-blue-500 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-french-100">Current Level</p>
              <p className="text-2xl font-bold">{currentLevel}</p>
            </div>
            <Target className="w-8 h-8 text-french-200" />
          </div>
        </div>

        <div className="card bg-gradient-to-r from-accent-500 to-yellow-500 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-accent-100">Target Level</p>
              <p className="text-2xl font-bold">{targetLevel}</p>
            </div>
            <Trophy className="w-8 h-8 text-accent-200" />
          </div>
        </div>

        <div className="card bg-gradient-to-r from-green-500 to-emerald-500 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-green-100">Streak</p>
              <p className="text-2xl font-bold">{streak} days</p>
            </div>
            <TrendingUp className="w-8 h-8 text-green-200" />
          </div>
        </div>

        <div className="card bg-gradient-to-r from-purple-500 to-violet-500 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-purple-100">Due Reviews</p>
              <p className="text-2xl font-bold">{dueReviews}</p>
            </div>
            <Clock className="w-8 h-8 text-purple-200" />
          </div>
        </div>
      </motion.div>

      {/* Learning Modules */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Learning Modules</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {learningModules.map((module, index) => (
            <motion.div
              key={module.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="card hover:shadow-xl transition-shadow duration-300 cursor-pointer"
            >
              <div className={`w-12 h-12 rounded-lg bg-gradient-to-r ${module.color} flex items-center justify-center mb-4`}>
                <module.icon className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">{module.title}</h3>
              <p className="text-gray-600 text-sm mb-4">{module.description}</p>
              <div className="flex items-center justify-between">
                <span className={`cefr-badge cefr-${module.level.toLowerCase()}`}>
                  {module.level}
                </span>
                <div className="flex items-center space-x-2">
                  <div className="w-20 bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-french-500 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${module.progress}%` }}
                    />
                  </div>
                  <span className="text-sm text-gray-600">{module.progress}%</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* TCF Exam Simulator */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h2 className="text-2xl font-bold text-gray-800 mb-4">TCF Exam Simulator</h2>
        <div className="card bg-gradient-to-r from-french-600 to-blue-600 text-white">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-semibold">Practice TCF Format</h3>
            <Star className="w-6 h-6 text-yellow-300" />
          </div>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {tcfSections.map((section) => (
              <div key={section.name} className="text-center">
                <section.icon className="w-8 h-8 mx-auto mb-2 text-french-200" />
                <p className="font-semibold text-sm">{section.name}</p>
                <p className="text-xs text-french-200">{section.items}</p>
                <p className="text-xs text-french-200">{section.time}</p>
              </div>
            ))}
          </div>
          <button className="btn-primary mt-4 w-full">
            Start TCF Practice
          </button>
        </div>
      </motion.div>

      {/* Quick Actions */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="grid grid-cols-1 md:grid-cols-2 gap-6"
      >
        <div className="card">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Daily Practice</h3>
          <div className="space-y-3">
            <button className="btn-primary w-full">
              Start Today's Lesson
            </button>
            <button className="btn-secondary w-full">
              Review Due Items ({dueReviews})
            </button>
          </div>
        </div>

        <div className="card">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Progress Tracking</h3>
          <div className="space-y-3">
            <button className="btn-secondary w-full">
              View Progress Report
            </button>
            <button className="btn-secondary w-full">
              Take Level Assessment
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  )
}
