//import './globals.css'
'use client';
import { Inter } from 'next/font/google';
import { Provider } from 'react-redux';
import { store } from './store';

const inter = Inter({ subsets: ['latin'] })

const metadata = {
  title: 'DeliveryApp',
  description: 'Generated by create next app',
}

export default function RootLayout({ children }) {
  return (
    <html lang="uk">
      <Provider store={store}>
      <body className={inter.className}>
        {children}
      </body>
      </Provider>
    </html>
  )
}
