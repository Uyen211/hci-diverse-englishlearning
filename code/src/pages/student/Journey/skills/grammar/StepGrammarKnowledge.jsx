import { Link } from 'react-router-dom';
import React, { useEffect } from 'react';

export default function StepGrammarKnowledge({ grammarData, mode, onNext, wordIndex, totalWords, stepIndex, totalSteps, progressPercent, unitId }) {
  const rules = grammarData.rules || [];
  const formula = grammarData.formula || '';

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Enter') onNext();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onNext]);

  return (
    <div className="flex flex-col flex-1 w-full max-w-5xl mx-auto gap-4">
      <div className="wf-unit-header mb-6">
        <div className="wf-breadcrumb flex flex-wrap items-center gap-1">
          <Link to="/" className="hover:underline text-text-secondary">Trang chủ</Link>
          <span className="opacity-50">&gt;</span>
          <Link to="/student/journey" className="hover:underline text-text-secondary">Hành trình</Link>
          <span className="opacity-50">&gt;</span>
          <Link to={`/student/journey/unit/${typeof unitId !== 'undefined' ? unitId : 3}`} className="hover:underline text-text-secondary">Unit {typeof unitId !== 'undefined' ? unitId : 3}</Link>
          <span className="opacity-50">&gt;</span>
          <Link to="/student/grammar/select" className="hover:underline text-text-secondary">Học ngữ pháp</Link>
          <span className="opacity-50">&gt;</span>
          <span className="text-primary font-bold">{typeof mode !== 'undefined' ? (mode === 'fast' ? 'Fast Mode' : mode === 'deep' ? 'Deep Mode' : (mode || 'Mode')) : 'Mode'}</span>
        </div>
        <div className="wf-page-title text-2xl font-bold mt-1">Bảng đúc rút quy tắc: {grammarData.title}</div>
      </div>

      <div className="wf-topbar">
        <div className="wf-step-counter">
          <div className="wf-step-counter-item">Bước: <strong>{stepIndex}</strong> / {totalSteps}</div>
          <div className="wf-step-counter-divider"></div>
          <div className="wf-step-counter-item">Cấu trúc: <strong>{wordIndex + 1}</strong> / {totalWords}</div>
        </div>
        <div className="wf-progress-mini">
          <div className="wf-progress-mini-bar">
            <div className="wf-progress-mini-fill" style={{ width: `${progressPercent}%` }}></div>
          </div>
          <div className="wf-progress-mini-label">{progressPercent}%</div>
        </div>
      </div>

      <div className="flex-1 w-full max-w-4xl mx-auto flex flex-col gap-6">
        <table className="wf-table w-full border-collapse rounded-xl overflow-hidden shadow-glow  ">
          <thead>
            <tr className="bg-purple-100 text-primary text-left text-sm uppercase tracking-wider">
              <th className="p-4 font-bold" style={{ width: '160px' }}>Thành phần</th>
              <th className="p-4 font-bold">Nội dung</th>
              <th className="p-4 font-bold">Ví dụ</th>
            </tr>
          </thead>
          <tbody className="bg-white text-sm text-primary divide-y divide-gray-100">
            <tr className="hover:bg-purple-50 transition-colors">
              <td className="p-4 font-bold text-primary/70   bg-surface/50">Công thức</td>
              <td className="p-4"><strong className="text-primary">{formula}</strong></td>
              <td className="p-4 italic text-primary/70">{grammarData.title}</td>
            </tr>
            {rules.map((rule, i) => (
              <tr key={i} className="hover:bg-purple-50 transition-colors">
                <td className="p-4 font-bold text-primary/70   bg-surface/50">{rule.chunk}</td>
                <td className="p-4">{rule.verbForm}</td>
                <td className="p-4 italic text-primary/70">"{rule.example}"</td>
              </tr>
            ))}
            <tr className="hover:bg-purple-50 transition-colors">
              <td className="p-4 font-bold text-primary/70   bg-surface/50">Tên cấu trúc</td>
              <td className="p-4"><strong className="text-primary">{grammarData.title}</strong></td>
              <td className="p-4 text-primary/70">{grammarData.meaning}</td>
            </tr>
          </tbody>
        </table>

        <div className="flex flex-row justify-center mt-6">
          <button
            onClick={() => onNext()}
            className="wf-btn btn-default-submit px-10 py-3 bg-primary text-white font-bold rounded-xl shadow-glow hover:bg-primary transition-colors flex items-center gap-2"
            tabIndex={0}
          >
            Đã nắm được, luyện tập
          </button>
        </div>
      </div>

      <div className="wf-hint-bar flex justify-between text-xs text-primary/70 mt-4 pt-4  ">
        <div className="wf-hint-text">
          <span className="wf-hint-key bg-canvas px-2 py-1 rounded border">Enter</span> Luyện tập
        </div>
        <div className="wf-hint-text">Xem kỹ bảng quy tắc trước khi chuyển sang thực hành</div>
      </div>
    </div>
  );
}
