
import { Globe, Users, Mail } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-dark-floor text-white py-[60px] flex flex-col gap-12 shrink-0 w-full mt-auto">
      <div className="max-w-[1240px] mx-auto w-full px-8 md:px-12 lg:px-16 flex flex-col gap-12">
        {/* Footer Top Grid */}
        <div className="flex flex-wrap gap-20 justify-between">
          {/* Brand Column */}
          <div className="max-w-[300px] flex flex-col gap-[18px]">
            <span className="font-heading text-[22px] font-extrabold text-white tracking-tight">
              DiveVerse
            </span>
            <p className="text-[13px] leading-relaxed text-[#a0a5c1]">
              Nền tảng học tiếng Anh cá nhân hóa thế hệ mới, hỗ trợ bởi công nghệ AI tiên tiến nhất.
            </p>
            {/* Socials */}
            <div className="flex gap-3 mt-1">
              <a
                href="#"
                className="w-[34px] h-[34px] bg-[#262837] rounded-full flex items-center justify-center text-white hover:bg-primary hover:scale-105 transition-all"
                aria-label="Website"
              >
                <Globe className="w-3.5 h-3.5" />
              </a>
              <a
                href="#"
                className="w-[34px] h-[34px] bg-[#262837] rounded-full flex items-center justify-center text-white hover:bg-primary hover:scale-105 transition-all"
                aria-label="Cộng đồng"
              >
                <Users className="w-3.5 h-3.5" />
              </a>
              <a
                href="#"
                className="w-[34px] h-[34px] bg-[#262837] rounded-full flex items-center justify-center text-white hover:bg-primary hover:scale-105 transition-all"
                aria-label="Liên hệ"
              >
                <Mail className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          {/* Products Link Column */}
          <div className="flex flex-col gap-[18px]">
            <span className="font-heading text-[14px] font-bold text-white tracking-wider uppercase">
              Sản phẩm
            </span>
            <ul className="flex flex-col gap-3 list-none p-0 m-0">
              <li>
                <a href="#" className="text-[#a0a5c1] hover:text-white text-[13px] transition-colors">
                  Lộ trình học
                </a>
              </li>
              <li>
                <a href="#" className="text-[#a0a5c1] hover:text-white text-[13px] transition-colors">
                  Kiểm tra trực tuyến
                </a>
              </li>
            </ul>
          </div>

          {/* Support Link Column */}
          <div className="flex flex-col gap-[18px]">
            <span className="font-heading text-[14px] font-bold text-white tracking-wider uppercase">
              Hỗ trợ
            </span>
            <ul className="flex flex-col gap-3 list-none p-0 m-0">
              <li>
                <a href="#" className="text-[#a0a5c1] hover:text-white text-[13px] transition-colors">
                  Hướng dẫn sử dụng
                </a>
              </li>
              <li>
                <a href="#" className="text-[#a0a5c1] hover:text-white text-[13px] transition-colors">
                  Liên hệ với chúng tôi
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Footer Bottom Row */}
        <div className="border-t border-[#262837] pt-6 text-center text-[12px] text-[#6e7391]">
          <p>&copy; {new Date().getFullYear()} DiveVerse. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
