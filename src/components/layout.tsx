import type { PropsWithChildren } from 'react'
import Header from './header'

export default function Layout({ children }: PropsWithChildren) {
  return (
    <div className='dark:bg-gradient-to-br dark:from-black dark:to-gray-950 text-white'>
        <Header />
        <main className="h-full min-h-screen container mx-auto px-4 py-8 text-black dark:text-white">{children}</main>
        <div className="">
            <footer className="flex justify-center py-2">
                Breezio © 2024
            </footer>
        </div>
    </div>
  )
}
