# DiveVerse - Light Mode Universe English Learning Platform

Chào mừng bạn đến với kho lưu trữ chính của dự án **DiveVerse** Frontend! Đây là nền tảng học tiếng Anh cá nhân hóa thế hệ mới với phong cách thiết kế hiện đại, nhẹ nhàng và tương tác cao.

Dự án này được chia làm hai phân khu chính:
1. **`code/`**: Chứa mã nguồn ứng dụng frontend (React + Vite).
2. **`docs/`**: Chứa toàn bộ tài liệu đặc tả thiết kế, wireframe Figma và tài liệu hướng dẫn kỹ thuật.

---

## 1. Cấu trúc thư mục tổng quan

```bash
fe/
├── code/               # Mã nguồn ứng dụng Frontend (React + Vite)
│   ├── src/            # Thư mục source code (components, pages, services,...)
│   └── README.md       # [Đọc đầu tiên] Quy tắc công nghệ và cấu trúc code chi tiết
└── docs/               # Tài liệu dự án
    ├── design-rule/    # Quy tắc thiết kế và chuyển đổi giao diện
    │   ├── DESIGN.md   # Hệ thống thiết kế (Design System) của DiveVerse
    │   └── conversion-guide.md # Hướng dẫn chuyển đổi từ HTML tĩnh sang React
    ├── figma/          # Các file wireframe HTML tĩnh xuất ra từ Figma
    └── project/        # Tài liệu hướng dẫn cài đặt và nghiệp vụ
        ├── setup-guide.md # Hướng dẫn cài đặt và chạy dự án khi clone từ Git
        └── usecase.md  # Kịch bản nghiệp vụ (Usecases) của dự án
```

---

## 2. Lối tắt đến các tài liệu cốt lõi (Core Guides)

Để giúp lập trình viên và các trợ lý AI nhanh chóng tiếp cận dự án, hãy tham khảo các tài liệu hướng dẫn chuyên sâu dưới đây:

* 🚀 **Cài đặt & Chạy dự án lần đầu**: Xem hướng dẫn tại [docs/project/setup-guide.md](file:///d:/Study/TLU/human_computer_interaction/fe/docs/project/setup-guide.md) để biết cách phục hồi gói thư viện (`node_modules`) và khởi chạy máy chủ phát triển cục bộ (`npm run dev`).
* 🎨 **Hệ thống thiết kế (Design System)**: Xem [docs/design-rule/DESIGN.md](file:///d:/Study/TLU/human_computer_interaction/fe/docs/design-rule/DESIGN.md) để tra cứu bảng màu chuẩn (brand colors), font chữ (`Be Vietnam Pro` & `Inter`), độ bo góc, và các hiệu ứng phát sáng (glow) đặc thù thay cho đổ bóng.
* 🔀 **Quy trình chuyển đổi giao diện Figma**: Đọc [docs/design-rule/conversion-guide.md](file:///d:/Study/TLU/human_computer_interaction/fe/docs/design-rule/conversion-guide.md) để học cách chuyển các mã CSS tĩnh từ Figma thành các component động tối ưu responsive, tránh các lỗi phổ biến (sát lề, co rút icon validate).
* 💻 **Quy chuẩn phát triển Code**: Xem chi tiết tại [code/README.md](file:///d:/Study/TLU/human_computer_interaction/fe/code/README.md) để biết cách tạo Route phân quyền (Role Guard), sử dụng biểu mẫu validate (`react-hook-form` + `zod`), và kết nối trang với kho chứa dữ liệu giả lập **`src/mockdata/`** qua lớp **`src/services/`**.

---

## 3. Khởi chạy nhanh dự án

Để chạy nhanh giao diện web cục bộ:
```bash
# 1. Di chuyển vào thư mục code
cd code

# 2. Cài đặt các gói thư viện phụ thuộc
npm install

# 3. Khởi chạy dev server
npm run dev
```
Truy cập [http://localhost:5173/](http://localhost:5173/) trên trình duyệt của bạn sau khi khởi chạy thành công.
