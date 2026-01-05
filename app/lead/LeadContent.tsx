'use client'
import { useSearchParams } from 'next/navigation'
import { useState } from 'react'

export default function LeadContent() {
  const searchParams = useSearchParams()
  const [form, setForm] = useState({ name: '', phone: '', email: '' })
  const [submitted, setSubmitted] = useState(false)

  const answers = Object.fromEntries(searchParams.entries())

  const getResult = () => {
    const permit = answers.permitBefore1980 || 'unknown'
    const agreement = answers.agreementPercentage || 'unknown'

    const permitOk = permit === 'yes'
    const agreementHigh = agreement === 'above66'
    const agreementMedium = agreement === '50to66'
    const agreementLow = agreement === 'below50'

    if (permitOk && agreementHigh) {
      return {
        level: 'גבוה',
        icon: '✅',
        title: 'הנתונים מעולים!',
        message: 'אנו ממליצים על פגישה מיידית לניתוח הכדאיות הכלכלית ולבחירת יזם.'
      }
    }

    if (permitOk && (agreementMedium || agreement === 'unknown')) {
      return {
        level: 'בינוני',
        icon: '⚠️',
        title: 'הנתונים טובים, אך יש פער בהסכמת הדיירים.',
        message: 'נשמח לסייע בארגון ועד הבניין ובהנעת תהליך ההחתמה.'
      }
    }

    if (!permitOk || agreementLow) {
      const unitsLow = answers.unitsOver24 === 'no'
      if (!permitOk && unitsLow) {
        return {
          level: 'אפסי',
          icon: '❌',
          title: 'מצטערים, הבניין אינו עומד בתנאי הסף הבסיסיים.',
          message: 'אנו יכולים לסייע בבדיקת תוכניות בנייה קיימות ביישוב.'
        }
      }

      return {
        level: 'נמוך',
        icon: '❌',
        title: 'על פי הנתונים, הסיכוי נמוך.',
        message: 'אנו ממליצים על ייעוץ משפטי קצר לבחינת חלופות תכנוניות אחרות.'
      }
    }

    return {
      level: 'לא ודאי',
      icon: '❓',
      title: 'הנתונים חלקיים.',
      message: 'נשמח לדבר איתך ולבדוק לעומק את הפוטנציאל של הבניין.'
    }
  }

  const result = getResult()

  const submit = async () => {
    if (!form.name || !form.phone) {
      alert('נא למלא שם וטלפון')
      return
    }

    const payload = {
      answers,
      personal: form,
      result: result.level
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
      <div className="w-full bg-white rounded-2xl shadow-lg p-8 text-center">
        <div className="mb-8">
          <div className="text-6xl mb-4">{result.icon}</div>
          <h2 className="text-2xl font-bold mb-4">סיכוי {result.level}</h2>
          <h3 className="text-xl font-semibold mb-4">{result.title}</h3>
          <p className="text-gray-700 mb-6">{result.message}</p>
        </div>

        <hr className="my-8 border-gray-300" />

        <p className="mb-8 text-gray-700">
          להמשך בדיקה מעמיקה וייעוץ אישי – השאר/י פרטים ונחזור אליך בהקדם:
        </p>

        <input placeholder="שם מלא *" className="w-full border border-gray-300 rounded-xl p-4 mb-4" value={form.name} onChange={e => setForm({...form, name: e.target.value})} />
        <input placeholder="טלפון *" className="w-full border border-gray-300 rounded-xl p-4 mb-4" value={form.phone} onChange={e => setForm({...form, phone: e.target.value})} type="tel" />
        <input placeholder="אימייל (אופציונלי)" className="w-full border border-gray-300 rounded-xl p-4 mb-8" value={form.email} onChange={e => setForm({...form, email: e.target.value})} type="email" />

        <button onClick={submit} className="w-full px-8 py-4 bg-black text-white rounded-xl text-lg font-medium hover:bg-gray-800 transition">
          חזרו אליי
        </button>
      </div>
    </main>
  )
}