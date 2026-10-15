import React, { useState, useEffect, useRef } from 'react';
import {
  Play,
  Pause,
  RotateCcw,
  Volume2,
  VolumeX,
  Maximize2,
  Minimize2,
  CheckCircle2,
  Subtitles,
  Mic,
  MicOff,
  Music,
  Sparkles,
} from 'lucide-react';

interface PresentationVideoSectionProps {
  onStartMatching: () => void;
  onExploreAdvice: () => void;
}

interface Chapter {
  id: number;
  time: number; // in seconds (0, 30, 60, 90)
  endTime: number; // 30, 60, 90, 120
  title: string;
  durationText: string;
  badge: string;
  arabicVerse: string;
  verseSource: string;
  narratorTextFr: string;
  narratorTextHausa: string;
  narratorTextZarma: string;
  speechTextFr: string;
  speechTextHausa: string;
  speechTextZarma: string;
  visualHighlight: string;
}

const CHAPTERS: Chapter[] = [
  {
    id: 1,
    time: 0,
    endTime: 30,
    title: '1. Vocation & Fondements de Mawadda au Niger',
    durationText: '0:00 - 0:30',
    badge: 'Introduction',
    arabicVerse: 'وَمِنْ آيَاتِهِ أَنْ خَلَقَ لَكُم مِّنْ أَنفُسِكُمْ أَزْوَاجًا لِّتَسْكُنُوا إِلَيْهَا',
    verseSource: 'Sourate Ar-Rum (30:21)',
    narratorTextFr:
      '« Bismillah Ar-Rahman Ar-Rahim. Bienvenue sur Mawadda Niger. Notre mission est de faire revivre la simplicité et la noblesse du mariage islamique à travers nos 8 régions, de Niamey à Agadez, Zinder, Maradi et Tahoua. Mawadda est un espace digne pour accomplir la moitié de sa foi en toute transparence. »',
    narratorTextHausa:
      '« Da sunan Allah Mai Rahama Mai Jin Kai. Barka da zuwa Mawadda Niger. Manufarmu ita ce saukaka auren sunnah a dukkan yankunan Nijar guda takwas cikin mutunci da bin koyarwar addinin Musulunci. »',
    narratorTextZarma:
      '« Irkoy maa ra. Mawadda Niger ga kande borey cere banda fu teeri al\'adaji da Sunnah fonda ra, zunbu cere ra hal albarka ma goro fuwey ra. »',
    speechTextFr:
      'Bismillah Ar-Rahman Ar-Rahim. Bienvenue sur Mawadda Niger. Notre mission est de faciliter le mariage islamique à travers nos huit régions, de Niamey à Agadez, dans le respect de la Sunnah et de nos familles.',
    speechTextHausa:
      'Barka da zuwa Mawadda Nijar. Manufarmu ita ce saukaka auren sunnah a duk fadin Nijar cikin mutunci da bin koyarwar addinin Musulunci.',
    speechTextZarma:
      'Barka da kande Mawadda Niger. Ir goyey ga hiijay sanni beere te al\'ada da Sunnah fonda ra.',
    visualHighlight:
      'Union halal respectant les coutumes du Niger (Hausa, Zarma-Songhai, Peul, Tamasheq, Kanuri).',
  },
  {
    id: 2,
    time: 30,
    endTime: 60,
    title: '2. Le Rôle Protecteur du Tuteur Légal (Wali)',
    durationText: '0:30 - 1:00',
    badge: 'Charia & Sécurité',
    arabicVerse: 'لَا نِكَاحَ إِلَّا بِوَلِيٍّ',
    verseSource: 'Hadith authentique (At-Tirmidhi)',
    narratorTextFr:
      '« En Islam, la femme n\'est jamais livrée à elle-même. Sur Mawadda Niger, le tuteur légal — qu\'il soit le père, un oncle ou un aîné — est systématiquement associé aux démarches de Khitbah. Cela protège la pudeur de nos sœurs et garantit le sérieux absolu des prétendants. »',
    narratorTextHausa:
      '« A Musulunci, ana daraja \'ya mace tare da sa hannun Waliyyi a kowane mataki na neman aure. Wannan yana kare mutuncin \'yan uwanmu mata tare da tabbatar da gaskiyar masu neman aure. »',
    narratorTextZarma:
      '« Hiijay fonda ra, waybore sinda yaada : boro beere wala Waliyyi ga hangandi sanni kulu ra, zama al\'adaji nda darza ma gaabandi. »',
    speechTextFr:
      'En Islam, la femme est protégée par son tuteur légal. Le Wali est systématiquement associé aux demandes de Khitbah pour préserver la pudeur et l\'honneur des familles.',
    speechTextHausa:
      'A Musulunci, ana sa hannun Waliyyi a kowane mataki na neman aure don kare mutuncin mata.',
    speechTextZarma:
      'Waliyyi ga hangandi hiijay sanni ra zama darza nda al\'adaji ma du gaabi.',
    visualHighlight:
      'Fin des fréquentations clandestines : transparence totale avec les représentants légaux.',
  },
  {
    id: 3,
    time: 60,
    endTime: 90,
    title: '3. Le Sadaki (Dot) : Retour à la Sunnah et Modération',
    durationText: '1:00 - 1:30',
    badge: 'Économie Conjugale',
    arabicVerse: 'أَعْظَمُ النِّكَاحِ بَرَكَةً أَيْسَرُهُ مَؤُونَةً',
    verseSource: 'Hadith : « Le mariage le plus béni est le plus aisé » (Ahmad)',
    narratorTextFr:
      '« Face aux difficultés économiques, la surenchère des dépenses de dot et les festivités somptuaires retardent l\'union de nos jeunes. Mawadda encourage un Sadaki raisonnable qui préserve la dignité de l\'épouse sans endetter le nouveau foyer. »',
    narratorTextHausa:
      '« Kaucewa tsadar sadaki da almubazzaranci a sha\'anin biki. Manzon Allah ya ce aure mafi albarka shi ne wanda ba a takura da kudi ba. Mu saukaka wa samarinmu da \'yan matanmu. »',
    narratorTextZarma:
      '« Sadaki ga hima ka zama maybano. Manti yafal beeri ka noomi daame no, amma albarka no borey ga ceeci fu taaga ra. »',
    speechTextFr:
      'Le Prophète a enseigné que le mariage le plus béni est le plus modéré en dépenses. Évitons l\'endettement des jeunes et facilitons le licite.',
    speechTextHausa:
      'Manzon Allah ya ce aure mafi albarka shi ne wanda ba a takura da kudi ba. Mu saukaka sadaki a Nijar.',
    speechTextZarma:
      'Albarka beeri no go hiijay kaŋ sinda yafal beeri daame ra.',
    visualHighlight:
      'Lutte contre l\'endettement des noces et encouragement de la barakah prophétique.',
  },
  {
    id: 4,
    time: 90,
    endTime: 120,
    title: '4. L\'Espace Al-Nasiha & Harmonie Conjugale',
    durationText: '1:30 - 2:00',
    badge: 'Pérennité du Foyer',
    arabicVerse: 'فَابْعَثُوا حَكَمًا مِّنْ أَهْلِهِ وَحَكَمًا مِّنْ أَهْلِهَا',
    verseSource: 'Sourate An-Nisa (4:35) - Médiation équitable',
    narratorTextFr:
      '« Le mariage commence après la Fatiha. Notre centre de conseil conjugal Al-Nasiha propose des guides pratiques, un test d\'alignement prénuptial et une assistance pour apprendre à désamorcer les conflits et faire régner la quiétude (Sakinah) sous votre toit. »',
    narratorTextHausa:
      '« Zaman lafiya a gida da fahimtar juna bayan aure. Cibiyarmu ta Al-Nasiha tana ba da shawarwari kan zamantakewar aure da sasantawa a lokacin rashin fahimta. »',
    narratorTextZarma:
      '« Hiijay goyey ga koy jine da lakkal nda sanni kaan. Al-Nasiha do, araŋ ga du saawarey kaŋ ga fu gaabandi hal laafia ma goro. »',
    speechTextFr:
      'Notre espace Al-Nasiha vous accompagne avec des conseils de fiqh conjugal et de médiation bienveillante pour une paix durable dans votre foyer.',
    speechTextHausa:
      'Cibiyarmu ta Al-Nasiha tana ba da shawarwari kan zaman lafiyar aure da warware matsaloli cikin hikima.',
    speechTextZarma:
      'Al-Nasiha ga araŋ gaa da saawarey zama fu laafia ma goro zamana kulu ra.',
    visualHighlight:
      'Médiation familiale coranique et accompagnement continu pour la paix du foyer.',
  },
];

export const PresentationVideoSection: React.FC<PresentationVideoSectionProps> = ({
  onStartMatching,
  onExploreAdvice,
}) => {
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [showCaptions, setShowCaptions] = useState<boolean>(true);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  const [selectedLanguage, setSelectedLanguage] = useState<'fr' | 'hausa' | 'zarma'>('fr');

  // Audio Features state
  const [isVoiceNarrationActive, setIsVoiceNarrationActive] = useState<boolean>(true);
  const [isIslamicMusicActive, setIsIslamicMusicActive] = useState<boolean>(true);
  const [audioVolume, setAudioVolume] = useState<number>(0.75);

  const containerRef = useRef<HTMLDivElement>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const musicOscillatorsRef = useRef<any[]>([]);
  const musicGainRef = useRef<GainNode | null>(null);
  const drumIntervalRef = useRef<any>(null);
  const lastSpokenChapterRef = useRef<number>(-1);

  const totalDuration = 120; // 2 minutes exactly (120 seconds)

  // Find active chapter based on current time
  const currentChapter =
    CHAPTERS.find((c) => currentTime >= c.time && currentTime < c.endTime) ||
    CHAPTERS[CHAPTERS.length - 1];

  // 1. Web Audio API : Ambient Islamic Nasheed / Peaceful Desert Modal Pad + Soft Duff pulse
  const initIslamicMusic = () => {
    try {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioCtx) return;

      if (!audioContextRef.current) {
        audioContextRef.current = new AudioCtx();
      }

      if (audioContextRef.current.state === 'suspended') {
        audioContextRef.current.resume();
      }

      // If already playing, stop previous nodes
      stopIslamicMusic();

      const ctx = audioContextRef.current;
      const masterGain = ctx.createGain();
      masterGain.gain.setValueAtTime(isMuted || !isIslamicMusicActive ? 0 : audioVolume * 0.22, ctx.currentTime);
      masterGain.connect(ctx.destination);
      musicGainRef.current = masterGain;

      // Spiritual Bayati / D minor acoustic chords (D3 146.83Hz, A3 220Hz, D4 293.66Hz, F4 349.23Hz)
      const baseFreqs = [146.83, 220.0, 293.66, 349.23];
      const oscNodes: any[] = [];

      baseFreqs.forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const filter = ctx.createBiquadFilter();
        const oscGain = ctx.createGain();

        // Warm sine and triangle combination
        osc.type = idx % 2 === 0 ? 'sine' : 'triangle';
        osc.frequency.setValueAtTime(freq, ctx.currentTime);

        // Low-pass filter for smooth, warm oriental pad
        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(420 + idx * 80, ctx.currentTime);
        filter.Q.setValueAtTime(1.5, ctx.currentTime);

        // Gentle volume for each voice
        oscGain.gain.setValueAtTime(0.2 / baseFreqs.length, ctx.currentTime);

        osc.connect(filter);
        filter.connect(oscGain);
        oscGain.connect(masterGain);

        osc.start();
        oscNodes.push(osc);
      });

      musicOscillatorsRef.current = oscNodes;

      // Soft Duff rhythm pulse (gentle low resonance strike every 2 seconds)
      if (drumIntervalRef.current) clearInterval(drumIntervalRef.current);
      drumIntervalRef.current = setInterval(() => {
        if (!audioContextRef.current || isMuted || !isIslamicMusicActive) return;
        const now = audioContextRef.current.currentTime;
        const drumOsc = audioContextRef.current.createOscillator();
        const drumGain = audioContextRef.current.createGain();

        drumOsc.type = 'sine';
        drumOsc.frequency.setValueAtTime(80, now);
        drumOsc.frequency.exponentialRampToValueAtTime(35, now + 0.35);

        drumGain.gain.setValueAtTime(0.18 * audioVolume, now);
        drumGain.gain.exponentialRampToValueAtTime(0.001, now + 0.35);

        drumOsc.connect(drumGain);
        drumGain.connect(audioContextRef.current.destination);

        drumOsc.start(now);
        drumOsc.stop(now + 0.36);
      }, 2000);
    } catch (e) {
      console.warn('Web Audio error:', e);
    }
  };

  const stopIslamicMusic = () => {
    musicOscillatorsRef.current.forEach((osc) => {
      try {
        osc.stop();
        osc.disconnect();
      } catch (e) {}
    });
    musicOscillatorsRef.current = [];

    if (drumIntervalRef.current) {
      clearInterval(drumIntervalRef.current);
      drumIntervalRef.current = null;
    }
  };

  // 2. Web Speech API : Clean Narrator Voiceover in French / Hausa / Zarma
  const speakChapterNarration = (chapter: Chapter, lang: 'fr' | 'hausa' | 'zarma') => {
    if (!('speechSynthesis' in window)) return;
    window.speechSynthesis.cancel(); // cancel previous

    if (!isVoiceNarrationActive || isMuted) return;

    let textToSpeak = chapter.speechTextFr;
    let voiceLang = 'fr-FR';

    if (lang === 'hausa') {
      textToSpeak = chapter.speechTextHausa;
      voiceLang = 'ha'; // Hausa if available, fallback handled by browser
    } else if (lang === 'zarma') {
      textToSpeak = chapter.speechTextZarma;
      voiceLang = 'fr-FR'; // French accented pronunciation works well for Zarma phonetics
    }

    const utterance = new SpeechSynthesisUtterance(textToSpeak);
    utterance.lang = voiceLang;
    utterance.rate = 0.95; // Dignified, calm speaking pace
    utterance.pitch = 1.0;
    utterance.volume = isMuted ? 0 : audioVolume;

    // Pick warm voice if available
    const voices = window.speechSynthesis.getVoices();
    const matchingVoice =
      voices.find((v) => v.lang.startsWith(voiceLang)) ||
      voices.find((v) => v.lang.includes('fr')) ||
      voices[0];
    if (matchingVoice) {
      utterance.voice = matchingVoice;
    }

    window.speechSynthesis.speak(utterance);
  };

  // Playback timer loop (2 minutes = 120 seconds)
  useEffect(() => {
    let interval: any = null;
    if (isPlaying) {
      interval = setInterval(() => {
        setCurrentTime((prev) => {
          if (prev >= totalDuration) {
            setIsPlaying(false);
            window.speechSynthesis?.cancel();
            stopIslamicMusic();
            return totalDuration;
          }
          return prev + 1;
        });
      }, 1000);
    } else {
      window.speechSynthesis?.cancel();
      stopIslamicMusic();
    }
    return () => clearInterval(interval);
  }, [isPlaying, totalDuration]);

  // Synchronize Voice Narration on chapter change during playback
  useEffect(() => {
    if (isPlaying && isVoiceNarrationActive && !isMuted) {
      if (lastSpokenChapterRef.current !== currentChapter.id) {
        lastSpokenChapterRef.current = currentChapter.id;
        speakChapterNarration(currentChapter, selectedLanguage);
      }
    }
  }, [currentChapter.id, isPlaying, isVoiceNarrationActive, isMuted, selectedLanguage]);

  // Update volume in real-time
  useEffect(() => {
    if (musicGainRef.current && audioContextRef.current) {
      const vol = isMuted || !isIslamicMusicActive ? 0 : audioVolume * 0.22;
      musicGainRef.current.gain.setValueAtTime(vol, audioContextRef.current.currentTime);
    }
  }, [audioVolume, isMuted, isIslamicMusicActive]);

  const togglePlay = () => {
    if (!isPlaying) {
      if (currentTime >= totalDuration) {
        setCurrentTime(0);
      }
      setIsPlaying(true);
      if (isIslamicMusicActive && !isMuted) {
        initIslamicMusic();
      }
      lastSpokenChapterRef.current = -1; // trigger speech
    } else {
      setIsPlaying(false);
      window.speechSynthesis?.cancel();
      stopIslamicMusic();
    }
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTime = Number(e.target.value);
    setCurrentTime(newTime);
    lastSpokenChapterRef.current = -1;
    if (isPlaying && isVoiceNarrationActive && !isMuted) {
      const targetCh =
        CHAPTERS.find((c) => newTime >= c.time && newTime < c.endTime) || CHAPTERS[0];
      speakChapterNarration(targetCh, selectedLanguage);
    }
  };

  const handleJumpToChapter = (timeInSec: number) => {
    setCurrentTime(timeInSec);
    lastSpokenChapterRef.current = -1;
    if (!isPlaying) {
      setIsPlaying(true);
      if (isIslamicMusicActive && !isMuted) {
        initIslamicMusic();
      }
    } else if (isVoiceNarrationActive && !isMuted) {
      const targetCh =
        CHAPTERS.find((c) => timeInSec >= c.time && timeInSec < c.endTime) || CHAPTERS[0];
      speakChapterNarration(targetCh, selectedLanguage);
    }
  };

  const toggleVoiceNarration = () => {
    const nextVal = !isVoiceNarrationActive;
    setIsVoiceNarrationActive(nextVal);
    if (!nextVal) {
      window.speechSynthesis?.cancel();
    } else if (isPlaying && !isMuted) {
      speakChapterNarration(currentChapter, selectedLanguage);
    }
  };

  const toggleIslamicMusic = () => {
    const nextVal = !isIslamicMusicActive;
    setIsIslamicMusicActive(nextVal);
    if (!nextVal) {
      stopIslamicMusic();
    } else if (isPlaying && !isMuted) {
      initIslamicMusic();
    }
  };

  const toggleFullscreen = () => {
    if (!containerRef.current) return;
    if (!document.fullscreenElement) {
      containerRef.current.requestFullscreen?.().catch(() => {});
      setIsFullscreen(true);
    } else {
      document.exitFullscreen?.().catch(() => {});
      setIsFullscreen(false);
    }
  };

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  return (
    <section id="presentation-video" className="border-b border-stone-200 bg-stone-900 py-12 text-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 border-b border-stone-800 pb-6">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-emerald-400">
              <span>Vidéo Institutionnelle & Éthique</span>
              <span aria-hidden="true">·</span>
              <span className="font-bold text-amber-300">Format Express : 2 minutes</span>
              <span aria-hidden="true">·</span>
              <span>Voix & Ambiance Islamique</span>
            </div>
            <h2 className="mt-2 font-serif text-2xl font-bold tracking-tight text-white sm:text-3xl lg:text-4xl" style={{ textWrap: 'balance' }}>
              Comprendre la Vision de Mawadda Niger en 2 Minutes
            </h2>
            <p className="mt-2 text-xs sm:text-sm text-stone-300 max-w-2xl leading-relaxed">
              Une présentation synthétique et sonore sur les 4 piliers de notre plateforme au Niger, avec voix narrative et fond sonore spirituel doux (sans instrument prohibé).
            </p>
          </div>

          {/* Language and Audio Quick Selectors */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
            {/* Audio Toggles */}
            <div className="flex items-center gap-2">
              <button
                onClick={toggleVoiceNarration}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium border transition ${
                  isVoiceNarrationActive
                    ? 'border-emerald-600 bg-emerald-950 text-emerald-300'
                    : 'border-stone-700 bg-stone-800 text-stone-400'
                }`}
                title="Activer/Désactiver la voix narrative"
              >
                {isVoiceNarrationActive ? <Mic className="h-3.5 w-3.5 text-emerald-400" /> : <MicOff className="h-3.5 w-3.5" />}
                <span>Voix : {isVoiceNarrationActive ? 'Activée' : 'Coupée'}</span>
              </button>

              <button
                onClick={toggleIslamicMusic}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium border transition ${
                  isIslamicMusicActive
                    ? 'border-amber-600/70 bg-amber-950/60 text-amber-200'
                    : 'border-stone-700 bg-stone-800 text-stone-400'
                }`}
                title="Activer/Désactiver la douce ambiance spirituelle"
              >
                <Music className="h-3.5 w-3.5 text-amber-300" />
                <span>Ambiance : {isIslamicMusicActive ? 'Duff & Nâsayah' : 'Silence'}</span>
              </button>
            </div>

            {/* Language Selection */}
            <div className="flex rounded-md border border-stone-700 bg-stone-800 p-0.5 text-xs">
              <button
                onClick={() => {
                  setSelectedLanguage('fr');
                  lastSpokenChapterRef.current = -1;
                }}
                className={`px-2.5 py-1 rounded font-medium transition ${
                  selectedLanguage === 'fr' ? 'bg-emerald-800 text-white' : 'text-stone-400 hover:text-white'
                }`}
              >
                Français
              </button>
              <button
                onClick={() => {
                  setSelectedLanguage('hausa');
                  lastSpokenChapterRef.current = -1;
                }}
                className={`px-2.5 py-1 rounded font-medium transition ${
                  selectedLanguage === 'hausa' ? 'bg-emerald-800 text-white' : 'text-stone-400 hover:text-white'
                }`}
              >
                Hausa
              </button>
              <button
                onClick={() => {
                  setSelectedLanguage('zarma');
                  lastSpokenChapterRef.current = -1;
                }}
                className={`px-2.5 py-1 rounded font-medium transition ${
                  selectedLanguage === 'zarma' ? 'bg-emerald-800 text-white' : 'text-stone-400 hover:text-white'
                }`}
              >
                Zarma
              </button>
            </div>
          </div>
        </div>

        {/* Video Player Container */}
        <div
          ref={containerRef}
          className="mt-8 relative overflow-hidden rounded-2xl border border-stone-800 bg-black shadow-2xl"
        >
          {/* Main Visual Frame */}
          <div className="relative aspect-[16/9] w-full max-h-[620px] overflow-hidden bg-stone-950 flex flex-col justify-between">
            {/* Background Poster */}
            <div className="absolute inset-0">
              <img
                src="/assets/images/video_poster_niger_1791140896285.jpg"
                alt="Vidéo de présentation Mawadda Niger 2 minutes"
                referrerPolicy="no-referrer"
                className={`h-full w-full object-cover transition-all duration-700 ${
                  isPlaying ? 'scale-105 filter brightness-75' : 'filter brightness-90'
                }`}
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/45 to-black/60" />
            </div>

            {/* Top Bar inside Video */}
            <div className="relative z-10 p-4 sm:p-6 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="font-serif text-sm sm:text-base font-bold text-amber-200 tracking-wide drop-shadow">
                  Mawadda Niger · مَوَدَّة
                </span>
                <span className="rounded bg-emerald-900/80 px-2 py-0.5 text-[11px] font-medium text-emerald-200 backdrop-blur-xs border border-emerald-700/50">
                  {currentChapter.badge}
                </span>
                <span className="rounded bg-amber-950/80 px-2 py-0.5 text-[10px] font-mono text-amber-300 backdrop-blur-xs border border-amber-800/40">
                  2:00 Max
                </span>
              </div>

              {/* Sound Indicators */}
              <div className="flex items-center gap-2">
                {isPlaying && (
                  <div className="flex items-center gap-1 bg-black/60 px-2.5 py-1 rounded backdrop-blur-xs text-[11px] text-emerald-400">
                    <span className="inline-block h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                    <span>
                      {isVoiceNarrationActive ? '🎙️ Voix' : ''}
                      {isVoiceNarrationActive && isIslamicMusicActive ? ' + ' : ''}
                      {isIslamicMusicActive ? '🎵 Duff & Ambiance' : ''}
                      {!isVoiceNarrationActive && !isIslamicMusicActive ? 'Audio Muet' : ''}
                    </span>
                  </div>
                )}
                <div className="text-xs text-stone-300 font-mono tabular-nums bg-black/60 px-2.5 py-1 rounded backdrop-blur-xs">
                  {currentChapter.id} / 4
                </div>
              </div>
            </div>

            {/* Center Area: Play Button or Active Chapter Presentation Card */}
            <div className="relative z-10 px-6 sm:px-12 py-4 flex flex-col items-center justify-center text-center">
              {!isPlaying ? (
                <div className="space-y-4">
                  <button
                    onClick={togglePlay}
                    className="group relative flex h-20 w-20 sm:h-24 sm:w-24 items-center justify-center rounded-full bg-emerald-800 text-amber-200 shadow-2xl transition hover:scale-110 hover:bg-emerald-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-emerald-500"
                    aria-label="Lancer la vidéo en 2 minutes"
                  >
                    <Play className="h-8 w-8 sm:h-10 sm:w-10 ml-1 fill-amber-200 transition-transform group-hover:scale-105" />
                    <span className="absolute -inset-2 rounded-full border border-emerald-500/40 animate-ping opacity-30 pointer-events-none" />
                  </button>
                  <div>
                    <p className="font-serif text-base sm:text-xl font-bold text-stone-100 drop-shadow">
                      Lancer la présentation en 2 minutes
                    </p>
                    <p className="text-xs text-amber-300 mt-1 font-sans">
                      Avec voix narrative & ambiance islamique apaisante (Duff & Nâsayah)
                    </p>
                  </div>
                </div>
              ) : (
                <div className="max-w-2xl bg-black/60 backdrop-blur-md rounded-xl p-5 sm:p-6 border border-white/10 shadow-xl transition-all">
                  <div className="font-serif text-lg sm:text-2xl font-bold text-amber-100 tracking-wide" style={{ textWrap: 'balance' }}>
                    {currentChapter.title}
                  </div>
                  <div className="mt-2 font-serif text-base sm:text-lg text-emerald-300 font-semibold dir-rtl">
                    {currentChapter.arabicVerse}
                  </div>
                  <div className="text-[11px] text-stone-400 font-medium">
                    {currentChapter.verseSource}
                  </div>
                </div>
              )}
            </div>

            {/* Subtitles Overlay */}
            {showCaptions && (
              <div className="relative z-10 px-4 sm:px-8 pb-3">
                <div className="mx-auto max-w-3xl rounded-lg bg-black/85 backdrop-blur-sm p-3.5 border border-white/10 text-center shadow-lg">
                  <div className="text-xs sm:text-sm text-stone-100 font-medium leading-relaxed font-sans">
                    {selectedLanguage === 'fr' && currentChapter.narratorTextFr}
                    {selectedLanguage === 'hausa' && currentChapter.narratorTextHausa}
                    {selectedLanguage === 'zarma' && currentChapter.narratorTextZarma}
                  </div>
                  <div className="mt-1 text-[10px] text-emerald-400 font-mono">
                    ✦ {currentChapter.visualHighlight}
                  </div>
                </div>
              </div>
            )}

            {/* Video Controls Bar */}
            <div className="relative z-20 bg-stone-950/95 border-t border-stone-800 p-3 sm:p-4 backdrop-blur-md">
              {/* Progress Scrubber (0 to 120 seconds) */}
              <div className="relative flex items-center mb-3">
                <input
                  type="range"
                  min={0}
                  max={totalDuration}
                  value={currentTime}
                  onChange={handleSeek}
                  className="w-full h-1.5 bg-stone-700 rounded-lg appearance-none cursor-pointer accent-emerald-500"
                />
              </div>

              {/* Controls Grid */}
              <div className="flex items-center justify-between text-xs text-stone-300 flex-wrap gap-2">
                <div className="flex items-center gap-3">
                  <button
                    onClick={togglePlay}
                    className="flex h-8 w-8 items-center justify-center rounded-md bg-stone-800 hover:bg-emerald-800 text-white transition"
                    title={isPlaying ? 'Pause' : 'Lecture'}
                  >
                    {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4 ml-0.5" />}
                  </button>

                  <button
                    onClick={() => {
                      setCurrentTime(0);
                      lastSpokenChapterRef.current = -1;
                    }}
                    className="hidden sm:flex h-8 w-8 items-center justify-center rounded-md bg-stone-800 hover:bg-stone-700 text-stone-300 transition"
                    title="Recommencer depuis le début (0:00)"
                  >
                    <RotateCcw className="h-3.5 w-3.5" />
                  </button>

                  {/* Time indicator (exact 02:00 cap) */}
                  <span className="font-mono text-xs tabular-nums text-stone-400">
                    <span className="text-white font-semibold">{formatTime(currentTime)}</span> / {formatTime(totalDuration)}
                  </span>
                </div>

                {/* Right controls */}
                <div className="flex items-center gap-2 sm:gap-3">
                  {/* Volume Slider */}
                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={() => setIsMuted(!isMuted)}
                      className="p-1 text-stone-400 hover:text-white transition"
                      title={isMuted ? 'Activer le son' : 'Couper le son'}
                    >
                      {isMuted ? <VolumeX className="h-4 w-4 text-red-400" /> : <Volume2 className="h-4 w-4" />}
                    </button>
                    <input
                      type="range"
                      min={0}
                      max={1}
                      step={0.05}
                      value={isMuted ? 0 : audioVolume}
                      onChange={(e) => {
                        setAudioVolume(Number(e.target.value));
                        if (isMuted) setIsMuted(false);
                      }}
                      className="w-16 h-1 bg-stone-700 rounded-lg appearance-none cursor-pointer accent-emerald-500 hidden sm:block"
                    />
                  </div>

                  {/* Subtitle Toggle */}
                  <button
                    onClick={() => setShowCaptions(!showCaptions)}
                    className={`flex items-center gap-1 px-2 py-1 rounded text-xs transition ${
                      showCaptions ? 'bg-emerald-900/80 text-emerald-200 border border-emerald-700' : 'text-stone-400 hover:text-white'
                    }`}
                    title="Sous-titres"
                  >
                    <Subtitles className="h-3.5 w-3.5" />
                    <span className="hidden sm:inline">Sous-titres</span>
                  </button>

                  {/* Fullscreen */}
                  <button
                    onClick={toggleFullscreen}
                    className="p-1 text-stone-400 hover:text-white transition"
                    title="Plein écran"
                  >
                    {isFullscreen ? <Minimize2 className="h-4 w-4" /> : <Maximize2 className="h-4 w-4" />}
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* 4 Chapters Timeline Strip (30 seconds each = 2 minutes total) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 divide-y sm:divide-y-0 sm:divide-x divide-stone-800 bg-stone-950 border-t border-stone-800 text-left">
            {CHAPTERS.map((ch) => {
              const isCurrent = currentChapter.id === ch.id;
              return (
                <button
                  key={ch.id}
                  onClick={() => handleJumpToChapter(ch.time)}
                  className={`p-4 transition text-left group ${
                    isCurrent ? 'bg-emerald-950/70 border-b-2 border-emerald-500' : 'hover:bg-stone-900'
                  }`}
                >
                  <div className="flex items-center justify-between text-[11px] text-stone-400">
                    <span className="font-mono tabular-nums text-emerald-400">{ch.durationText}</span>
                    <span className="text-stone-500">{ch.badge}</span>
                  </div>
                  <div className="mt-1 font-serif text-xs sm:text-sm font-bold text-white group-hover:text-amber-200 transition">
                    {ch.title}
                  </div>
                  <div className="mt-1 text-[11px] text-stone-400 line-clamp-1">
                    {ch.visualHighlight}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Presentation Summary & Next Actions */}
        <div className="mt-8 rounded-xl border border-stone-800 bg-stone-950 p-6 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-1">
            <h4 className="font-serif text-lg font-bold text-white flex items-center gap-2">
              <CheckCircle2 className="h-5 w-5 text-emerald-500" />
              <span>Prêt(e) à débuter votre projet de mariage béni au Niger ?</span>
            </h4>
            <p className="text-xs text-stone-400">
              Chaque démarche associe le tuteur légal, protège la pudeur des sœurs et respecte les préceptes de la Sunnah.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <button
              onClick={onStartMatching}
              className="rounded-md bg-emerald-800 px-5 py-2.5 text-xs font-semibold text-white shadow-xs hover:bg-emerald-700 transition whitespace-nowrap"
            >
              Créer mon profil de Zawaj
            </button>
            <button
              onClick={onExploreAdvice}
              className="rounded-md border border-stone-700 bg-stone-900 px-5 py-2.5 text-xs font-semibold text-stone-200 hover:bg-stone-800 transition whitespace-nowrap"
            >
              Accéder aux conseils Al-Nasiha
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
