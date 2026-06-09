/* eslint-disable react-refresh/only-export-components */
import Levels from '../pages/admin/Levels';
import Curriculum from '../pages/admin/Curriculum';
import Lessons from '../pages/admin/lesson/Lessons';
import LessonConfig from '../pages/admin/lesson/LessonConfig';

// Temporary placeholders for exams under Admin
function AdminExamsPlaceholder() {
  return (
    <div className="flex flex-col gap-4">
      <h2 className="font-heading text-2xl font-extrabold text-text-primary">Quản lý Bài kiểm tra (Admin)</h2>
      <p className="text-sm text-text-secondary">Thiết lập bộ câu hỏi thi và band điểm học sinh.</p>
      <div className="mt-4 p-10 bg-surface border border-dashed border-primary/20 rounded-xl text-center flex flex-col items-center gap-3">
        <p className="font-bold text-text-primary">Tính năng soạn thảo đề thi đang được thiết lập</p>
        <p className="text-xs text-text-secondary max-w-sm">Chọn vai trò học viên để thực hiện bài thi mẫu hoặc tiếp tục chỉnh sửa cấu hình.</p>
      </div>
    </div>
  );
}

const adminRoutes = [
  {
    path: 'levels',
    element: <Levels />,
  },
  {
    path: 'curriculum',
    element: <Curriculum />,
  },
  {
    path: 'curriculum/:unitId/lessons',
    element: <Lessons />,
  },
  {
    path: 'curriculum/:unitId/lessons/new',
    element: <LessonConfig />,
  },
  {
    path: 'curriculum/:unitId/lessons/:lessonId/config',
    element: <LessonConfig />,
  },
  {
    path: 'exams',
    element: <AdminExamsPlaceholder />,
  },
];

export default adminRoutes;

