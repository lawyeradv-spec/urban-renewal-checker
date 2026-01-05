'use client'

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-6 bg-gray-50">
      <h1 className="text-3xl font-bold mb-4">בדיקה ראשונית להתחדשות עירונית</h1>
      <p className="text-center mb-8 max-w-md text-gray-600">
        בדיקה קצרה, ללא התחייבות וללא ייעוץ משפטי
      </p>
      <a
        href="/eligibility"
        className="px-8 py-4 bg-black text-white rounded-xl text-lg font-medium hover:bg-gray-800 transition"
      >
        בדיקת זכאות
      </a>
    </main>
  )
}