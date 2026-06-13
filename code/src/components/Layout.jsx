import { Outlet } from 'react-router-dom'
import Sidebar from './Sidebar'
import Header from './Header'
import Footer from './Footer'
import { ToastContainer } from './Toast'

export default function Layout() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <ToastContainer />
      <div className="flex flex-1 max-w-[1440px] mx-auto w-full">
        <Sidebar />

        <div className="flex-1 flex flex-col w-full min-w-0 min-h-screen">
          <Header />

          {/* Main content */}
          <main className="flex-1 w-full max-w-[1440px] mx-auto px-4 md:px-8 lg:px-10 py-6 md:py-8 flex flex-col">
            <Outlet />
          </main>
        </div>
      </div>

      <Footer />
    </div>
  )
}
