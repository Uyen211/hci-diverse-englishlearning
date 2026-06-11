import React from 'react';

export default function ReviewQuestionCard({ item, showAnswer }) {
    if (!showAnswer) return null;
    return (
        <>
            <div className="wf-srs-word-info">
                <div className="target">{item.word}</div>
                <div className="pronounce">{item.pronunciation}</div>
                <div className="meaning">{item.meaning}</div>
                <div className="wf-placeholder-box" style={{ width: '50px', height: '40px' }}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: '4px', display: 'inline-block', verticalAlign: 'middle' }}>
                        <path d="M21.5 2v6h-6M21.34 15.57a10 10 0 1 1-.57-8.38l5.67-5.67" />
                    </svg>
                </div>
            </div>
        </>
    );
}

export function ReviewSentenceCard({ sentence }) {
    return (
        <div style={{ flex: '1' }}>
            <div className="wf-srs-question-card" style={{ padding: '16px' }}>
                <div className="wf-srs-sentence" style={{ fontSize: '17px', marginBottom: '0', padding: '12px' }} dangerouslySetInnerHTML={{ __html: sentence }} />
            </div>
        </div>
    );
}
