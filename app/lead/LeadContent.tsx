import { useSearchParams } from 'next/navigation'
import { useState } from 'react'

export default function LeadContent() {
  const searchParams = useSearchParams()
  const [form, setForm] = useState({ name: '', phone: '', email: '' })
  const [submitted, setSubmitted] = useState(false)

  const answers: Record<string, string> = Object.fromEntries(searchParams.entries())

  const submit = async () => {
    if (!form.name || !form.phone) {
      alert('נא למלא שם וטלפון')
      return
    }

    const payload = {
      answers,
      personal: form,
    }

    await fetch('/api/lead', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    })

    setSubmitted(true)
  }

  if (submitted) {
    return (
      <main className="min-h-screen flex flex-col items-center justify-center p-6">
        <h2 className="text-3xl font-bold mb-4">תודה רבה!</h2>
        <p className="text-xl text-center">הפרטים התקבלו, ניצור עמך קשר בהקדם.</p>
      </main>
    )
  }

  return (
    <main className="min-h-screen flex flex-col justify-center items-center p-6 max-w-lg mx-auto">
      <div className="w-full bg-white rounded-2xl shadow-lg p-8">
        <h2 className="text-2xl font-bold mb-6">תוצאה ראשונית</h2>
        <p className="mb-8 text-gray-700">
          על פי התשובות שסיפקת, ייתכן שקיים פוטנציאל להתחדשות עירונית בבניינך.
          <br />
          להמשך בדיקה מעמיקה – השאר/י פרטים ונחזור אליך:
        </p>

        <input
          placeholder="שם מלא *"
          className="w-full border border-gray-300 rounded-xl p-4 mb-4"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />
        <input
          placeholder="טלפון *"
          className="w-full border border-gray-300 rounded-xl p-4 mb-4"
          value={form.phone}
          onChange={(e) => setForm({ ...form, phone: e.target.value })}
          type="tel"
        />
        <input
          placeholder="אימייל (אופציונלי)"
          className="w-full border border-gray-300 rounded-xl p-4 mb-8"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          type="email"
        />

        <button
          onClick={submit}
          className="w-full px-8 py-4 bg-black text-white rounded-xl text-lg font-medium hover:bg-gray-800 transition"
        >
          חזרו אליי
        </button>
      </div>
    </main>
  )
}