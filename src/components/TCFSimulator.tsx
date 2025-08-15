'use client'

import { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { 
  Clock, 
  Play, 
  Pause, 
  CheckCircle, 
  XCircle,
  Headphones,
  BookOpen,
  FileText,
  Mic,
  PenTool
} from 'lucide-react'

interface Question {
  id: string
  type: 'multiple_choice' | 'true_false' | 'cloze'
  question: string
  options?: string[]
  correctAnswer: string | string[]
  explanation: string
  audioUrl?: string
  passage?: string
}

interface ExamSection {
  name: string
  icon: any
  items: number
  timeLimit: number // in seconds
  questions: Question[]
  color: string
}

const sampleQuestions: Question[] = [
  {
    id: '1',
    type: 'multiple_choice',
    question: 'What does "Bonjour" mean?',
    options: ['Goodbye', 'Hello', 'Thank you', 'Please'],
    correctAnswer: 'Hello',
    explanation: '"Bonjour" is the standard French greeting meaning "Hello" or "Good day".'
  },
  {
    id: '2',
    type: 'multiple_choice',
    question: 'Which article is used with feminine nouns?',
    options: ['le', 'la', 'les', 'un'],
    correctAnswer: 'la',
    explanation: 'The article "la" is used with feminine singular nouns in French.'
  },
  {
    id: '3',
    type: 'cloze',
    question: 'Complete: "Je ___ étudiant."',
    options: ['suis', 'es', 'est', 'sont'],
    correctAnswer: 'suis',
    explanation: 'The verb "être" (to be) conjugated in first person singular is "suis".'
  }
]

const examSections: ExamSection[] = [
  {
    name: 'Listening',
    icon: Headphones,
    items: 29,
    timeLimit: 1500, // 25 minutes
    questions: sampleQuestions,
    color: 'from-blue-500 to-indigo-500'
  },
  {
    name: 'Reading',
    icon: BookOpen,
    items: 29,
    timeLimit: 2700, // 45 minutes
    questions: sampleQuestions,
    color: 'from-green-500 to-emerald-500'
  },
  {
    name: 'Grammar',
    icon: FileText,
    items: 18,
    timeLimit: 900, // 15 minutes
    questions: sampleQuestions,
    color: 'from-purple-500 to-violet-500'
  },
  {
    name: 'Speaking',
    icon: Mic,
    items: 3,
    timeLimit: 300, // 5 minutes
    questions: [],
    color: 'from-orange-500 to-amber-500'
  },
  {
    name: 'Writing',
    icon: PenTool,
    items: 2,
    timeLimit: 1800, // 30 minutes
    questions: [],
    color: 'from-teal-500 to-cyan-500'
  }
]

export default function TCFSimulator() {
  const [selectedSection, setSelectedSection] = useState<ExamSection | null>(null)
  const [isExamStarted, setIsExamStarted] = useState(false)
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [userAnswers, setUserAnswers] = useState<Record<string, string>>({})
  const [timeRemaining, setTimeRemaining] = useState(0)
  const [isPaused, setIsPaused] = useState(false)
  const [examResults, setExamResults] = useState<any>(null)
  
  const timerRef = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    if (isExamStarted && selectedSection && !isPaused) {
      timerRef.current = setInterval(() => {
        setTimeRemaining(prev => {
          if (prev <= 1) {
            endExam()
            return 0
          }
          return prev - 1
        })
      }, 1000)
    }

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current)
      }
    }
  }, [isExamStarted, selectedSection, isPaused])

  const startExam = (section: ExamSection) => {
    setSelectedSection(section)
    setTimeRemaining(section.timeLimit)
    setIsExamStarted(true)
    setCurrentQuestionIndex(0)
    setUserAnswers({})
    setExamResults(null)
  }

  const endExam = () => {
    setIsExamStarted(false)
    if (timerRef.current) {
      clearInterval(timerRef.current)
    }
    calculateResults()
  }

  const pauseExam = () => {
    setIsPaused(true)
    if (timerRef.current) {
      clearInterval(timerRef.current)
    }
  }

  const resumeExam = () => {
    setIsPaused(false)
  }

  const calculateResults = () => {
    if (!selectedSection) return

    const totalQuestions = selectedSection.questions.length
    let correctAnswers = 0

    selectedSection.questions.forEach(question => {
      const userAnswer = userAnswers[question.id]
      if (userAnswer === question.correctAnswer) {
        correctAnswers++
      }
    })

    const score = (correctAnswers / totalQuestions) * 100
    const cefrLevel = getCEFRLevel(score)

    setExamResults({
      score,
      correctAnswers,
      totalQuestions,
      cefrLevel,
      timeSpent: selectedSection.timeLimit - timeRemaining
    })
  }

  const getCEFRLevel = (score: number): string => {
    if (score >= 90) return 'C2'
    if (score >= 80) return 'C1'
    if (score >= 70) return 'B2'
    if (score >= 60) return 'B1'
    if (score >= 50) return 'A2'
    return 'A1'
  }

  const formatTime = (seconds: number): string => {
    const minutes = Math.floor(seconds / 60)
    const remainingSeconds = seconds % 60
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`
  }

  const handleAnswer = (questionId: string, answer: string) => {
    setUserAnswers(prev => ({
      ...prev,
      [questionId]: answer
    }))
  }

  const nextQuestion = () => {
    if (currentQuestionIndex < (selectedSection?.questions.length || 0) - 1) {
      setCurrentQuestionIndex(prev => prev + 1)
    }
  }

  const previousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1)
    }
  }

  if (examResults) {
    return (
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-4xl mx-auto p-6"
      >
        <div className="card text-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">Exam Complete!</h2>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
            <div className="text-center">
              <p className="text-2xl font-bold text-french-600">{examResults.score.toFixed(1)}%</p>
              <p className="text-sm text-gray-600">Score</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-green-600">{examResults.correctAnswers}</p>
              <p className="text-sm text-gray-600">Correct</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-blue-600">{examResults.totalQuestions}</p>
              <p className="text-sm text-gray-600">Total</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-purple-600">{examResults.cefrLevel}</p>
              <p className="text-sm text-gray-600">CEFR Level</p>
            </div>
          </div>

          <div className="space-y-4">
            <button 
              onClick={() => window.location.reload()}
              className="btn-primary w-full"
            >
              Take Another Exam
            </button>
            <button className="btn-secondary w-full">
              View Detailed Results
            </button>
          </div>
        </div>
      </motion.div>
    )
  }

  if (isExamStarted && selectedSection) {
    const currentQuestion = selectedSection.questions[currentQuestionIndex]
    
    return (
      <div className="max-w-4xl mx-auto p-6">
        {/* Exam Header */}
        <div className="card mb-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-4">
              <div className={`w-12 h-12 rounded-lg bg-gradient-to-r ${selectedSection.color} flex items-center justify-center`}>
                <selectedSection.icon className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-gray-800">{selectedSection.name} Section</h2>
                <p className="text-gray-600">
                  Question {currentQuestionIndex + 1} of {selectedSection.questions.length}
                </p>
              </div>
            </div>
            
            <div className="text-center">
              <div className="flex items-center space-x-2 mb-2">
                <Clock className="w-5 h-5 text-red-500" />
                <span className="text-lg font-bold text-red-500">
                  {formatTime(timeRemaining)}
                </span>
              </div>
              <button
                onClick={isPaused ? resumeExam : pauseExam}
                className="btn-secondary text-sm"
              >
                {isPaused ? 'Resume' : 'Pause'}
              </button>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-french-500 h-2 rounded-full transition-all duration-300"
              style={{ width: `${((currentQuestionIndex + 1) / selectedSection.questions.length) * 100}%` }}
            />
          </div>
        </div>

        {/* Question */}
        <div className="card mb-6">
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              {currentQuestion.question}
            </h3>
            
            {currentQuestion.audioUrl && (
              <button className="btn-secondary mb-4">
                <Play className="w-4 h-4 mr-2" />
                Play Audio
              </button>
            )}

            {currentQuestion.passage && (
              <div className="p-4 bg-gray-50 rounded mb-4">
                <p className="text-gray-700">{currentQuestion.passage}</p>
              </div>
            )}
          </div>

          {/* Answer Options */}
          {currentQuestion.options && (
            <div className="space-y-3">
              {currentQuestion.options.map((option, index) => (
                <label
                  key={index}
                  className={`flex items-center p-3 border-2 rounded-lg cursor-pointer transition-colors ${
                    userAnswers[currentQuestion.id] === option
                      ? 'border-french-500 bg-french-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <input
                    type="radio"
                    name={`question-${currentQuestion.id}`}
                    value={option}
                    checked={userAnswers[currentQuestion.id] === option}
                    onChange={() => handleAnswer(currentQuestion.id, option)}
                    className="mr-3"
                  />
                  <span className="text-gray-700">{option}</span>
                </label>
              ))}
            </div>
          )}
        </div>

        {/* Navigation */}
        <div className="flex justify-between">
          <button
            onClick={previousQuestion}
            disabled={currentQuestionIndex === 0}
            className="btn-secondary disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Previous
          </button>

          {currentQuestionIndex === selectedSection.questions.length - 1 ? (
            <button
              onClick={endExam}
              className="btn-primary"
            >
              Finish Exam
            </button>
          ) : (
            <button
              onClick={nextQuestion}
              className="btn-primary"
            >
              Next Question
            </button>
          )}
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-6xl mx-auto p-6">
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-8"
      >
        <h1 className="text-4xl font-bold text-french-800 mb-2">
          TCF Exam Simulator
        </h1>
        <p className="text-lg text-gray-600">
          Practice with authentic TCF exam format and timing
        </p>
      </motion.div>

      {/* Exam Sections */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {examSections.map((section, index) => (
          <motion.div
            key={section.name}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="card hover:shadow-xl transition-shadow duration-300 cursor-pointer"
            onClick={() => startExam(section)}
          >
            <div className={`w-16 h-16 rounded-lg bg-gradient-to-r ${section.color} flex items-center justify-center mb-4`}>
              <section.icon className="w-8 h-8 text-white" />
            </div>
            
            <h3 className="text-xl font-semibold text-gray-800 mb-2">{section.name}</h3>
            
            <div className="space-y-2 text-sm text-gray-600">
              <p>• {section.items} questions</p>
              <p>• {Math.floor(section.timeLimit / 60)} minutes</p>
              {section.name === 'Listening' && <p>• Audio-based questions</p>}
              {section.name === 'Reading' && <p>• Text comprehension</p>}
              {section.name === 'Grammar' && <p>• Language structures</p>}
              {section.name === 'Speaking' && <p>• Oral expression</p>}
              {section.name === 'Writing' && <p>• Written expression</p>}
            </div>

            <button className="btn-primary w-full mt-4">
              Start {section.name}
            </button>
          </motion.div>
        ))}
      </div>

      {/* Exam Information */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="card mt-8"
      >
        <h3 className="text-lg font-semibold text-gray-800 mb-4">About TCF Exam</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h4 className="font-semibold text-gray-700 mb-2">Compulsory Sections</h4>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>• Listening: 29 questions (25 minutes)</li>
              <li>• Reading: 29 questions (45 minutes)</li>
              <li>• Grammar: 18 questions (15 minutes)</li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-gray-700 mb-2">Optional Sections</h4>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>• Speaking: 3 tasks (5 minutes)</li>
              <li>• Writing: 2 tasks (30 minutes)</li>
            </ul>
          </div>
        </div>
        
        <div className="mt-4 p-4 bg-french-50 rounded">
          <p className="text-sm text-french-700">
            <strong>Target CEFR Level:</strong> C1 (Advanced) - This simulator will help you practice 
            the exact format and timing of the real TCF exam to achieve your target level.
          </p>
        </div>
      </motion.div>
    </div>
  )
}
