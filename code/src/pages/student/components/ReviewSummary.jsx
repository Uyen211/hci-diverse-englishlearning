import { Card, CardContent } from '../../../components/ui/card';
import { Button } from '../../../components/ui/button';
import { CheckCircle2, Home } from 'lucide-react';

export default function ReviewSummary({ stats, onGoHome }) {
    return (
        <div className="main-layout flex flex-col gap-6 text-left w-full">
            <div className="flex flex-col gap-2">
                <h1 className="page-title text-3xl font-extrabold text-text-primary tracking-tight">
                    Hoàn thành phiên ôn tập!
                </h1>
                <p className="text-text-secondary text-sm">
                    Chúc mừng bạn đã hoàn thành nhiệm vụ ôn tập hôm nay.
                </p>
            </div>

            <div className="flex flex-col items-center justify-center max-w-4xl mx-auto w-full mt-4">
                <Card className="w-full text-center p-8 bg-surface border border-border shadow-xl rounded-2xl">
                    <CardContent className="flex flex-col items-center gap-6 p-0">
                        <div className="w-16 h-16 rounded-full bg-success/10 flex items-center justify-center border-4 border-white shadow-soft">
                            <CheckCircle2 className="w-8 h-8 text-success" />
                        </div>

                        <div>
                            <h2 className="text-2xl font-bold text-text-primary mb-2">
                                Bạn đã ôn tập <strong className="text-primary text-3xl font-extrabold">{stats.totalReviewed}</strong> mục
                            </h2>
                            <p className="text-sm text-text-secondary">
                                Tuyệt vời! Hãy giữ vững phong độ học tập hàng ngày nhé.
                            </p>
                        </div>

                        {/* Summary details */}
                        <div className="grid grid-cols-3 gap-4 w-full max-w-lg mt-2">
                            <div className="bg-surface border border-success/20 rounded-xl p-4 flex flex-col items-center justify-center text-center shadow-sm bg-success/[0.02]">
                                <span className="text-2xl font-extrabold text-success">{stats.correct}</span>
                                <span className="text-xs font-semibold text-text-secondary mt-1 uppercase tracking-wider">Nhớ tốt</span>
                            </div>
                            <div className="bg-surface border border-warning/20 rounded-xl p-4 flex flex-col items-center justify-center text-center shadow-sm bg-warning/[0.02]">
                                <span className="text-2xl font-extrabold text-warning">{stats.ok}</span>
                                <span className="text-xs font-semibold text-text-secondary mt-1 uppercase tracking-wider">Phân vân</span>
                            </div>
                            <div className="bg-surface border border-error/20 rounded-xl p-4 flex flex-col items-center justify-center text-center shadow-sm bg-error/[0.02]">
                                <span className="text-2xl font-extrabold text-error">{stats.bad}</span>
                                <span className="text-xs font-semibold text-text-secondary mt-1 uppercase tracking-wider">Quên mất</span>
                            </div>
                        </div>

                        <div className="w-full max-w-md bg-primary/5 border border-primary/20 rounded-xl p-4 text-sm text-center font-medium text-primary-dark">
                            Dự kiến lịch ôn tập tiếp theo: <strong>Ngày mai (Khoảng 8 mục)</strong>
                        </div>

                        <Button 
                            onClick={onGoHome} 
                            className="px-12 py-6 rounded-xl text-lg font-bold shadow-active-glow mt-2 flex items-center gap-2"
                        >
                            <Home className="w-5 h-5" />
                            Về trang chủ
                        </Button>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
