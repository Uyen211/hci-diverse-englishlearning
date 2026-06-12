
---

### 1. Trình tự luồng Fast Mode

Luồng Fast Mode tập trung vào việc nhận diện nhanh cấu trúc ngữ pháp và tối ưu hóa thời gian học bằng cách lược bỏ các bài tập sản sinh phức tạp.

1. **Pre-test:** Người học làm bài kiểm tra đầu vào dưới dạng trắc nghiệm (MCQ). Bài tập này có giới hạn thời gian là 45 giây cho mỗi câu.


2. **Tiếp cận tình huống:** Hệ thống hiển thị tình huống chứa pattern ngữ pháp thông qua video, hình ảnh hoặc đoạn hội thoại mà không nêu tên cấu trúc. Người học phải chọn 1 cặp mô tả về thời gian và chức năng phù hợp.


3. **Phân tích ví dụ:** Hệ thống đưa ra 3-4 câu ví dụ và tự động highlight phần pattern giống nhau. Bỏ qua hoặc không bắt buộc thực hiện phần kéo thả đoạn highlight vào khung.


4. **Đối chiếu & Phân biệt:** Lược bỏ hoàn toàn bước hiển thị cặp câu đối chiếu và câu hỏi trắc nghiệm phân biệt sắc thái.


5. **Đúc rút quy tắc:** Hệ thống hiển thị bảng quy tắc theo trình tự: Grammar chunks / patterns chính, tiếp đến là câu mẫu khung, và cuối cùng là tên cấu trúc kèm công thức.


6. **Thực hành nhận diện:** Bài tập được rút gọn thành 3-4 câu trắc nghiệm nhận diện pattern. Nếu tỷ lệ chính xác dưới 70%, hệ thống sẽ cho qua, đánh dấu pattern là "weak" và tự động chuyển bước.


7. **Chính tả (Dictation):** Người học nghe âm thanh và gõ lại grammar chunk.


8. **Phát âm (Bắt buộc):** Người học bắt buộc phải ghi âm đọc to từ hoặc câu mẫu chứa cấu trúc. Hệ thống ASR chấm điểm với ngưỡng đạt là 70 điểm (được phép thử lại tối đa 3 lần nếu dưới điểm).


9. **Bỏ qua bài tập sản sinh:** Lược bỏ hoàn toàn bài tập xây dựng câu và viết tự do.


10. **Mini Review:** Sau mỗi 2-3 patterns, hệ thống sẽ chèn một bài ôn tập ngữ pháp (Mini Review) dạng rút gọn.



---

### 2. Trình tự luồng Deep Mode

Luồng Deep Mode yêu cầu người học tương tác sâu, phân tích kỹ càng các sắc thái ngữ pháp và bắt buộc thực hành các bài tập sản sinh (tạo câu, viết tự do).

1. **Pre-test:** Bài kiểm tra đầu vào có thể ở dạng MCQ, cloze (điền khuyết) hoặc viết câu ngắn. Đặc biệt, bài tập này không bị giới hạn thời gian.


2. **Tiếp cận tình huống:** Giống với Fast Mode, người học xem tình huống chứa pattern và chọn cặp mô tả phù hợp.


3. **Phân tích ví dụ & Khung pattern:** Hệ thống hiển thị ví dụ được highlight. Người học bắt buộc phải kéo thả các đoạn highlight vào khung pattern trống. Người học được thử tối đa 3 lần trước khi hệ thống hiển thị đáp án.


4. **Đối chiếu & Phân biệt:** Người học bắt buộc phải xem cặp câu đối chiếu và làm bài trắc nghiệm (MCQ) để phân biệt sắc thái ngữ pháp.


5. **Đúc rút quy tắc:** Cung cấp bảng quy tắc từ chunks đến công thức chi tiết tương tự Fast Mode.


6. **Thực hành nhận diện:** Người học phải thực hiện bài tập theo trình tự Mức 1 (kéo thả) và Mức 2 (tự gõ). Nếu độ chính xác dưới 70%, hệ thống bắt buộc người học quay lại làm từ đầu bước này.


7. **Chính tả (Dictation):** Nghe âm thanh và gõ lại grammar chunk.


8. **Phát âm (Bắt buộc):** Bắt buộc ghi âm đọc to, yêu cầu đạt trên 70 điểm (thử lại tối đa 3 lần).


9. **Xây dựng câu:** Người học bắt buộc thực hiện bài tập kéo thả hoặc sử dụng menu dropdown để xây dựng câu.


10. **Viết tự do:** Bắt buộc viết 2-3 câu liên kết hoặc một đoạn văn ngắn từ 50-80 từ. Nếu viết sai pattern, hệ thống sẽ chuyển sang luồng khắc phục lỗi (A-2) để hướng dẫn sửa.


11. **Mini Review:** Chèn bài ôn tập đầy đủ sau mỗi 2-3 patterns.



---

### 3. Bảng so sánh Fast Mode và Deep Mode

| Tiêu chí | Fast Mode | Deep Mode |
| --- | --- | --- |
| **Định dạng Pre-test** | Trắc nghiệm (MCQ) có giới hạn thời gian (45 giây/câu).

 | Trắc nghiệm, cloze, hoặc viết câu ngắn (không giới hạn thời gian).

 |
| **Kéo thả highlight vào khung** | Không bắt buộc, có thể bỏ qua.

 | Bắt buộc, thử tối đa 3 lần trước khi hiện đáp án.

 |
| **Phân biệt sắc thái (Đối chiếu)** | Bị lược bỏ hoàn toàn.

 | Bắt buộc thực hiện.

 |
| **Thực hành nhận diện** | Rút gọn (3-4 câu trắc nghiệm).

 | Chi tiết qua 2 mức: Mức 1 (kéo thả) và Mức 2 (tự gõ).

 |
| **Xử lý điểm nhận diện < 70%** | Cho qua, đánh dấu pattern là "weak".

 | Bắt buộc quay lại làm lại bài tập nhận diện.

 |
| **Xây dựng câu (Kéo thả/Dropdown)** | Bị lược bỏ.

 | Bắt buộc thực hiện.

 |
| **Viết tự do (Sản sinh câu/đoạn)** | Bị lược bỏ.

 | Bắt buộc thực hiện (viết 2-3 câu hoặc 50-80 từ).

 |
| **Mini Review Grammar** | Dạng rút gọn.

 | Dạng đầy đủ.

 |