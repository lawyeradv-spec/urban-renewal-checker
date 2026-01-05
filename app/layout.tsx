import type { Metadata } from 'next'
import './globals.css'


export const metadata: Metadata = {
  title: 'בדיקת זכאות להתחדשות עירונית',
  description: 'בדיקה ראשונית מהירה וללא התחייבות',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="he" dir="rtl">
      <body className="bg-gray-50 text-right font-sans">
        {children}
      </body>
    </html>
  )
}