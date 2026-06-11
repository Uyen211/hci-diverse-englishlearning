import React from 'react';
import { cn } from "@/lib/utils";

export default function SRSTopBar({ progress, stepIndex, totalSteps, className }) {
  return (
    <div className={cn("wf-topbar w-full flex justify-between items-center", className)}>
      <div className="wf-step-counter flex-1">
        <div className="wf-step-counter-item">
          Mục <strong className="text-primary mx-1">{stepIndex}</strong> / {totalSteps}
        </div>
      </div>
      <div className="wf-progress-mini flex-1 max-w-[300px]">
        <div className="wf-progress-mini-bar w-full bg-slate-100 rounded-full h-2 relative overflow-hidden">
          <div className="wf-progress-mini-fill absolute left-0 top-0 bottom-0 bg-primary" style={{ width: `${progress}%` }}></div>
        </div>
        <div className="wf-progress-mini-label ml-2 font-bold text-xs">{progress}%</div>
      </div>
    </div>
  );
}
