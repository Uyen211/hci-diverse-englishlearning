import { create } from 'zustand'

export const useAuthStore = create((set) => {
  // Try to load user from localStorage if it exists
  const storedUser = localStorage.getItem('diveverse_user')
  const initialUser = storedUser ? JSON.parse(storedUser) : null

  return {
    user: initialUser,
    login: (username, password) => {
      // Clean inputs
      const userLower = username.trim().toLowerCase()
      const pass = password.trim()

      if (userLower === 'admin' && pass === 'admin123') {
        const adminUser = { username: 'Quản trị viên', role: 'admin' }
        localStorage.setItem('diveverse_user', JSON.stringify(adminUser))
        set({ user: adminUser })
        return { success: true }
      } else if (userLower === 'student' && pass === 'student123') {
        const studentUser = { username: 'Học viên Alex', role: 'student' }
        localStorage.setItem('diveverse_user', JSON.stringify(studentUser))
        set({ user: studentUser })
        return { success: true }
      } else {
        return { success: false, message: 'Tên đăng nhập hoặc mật khẩu không chính xác' }
      }
    },
    logout: () => {
      localStorage.removeItem('diveverse_user')
      set({ user: null })
    },
  }
})
