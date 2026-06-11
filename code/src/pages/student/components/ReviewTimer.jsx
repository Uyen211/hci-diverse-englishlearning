import React from 'react';

export default function ReviewTimer({ timeLeft, totalTime = 10, isTimeout }) {
    const pct = isTimeout ? 0 : Math.max(0, (timeLeft / totalTime) * 100);
    const isWarning = timeLeft <= 3 || isTimeout;
    const ringClass = `wf-srs-timer-ring ${isWarning ? 'warning' : ''}`;
    const labelColor = isTimeout ? '#D32F2F' : 'inherit';

    return (
        <div className="wf-srs-timer" style={{ marginBottom: '0' }}>
            <div className={ringClass} style={{ '--pct': pct }}>
                <div className="circle"></div>
                <div className="inner">{timeLeft}</div>
            </div>
            <div className="wf-srs-timer-label" style={{ color: labelColor, fontWeight: isTimeout ? 'bold' : 'normal' }}>
                {isTimeout ? 'Hết giờ!' : `còn ${timeLeft}s`}
            </div>
        </div>
    );
}
