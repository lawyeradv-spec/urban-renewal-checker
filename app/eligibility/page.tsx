'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

const questions = [
  { key: 'city', label: 'באיזו עיר נמצא הבניין?', type: 'text' },
  { key: 'units', label: 'כמה דירות יש בבניין?', type: 'number', min: 1 },
  { key: 'year', label: 'שנת בנייה משוערת?', type: 'number', min: 1900, max: new Date().getFullYear() },
  {
    key: 'elevator',
    label: 'האם קיימת מעלית בבניין?',
    type: 'select',
    options: [
      { value: 'yes', label: 'כן' },
      { value: 'no', label: 'לא' },
    ],
  },
  {
    key: 'developer',
    label: 'האם פנו אליכם יזמים בעבר?',
    type: 'select',
    options: [
      { value: 'yes', label: 'כן' },
      { value: 'no', label: 'לא' },
    ],
  },
]

export default function Eligibility() {
  const [step, setStep] = useState(0)
  const [answers, setAnswers] = useState<Record<string, string>>({})
  const [currentAnswer, setCurrentAnswer] = useState('')
  const router = useRouter()

  const currentQuestion = questions[step]

  const next = () => {
    if (!currentAnswer.trim()) return // ולידציה פשוטה

    setAnswers({ ...answers, [currentQuestion.key]: currentAnswer })

    if (step < questions.length - 1) {
      setStep(step + 1)
      setCurrentAnswer('')
    } else {
      // העברת כל התשובות לדף הליד
      const params = new URLSearchParams({ ...answers, [currentQuestion.key]: currentAnswer })
      router.push(`/lead?${params.toString()}`)
    }
  }

  const back = () => {
    if (step > 0) {
      // מחיקת התשובה הנוכחית כדי לא לשמור ריק
      const newAnswers = { ...answers }
      delete newAnswers[currentQuestion.key]
      setAnswers(newAnswers)
      setStep(step - 1)
      setCurrentAnswer(answers[currentQuestion.key] || '')
    }
  }

  return (
    <main className="min-h-screen flex flex-col justify-center items-center p-6 max-w-lg mx-auto">
      <div className="w-full bg-white rounded-2xl shadow-lg p-8">
        <div className="mb-8">
          <p className="text-sm text-gray-500 text-center">
            שאלה {step + 1} מתוך {questions.length}
          </p>
          <progress
            className="w-full h-2 mt-2"
            value={step + 1}
            max={questions.length}
          />
        </div>

        <h2 className="text-2xl font-bold mb-8">{currentQuestion.label}</h2>

        {currentQuestion.type === 'select' ? (
          <select
            className="w-full border border-gray-300 rounded-xl p-4 text-lg"
            value={currentAnswer}
            onChange={(e) => setCurrentAnswer(e.target.value)}
          >
            <option value="">בחר/י...</option>
            {currentQuestion.options?.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        ) : (
          <input
            type={currentQuestion.type}
            min={currentQuestion.min}
            max={currentQuestion.max}
            className="w-full border border-gray-300 rounded-xl p-4 text-lg"
            value={currentAnswer}
            onChange={(e) => setCurrentAnswer(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && next()}
            placeholder="הקלד כאן..."
          />
        )}

        <div className="flex justify-between mt-10">
          <button
            onClick={back}
            disabled={step === 0}
            className="px-6 py-3 text-gray-600 disabled:text-gray-400"
          >
            חזור
          </button>

          <button
            onClick={next}
            disabled={!currentAnswer.trim()}
            className="px-8 py-3 bg-black text-white rounded-xl disabled:bg-gray-300"
          >
            {step === questions.length - 1 ? 'סיום' : 'המשך'}
          </button>
        </div>
      </div>
    </main>
  )
}