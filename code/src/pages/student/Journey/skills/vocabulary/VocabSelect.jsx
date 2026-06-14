import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { Card, CardContent } from '../../../../../components/ui/card';
import { Button } from '../../../../../components/ui/button';
import { BookOpen, Check } from 'lucide-react';
import '../../../../../figma-uc5a.css';
import '../../../../../figma-uc08.css';
import '../../../../../figma-deleted.css';

export default function VocabSelect() {
  const navigate = useNavigate();
  const [selectedMode, setSelectedMode] = useState('fast');
  const location = useLocation();
  const unitId = location.state?.unitId || 3;

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') {
        setSelectedMode(prev => prev === 'fast' ? 'deep' : 'fast');
      }
      if (e.key === 'Enter') {
        navigate(`/student/vocabulary/session?mode=${selectedMode}`, { state: { unitId } });
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedMode, navigate, unitId]);

  return (
    <div className="main-layout flex flex-col gap-6 text-left">
      {/* Header section */}
      <div className="flex flex-col gap-4">
        {/* Breadcrumb */}
        <div className="breadcrumbs flex items-center gap-2 text-xs font-semibold text-text-secondary">
          <Link to="/" className="hover:underline text-text-secondary cursor-pointer">Trang chủ</Link>
          <span className="opacity-50">&gt;</span>
          <Link to="/student/journey" className="hover:underline text-text-secondary cursor-pointer">Hành trình</Link>
          <span className="opacity-50">&gt;</span>
          <Link to={`/student/unit/${unitId}`} className="hover:underline text-text-secondary cursor-pointer">Unit {unitId}</Link>
          <span className="opacity-50">&gt;</span>
          <span className="text-primary font-bold">Học từ vựng</span>
        </div>

        <div className="flex flex-col gap-2">
          <h1 className="page-title text-3xl font-extrabold text-text-primary tracking-tight">
            Học Nhóm Từ Vựng
          </h1>
          <p className="text-sm text-text-secondary">
            Bản đồ lộ trình học tập cá nhân hóa được thiết kế bởi trí tuệ nhân tạo AI.
          </p>
        </div>
      </div>

      {/* Main card options selection */}
      <div className="flex flex-col items-center mt-6">
        <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-6 border-4 border-white shadow-soft">
          <BookOpen className="w-8 h-8 text-primary" />
        </div>

        <h2 className="text-xl font-bold text-text-primary mb-2 text-center">Bạn muốn học như thế nào?</h2>
        <p className="text-sm text-text-secondary mb-8 text-center">Chọn chế độ phù hợp với mục tiêu của bạn • Từ vựng cần học: <strong className="text-primary font-bold">5 từ</strong></p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-3xl mb-8">
          {/* Fast Mode */}
          <Card
            className={`cursor-pointer transition-all border-2 relative text-left ${selectedMode === 'fast' ? 'border-primary shadow-active-glow bg-primary/[0.02]' : 'border-border hover:border-primary/50'}`}
            onClick={() => setSelectedMode('fast')}
          >
            {selectedMode === 'fast' && (
              <div className="absolute top-4 right-4 w-6 h-6 bg-primary rounded-full flex items-center justify-center text-white">
                <Check className="w-4 h-4" />
              </div>
            )}
            <CardContent className="p-6 py-8 flex flex-col justify-between h-full">
              <div>
                <h3 className={`text-lg font-bold mb-2 ${selectedMode === 'fast' ? 'text-primary' : 'text-text-primary'}`}>
                  Fast Mode
                </h3>
                <p className="text-sm text-text-secondary leading-relaxed mb-6">
                  Học nhanh, bỏ qua các bước không cần thiết. Phù hợp với ôn tập và xem lại.
                </p>
              </div>
              <div>
                <span className="bg-secondary/10 px-3 py-1 rounded-full text-xs font-bold text-secondary border border-secondary/20">
                  Có luyện phát âm
                </span>
              </div>
            </CardContent>
          </Card>

          {/* Deep Mode */}
          <Card
            className={`cursor-pointer transition-all border-2 relative text-left ${selectedMode === 'deep' ? 'border-primary shadow-active-glow bg-primary/[0.02]' : 'border-border hover:border-primary/50'}`}
            onClick={() => setSelectedMode('deep')}
          >
            {selectedMode === 'deep' && (
              <div className="absolute top-4 right-4 w-6 h-6 bg-primary rounded-full flex items-center justify-center text-white">
                <Check className="w-4 h-4" />
              </div>
            )}
            <CardContent className="p-6 py-8 flex flex-col justify-between h-full">
              <div>
                <h3 className={`text-lg font-bold mb-2 ${selectedMode === 'deep' ? 'text-primary' : 'text-text-primary'}`}>
                  Deep Mode
                </h3>
                <p className="text-sm text-text-secondary leading-relaxed mb-6">
                  Học sâu, đầy đủ nghe-nói-đọc-viết. Dành cho người muốn thực sự ghi nhớ lâu.
                </p>
              </div>
              <div>
                <span className="bg-secondary/10 px-3 py-1 rounded-full text-xs font-bold text-secondary border border-secondary/20">
                  Có luyện phát âm
                </span>
              </div>
            </CardContent>
          </Card>
        </div>

        <Button
          className="px-16 py-6 rounded-xl text-lg font-bold shadow-active-glow"
          onClick={() => navigate(`/student/vocabulary/session?mode=${selectedMode}`, { state: { unitId } })}
        >
          Bắt đầu học
        </Button>
      </div>

      {/* Keyboard Shortcuts Hint Bar */}
      <div className="flex justify-between items-center bg-primary/5 border border-primary/20 rounded-xl p-4 mt-6 text-sm text-primary">
        <div className="flex gap-4">
          <span><kbd className="bg-white px-1.5 py-0.5 border rounded shadow-sm text-xs font-semibold mr-1">Enter</kbd> Bắt đầu học</span>
          <span><kbd className="bg-white px-1.5 py-0.5 border rounded shadow-sm text-xs font-semibold mr-1">← / →</kbd> Chuyển đổi chế độ</span>
        </div>
        <div className="text-xs text-text-secondary opacity-80 hidden md:block">
          Mẹo: Dùng phím mũi tên và Enter giúp chọn chế độ nhanh chóng!
        </div>
      </div>
    </div>
  );
}
