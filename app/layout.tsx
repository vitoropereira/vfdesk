import { Nunito } from 'next/font/google'
import './globals.css'

import { ReactNode } from 'react'

import Navbar from '@/app/components/navbar/Navbar'
import RegisterModal from '@/app/components/modals/RegisterModal'
import RentModal from './components/modals/RentModal'
import LoginModal from './components/modals/LoginModal'

import ToasterProvider from '@/app/providers/ToasterProvider'

import ClientOnly from './components/ClientOnly'
import getCurrentUser from './actions/getCurrentUser'
import SearchModal from './components/modals/SearchModal'

export const metadata = {
  title: 'Airbnb',
  description: 'Airbnb Clone',
}

const font = Nunito({
  subsets: ['latin'],
})

export default async function RootLayout({
  children,
}: {
  children: ReactNode
}) {
  const currentUser = await getCurrentUser()

  return (
    <html lang="en">
      <body className={font.className}>
        <ClientOnly>
          <ToasterProvider />
          <RentModal />
          <SearchModal />
          <LoginModal />
          <RegisterModal />
          <Navbar currentUser={currentUser} />
        </ClientOnly>
        <div className="pb-20 pt-28">{children}</div>
      </body>
    </html>
  )
}
