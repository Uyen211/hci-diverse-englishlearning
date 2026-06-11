import React, { useEffect, useState } from 'react';
import { cn } from "@/lib/utils";

export default function SRSTimer({ initialSeconds = 10, onExpire, active = true, className }) {
  const [secondsLeft, setSecondsLeft] = useState(initialSeconds);
  const [isExpired, setIsExpired] = useState(false);

  useEffect(() => {
    setSecondsLeft(initialSeconds);
    setIsExpired(false);
  }, [initialSeconds]);

  useEffect(() => {
    if (!active || isExpired || secondsLeft <= 0) return;

    const interval = setInterval(() => {
      setSecondsLeft((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          setIsExpired(true);
          if (onExpire) onExpire();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [active, isExpired, secondsLeft, onExpire]);

  const pct = (secondsLeft / initialSeconds) * 100;
  const isWarning = secondsLeft <= 3;

  return (
    <div className={cn("wf-srs-timer", className)}>
      <div className={cn("wf-srs-timer-ring", isWarning && "warning")} style={{ "--pct": pct }}>
        <div className="circle"></div>
        <div className="inner">{secondsLeft}s</div>
      </div>
      <div className="wf-srs-timer-label mt-2">Thời gian vàng</div>
    </div>
  );
}
