# BỘ PROMPT CHỈ ĐẠO AI AGENTS (CURSOR / WINDSURF) - ĐỒ ÁN TỐT NGHIỆP IT1 BKHN

**Tech Stack yêu cầu chung cho toàn bộ dự án:**
- **Frontend:** React Native (Expo), Redux Toolkit, React Navigation v6.
- **Backend:** Node.js, ExpressJS, Socket.io (cho real-time).
- **Database:** PostgreSQL + Supabase.
- **Tiêu chuẩn:** Clean code, chia MVC hoặc Layered Architecture cho Backend, viết comment rõ ràng cho các logic phức tạp.

---

## 🚀 PROMPT PHASE 1: Nền tảng Hệ thống & Xác thực (Authentication)

[cite_start]**Context:** Tôi đang làm đồ án tốt nghiệp Bách Khoa: Ứng dụng số hỗ trợ thăm khám và điều trị trầm cảm[cite: 1]. [cite_start]Đối tượng người dùng là người từ 15 đến 30 tuổi[cite: 7]. [cite_start]Hệ thống có 2 loại người dùng chính: Người dùng bình thường và Người điều phối[cite: 11, 29]. [cite_start]Người điều phối đứng ở tầng quản trị/hỗ trợ vận hành, không tham gia sử dụng hệ thống như user bình thường[cite: 32].

**Nhiệm vụ của bạn (AI):**
1. **Khởi tạo Database (PostgreSQL + Supabase):** Khởi tạo các bảng cấu trúc cơ bản trên Supabase: `User` (có trường `role` là USER hoặc COORDINATOR), `Profile`, `TestResult`, `Diary`, `Post`.
2. **Khởi tạo Backend (ExpressJS):** - Setup server cơ bản với bảo mật (helmet, cors).
   - Viết API Đăng ký, Đăng nhập (JWT + bcrypt).
   - Viết Middleware `authMiddleware` (kiểm tra JWT) và `roleMiddleware` (phân quyền User/Coordinator).
3. **Khởi tạo Frontend (React Native Expo):**
   - Cài đặt React Navigation với 1 `AuthStack` (Login/Register) và 1 `MainTabNavigator` (Bottom Tabs gồm: Home, Liên hệ, Chatbot, Khám phá, Cá nhân).
   - Code màn hình Login và Register cơ bản, gọi API Backend để lấy token và lưu vào AsyncStorage.

**Output mong muốn:** Code hoàn chỉnh cho các khởi tạo database trên Supabase, Express routes/controllers cho Auth, và cấu trúc Navigation của React Native.

---

## 🚀 PROMPT PHASE 2: Tính năng Cốt lõi - Đánh giá Tâm lý & Điều trị

**Context:**
Tiếp tục dự án hỗ trợ điều trị trầm cảm. [cite_start]Bây giờ tôi cần xây dựng tính năng cốt lõi: Test tâm lý và Đưa ra giải pháp điều trị[cite: 13, 14]. [cite_start]Các giải pháp điều trị tại nhà bao gồm: Viết nhật ký (riêng tư/công khai) [cite: 16, 17] [cite_start]và Gợi ý bài tập thể dục, thiền[cite: 18].

**Nhiệm vụ của bạn (AI):**
1. **Backend (Express + Supabase):**
   - Bổ sung model `Question` (Câu hỏi trắc nghiệm), `Option` (Đáp án), và cập nhật `TestResult`.
   - Viết API `GET /api/tests/questions` để lấy danh sách câu hỏi.
   - Viết API `POST /api/tests/submit` để nhận câu trả lời, tính điểm trầm cảm (mock logic tính điểm đơn giản) và trả về kết quả kèm danh sách giải pháp gợi ý.
   - [cite_start]Viết API CRUD cho tính năng Viết nhật ký (Diaries)[cite: 17].
2. **Frontend (React Native):**
   - Code UI màn hình "Làm bài test" (hiển thị câu hỏi dạng swipe hoặc list).
   - Code UI màn hình "Kết quả & Giải pháp": Hiển thị điểm số và các card gợi ý điều trị (ví dụ: Link nhạc thiền, Nhắc nhở tập thể dục).
   - Trong Tab "Cá nhân", code màn hình danh sách Nhật ký và form Thêm nhật ký mới.

**Output mong muốn:** Các endpoint API xử lý bài test và nhật ký. UI React Native kết nối hoàn chỉnh với các API này.

---

## 🚀 PROMPT PHASE 3: Mạng xã hội mini & Dịch vụ Y tế

**Context:**
Dự án cần tăng tính tương tác. Tab "Home" sẽ có một mạng xã hội mini. [cite_start]Tab "Liên hệ" sẽ đề xuất nơi điều trị [cite: 22] [cite_start]và cho phép người dùng để lại thông tin để bệnh viện tư vấn[cite: 23]. 

**Nhiệm vụ của bạn (AI):**
1. **Backend:**
   - **Mạng xã hội:** Viết API `POST /api/posts` (đăng bài), `POST /api/posts/:id/like`, và `POST /api/posts/:id/comments`. 
   - **Real-time:** Tích hợp Socket.io cơ bản vào Express server để emit sự kiện khi có comment mới.
   - **Liên hệ:** Bổ sung model `Hospital` và `AppointmentRequest`. [cite_start]Viết API lấy danh sách bệnh viện/phòng khám và API submit form để lại thông tin tư vấn[cite: 23].
2. **Frontend:**
   - Code UI Newsfeed (FlatList hiển thị các bài Post, nút Like, Comment).
   - Code UI Tab "Liên hệ" chia làm 2 segment: Online (Bác sĩ) và Offline (Phòng khám).
   - Làm form "Đặt lịch tư vấn" gửi dữ liệu lên Backend.

**Output mong muốn:** Hệ thống API Social & Contact, kèm UI tương ứng trên Mobile. Đảm bảo Socket.io server khởi tạo đúng cách.

---

## 🚀 PROMPT PHASE 4: Theo dõi hồ sơ & Admin Dashboard

**Context:**
Giai đoạn cuối của dự án. [cite_start]Người dùng cần theo dõi hồ sơ điều trị, xem lịch sử và tiến trình cải thiện [cite: 24, 25][cite_start], cũng như làm các bài kiểm tra định kỳ[cite: 27]. [cite_start]Người điều phối cần quản lý nội dung, người dùng và dữ liệu hệ thống[cite: 30].

**Nhiệm vụ của bạn (AI):**
1. **Backend:**
   - Viết API `GET /api/users/progress` trả về dữ liệu mảng (data points) về các điểm số test tâm lý qua từng ngày/tuần để vẽ biểu đồ.
   - Viết các API cho Admin (Coordinator): `GET /api/admin/users`, `GET /api/admin/stats` (thống kê tổng user, tổng bài test).
2. **Frontend:**
   - **User App:** Trong Tab "Cá nhân", sử dụng thư viện `react-native-chart-kit` để vẽ Line Chart thể hiện tiến trình cải thiện tâm trạng dựa trên data API trả về.
   - **User App:** Thêm nút "Làm bài kiểm tra định kỳ" gọi lại luồng Test ở Phase 2.
   - **Admin (Tùy chọn Web/App):** Code một số màn hình quản trị cơ bản dùng React Native (dành riêng cho role Coordinator) để xem danh sách user và xóa các bài Post vi phạm.

**Output mong muốn:** API thống kê dữ liệu tiến trình, tích hợp thành công biểu đồ vào React Native và giao diện quản lý cơ bản cho Người điều phối.