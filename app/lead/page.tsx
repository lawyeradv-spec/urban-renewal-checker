import { Suspense } from 'react'
import LeadContent from './LeadContent'

export default function Lead() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center text-xl">טוען תוצאה...</div>}>
      <LeadContent />
    </Suspense>
  )
}