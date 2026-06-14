import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent } from '../../../components/ui/card';
import { Button } from '../../../components/ui/button';
import { BookOpen, Star, AlertTriangle } from 'lucide-react';

export default function ReviewDashboard({ stats, onStart }) {
    return (
        <div className="main-layout flex flex-col gap-6 text-left w-full">
            {/* Breadcrumb & Page Title */}
            <div className="flex flex-col gap-4">
                <div className="breadcrumbs flex items-center gap-2 text-xs font-semibold text-text-secondary">
                    <Link to="/" className="hover:underline text-text-secondary">Trang chủ</Link>
                    <span className="opacity-50">&gt;</span>
                    <span className="text-primary font-bold">Ôn tập</span>
                </div>

                <div className="flex flex-col gap-2">
                    <h1 className="page-title text-3xl font-extrabold text-text-primary tracking-tight">
                        Bắt đầu ôn tập ngay
                    </h1>
                    <p className="text-text-secondary text-sm">
                        Ôn lại những kiến thức đã học để ghi nhớ lâu hơn!
                    </p>
                </div>
            </div>

            {/* Centralized Card Layout */}
            <div className="flex flex-col items-center justify-center max-w-4xl mx-auto w-full mt-4">
                <Card className="w-full text-center p-8 bg-surface border border-border shadow-xl rounded-2xl">
                    <CardContent className="flex flex-col items-center gap-6 p-0">
                        <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center border-4 border-white shadow-soft">
                            <BookOpen className="w-8 h-8 text-primary" />
                        </div>

                        <div>
                            <h2 className="text-2xl font-bold text-text-primary mb-2">
                                Hôm nay bạn có <strong className="text-primary text-3xl font-extrabold">{stats.total}</strong> mục cần ôn
                            </h2>
                            <p className="text-sm text-text-secondary">
                                Thời gian dự kiến: <strong>~{stats.estimatedTime} phút</strong> • Mục khó nhất: <strong>"{stats.hardestWord}"</strong> (đã sai 2 lần trước)
                            </p>
                        </div>

                        {/* Overview Stats Cards Grid */}
                        <div className="grid grid-cols-3 gap-4 w-full max-w-lg mt-2">
                            <div className="bg-surface border border-border rounded-xl p-4 flex flex-col items-center justify-center text-center shadow-sm">
                                <span className="text-2xl font-extrabold text-text-primary">{stats.vocab}</span>
                                <span className="text-xs font-semibold text-text-secondary mt-1 uppercase tracking-wider">Từ vựng</span>
                            </div>
                            <div className="bg-surface border border-border rounded-xl p-4 flex flex-col items-center justify-center text-center shadow-sm">
                                <span className="text-2xl font-extrabold text-text-primary">{stats.grammar}</span>
                                <span className="text-xs font-semibold text-text-secondary mt-1 uppercase tracking-wider">Ngữ pháp</span>
                            </div>
                            <div className="bg-surface border border-error/20 rounded-xl p-4 flex flex-col items-center justify-center text-center shadow-sm bg-error/[0.02]">
                                <span className="text-2xl font-extrabold text-error">{stats.weak}</span>
                                <span className="text-xs font-bold text-error mt-1 uppercase tracking-wider">Yếu</span>
                            </div>
                        </div>

                        <Button 
                            onClick={onStart} 
                            className="px-16 py-6 rounded-xl text-lg font-bold shadow-active-glow mt-2"
                        >
                            Bắt đầu ôn tập
                        </Button>
                    </CardContent>
                </Card>
            </div>

            {/* Hint Bar */}
            <div className="flex justify-between items-center bg-primary/5 border border-primary/20 rounded-xl p-4 mt-6 text-sm text-primary">
                <div className="flex gap-4">
                    <span><kbd className="bg-white px-1.5 py-0.5 border rounded shadow-sm text-xs font-semibold mr-1">Enter</kbd> Bắt đầu ôn tập</span>
                </div>
                <div className="text-xs text-text-secondary opacity-80">
                    Bạn có thể kết thúc sớm bất cứ lúc nào trong phiên ôn.
                </div>
            </div>
        </div>
    );
}
