import React from 'react';
import { cn } from "@/lib/utils";
import { Volume2 } from "lucide-react";

export default function SRSFeedback({ item, className }) {
  return (
    <div className={cn("wf-srs-feedback-container w-full", className)}>
      <div className="wf-srs-word-info flex justify-between">
        <div className="flex flex-col gap-1">
          <div className="target font-heading font-bold text-xl text-primary">{item.word}</div>
          <div className="flex items-center gap-2">
            <span className="pronounce text-secondary text-sm">{item.phonetic}</span>
            <button className="text-primary hover:text-secondary transition-colors">
              <Volume2 className="w-4 h-4" />
            </button>
          </div>
        </div>
        <div className="meaning ml-auto text-right flex flex-col items-end">
          <span className="wf-badge mb-1">{item.type}</span>
          <span className="text-sm text-slate-600">{item.meaning}</span>
        </div>
      </div>
      <div className="wf-srs-feedback mt-4 text-left">
        <div className="answer mb-2 text-primary font-bold">💡 Giải thích</div>
        <div className="explain text-sm text-slate-600 leading-relaxed">{item.explanation}</div>
      </div>
    </div>
  );
}
