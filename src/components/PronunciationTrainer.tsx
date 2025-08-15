'use client'

import { useState, useRef, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Mic, Play, Volume2, CheckCircle, XCircle } from 'lucide-react'

interface PhoneticLesson {
  word: string
  ipa: string
  en: string
  audio: string
  breakdown: string[]
  practice: string[]
  examples: string[]
}

const sampleLesson: PhoneticLesson = {
  word: "bonjour",
  ipa: "bɔ̃ʒuʁ",
  en: "hello",
  audio: "/audio/bonjour.mp3",
  breakdown: ["b", "ɔ̃", "ʒ", "u", "ʁ"],
  practice: ["bɔ̃", "ʒu", "ʁ"],
  examples: ["Bonjour, comment allez-vous?", "Bonjour, monsieur!"]
}

export default function PronunciationTrainer() {
  const [isRecording, setIsRecording] = useState(false)
  const [transcript, setTranscript] = useState('')
  const [evaluation, setEvaluation] = useState<any>(null)
  const [currentStep, setCurrentStep] = useState(0)
  const [showAnswer, setShowAnswer] = useState(false)
  
  const mediaRecorderRef = useRef<MediaRecorder | null>(null)
  const audioChunksRef = useRef<Blob[]>([])

  const steps = [
    { title: 'Listen & Repeat', description: 'Hear the native pronunciation' },
    { title: 'Break Down', description: 'Learn individual sounds' },
    { title: 'Practice', description: 'Record and compare' },
    { title: 'Feedback', description: 'Get pronunciation tips' }
  ]

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
      const mediaRecorder = new MediaRecorder(stream)
      mediaRecorderRef.current = mediaRecorder
      audioChunksRef.current = []

      mediaRecorder.ondataavailable = (event) => {
        audioChunksRef.current.push(event.data)
      }

      mediaRecorder.onstop = async () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/wav' })
        await evaluatePronunciation(audioBlob)
      }

      mediaRecorder.start()
      setIsRecording(true)
    } catch (error) {
      console.error('Error accessing microphone:', error)
    }
  }

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop()
      setIsRecording(false)
      mediaRecorderRef.current.stream.getTracks().forEach(track => track.stop())
    }
  }

  const evaluatePronunciation = async (audioBlob: Blob) => {
    // Simulate AI evaluation - in real app, this would call Groq API
    setTimeout(() => {
      setEvaluation({
        scores: {
          pronunciation: 85,
          fluency: 78,
          grammar: 90,
          lexis: 88
        },
        bandGuess: "A2",
        feedback: {
          summary: "Good pronunciation of basic sounds, work on liaisons",
          strengths: ["Clear 'b' sound", "Good vowel pronunciation"],
          improvements: ["Practice liaisons", "Work on 'ʁ' sound"],
          drills: ["Shadow: 'bonjour'", "Minimal pair: 'bon' vs 'bonne'"]
        }
      })
      setCurrentStep(3)
    }, 2000)
  }

  const playAudio = () => {
    // In real app, this would play the audio file
    console.log('Playing audio:', sampleLesson.audio)
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      {/* Progress Steps */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          {steps.map((step, index) => (
            <div key={index} className="flex items-center">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold ${
                index <= currentStep 
                  ? 'bg-french-500 text-white' 
                  : 'bg-gray-200 text-gray-600'
              }`}>
                {index + 1}
              </div>
              {index < steps.length - 1 && (
                <div className={`w-16 h-1 mx-2 ${
                  index < currentStep ? 'bg-french-500' : 'bg-gray-200'
                }`} />
              )}
            </div>
          ))}
        </div>
        <div className="text-center">
          <h3 className="text-lg font-semibold text-gray-800">
            {steps[currentStep].title}
          </h3>
          <p className="text-gray-600">{steps[currentStep].description}</p>
        </div>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left Column - Word Display */}
        <div className="space-y-6">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="card text-center"
          >
            <h2 className="text-4xl font-bold text-french-800 mb-2">
              {sampleLesson.word}
            </h2>
            <p className="text-lg text-gray-600 mb-4">{sampleLesson.en}</p>
            
            <div className="flex items-center justify-center space-x-4 mb-4">
              <button 
                onClick={playAudio}
                className="p-3 rounded-full bg-french-100 hover:bg-french-200 transition-colors"
              >
                <Play className="w-6 h-6 text-french-600" />
              </button>
              <div className="text-center">
                <p className="text-sm text-gray-500">IPA</p>
                <p className="text-xl font-mono text-french-600">
                  /{sampleLesson.ipa}/
                </p>
              </div>
            </div>
          </motion.div>

          {/* Sound Breakdown */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="card"
          >
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Sound Breakdown</h3>
            <div className="grid grid-cols-5 gap-2">
              {sampleLesson.breakdown.map((sound, index) => (
                <div key={index} className="text-center p-2 bg-gray-50 rounded">
                  <p className="font-mono text-lg text-french-600">{sound}</p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Practice Phrases */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="card"
          >
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Practice Phrases</h3>
            <div className="space-y-2">
              {sampleLesson.examples.map((example, index) => (
                <div key={index} className="p-3 bg-french-50 rounded">
                  <p className="text-french-800">{example}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Right Column - Recording & Evaluation */}
        <div className="space-y-6">
          {/* Recording Section */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="card"
          >
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Record Your Pronunciation</h3>
            
            <div className="text-center mb-6">
              <button
                onClick={isRecording ? stopRecording : startRecording}
                className={`w-20 h-20 rounded-full flex items-center justify-center transition-all duration-300 ${
                  isRecording 
                    ? 'bg-red-500 hover:bg-red-600 animate-pulse' 
                    : 'bg-french-500 hover:bg-french-600'
                }`}
              >
                <Mic className="w-8 h-8 text-white" />
              </button>
              <p className="text-sm text-gray-600 mt-2">
                {isRecording ? 'Click to stop recording' : 'Click to start recording'}
              </p>
            </div>

            {transcript && (
              <div className="p-3 bg-gray-50 rounded">
                <p className="text-sm text-gray-600">Your transcript:</p>
                <p className="font-medium">{transcript}</p>
              </div>
            )}
          </motion.div>

          {/* Evaluation Results */}
          {evaluation && (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="card"
            >
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Pronunciation Evaluation</h3>
              
              {/* Scores */}
              <div className="grid grid-cols-2 gap-4 mb-4">
                {Object.entries(evaluation.scores).map(([skill, score]) => (
                  <div key={skill} className="text-center">
                    <p className="text-sm text-gray-600 capitalize">{skill}</p>
                    <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
                      <div 
                        className="bg-french-500 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${score}%` }}
                      />
                    </div>
                    <p className="text-sm font-semibold mt-1">{score}%</p>
                  </div>
                ))}
              </div>

              {/* CEFR Level */}
              <div className="text-center mb-4">
                <p className="text-sm text-gray-600">Estimated Level</p>
                <span className={`cefr-badge cefr-${evaluation.bandGuess.toLowerCase()}`}>
                  {evaluation.bandGuess}
                </span>
              </div>

              {/* Feedback */}
              <div className="space-y-3">
                <div>
                  <p className="text-sm font-semibold text-green-600 mb-1">Strengths:</p>
                  <ul className="text-sm text-gray-700 space-y-1">
                    {evaluation.feedback.strengths.map((strength, index) => (
                      <li key={index} className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                        {strength}
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <p className="text-sm font-semibold text-orange-600 mb-1">Areas to Improve:</p>
                  <ul className="text-sm text-gray-700 space-y-1">
                    {evaluation.feedback.improvements.map((improvement, index) => (
                      <li key={index} className="flex items-center">
                        <XCircle className="w-4 h-4 text-orange-500 mr-2" />
                        {improvement}
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <p className="text-sm font-semibold text-french-600 mb-1">Practice Drills:</p>
                  <ul className="text-sm text-gray-700 space-y-1">
                    {evaluation.feedback.drills.map((drill, index) => (
                      <li key={index} className="flex items-center">
                        <Volume2 className="w-4 h-4 text-french-500 mr-2" />
                        {drill}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </div>

      {/* Navigation */}
      <div className="flex justify-between mt-8">
        <button 
          onClick={() => setCurrentStep(Math.max(0, currentStep - 1))}
          disabled={currentStep === 0}
          className="btn-secondary disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Previous
        </button>
        
        <button 
          onClick={() => setCurrentStep(Math.min(3, currentStep + 1))}
          disabled={currentStep === 3}
          className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Next
        </button>
      </div>
    </div>
  )
}
