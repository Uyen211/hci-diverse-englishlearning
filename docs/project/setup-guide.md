# Hướng dẫn thiết lập và chạy dự án (Setup & Installation Guide)

Tài liệu này hướng dẫn cách cấu hình dự án từ đầu dành cho lập trình viên mới sau khi clone mã nguồn từ GitHub về máy cá nhân. Do một số thư mục chứa mã nguồn nặng hoặc file môi trường được cấu hình trong `.gitignore` để không đẩy lên Git, bạn cần làm theo các bước dưới đây để chạy được dự án hoàn chỉnh.

---

## I. Các thư mục/file bị bỏ qua (Git Ignored)
Khi bạn clone dự án từ GitHub, các thành phần sau sẽ **không** có sẵn và cần được cài đặt/khởi tạo lại:
* **`node_modules/`**: Thư mục chứa toàn bộ mã nguồn của các thư viện bên thứ ba (Tailwind, React Router, Zustand, Zod,...).
* **`dist/`**: Thư mục chứa bản build đóng gói tối ưu để chạy trên môi trường thực tế (production).
* **Các file log và config cá nhân** của trình chỉnh sửa code (như `.vscode/`, `.idea/`).

---

## II. Điều kiện tiên quyết (Prerequisites)
Trước khi cài đặt, hãy đảm bảo máy tính của bạn đã cài đặt các công cụ sau:
1. **Git**: Để quản lý mã nguồn và kéo code.
2. **Node.js**: Phiên bản đề xuất là **Node.js LTS (phiên bản 18 hoặc 20 trở lên)**.
   * Để kiểm tra xem máy đã cài Node.js chưa, mở Terminal/Command Prompt và chạy:
     ```bash
     node -v
     npm -v
     ```

---

## III. Các bước thiết lập dự án từ đầu (Step-by-Step Setup)

### Bước 1: Clone dự án về máy
Mở Terminal và chạy lệnh clone repository từ GitHub:
```bash
git clone <url-repository-cua-ban>
```

### Bước 2: Di chuyển vào thư mục chứa code Frontend
Dự án được chia làm nhiều thư mục con (ví dụ: tài liệu `docs/` và mã nguồn Frontend `code/`). Bạn cần chuyển dấu nhắc dòng lệnh vào thư mục chứa mã nguồn:
```bash
cd code
```

### Bước 3: Khôi phục và cài đặt thư viện (`node_modules`)
Do thư mục `node_modules` bị chặn bởi `.gitignore`, bạn phải chạy lệnh sau để trình quản lý gói `npm` tự động đọc file `package.json` và tải về toàn bộ các thư viện cần thiết:
```bash
npm install
```
*Thời gian cài đặt dao động từ 1 - 3 phút tùy thuộc vào tốc độ mạng.*

### Bước 4: Khởi chạy môi trường phát triển (Local Development)
Sau khi cài đặt thành công, hãy kích hoạt dev server cục bộ của Vite bằng lệnh:
```bash
npm run dev
```
* Màn hình Terminal sẽ xuất hiện thông tin chạy thành công:
  ```bash
  ➜  Local:   http://localhost:5173/
  ```
* Mở trình duyệt web và truy cập địa chỉ [http://localhost:5173/](http://localhost:5173/) để trải nghiệm giao diện hoàn chỉnh.

---

## IV. Kiểm tra và Đóng gói (Build & Preview)

### 1. Kiểm tra lỗi cú pháp (Linting)
Trước khi đẩy code mới lên GitHub, bạn nên chạy lệnh kiểm tra lỗi code để tránh làm hỏng dự án chung:
```bash
npm run lint
```

### 2. Đóng gói mã nguồn (Production Build)
Khi cần triển khai ứng dụng lên server thực tế (như Vercel, Netlify hoặc Hosting), hãy chạy lệnh build để đóng gói mã nguồn thành các file HTML/JS/CSS tĩnh tối ưu hóa nằm trong thư mục `dist/`:
```bash
npm run build
```

### 3. Chạy thử bản đóng gói tĩnh (Preview)
Để chạy thử bản build tĩnh ngay trên máy cá nhân trước khi deploy thực tế:
```bash
npm run preview
```
Hệ thống sẽ chạy một máy chủ cục bộ (thường ở cổng `4173`) để bạn duyệt thử bản build hoàn chỉnh.

---

## V. Các lỗi thường gặp và cách xử lý (Troubleshooting)

* **Lỗi: `npm command not found` hoặc `node is not recognized`**:
  * *Cách sửa*: Bạn chưa cài đặt Node.js hoặc chưa thêm Node.js vào biến môi trường hệ thống (PATH). Hãy tải bản Node.js installer mới nhất từ trang chủ [nodejs.org](https://nodejs.org) và cài đặt lại.
* **Lỗi: `Missing dependency...` khi chạy dự án**:
  * *Cách sửa*: Chạy lại lệnh `npm install` để cập nhật và tải các package còn thiếu.
* **Lỗi: Cổng `5173` đã bị chiếm dụng (Port in use)**:
  * *Cách sửa*: Vite sẽ tự động đổi sang cổng tiếp theo (ví dụ `5174`). Hoặc bạn có thể ép chạy ở cổng khác bằng cách thêm tham số: `npm run dev -- --port 8080`.
