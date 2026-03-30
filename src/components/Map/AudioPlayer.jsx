import { useState, useRef, useEffect } from 'react';
import { useApp } from '../../../store/AppContext';

export default function AudioPlayer() {
  const { audioPlaying, setAudioPlaying, language } = useApp();
  const audioRef = useRef(null);
  const [playing, setPlaying] = useState(false);
  const [lang, setLang] = useState(language);

  const url = audioPlaying?.audioStory?.[lang] || audioPlaying?.audioStory?.en || null;

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.load();
      audioRef.current.play().then(() => setPlaying(true)).catch(() => setPlaying(false));
    }
  }, [url]);

  const toggle = () => {
    if (!audioRef.current) return;
    if (playing) { audioRef.current.pause(); setPlaying(false); }
    else { audioRef.current.play(); setPlaying(true); }
  };

  return (
    <div className="audio-player animate-slide-up">
      <span className="audio-icon">🎧</span>
      <div className="audio-info">
        <div className="audio-title">{audioPlaying?.displayName || audioPlaying?.name?.en}</div>
        <div className="audio-subtitle">🎵 {lang === 'en' ? 'Audio Story (English)' : 'ಆಡಿಯೋ ಕಥೆ (ಕನ್ನಡ)'}</div>
      </div>
      <div className="audio-controls">
        <button className="audio-control-btn" onClick={toggle}>{playing ? '⏸' : '▶'}</button>
        <button
          className="audio-control-btn"
          style={{ background: 'var(--deep-green)', fontSize: '0.7rem', width: 40 }}
          onClick={() => setLang(l => l === 'en' ? 'kn' : 'en')}
        >{lang === 'en' ? 'KN' : 'EN'}</button>
        <button className="audio-close-btn" onClick={() => { setAudioPlaying(null); setPlaying(false); }}>✕</button>
      </div>
      {url && (
        <audio ref={audioRef} src={url} onEnded={() => setPlaying(false)} style={{ display: 'none' }} />
      )}
    </div>
  );
}
