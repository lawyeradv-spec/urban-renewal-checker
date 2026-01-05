import { NextResponse } from 'next/server'
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(req: Request) {
  const data = await req.json()
  
  const { answers, personal, result } = data

  // בנה את תוכן האימייל
  const emailContent = `
    <h2>ליד חדש מבדיקת זכאות להתחדשות עירונית</h2>
    <p><strong>תוצאה:</strong> סיכוי ${result}</p>
    
    <h3>פרטי יצירת קשר:</h3>
    <ul>
      <li>שם: ${personal.name}</li>
      <li>טלפון: ${personal.phone}</li>
      <li>אימייל: ${personal.email || 'לא צוין'}</li>
    </ul>
    
    <h3>תשובות השאלון:</h3>
    <ul>
      <li>עיר: ${answers.city || 'לא צוין'}</li>
      <li>מספר דירות: ${answers.units || 'לא צוין'}</li>
      <li>שנת בנייה: ${answers.year || 'לא צוין'}</li>
      <li>מעלית: ${answers.elevator === 'yes' ? 'כן' : answers.elevator === 'no' ? 'לא' : 'לא צוין'}</li>
      <li>פניית יזמים בעבר: ${answers.developer === 'yes' ? 'כן' : answers.developer === 'no' ? 'לא' : 'לא צוין'}</li>
      <li>היתר לפני 1980: ${answers.permitBefore1980 === 'yes' ? 'כן' : answers.permitBefore1980 === 'no' ? 'לא' : 'לא יודע'}</li>
      <li>יותר מקומה אחת: ${answers.moreThanOneFloor === 'yes' ? 'כן' : 'לא'}</li>
      <li>הסכמה 66%+: ${answers.agreementPercentage === 'above66' ? 'כן' : answers.agreementPercentage === '50to66' ? 'בין 50-66%' : answers.agreementPercentage === 'below50' ? 'פחות מ-50%' : 'לא יודע'}</li>
      <li>מעל 24 דירות במתחם: ${answers.unitsOver24 === 'yes' ? 'כן' : answers.unitsOver24 === 'no' ? 'לא' : 'לא יודע'}</li>
      <li>מתאים לתב"ע פינוי-בינוי: ${answers.urbanPlan === 'yes' ? 'כן' : answers.urbanPlan === 'no' ? 'לא' : 'לא יודע'}</li>
    </ul>
    
    <p>נא ליצור קשר בהקדם!</p>
  `

  try {
    await resend.emails.send({
      from: 'ליד התחדשות עירונית <lawyer.adv@gmail.com>', // שנה למייל שלך או דומיין אם יש
      to: ['avraham@zivcohenlaw.com'], // כאן שים את המייל של המשרד (אפשר להוסיף כמה: ['mail1@example.com', 'mail2@example.com']
      subject: `ליד חדש - סיכוי ${result} - ${personal.name}`,
      html: emailContent,
    })

    console.log('Email sent successfully:', data)
  } catch (error) {
    console.error('Error sending email:', error)
  }

  return NextResponse.json({ success: true })
}