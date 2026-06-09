# Hướng dẫn chuyển đổi giao diện tĩnh (HTML/CSS Figma) sang Giao diện Web động (React/Vite/Tailwind)

Tài liệu này đúc kết quy trình và các bài học kinh nghiệm thực tế trong quá trình chuyển đổi giao diện từ các bản wireframe Figma tĩnh (`.html`) thành ứng dụng Web React động, responsive và tối ưu hiệu năng.

---

## I. Sự khác biệt giữa Giao diện tĩnh & Giao diện động

| Đặc tính | Giao diện tĩnh (Figma HTML) | Giao diện động (React App) |
|---|---|---|
| **Bố cục (Layout)** | Thường cố định kích thước (ví dụ: `1440px`), định vị tuyệt đối để khớp bản vẽ. | Co giãn linh hoạt theo kích thước màn hình (Responsive), lấp đầy viewport. |
| **Quản lý Style** | CSS viết chồng chéo, có nhiều lớp reset thô bạo trên toàn cục (như `*`). | Quản lý theo cấu trúc phân tầng (Design Tokens, Tailwind, CSS variables). |
| **Dữ liệu** | Được viết cứng (hardcoded) trực tiếp trong mã HTML. | Load động qua Services, Mock Data, State Management. |
| **Tái sử dụng** | Copy-paste các khối code HTML lặp đi lặp lại. | Đóng gói thành các Components (`Card`, `Button`, `DataTable`, `Modal`). |

---

## II. Quy trình chuyển đổi 4 bước tiêu chuẩn

### Bước 1: Phân tách và cô lập CSS gốc (`figma.css`)
Để giữ được 100% linh hồn thiết kế của Figma (các dải màu gradient nebula, galactic, font chữ, độ bo góc, kiểu dáng sidebar đặc thù), chúng ta gom toàn bộ CSS tĩnh của các wireframe vào file `src/figma.css`.

> [!WARNING]
> **Bài học xương máu về reset CSS toàn cục:**
> Các file HTML Figma tự động xuất ra thường chứa rule reset:
> ```css
> * {
>     margin: 0;
>     padding: 0;
>     box-sizing: border-box;
> }
> ```
> Quy tắc này sẽ triệt tiêu toàn bộ khoảng đệm (`padding` và `margin`) của các component động và các thư viện bên thứ ba (như Shadcn UI, Tailwind).
> * **Giải pháp:** Phải lọc sạch và xóa bỏ `margin: 0; padding: 0;` khỏi selector `*` trong `figma.css`. Chỉ để lại `box-sizing: border-box;`.

### Bước 2: Thiết lập hệ thống thiết kế động (`index.css`)
File `src/index.css` sẽ đóng vai trò là "trái tim" của hệ thống styling động:
1. Import các thư viện lõi: Tailwind CSS, animate, và Shadcn UI.
2. Định nghĩa Design System động trong khối `@theme inline` (quy định rõ các biến màu sắc, font chữ chuẩn như `Be Vietnam Pro` cho tiêu đề, `Inter` cho nội dung, độ bo góc `radius-lg`...).
3. Tạo các biến CSS Variables cho chế độ Sáng/Tối (Light/Dark mode).

> [!IMPORTANT]
> **Thứ tự import quyết định quyền ưu tiên (Cascading):**
> Trong file đầu vào chính [main.jsx](file:///d:/Study/TLU/human_computer_interaction/fe/code/src/main.jsx), chúng ta bắt buộc phải nạp `figma.css` trước, sau đó mới nạp `index.css`:
> ```javascript
> import './figma.css'  // Nền tảng Figma tĩnh
> import './index.css'  // Bộ lọc ghi đè động và Tailwind (Ưu tiên cao hơn)
> ```

### Bước 3: Hóa giải các định dạng kích thước cứng (Responsive Override)
Các thiết kế Figma tĩnh thường ép kích thước màn hình `1440px` và căn giữa bằng padding trên thẻ `body`. Để chuyển sang ứng dụng web chạy tốt trên mọi màn hình, chúng ta ghi đè trong `index.css`:
```css
body {
  background-color: var(--canvas) !important;
  padding: 0 !important;
  display: block !important; /* Hóa giải display: flex và gap: 100px của Figma */
}

.app-container {
  width: 100% !important; /* Thay thế width: 1440px */
  max-width: 100% !important;
  min-height: 100vh !important;
  border-radius: 0 !important;
  box-shadow: none !important;
}

.body-wrapper {
  width: 100% !important;
}
```

### Bước 4: Đóng gói các Component React tái sử dụng
1. **Phân tích các cụm giao diện lặp lại**: Tìm các đoạn mã như bảng dữ liệu, khối phân trang, các thẻ học tập, các ô nhập liệu.
2. **Viết Component**: Đưa các cấu trúc HTML đó vào các file nhỏ trong `src/components/` (ví dụ: `DataTable.jsx`, `Pagination.jsx`, `Modal.jsx`).
3. **Mở rộng khả năng custom bằng Tailwind**: Luôn truyền prop `className` vào thẻ bọc ngoài cùng của component và sử dụng hàm `cn(...)` để kết hợp style mặc định với các class tùy biến bên ngoài:
   ```jsx
   import { cn } from "@/lib/utils"
   
   export default function MyComponent({ className, children, ...props }) {
     return (
       <div className={cn("p-6 rounded-xl bg-card border", className)} {...props}>
         {children}
       </div>
     )
   }
   ```

---

## III. Các lỗi giao diện thường gặp & Cách khắc phục

### 1. Lỗi chữ và nút bị dính sát viền thẻ (Sát lề)
* **Nguyên nhân**: Do class cha bị ghi đè CSS ép `padding: 0` từ `figma.css` hoặc do thiếu class padding động của Tailwind.
* **Cách xử lý**:
  * Kiểm tra xem các selector dạng `[data-slot="card"]` hoặc các class card tương ứng có bị ghi đè không.
  * Bổ sung định dạng padding an toàn vào `index.css`:
    ```css
    [data-slot="card"] {
      padding: 24px !important; /* p-6 tương ứng */
    }
    ```
  * Hoặc truyền trực tiếp class `p-6` vào thuộc tính `className` của component.

### 2. Lỗi các icon cảnh báo / validate bị bóp méo, thu nhỏ
* **Nguyên nhân**: Khi chuỗi văn bản cảnh báo quá dài hoặc nằm trong lưới grid hẹp, thẻ SVG của icon bị trình duyệt tự động co lại (`flex-shrink`) để nhường chỗ cho chữ.
* **Cách xử lý**: Cấu hình thuộc tính chống co giãn cho icon trong `index.css`:
  ```css
  .error-message svg {
    width: 14px !important;
    height: 14px !important;
    min-width: 14px !important;
    min-height: 14px !important;
    flex-shrink: 0 !important; /* Chống co giãn tuyệt đối */
  }
  ```
### 3. Lỗi thẻ lộ trình đơn lẻ bị kéo giãn 100% chiều rộng
* **Nguyên nhân**: Sử dụng flexbox mà không giới hạn độ rộng tối đa của thẻ khi danh sách chỉ có 1 phần tử.
* **Cách xử lý**: Sử dụng thuộc tính `max-width` chia đều theo lưới 3 cột:
  ```css
  .curriculum-card {
    max-width: calc((100% - 48px) / 3) !important;
    flex: 1 1 calc((100% - 48px) / 3) !important;
  }
  ```
