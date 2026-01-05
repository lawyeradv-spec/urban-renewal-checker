import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  const data = await req.json()
  
  console.log('New lead:', data)
  
  // כאן תוכל להוסיף שליחה ל-CRM, Google Sheets, Email וכו'
  // לדוגמה: שליחה ל-Webhook של Make/Zapier
  // await fetch('https://hook.make.com/...', { method: 'POST', body: JSON.stringify(data) })

  return NextResponse.json({ success: true })
}