import React from 'react';
import { cn } from "@/lib/utils";
import { Flame, Star, Award } from "lucide-react";

export default function SRSSidebar({ className }) {
  return (
    <aside className={cn("wf-sidebar h-full min-h-screen", className)}>
      <div className="label text-center mb-6">BỘ TỪ VỰNG</div>
      <div className="wf-sidebar-section">ÔN TẬP</div>
      <div className="wf-sidebar-item active">
        <Flame className="w-4 h-4 mr-2" /> Hôm nay <span className="wf-sidebar-badge ml-auto">12</span>
      </div>
      <div className="wf-sidebar-item">
        <Star className="w-4 h-4 mr-2" /> Đã nhớ
      </div>
      <div className="wf-sidebar-item">
        <Award className="w-4 h-4 mr-2" /> Cần cố gắng
      </div>
    </aside>
  );
}
