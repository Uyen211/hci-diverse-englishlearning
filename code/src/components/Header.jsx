import { useState } from 'react'
import { useAuthStore } from '../store/authStore'
import { useNavigate } from 'react-router-dom'

export default function Header() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false)
  const [isSettingsOpen, setIsSettingsOpen] = useState(false)
  const { user, logout } = useAuthStore()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  const toggleNotifications = () => {
    setIsNotificationsOpen(!isNotificationsOpen)
    setIsSettingsOpen(false)
    setIsDropdownOpen(false)
  }

  const toggleSettings = () => {
    setIsSettingsOpen(!isSettingsOpen)
    setIsNotificationsOpen(false)
    setIsDropdownOpen(false)
  }

  const toggleProfile = () => {
    setIsDropdownOpen(!isDropdownOpen)
    setIsNotificationsOpen(false)
    setIsSettingsOpen(false)
  }

  return (
    <header className="header">
      {/* Search Bar */}
      <div className="search-container">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#5A5A7A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="m21 21-4.34-4.34" />
          <circle cx="11" cy="11" r="8" />
        </svg>
        <input
          type="text"
          placeholder="Tìm kiếm..."
          className="search-input"
        />
      </div>

      {/* Header Actions */}
      <div className="header-actions">
        {/* Notification Button */}
        <div className="relative">
          <button
            onClick={toggleNotifications}
            className="icon-btn cursor-pointer"
            aria-label="Thông báo"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M10.268 21a2 2 0 0 0 3.464 0" />
              <path d="M3.262 15.326A1 1 0 0 0 4 17h16a1 1 0 0 0 .74-1.673C19.41 13.956 18 12.499 18 8A6 6 0 0 0 6 8c0 4.499-1.411 5.956-2.738 7.326" />
            </svg>
            <span className="badge"></span>
          </button>

          {isNotificationsOpen && (
            <>
              {/* Overlay blocker */}
              <div
                className="fixed inset-0 z-30"
                onClick={() => setIsNotificationsOpen(false)}
              />
              <div className="absolute right-0 mt-3 w-72 bg-surface border border-border shadow-xl rounded-xl p-3 z-40 animate-fade-in text-left">
                <h4 className="text-[13px] font-bold text-text-primary border-b border-border/50 pb-2 mb-2 flex justify-between items-center">
                  <span>Thông báo</span>
                  <span className="bg-primary/10 text-primary text-[10px] px-1.5 py-0.5 rounded font-extrabold">Mới</span>
                </h4>
                <div className="flex flex-col gap-2.5 max-h-60 overflow-y-auto">
                  {[
                    { id: 1, text: 'Bạn có bài kiểm tra Unit 4 cần hoàn thành.', time: '5 phút trước', read: false },
                    { id: 2, text: 'Kết quả Placement Test của bạn đạt 8.5/10.', time: '2 giờ trước', read: true },
                    { id: 3, text: 'Chào mừng bạn đến với vũ trụ DiveVerse!', time: '1 ngày trước', read: true }
                  ].map(notif => (
                    <div key={notif.id} className="flex flex-col gap-1 text-[13px] hover:bg-muted/50 p-2 rounded-lg transition-colors cursor-pointer">
                      <span className={`font-semibold ${notif.read ? 'text-text-secondary' : 'text-text-primary'}`}>{notif.text}</span>
                      <span className="text-[11px] text-text-secondary opacity-70">{notif.time}</span>
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}
        </div>

        {/* Settings Button */}
        <div className="relative">
          <button
            onClick={toggleSettings}
            className="icon-btn cursor-pointer"
            aria-label="Cài đặt"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M9.671 4.136a2.34 2.34 0 0 1 4.659 0 2.34 2.34 0 0 0 3.319 1.915 2.34 2.34 0 0 1 2.33 4.033 2.34 2.34 0 0 0 0 3.831 2.34 2.34 0 0 1-2.33 4.033 2.34 2.34 0 0 0-3.319 1.915 2.34 2.34 0 0 1-4.659 0 2.34 2.34 0 0 0-3.32-1.915 2.34 2.34 0 0 1-2.33-4.033 2.34 2.34 0 0 0 0-3.831A2.34 2.34 0 0 1 6.35 6.051a2.34 2.34 0 0 0 3.319-1.915" />
              <circle cx="12" cy="12" r="3" />
            </svg>
          </button>

          {isSettingsOpen && (
            <>
              {/* Overlay blocker */}
              <div
                className="fixed inset-0 z-30"
                onClick={() => setIsSettingsOpen(false)}
              />
              <div className="absolute right-0 mt-3 w-56 bg-surface border border-border shadow-xl rounded-xl p-2 z-40 animate-fade-in text-left">
                <h4 className="text-[13px] font-bold text-text-primary border-b border-border/50 pb-2 px-2 mb-1">
                  Cài đặt hệ thống
                </h4>
                <div className="flex flex-col gap-0.5">
                  {[
                    { id: 'profile', label: 'Tài khoản của tôi', icon: '👤' },
                    { id: 'security', label: 'Bảo mật & mật khẩu', icon: '🔒' },
                    { id: 'theme', label: 'Giao diện & ngôn ngữ', icon: '🎨' }
                  ].map(item => (
                    <button
                      key={item.id}
                      onClick={() => {
                        alert(`Tính năng ${item.label} đang được phát triển!`)
                        setIsSettingsOpen(false)
                      }}
                      className="w-full text-left text-[13.5px] font-semibold px-3 py-2 hover:bg-muted/60 text-text-primary rounded-lg flex items-center gap-2.5 cursor-pointer transition-colors"
                    >
                      <span>{item.icon}</span>
                      <span>{item.label}</span>
                    </button>
                  ))}
                </div>
              </div>
            </>
          )}
        </div>

        {/* User Profile Dropdown */}
        <div className="relative">
          <div
            onClick={toggleProfile}
            className="user-profile cursor-pointer select-none"
          >
            <span className="user-name">
              {user?.username || 'Chưa đăng nhập'}
            </span>
            <div className="user-avatar"></div>
          </div>

          {/* Profile Dropdown Popover */}
          {isDropdownOpen && (
            <>
              {/* Overlay blocker */}
              <div
                className="fixed inset-0 z-30"
                onClick={() => setIsDropdownOpen(false)}
              />
              <div className="absolute right-0 mt-3 w-48 bg-surface border border-border shadow-xl rounded-xl p-2 z-40 animate-fade-in text-left">
                <div className="px-3 py-2 border-b border-border/50 mb-1">
                  <p className="text-[11px] font-bold text-text-secondary uppercase tracking-wider">Vai trò</p>
                  <p className="text-[13px] font-semibold text-text-primary">
                    {user?.role === 'admin' ? 'Quản trị viên' : 'Học viên'}
                  </p>
                </div>
                <button
                  onClick={handleLogout}
                  className="w-full text-left text-[14px] font-semibold px-3 py-2 hover:bg-error/5 text-error rounded-lg flex items-center gap-2 cursor-pointer transition-colors"
                >
                  Đăng xuất
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </header>
  )
}
