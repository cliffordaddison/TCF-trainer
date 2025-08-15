'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  CheckCircle, 
  XCircle, 
  Clock, 
  TrendingUp, 
  Star,
  RotateCcw,
  Eye,
  Volume2
} from 'lucide-react'

interface SRSItem {
  id: string
  type: 'WORD' | 'PHRASE' | 'GRAMMAR' | 'PRONUNCIATION'
  payload: {
    fr: string
    en: string
    ipa?: string
    audio?: string
    examples?: string[]
  }
  cefr: string
  difficulty: number
  tags: string[]
  ease: number
  interval: number
  dueAt: Date
  consecutiveCorrect: number
  masteryScore: number
}

const sampleItems: SRSItem[] = [
  {
    id: '1',
    type: 'WORD',
    payload: {
      fr: 'bonjour',
      en: 'hello',
      ipa: 'bɔ̃ʒuʁ',
      examples: ['Bonjour, comment allez-vous?']
    },
    cefr: 'A1',
    difficulty: 1,
    tags: ['greetings', 'basic'],
    ease: 2,
    interval: 1,
    dueAt: new Date(),
    consecutiveCorrect: 3,
    masteryScore: 0.6
  },
  {
    id: '2',
    type: 'PHRASE',
    payload: {
      fr: 'Comment allez-vous?',
      en: 'How are you?',
      examples: ['Bonjour, comment allez-vous?', 'Je vais bien, merci.']
    },
    cefr: 'A1',
    difficulty: 2,
    tags: ['greetings', 'questions'],
    ease: 3,
    interval: 3,
    dueAt: new Date(),
    consecutiveCorrect: 5,
    masteryScore: 0.8
  },
  {
    id: '3',
    type: 'GRAMMAR',
    payload: {
      fr: 'Je suis',
      en: 'I am',
      examples: ['Je suis étudiant.', 'Je suis fatigué.']
    },
    cefr: 'A1',
    difficulty: 2,
    tags: ['grammar', 'pronouns'],
    ease: 2,
    interval: 1,
    dueAt: new Date(),
    consecutiveCorrect: 2,
    masteryScore: 0.4
  }
]

export default function SRSTrainer() {
  const [currentItemIndex, setCurrentItemIndex] = useState(0)
  const [showAnswer, setShowAnswer] = useState(false)
  const [sessionStats, setSessionStats] = useState({
    correct: 0,
    incorrect: 0,
    total: 0
  })
  const [isSessionComplete, setIsSessionComplete] = useState(false)

  const currentItem = sampleItems[currentItemIndex]

  const handleAnswer = (quality: 'AGAIN' | 'HARD' | 'GOOD' | 'EASY') => {
    // Update SRS algorithm
    const newEase = calculateNewEase(currentItem.ease, quality)
    const newInterval = calculateNewInterval(currentItem.interval, quality, newEase)
    
    // Update mastery score
    const masteryChange = quality === 'AGAIN' ? -0.1 : 
                         quality === 'HARD' ? 0.05 : 
                         quality === 'GOOD' ? 0.15 : 0.25
    
    const newMasteryScore = Math.max(0, Math.min(1, currentItem.masteryScore + masteryChange))
    
    // Update consecutive correct
    const newConsecutiveCorrect = quality === 'AGAIN' ? 0 : currentItem.consecutiveCorrect + 1

    // Update session stats
    setSessionStats(prev => ({
      ...prev,
      total: prev.total + 1,
      correct: quality !== 'AGAIN' ? prev.correct + 1 : prev.correct,
      incorrect: quality === 'AGAIN' ? prev.incorrect + 1 : prev.incorrect
    }))

    // Check if item should be archived (mastered)
    if (newMasteryScore >= 0.9 && newConsecutiveCorrect >= 10) {
      console.log(`Item ${currentItem.payload.fr} mastered and archived!`)
    }

    // Move to next item or complete session
    if (currentItemIndex < sampleItems.length - 1) {
      setCurrentItemIndex(prev => prev + 1)
      setShowAnswer(false)
    } else {
      setIsSessionComplete(true)
    }
  }

  const calculateNewEase = (currentEase: number, quality: string): number => {
    let newEase = currentEase
    if (quality === 'AGAIN') newEase = Math.max(1.3, currentEase - 0.2)
    else if (quality === 'HARD') newEase = Math.max(1.3, currentEase - 0.15)
    else if (quality === 'GOOD') newEase = currentEase
    else if (quality === 'EASY') newEase = currentEase + 0.15
    return Math.round(newEase * 100) / 100
  }

  const calculateNewInterval = (currentInterval: number, quality: string, ease: number): number => {
    if (quality === 'AGAIN') return 1
    else if (quality === 'HARD') return Math.max(1, Math.round(currentInterval * 1.2))
    else if (quality === 'GOOD') return Math.round(currentInterval * ease)
    else if (quality === 'EASY') return Math.round(currentInterval * ease * 1.3)
    return currentInterval
  }

  const getNextReviewDate = (interval: number): string => {
    const nextDate = new Date()
    nextDate.setDate(nextDate.getDate() + interval)
    return nextDate.toLocaleDateString()
  }

  const playAudio = () => {
    if (currentItem.payload.audio) {
      console.log('Playing audio:', currentItem.payload.audio)
    }
  }

  if (isSessionComplete) {
    return (
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-2xl mx-auto p-8 text-center"
      >
        <div className="card">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-10 h-10 text-green-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Session Complete!</h2>
          
          <div className="grid grid-cols-3 gap-4 mb-6">
            <div className="text-center">
              <p className="text-2xl font-bold text-green-600">{sessionStats.correct}</p>
              <p className="text-sm text-gray-600">Correct</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-red-600">{sessionStats.incorrect}</p>
              <p className="text-sm text-gray-600">Incorrect</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-french-600">{sessionStats.total}</p>
              <p className="text-sm text-gray-600">Total</p>
            </div>
          </div>

          <div className="space-y-3">
            <button 
              onClick={() => window.location.reload()}
              className="btn-primary w-full"
            >
              Start New Session
            </button>
            <button className="btn-secondary w-full">
              View Progress
            </button>
          </div>
        </div>
      </motion.div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      {/* Session Progress */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold text-gray-800">SRS Training Session</h2>
          <div className="flex items-center space-x-4">
            <div className="text-center">
              <p className="text-sm text-gray-600">Progress</p>
              <p className="text-lg font-semibold text-french-600">
                {currentItemIndex + 1} / {sampleItems.length}
              </p>
            </div>
            <div className="text-center">
              <p className="text-sm text-gray-600">Streak</p>
              <p className="text-lg font-semibold text-green-600">
                {sessionStats.correct}
              </p>
            </div>
          </div>
        </div>
        
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div 
            className="bg-french-500 h-2 rounded-full transition-all duration-300"
            style={{ width: `${((currentItemIndex + 1) / sampleItems.length) * 100}%` }}
          />
        </div>
      </div>

      {/* Current Item */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentItem.id}
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -50 }}
          className="card mb-8"
        >
          {/* Item Header */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-3">
              <span className={`cefr-badge cefr-${currentItem.cefr.toLowerCase()}`}>
                {currentItem.cefr}
              </span>
              <span className="text-sm text-gray-500 capitalize">
                {currentItem.type.toLowerCase()}
              </span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="flex items-center space-x-1">
                <Star className="w-4 h-4 text-yellow-500" />
                <span className="text-sm font-medium">
                  {Math.round(currentItem.masteryScore * 100)}%
                </span>
              </div>
              <div className="flex items-center space-x-1">
                <TrendingUp className="w-4 h-4 text-green-500" />
                <span className="text-sm font-medium">
                  {currentItem.consecutiveCorrect}
                </span>
              </div>
            </div>
          </div>

          {/* Item Content */}
          <div className="text-center mb-8">
            <h3 className="text-4xl font-bold text-french-800 mb-4">
              {currentItem.payload.fr}
            </h3>
            
            {currentItem.payload.ipa && (
              <p className="text-xl font-mono text-gray-600 mb-4">
                /{currentItem.payload.ipa}/
              </p>
            )}

            <div className="flex items-center justify-center space-x-4 mb-6">
              {currentItem.payload.audio && (
                <button 
                  onClick={playAudio}
                  className="p-3 rounded-full bg-french-100 hover:bg-french-200 transition-colors"
                >
                  <Volume2 className="w-6 h-6 text-french-600" />
                </button>
              )}
              <button 
                onClick={() => setShowAnswer(!showAnswer)}
                className="p-3 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
              >
                <Eye className="w-6 h-6 text-gray-600" />
              </button>
            </div>

            {showAnswer && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-4"
              >
                <p className="text-xl text-gray-700">{currentItem.payload.en}</p>
                
                {currentItem.payload.examples && (
                  <div className="text-left">
                    <p className="text-sm font-semibold text-gray-600 mb-2">Examples:</p>
                    <div className="space-y-2">
                      {currentItem.payload.examples.map((example, index) => (
                        <div key={index} className="p-3 bg-french-50 rounded text-sm">
                          {example}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </motion.div>
            )}
          </div>

          {/* SRS Info */}
          <div className="grid grid-cols-3 gap-4 mb-6 text-center">
            <div>
              <p className="text-sm text-gray-600">Ease Factor</p>
              <p className="text-lg font-semibold text-french-600">{currentItem.ease}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Interval</p>
              <p className="text-lg font-semibold text-blue-600">{currentItem.interval} days</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Next Review</p>
              <p className="text-lg font-semibold text-green-600">
                {getNextReviewDate(currentItem.interval)}
              </p>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Answer Buttons */}
      <div className="grid grid-cols-4 gap-4">
        <button
          onClick={() => handleAnswer('AGAIN')}
          className="p-4 bg-red-500 hover:bg-red-600 text-white rounded-lg font-semibold transition-colors"
        >
          <XCircle className="w-6 h-6 mx-auto mb-2" />
          Again
        </button>
        
        <button
          onClick={() => handleAnswer('HARD')}
          className="p-4 bg-orange-500 hover:bg-orange-600 text-white rounded-lg font-semibold transition-colors"
        >
          <Clock className="w-6 h-6 mx-auto mb-2" />
          Hard
        </button>
        
        <button
          onClick={() => handleAnswer('GOOD')}
          className="p-4 bg-green-500 hover:bg-green-600 text-white rounded-lg font-semibold transition-colors"
        >
          <CheckCircle className="w-6 h-6 mx-auto mb-2" />
          Good
        </button>
        
        <button
          onClick={() => handleAnswer('EASY')}
          className="p-4 bg-blue-500 hover:bg-blue-600 text-white rounded-lg font-semibold transition-colors"
        >
          <Star className="w-6 h-6 mx-auto mb-2" />
          Easy
        </button>
      </div>

      {/* Session Controls */}
      <div className="flex justify-center mt-8">
        <button 
          onClick={() => setIsSessionComplete(true)}
          className="btn-secondary"
        >
          End Session
        </button>
      </div>
    </div>
  )
}
