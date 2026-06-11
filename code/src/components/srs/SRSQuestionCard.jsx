import React, { useState, useEffect } from 'react';
import { cn } from "@/lib/utils";

export default function SRSQuestionCard({ 
  item, 
  mode = 'fill', // 'fill' or 'mcq'
  onSubmitFill,
  onSelectMCQ,
  status = 'idle', // 'idle', 'correct', 'wrong'
  userAnswer = '',
  className 
}) {
  const [inputValue, setInputValue] = useState("");

  useEffect(() => {
    setInputValue("");
  }, [item]);

  const handleFillSubmit = (e) => {
    e.preventDefault();
    if (inputValue.trim()) {
      onSubmitFill(inputValue.trim());
    }
  };

  const sentenceParts = item.sentence.split('___');

  return (
    <div className={cn("wf-srs-question-card", className)}>
      <div className="wf-srs-sentence">
        {sentenceParts[0]}
        {mode === 'fill' && status === 'idle' ? (
          <form onSubmit={handleFillSubmit} className="inline-block mx-2">
            <input 
              type="text" 
              className="wf-srs-blank text-center outline-none bg-transparent" 
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="nhập từ..."
              autoFocus
            />
          </form>
        ) : (
          <span className={cn(
            "wf-srs-blank mx-2 text-center", 
            status === 'correct' && "correct",
            status === 'wrong' && "wrong",
            status === 'idle' && "filled"
          )}>
            {status === 'idle' ? "___" : userAnswer}
          </span>
        )}
        {sentenceParts[1]}
      </div>

      {mode === 'mcq' && status === 'idle' && (
        <div className="mt-6 wf-grid-2">
          {item.options.map((opt, i) => (
            <div 
              key={i} 
              className="wf-option"
              onClick={() => onSelectMCQ(opt)}
            >
              <div className="wf-option-label">{String.fromCharCode(65 + i)}</div>
              <div className="font-semibold">{opt}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
