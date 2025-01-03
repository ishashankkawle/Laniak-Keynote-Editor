import { Poppins } from 'next/font/google'
import 'bootstrap/dist/css/bootstrap.min.css'
import './globals.css'


const inter = Poppins({ weight:'500', subsets: ['latin'] })

export const metadata = {
  title: 'Technote Builder',
  description: 'Editor for enerating pages and articles for Technote',
}



export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
          {children}
        </body>
    </html>
  )
}
