import { useState, useEffect } from 'react'
import { Mic, Square, RotateCcw, Volume2 } from 'lucide-react'
import { Button } from '../../../../components/ui/button'

export default function TakerSpeaking({ question, onChangeAnswer }) {
  const [isStarted, setIsStarted] = useState(false)
  const [isAiSpeaking, setIsAiSpeaking] = useState(false)
  const [activeScenario, setActiveScenario] = useState('Scenario 1')
  
  // Recording states
  const [isRecording, setIsRecording] = useState(false)
  const [recordedTime, setRecordedTime] = useState(0)
  const [hasRecorded, setHasRecorded] = useState(false)

  useEffect(() => {
    let interval
    if (isRecording) {
      interval = setInterval(() => {
        setRecordedTime(prev => {
          if (prev >= 120) {
            setIsRecording(false)
            return 120
          }
          return prev + 1
        })
      }, 1000)
    }
    return () => clearInterval(interval)
  }, [isRecording])

  const handleStartConversation = () => {
    setIsStarted(true)
    setIsAiSpeaking(true)
    
    // Simulate AI speaking for 4.5 seconds, then transition to User recording turn
    setTimeout(() => {
      setIsAiSpeaking(false)
    }, 4500)
  }

  const handleStartRecord = () => {
    setIsRecording(true)
    setRecordedTime(0)
    setHasRecorded(false)
  }

  const handleStopRecord = () => {
    setIsRecording(false)
    setHasRecorded(true)
    if (onChangeAnswer && question) {
      onChangeAnswer(question.id, 'User response recorded audio session')
    }
  }

  const handleResetRecord = () => {
    setIsRecording(false)
    setRecordedTime(0)
    setHasRecorded(false)
  }

  const formatSecs = (sec) => {
    const mins = Math.floor(sec / 60)
    const secs = sec % 60
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
  }

  if (!question) return null

  return (
    <div className="flex flex-col items-center justify-center py-6 w-full">
      {/* Speaking Scenario Tabs matching the design */}
      <div className="custom-subtab-container mb-6 w-full max-w-2xl">
        <span className="text-xs font-bold text-text-secondary uppercase tracking-wider mr-2">
          Tình huống đối thoại:
        </span>
        {['Scenario 1', 'Scenario 2'].map((scen) => {
          const isActive = activeScenario === scen
          return (
            <button
              key={scen}
              onClick={() => setActiveScenario(scen)}
              className={`custom-subtab-item ${isActive ? 'active' : ''}`}
            >
              {scen}
            </button>
          )
        })}
      </div>

      {/* Main Celestial Card matching 4C-1 100% */}
      <div className="speaking-start-container w-full max-w-2xl bg-surface border border-border/80 shadow-glow rounded-3xl p-10 flex flex-col items-center justify-center text-center gap-6">
        <div className="bg-primary/[0.08] text-primary text-[10px] font-bold py-1 px-4 rounded-full uppercase tracking-wider">
          AI Examiner - Speaking Role-Play
        </div>

        <h2 className="font-heading font-extrabold text-text-primary text-xl leading-relaxed max-w-[550px] mt-2">
          Situation: {activeScenario === 'Scenario 1' ? (question.situation || 'Environment PM Meeting') : 'Alternate Dialogue Scenario'}
        </h2>
        <p className="text-xs text-text-secondary italic mt-[-8px]">
          Tình huống: {question.description || 'Bạn và quản lý dự án đang bàn thảo phân công nhiệm vụ nghiên cứu môi trường.'}
        </p>

        {/* Roles Details Box */}
        <div className="flex gap-4 flex-wrap justify-center mt-2">
          <div className="bg-primary/[0.03] border border-primary/10 py-2.5 px-4 rounded-xl text-xs font-bold text-primary flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-primary" />
            AI Role: {question.aiRole || 'John (Project Manager)'}
          </div>
          <div className="bg-secondary/[0.03] border border-secondary/10 py-2.5 px-4 rounded-xl text-xs font-bold text-secondary flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-secondary" />
            Your Role: {question.userRole || 'Environment Researcher'}
          </div>
        </div>

        {/* Dynamic Card Body based on isStarted state */}
        {!isStarted ? (
          <>
            {/* Instructions box */}
            <div className="max-w-[500px] bg-primary/[0.01] border-l-4 border-primary p-4 rounded text-xs leading-relaxed text-text-secondary text-justify mt-4">
              <strong className="text-text-primary font-bold block mb-1">Instructions:</strong>
              Click "Start Conversation" to begin. The AI will speak first. Listen carefully, then click the record button to speak your response. The dialogue will continue continuously until completed.
            </div>

            <Button
              onClick={handleStartConversation}
              className="bg-primary hover:bg-primary-hover text-white py-3.5 px-10 text-sm font-bold rounded-full shadow-active-glow mt-4"
            >
              Start Conversation
            </Button>
          </>
        ) : (
          /* Active interaction state within the SAME centered container (replacing split panel layout) */
          <div className="w-full flex flex-col items-center gap-6 mt-4 pt-4 border-t border-border/40">
            {isAiSpeaking ? (
              /* AI speaking visual simulation */
              <div className="w-full flex flex-col items-center gap-4 animate-pulse">
                <span className="font-bold text-xs text-primary uppercase tracking-wide">
                  {question.aiRole || 'John (Project Manager)'} (AI) Đang nói...
                </span>
                <div className="w-16 h-16 bg-primary/10 text-primary border-none rounded-full flex items-center justify-center shadow-active-glow">
                  <Volume2 className="w-6 h-6 animate-bounce" />
                </div>
                <div className="text-sm font-semibold text-text-primary max-w-[500px] leading-relaxed p-4 bg-primary/[0.02] border border-primary/10 rounded-xl">
                  "{question.dialogue?.[0]?.text || 'Hello! I am John, your AI Examiner. Are you ready to collaborate on our new environment study?'}"
                </div>
              </div>
            ) : (
              /* Student Speaking recording turn */
              <div className="w-full flex flex-col items-center gap-6">
                <span className="font-bold text-xs text-text-primary uppercase tracking-wide">
                  Your Turn (Turn #2) *
                </span>

                {/* Recorder layout matching active dialogue controls */}
                <div className="w-full speaking-recorder-card p-6 border-2 border-dashed border-primary/25 rounded-2xl bg-primary/[0.01] flex flex-col items-center gap-4">
                  <button
                    onClick={isRecording ? handleStopRecord : handleStartRecord}
                    className={`w-16 h-16 rounded-full flex items-center justify-center text-white cursor-pointer border-none shadow-active-glow relative transition-all duration-300 ${
                      isRecording 
                        ? 'bg-error scale-110' 
                        : 'bg-gradient-galactic hover:scale-105'
                    }`}
                  >
                    {isRecording ? (
                      <Square className="w-6 h-6 fill-current animate-pulse" />
                    ) : (
                      <Mic className="w-6 h-6" />
                    )}

                    {isRecording && (
                      <span className="absolute inset-[-10px] border-2 border-error rounded-full animate-ping opacity-60 pointer-events-none" />
                    )}
                  </button>

                  <div className="flex flex-col gap-1 items-center">
                    <span className={`font-bold text-sm ${isRecording ? 'text-error animate-pulse' : 'text-primary'}`}>
                      {isRecording ? 'Đang ghi âm câu trả lời của bạn...' : hasRecorded ? 'Đã hoàn thành ghi âm' : 'Sẵn sàng ghi âm'}
                    </span>
                    <span className="text-xs text-text-secondary font-semibold">
                      Thời gian ghi âm: {formatSecs(recordedTime)} / 02:00
                    </span>
                  </div>

                  {(isRecording || hasRecorded) && (
                    <div className="flex gap-3 mt-1">
                      {isRecording ? (
                        <button
                          onClick={handleStopRecord}
                          className="bg-primary hover:bg-primary-hover text-white text-xs font-bold py-2 px-4 border-none rounded-lg cursor-pointer transition-all shadow-glow"
                        >
                          Stop & Send Turn
                        </button>
                      ) : (
                        <button
                          onClick={handleStartRecord}
                          className="bg-primary hover:bg-primary-hover text-white text-xs font-bold py-2 px-4 border-none rounded-lg cursor-pointer transition-all shadow-glow"
                        >
                          Ghi âm lại
                        </button>
                      )}
                      <button
                        onClick={handleResetRecord}
                        className="bg-primary/5 hover:bg-primary/10 text-primary border border-primary/15 text-xs font-bold py-2 px-4 rounded-lg cursor-pointer transition-all flex items-center gap-1.5"
                      >
                        <RotateCcw className="w-3.5 h-3.5" />
                        Hủy bỏ
                      </button>
                    </div>
                  )}
                </div>

                {/* Suggestion Ideas block */}
                <div className="w-full bg-secondary/[0.04] border border-secondary/15 rounded-xl p-4 flex flex-col gap-1.5 text-left">
                  <span className="font-extrabold text-xs text-secondary uppercase tracking-wider block">
                    Suggested Response Idea:
                  </span>
                  <p className="text-text-primary text-xs italic leading-relaxed margin-0">
                    "{question.suggestedResponse || 'I have noticed a moderate rise in PM2.5 levels near industrial zones.'}"
                  </p>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
