'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  Home, 
  Mic, 
  BookOpen, 
  Target, 
  BarChart3,
  Settings
} from 'lucide-react'

interface NavItem {
  id: string
  label: string
  icon: any
  description: string
}

const navItems: NavItem[] = [
  {
    id: 'dashboard',
    label: 'Dashboard',
    icon: Home,
    description: 'Overview & progress'
  },
  {
    id: 'pronunciation',
    label: 'Pronunciation',
    icon: Mic,
    description: 'Master French sounds'
  },
  {
    id: 'srs',
    label: 'SRS Trainer',
    icon: BookOpen,
    description: 'Spaced repetition'
  },
  {
    id: 'tcf',
    label: 'TCF Simulator',
    icon: Target,
    description: 'Exam practice'
  },
  {
    id: 'progress',
    label: 'Progress',
    icon: BarChart3,
    description: 'Track your learning'
  },
  {
    id: 'settings',
    label: 'Settings',
    icon: Settings,
    description: 'Preferences'
  }
]

interface NavigationProps {
  activeTab: string
  onTabChange: (tab: string) => void
}

export default function Navigation({ activeTab, onTabChange }: NavigationProps) {
  return (
    <nav className="bg-white shadow-lg border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <div className="flex-shrink-0 flex items-center">
              <div className="w-8 h-8 bg-gradient-to-r from-french-500 to-blue-500 rounded-lg flex items-center justify-center mr-3">
                <span className="text-white text-lg font-bold">🇫🇷</span>
              </div>
              <span className="text-xl font-bold text-gray-800">French TCF Trainer</span>
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => onTabChange(item.id)}
                className={`relative px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  activeTab === item.id
                    ? 'text-french-600 bg-french-50'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                }`}
              >
                <div className="flex items-center space-x-2">
                  <item.icon className="w-4 h-4" />
                  <span>{item.label}</span>
                </div>
                
                {activeTab === item.id && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute inset-0 bg-french-50 rounded-lg border border-french-200"
                    initial={false}
                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                  />
                )}
              </button>
            ))}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button className="p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => onTabChange(item.id)}
                className={`w-full text-left px-3 py-2 rounded-md text-base font-medium ${
                  activeTab === item.id
                    ? 'bg-french-100 text-french-700'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                }`}
              >
                <div className="flex items-center space-x-3">
                  <item.icon className="w-5 h-5" />
                  <div>
                    <div className="font-medium">{item.label}</div>
                    <div className="text-sm text-gray-500">{item.description}</div>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </nav>
  )
}
