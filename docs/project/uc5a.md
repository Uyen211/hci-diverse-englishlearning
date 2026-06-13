
---

### 1. Trình tự luồng Fast Mode

Luồng Fast Mode được thiết kế để người học đi qua các bước một cách nhanh chóng, tập trung vào việc nhận diện từ vựng.

1. **Bắt đầu & Pre-test:** Người học chọn Fast Mode và làm bài Pre-test dạng trắc nghiệm (MCQ) yêu cầu nghe và chọn nghĩa. Bài tập này bị giới hạn thời gian tối đa là 30 giây cho mỗi câu.
2. **Ngữ cảnh:** Hệ thống cung cấp 2-3 câu ví dụ chứa từ mới kèm âm thanh của người bản xứ để làm quen.
3. **Bài tập nhận diện:** Trắc nghiệm MCQ yêu cầu chọn nghĩa đúng từ 3-4 lựa chọn một cách nhanh chóng. Nếu kết quả làm bài dưới ngưỡng, hệ thống sẽ bỏ qua bước này, đánh dấu từ là "weak" và tự động chuyển sang trang kiến thức (Luồng A-1).
4. **Kiến thức đầy đủ:** Hiển thị trang thông tin chi tiết bao gồm IPA, định nghĩa, collocation, ví dụ và các lỗi thường gặp.
5. **Chính tả (Dictation):** Nghe âm thanh và gõ lại từ vựng 5 lần.
6. **Phát âm (Bắt buộc):** Người học phải ghi âm đọc to từ vựng. Hệ thống ASR chấm điểm với ngưỡng đạt là 70 điểm (được thử lại tối đa 3 lần nếu dưới điểm).
7. **Bỏ qua bước Tạo câu:** Sau khi hoàn thành phát âm, hệ thống tự động bỏ qua phần bài tập tạo câu và chuyển sang từ tiếp theo hoặc phần ôn tập.
8. **Mini Review:** Cứ sau 3-4 từ vựng, hệ thống sẽ chèn một bài trắc nghiệm ôn tập rút gọn gồm 2-3 câu.

---

### 2. Trình tự luồng Deep Mode

Luồng Deep Mode yêu cầu sự tương tác sâu hơn ở từng bước, đòi hỏi người học phải chủ động tái tạo lại từ vựng.

1. **Bắt đầu & Pre-test:** Người học chọn Deep Mode và làm bài Pre-test dưới dạng nghe rồi gõ lại nghĩa tiếng Việt hoặc viết một câu ngắn. Bài kiểm tra này không bị giới hạn về mặt thời gian.
2. **Ngữ cảnh:** Hiển thị 2-3 câu ví dụ chứa từ mới cùng âm thanh mẫu.
3. **Bài tập nhận diện:** Người học thực hiện bài tập kéo thả để ghép thẻ từ với nghĩa tương ứng. Nếu tỷ lệ đúng dưới ngưỡng yêu cầu, hệ thống bắt buộc người học phải làm lại bài tập này cho đến khi đạt (Luồng A-1).
4. **Kiến thức đầy đủ:** Cung cấp thông tin chi tiết về từ (IPA, định nghĩa, collocation, ví dụ, lỗi thường gặp).
5. **Chính tả (Dictation):** Tương tự Fast Mode, người học nghe âm thanh và gõ lại từ 5 lần.
6. **Phát âm (Bắt buộc):** Ghi âm đọc từ, chấm điểm ASR (yêu cầu trên 70 điểm, tối đa 3 lần thử).
7. **Bài tập tạo câu:** Bước này chỉ có ở Deep Mode. Người học kéo thả hoặc viết tự do để tạo câu có chứa từ mục tiêu. Nếu sai chính tả hoặc thiếu từ, hệ thống yêu cầu làm bài tập điền khuyết để sửa lỗi (Luồng A-4) rồi mới được đi tiếp.
8. **Mini Review:** Sau mỗi cụm 3-4 từ, hệ thống chèn một bài ôn tập đầy đủ bao gồm 4-5 câu hỏi.

---

### 3. Bảng so sánh Fast Mode và Deep Mode

| Tiêu chí | Fast Mode | Deep Mode |
| --- | --- | --- |
| **Hình thức Pre-test** | Trắc nghiệm MCQ (nghe - chọn nghĩa). | Nghe và gõ nghĩa tiếng Việt hoặc viết câu ngắn. |
| **Giới hạn thời gian (Pre-test)** | Bị giới hạn 30 giây/câu. | Không giới hạn thời gian. |
| **Bài tập nhận diện** | Trắc nghiệm MCQ chọn nghĩa. | Kéo thả ghép từ và nghĩa. |
| **Xử lý khi nhận diện dưới ngưỡng** | Cho qua, đánh dấu từ là "weak" và chuyển bước. | Bắt buộc phải quay lại làm bài tập nhận diện. |
| **Bài tập tạo câu** | Không có (Bỏ qua hoàn toàn). | Bắt buộc thực hiện (Kéo thả hoặc viết tự do). |
| **Mini Review (Sau mỗi 3-4 từ)** | Dạng rút gọn (2-3 câu trắc nghiệm). | Dạng đầy đủ (4-5 câu). |