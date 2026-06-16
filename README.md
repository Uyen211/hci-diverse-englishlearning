# DiveVerse - Nền tảng Học Tiếng Anh Cá nhân hóa Thế hệ mới (Light Mode Universe)

Chào mừng bạn đến với dự án **DiveVerse**! Đây là nền tảng học tiếng Anh cá nhân hóa tiên tiến, tập trung vào trải nghiệm tương tác cao của người học. Hệ thống được thiết kế theo phong cách giao diện **"Light Mode Universe"** (Vũ trụ ánh sáng) – một phong cách thiết kế hiện đại, thoáng đãng, mang hơi hướng vũ trụ dịu mắt với các hiệu ứng phát sáng (glow) thay thế cho đổ bóng truyền thống, kết hợp cùng hiệu ứng kính mờ (glassmorphism) sang trọng.

Dự án này được chia thành hai khu vực chính:
1. **[code/](file:///d:/Study/TLU/human_computer_interaction/fe/code)**: Chứa toàn bộ mã nguồn của ứng dụng Frontend (React + Vite).
2. **[docs/](file:///d:/Study/TLU/human_computer_interaction/fe/docs)**: Chứa tài liệu đặc tả thiết kế, wireframe Figma và tài liệu hướng dẫn kỹ thuật.

---

## 1. Giới thiệu dự án

**DiveVerse** là một giải pháp chuyển đổi trải nghiệm học tiếng Anh từ việc ghi nhớ thụ động sang khám phá tương tác chủ động. Nền tảng cung cấp lộ trình học cá nhân hóa theo cấp độ (từ cơ bản đến nâng cao, quy chiếu theo khung điểm IELTS hoặc TOEIC), rèn luyện toàn diện 4 kỹ năng (Nghe, Nói, Đọc, Viết) và hệ thống hóa kiến thức Từ vựng & Ngữ pháp thông qua thuật toán Lặp ngắt quãng SRS (Spaced Repetition System).

---

## 2. Cấu trúc thư mục dự án

### Cấu trúc thư mục tổng quan
```bash
fe/
├── code/               # Mã nguồn ứng dụng Frontend (React + Vite)
│   ├── src/            # Thư mục mã nguồn chính (components, pages, services,...)
│   └── README.md       # Quy tắc công nghệ và cấu trúc code chi tiết cho lập trình viên
└── docs/               # Tài liệu của dự án
    ├── design-rule/    # Quy tắc thiết kế hệ thống và giao diện
    │   ├── DESIGN.md   # Hệ thống thiết kế (Design System) của DiveVerse
    │   └── conversion-guide.md # Hướng dẫn chuyển đổi CSS/HTML tĩnh từ Figma sang React
    ├── figma/          # Các trang wireframe HTML tĩnh xuất ra từ Figma để tham khảo
    └── project/        # Tài liệu nghiệp vụ & cài đặt
        ├── setup-guide.md # Hướng dẫn cài đặt và thiết lập dự án ban đầu
        └── usecase.md  # Kịch bản nghiệp vụ (Use Cases) chi tiết
```

*   **Tài liệu hướng dẫn cài đặt**: [setup-guide.md](file:///d:/Study/TLU/human_computer_interaction/fe/docs/project/setup-guide.md)
*   **Hệ thống thiết kế DiveVerse**: [DESIGN.md](file:///d:/Study/TLU/human_computer_interaction/fe/docs/design-rule/DESIGN.md)
*   **Kịch bản nghiệp vụ chi tiết**: [usecase.md](file:///d:/Study/TLU/human_computer_interaction/fe/docs/project/usecase.md)
*   **Quy chuẩn phát triển Code**: [README.md](file:///d:/Study/TLU/human_computer_interaction/fe/code/README.md)

### Cấu trúc chi tiết mã nguồn Frontend ([code/src/](file:///d:/Study/TLU/human_computer_interaction/fe/code/src))
```bash
code/src/
├── components/         # Các Component React dùng chung toàn hệ thống
│   ├── ui/             # Các Component UI nguyên tử của Shadcn UI (Button, Card, Input,...)
│   ├── Sidebar.jsx     # Thanh điều hướng bên (hỗ trợ thu gọn/mở rộng linh hoạt)
│   ├── Header.jsx      # Thanh công cụ trên (chứa thanh tìm kiếm, thông tin cá nhân, breadcrumbs)
│   ├── Footer.jsx      # Chân trang với màu nền tối (Dark Floor) tạo điểm nhấn
│   └── DataTable.jsx   # Bảng dữ liệu dùng chung hỗ trợ phân trang
├── mockdata/           # Dữ liệu giả lập lưu trữ tạm thời trong bộ nhớ (In-memory storage)
│   ├── levelMock.js    # Dữ liệu giả lập danh sách cấp độ học
│   ├── unitMock.js     # Dữ liệu giả lập các Unit của lộ trình
│   └── exams.js        # Dữ liệu giả lập đề thi và lịch sử làm bài
├── pages/              # Các trang giao diện điều khiển (View Controllers)
│   ├── Login.jsx       # Trang đăng nhập tài khoản hệ thống (phân quyền vai trò)
│   ├── Dashboard.jsx   # Trang tổng quan chung cho Admin và Student
│   ├── admin/          # Giao diện dành riêng cho Quản trị viên
│   │   ├── Levels.jsx        # Quản lý danh sách các cấp độ học
│   │   ├── Curriculum.jsx    # Quản lý chương trình học & phân bố các Unit
│   │   ├── lesson/           # Quản lý danh sách và cấu hình bài học của Unit
│   │   └── exams/            # Quản lý và cấu hình bài kiểm tra/đề thi
│   └── student/        # Giao diện dành riêng cho Học viên
│       ├── Journey/          # Lộ trình học tập cá nhân hóa & chi tiết Unit
│       ├── Review.jsx        # Không gian ôn tập thông minh từ vựng/ngữ pháp (SRS)
│       └── practice-test/    # Khu vực làm bài thi thử (IELTS/TOEIC/Mini-test)
├── routers/            # Cấu hình phân tuyến điều hướng hệ thống (Routing)
│   ├── index.jsx       # Cấu hình tuyến Router gốc & Bộ gác cổng bảo vệ phân quyền (ProtectedRoute)
│   ├── adminRoutes.jsx # Định nghĩa danh sách đường dẫn nội bộ của Admin
│   └── studentRoutes.jsx# Định nghĩa danh sách đường dẫn nội bộ của Học viên
├── services/           # Lớp kết nối dữ liệu giả lập (Simulated API endpoints)
│   ├── levelService.js # Các hàm xử lý CRUD cấp độ học
│   └── unitService.js  # Các hàm xử lý CRUD Unit và bài học
├── store/              # Quản lý trạng thái ứng dụng bằng Zustand
│   └── authStore.js    # Quản lý phiên đăng nhập hiện tại và quyền hạn (admin/student)
├── index.css           # Định nghĩa Tailwind base, các mã màu chuẩn và hiệu ứng glow
└── figma.css           # Chứa mã CSS tĩnh chuyển đổi từ Figma (không viết đè mã tại đây)
```

Các liên kết tệp tin chính trong cấu trúc mã nguồn:
*   Định nghĩa router gốc: [index.jsx](file:///d:/Study/TLU/human_computer_interaction/fe/code/src/routers/index.jsx)
*   Router của admin: [adminRoutes.jsx](file:///d:/Study/TLU/human_computer_interaction/fe/code/src/routers/adminRoutes.jsx)
*   Router của student: [studentRoutes.jsx](file:///d:/Study/TLU/human_computer_interaction/fe/code/src/routers/studentRoutes.jsx)
*   Trang đăng nhập: [Login.jsx](file:///d:/Study/TLU/human_computer_interaction/fe/code/src/pages/Login.jsx)
*   Trang dashboard: [Dashboard.jsx](file:///d:/Study/TLU/human_computer_interaction/fe/code/src/pages/Dashboard.jsx)
*   Quản lý cấp độ (Admin): [Levels.jsx](file:///d:/Study/TLU/human_computer_interaction/fe/code/src/pages/admin/Levels.jsx)
*   Chương trình học (Admin): [Curriculum.jsx](file:///d:/Study/TLU/human_computer_interaction/fe/code/src/pages/admin/Curriculum.jsx)
*   Quản lý phiên đăng nhập: [authStore.js](file:///d:/Study/TLU/human_computer_interaction/fe/code/src/store/authStore.js)

---

## 3. Các chức năng của hệ thống (Phân chia theo tác nhân)

### 3.1. Phân hệ Quản trị viên (Admin)
*   **Quản lý cấp độ học tập ([Levels.jsx](file:///d:/Study/TLU/human_computer_interaction/fe/code/src/pages/admin/Levels.jsx))**:
    *   **Xem danh sách cấp độ**: Hiển thị bảng tổng hợp các cấp độ hiện có kèm theo điểm mục tiêu IELTS/TOEIC quy chiếu tương ứng.
    *   **Thêm cấp độ mới**: Nhập tên cấp độ, mô tả ngắn, mô tả chi tiết, điểm mục tiêu (IELTS từ 0.0 - 9.0, TOEIC từ 0 - 990).
    *   **Chỉnh sửa cấp độ**: Cập nhật thông tin chi tiết của một cấp độ học đã tồn tại.
    *   **Xóa cấp độ**: Hỗ trợ xóa các cấp độ chưa có dữ liệu tiến trình học tập của học viên hoạt động để đảm bảo an toàn dữ liệu.
*   **Quản lý chương trình & lộ trình học tập ([Curriculum.jsx](file:///d:/Study/TLU/human_computer_interaction/fe/code/src/pages/admin/Curriculum.jsx))**:
    *   **Xem danh sách Unit**: Hiển thị danh sách các Unit tương ứng với từng cấp độ cụ thể.
    *   **Thêm Unit mới**: Thiết lập số thứ tự tự động, nhập tên Unit, chủ đề chính, chủ điểm từ vựng, ngữ pháp mục tiêu và phân loại kỹ năng thi.
    *   **Chỉnh sửa & Xóa Unit**: Quản lý thông tin chi tiết và xóa Unit (tự động cập nhật lại thứ tự các Unit phía sau).
*   **Cấu hình nội dung bài học ([LessonConfig.jsx](file:///d:/Study/TLU/human_computer_interaction/fe/code/src/pages/admin/lesson/LessonConfig.jsx))**:
    *   **Quản lý bài học**: Thiết lập và liên kết các bài học chi tiết cho từng Unit.
    *   **Cấu hình đa dạng hình thức bài tập**:
        *   *Từ vựng*: Tạo Flashcards (SRS đa giác quan), bài tập kéo thả ghép đôi, hoặc câu hỏi đoán nghĩa từ ngữ cảnh (Concordance).
        *   *Ngữ pháp*: Tạo chế độ học cấu trúc tiêu điểm (Focus Mode), nhận diện khuôn mẫu ngữ pháp, hoặc viết lại câu tương đương.
        *   *Nghe*: Cấu hình audio câu chuyện tương tác, audio bài nghe trắc nghiệm nghe hiểu.
        *   *Nói*: Nhập danh sách từ đơn/câu ngắn mẫu kèm âm thanh bản xứ chuẩn, cấu hình kịch bản AI Role-play.
        *   *Đọc*: Nhập văn bản bài đọc dài và thiết lập các câu hỏi trắc nghiệm hoặc True/False.
        *   *Viết*: Thiết lập bài tập sắp xếp từ/điền khuyết, đề bài viết luận IELTS Task 1/2 hoặc TOEIC email kèm bộ từ khóa gợi ý chấm điểm AI.
*   **Quản lý đề thi & bài kiểm tra ([ExamConfig.jsx](file:///d:/Study/TLU/human_computer_interaction/fe/code/src/pages/admin/exams/ExamConfig.jsx))**:
    *   **Tạo mới đề thi**: Thiết lập tên đề thi, mô tả, giới hạn thời gian làm bài (phút), lựa chọn hình thức (Mini-test cuối Unit, Level test cuối cấp độ, hoặc Full Mock Test thực tế).
    *   **Biên soạn câu hỏi**: Hỗ trợ tải file đề nghe (.mp3), nhập đoạn văn đọc hiểu dài, soạn đề bài luận viết và câu hỏi thi nói theo kịch bản giám khảo AI.
    *   **Thiết lập bảng quy đổi điểm**: Nhập thang điểm thô sang Band IELTS hoặc điểm số TOEIC tương ứng.

### 3.2. Phân hệ Học viên (Student)
*   **Lộ trình học tập cá nhân hóa ([Journey.jsx](file:///d:/Study/TLU/human_computer_interaction/fe/code/src/pages/student/Journey/Journey.jsx))**:
    *   **Theo dõi lộ trình**: Bản đồ học tập trực quan giúp học viên biết chính xác vị trí bài học hiện tại, tiến độ hoàn thành Unit và điểm số tích lũy (XP).
    *   **Chi tiết Unit**: Xem danh sách các bài học kỹ năng của Unit và lựa chọn bài học để tiến hành luyện tập.
*   **Học từ vựng & cấu trúc ngữ pháp ([vocabulary](file:///d:/Study/TLU/human_computer_interaction/fe/code/src/pages/student/Journey/skills/vocabulary) & [grammar](file:///d:/Study/TLU/human_computer_interaction/fe/code/src/pages/student/Journey/skills/grammar))**:
    *   **Chế độ học linh hoạt**: Lựa chọn giữa **Fast Mode** (học nhanh qua câu hỏi trắc nghiệm) và **Deep Mode** (học sâu qua phân tích ví dụ ngữ cảnh, kéo thả, chính tả và nói).
    *   **Chính tả & Ghi âm**: Nhắc lại chính tả (Dictation) và ghi âm giọng đọc từ/câu mẫu để AI nhận diện và phản hồi độ chuẩn xác.
    *   **Thuật toán SRS (Spaced Repetition System)**: Tự động ghi nhận lịch sử học để phân lịch ôn tập ngắt quãng thông minh, giúp tối ưu hóa trí nhớ dài hạn.
*   **Luyện tập 4 kỹ năng ngôn ngữ**:
    *   **Luyện nghe ([listening](file:///d:/Study/TLU/human_computer_interaction/fe/code/src/pages/student/Journey/skills/listening))**: Trải nghiệm Interactive Stories (kéo mở nội dung qua các câu hỏi tương tác ngắn), làm bài trắc nghiệm nghe hiểu hoặc Shadowing (luyện nói đuổi theo file âm thanh gốc).
    *   **Luyện nói ([speaking](file:///d:/Study/TLU/human_computer_interaction/fe/code/src/pages/student/Journey/skills/speaking))**: Luyện phát âm từ/câu ngắn với ASR (Nhận diện giọng nói tự động, bôi màu trực quan chi tiết: xanh - phát âm đúng, đỏ - sai âm vị, vàng - lệch ngữ điệu) và thực hành hội thoại nhập vai giả lập với AI (AI Role-play).
    *   **Luyện đọc ([reading](file:///d:/Study/TLU/human_computer_interaction/fe/code/src/pages/student/Journey/skills/reading))**: Đọc bài hiểu song song với tính năng dịch từ và tra cứu (Split Reading), hoặc thực hành đọc các bài báo tin tức cập nhật (News Reading).
    *   **Luyện viết ([writing](file:///d:/Study/TLU/human_computer_interaction/fe/code/src/pages/student/Journey/skills/writing))**: Làm bài tập điền từ/ghép câu cơ bản hoặc viết bài luận nâng cao, nhận đánh giá phản hồi chi tiết từ AI dựa theo tiêu chí chấm quốc tế.
*   **Không gian ôn tập ([Review.jsx](file:///d:/Study/TLU/human_computer_interaction/fe/code/src/pages/student/Review.jsx))**:
    *   Tập trung ôn luyện lại các từ vựng và mẫu ngữ pháp được thuật toán SRS phân loại là "cần cải thiện" hoặc "yếu".
*   **Luyện thi thử ([practice-test](file:///d:/Study/TLU/human_computer_interaction/fe/code/src/pages/student/practice-test))**:
    *   **Làm bài thi ([ExamTaker.jsx](file:///d:/Study/TLU/human_computer_interaction/fe/code/src/pages/student/practice-test/ExamTaker.jsx))**: Giao diện làm bài chuyên nghiệp có đồng hồ đếm ngược, phân chia rõ ràng các phần thi (Listening, Reading, Writing, Speaking).
    *   **Xem lại bài làm ([ExamReview.jsx](file:///d:/Study/TLU/human_computer_interaction/fe/code/src/pages/student/practice-test/ExamReview.jsx))**: Hiển thị kết quả chi tiết, đáp án đúng/sai, thang điểm quy đổi và toàn bộ phần phản hồi/giải thích chi tiết của giảng viên/hệ thống cho từng câu hỏi.

---

## 4. Yêu cầu hệ thống để cài đặt & chạy thử UI

Để cài đặt và khởi chạy thành công giao diện người dùng (UI) có thể tương tác đầy đủ, máy tính của bạn cần đáp ứng các yêu cầu môi trường như sau:

### 4.1. Hệ điều hành hỗ trợ (OS)
*   **Windows**: Windows 10 hoặc Windows 11 (khuyên dùng bản 64-bit).
*   **macOS**: macOS High Sierra (10.13) trở lên.
*   **Linux**: Các bản phân phối phổ biến như Ubuntu (18.04+), Debian, Fedora, v.v.

### 4.2. Công cụ & Ngôn ngữ lập trình
*   **Ngôn ngữ lập trình**: JavaScript (ES6+), HTML5, CSS3.
*   **Công cụ phát triển (IDE)**: Khuyên dùng **Visual Studio Code** (cài đặt thêm các extensions mở rộng như *ESLint*, *Prettier*, *Tailwind CSS IntelliSense* để có trải nghiệm viết code tốt nhất).
*   **Node.js**: Phiên bản **LTS v18 hoặc v20 trở lên** (để đảm bảo tính tương thích của Vite 8 và React 19).
*   **Trình quản lý gói**: `npm` (đi kèm sẵn khi cài đặt Node.js) hoặc `yarn` / `pnpm` (tùy chọn).

### 4.3. Các phần mềm và API trình duyệt cần thiết khác
*   **Trình duyệt Web**: Google Chrome, Microsoft Edge, Mozilla Firefox hoặc Safari phiên bản mới nhất.
*   **API hỗ trợ bắt buộc của trình duyệt (Dành cho chức năng chấm điểm phát âm & nói)**:
    *   *Web Speech API* hoặc *MediaDevices.getUserMedia()* để truy cập quyền sử dụng thiết bị Microphone thu âm giọng nói.
    *   Trình duyệt cần được cấp quyền sử dụng Microphone khi chạy ứng dụng trên máy cục bộ (`localhost`).

---

## 5. Hướng dẫn chi tiết cách khởi chạy dự án

Làm theo các bước sau để thiết lập dự án trên máy tính cục bộ của bạn từ đầu:

### Bước 1: Clone dự án về máy tính
Mở Command Prompt/Terminal/PowerShell và thực hiện tải mã nguồn của dự án về máy:
```bash
git clone <url-repository-cua-ban>
```

### Bước 2: Truy cập vào thư mục mã nguồn Frontend
Di chuyển dòng lệnh của bạn vào thư mục `code/` (nơi chứa file cấu hình `package.json`):
```bash
cd code
```

### Bước 3: Cài đặt các thư viện phụ thuộc (node_modules)
Khôi phục toàn bộ các gói thư viện phụ thuộc bằng lệnh cài đặt:
```bash
npm install
```
*(Quá trình này có thể mất từ 1 - 3 phút phụ thuộc vào tốc độ đường truyền internet của bạn)*

### Bước 4: Khởi chạy máy chủ phát triển cục bộ (Local Dev Server)
Kích hoạt máy chủ phát triển cục bộ của Vite:
```bash
npm run dev
```
Sau khi khởi chạy thành công, Terminal sẽ hiển thị đường dẫn truy cập cục bộ:
```bash
➜  Local:   http://localhost:5173/
```
Nhấn giữ `Ctrl` và nhấp chuột vào đường link hoặc sao chép và dán địa chỉ [http://localhost:5173/](http://localhost:5173/) vào trình duyệt của bạn để trải nghiệm giao diện chạy thử.

### 💡 Tài khoản đăng nhập dùng thử (Test Credentials)
Tại màn hình đăng nhập hệ thống, bạn có thể sử dụng các tài khoản giả lập được tích hợp sẵn để trải nghiệm đầy đủ các tính năng:
*   **Tác nhân Học viên (Student)**:
    *   Tên đăng nhập: `student`
    *   Mật khẩu: `student123`
*   **Tác nhân Quản trị viên (Admin)**:
    *   Tên đăng nhập: `admin`
    *   Mật khẩu: `admin123`

### Lệnh hữu ích khác
*   **Kiểm tra lỗi mã nguồn (Lint check)**:
    ```bash
    npm run lint
    ```
*   **Đóng gói dự án (Production Build)**:
    ```bash
    npm run build
    ```
*   **Chạy thử bản đóng gói tĩnh (Preview Build)**:
    ```bash
    npm run preview
    ```
