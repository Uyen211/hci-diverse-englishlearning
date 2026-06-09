import { Outlet } from 'react-router-dom'
import Sidebar from './Sidebar'
import Header from './Header'
import Footer from './Footer'

export default function Layout() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <div className="flex flex-1">
        <Sidebar />

        <div className="flex-1 flex flex-col w-full min-w-0">
          <Header />

          {/* Main content */}
          <main className="flex-1 w-full px-4 md:px-8 lg:px-10 py-6 md:py-8">
            <Outlet />
          </main>
        </div>
      </div>

      <Footer />
    </div>
  )
}