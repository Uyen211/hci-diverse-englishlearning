import React from 'react';
import { cn } from "@/lib/utils";
import { CheckCircle2, HelpCircle, XCircle } from "lucide-react";

export default function SRSAssess({ onAssess, className }) {
  return (
    <div className={cn("wf-srs-assess", className)}>
      <div className="wf-srs-assess-btn" onClick={() => onAssess('well')}>
        <CheckCircle2 className="w-6 h-6 text-success mb-2" />
        <div className="label">Nhớ rõ</div>
        <div className="desc">Dễ dàng, phản xạ nhanh</div>
      </div>
      <div className="wf-srs-assess-btn" onClick={() => onAssess('confused')}>
        <HelpCircle className="w-6 h-6 text-warning mb-2" />
        <div className="label">Hơi phân vân</div>
        <div className="desc">Cần nghĩ một lúc</div>
      </div>
      <div className="wf-srs-assess-btn" onClick={() => onAssess('forgot')}>
        <XCircle className="w-6 h-6 text-error mb-2" />
        <div className="label">Quên mất</div>
        <div className="desc">Không thể nhớ ra</div>
      </div>
    </div>
  );
}
