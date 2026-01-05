'use client'
import { Suspense } from 'react'
import LeadContent from './LeadContent' // ניצור קובץ נפרד לתוכן

export default function Lead() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center">טוען...</div>}>
      <LeadContent />
    </Suspense>
  )
}