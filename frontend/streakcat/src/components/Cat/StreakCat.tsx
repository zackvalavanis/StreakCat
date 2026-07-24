import './StreakCat.css'

export type MoodKey = 'happy' | 'neutral' | 'annoyed' | 'angry' | 'very_angry'

interface StreakCatProps {
  moodKey: MoodKey
  weeklyCompleted: number
  totalTasksThisWeek: number
  dailyCompleted: number
}

const moodLabels: Record<MoodKey, { label: string; desc: string }> = {
  happy: { label: 'Happy', desc: 'Sleeping peacefully in bed' },
  neutral: { label: 'Neutral', desc: 'Just vibing' },
  annoyed: { label: 'Slightly Annoyed', desc: 'Getting impatient' },
  angry: { label: 'Angry', desc: 'Staring you down' },
  very_angry: { label: 'Very Angry', desc: 'Knocking everything off the table' },
}

function Whiskers({ cx, cy, s }: { cx: number; cy: number; s: number }) {
  return (
    <>
      <line x1={cx - 30 * s} y1={cy} x2={cx - 16 * s} y2={cy + 2 * s} stroke="#D4880C" strokeWidth="1" strokeLinecap="round" />
      <line x1={cx - 30 * s} y1={cy + 5 * s} x2={cx - 16 * s} y2={cy + 5 * s} stroke="#D4880C" strokeWidth="1" strokeLinecap="round" />
      <line x1={cx + 16 * s} y1={cy + 2 * s} x2={cx + 30 * s} y2={cy} stroke="#D4880C" strokeWidth="1" strokeLinecap="round" />
      <line x1={cx + 16 * s} y1={cy + 5 * s} x2={cx + 30 * s} y2={cy + 5 * s} stroke="#D4880C" strokeWidth="1" strokeLinecap="round" />
    </>
  )
}

function Ears({ cx, cy, s, animated }: { cx: number; cy: number; s: number; animated?: boolean }) {
  const leftEar = (
    <>
      <polygon points={`${cx - 28 * s},${cy - 12 * s} ${cx - 38 * s},${cy - 52 * s} ${cx - 8 * s},${cy - 22 * s}`} fill="#F5A623" stroke="#D4880C" strokeWidth="1.5" />
      <polygon points={`${cx - 25 * s},${cy - 16 * s} ${cx - 33 * s},${cy - 42 * s} ${cx - 12 * s},${cy - 22 * s}`} fill="#FFB7C5" />
    </>
  )
  return (
    <>
      {animated ? <g className="ear-twitch">{leftEar}</g> : leftEar}
      <polygon points={`${cx + 28 * s},${cy - 12 * s} ${cx + 38 * s},${cy - 52 * s} ${cx + 8 * s},${cy - 22 * s}`} fill="#F5A623" stroke="#D4880C" strokeWidth="1.5" />
      <polygon points={`${cx + 25 * s},${cy - 16 * s} ${cx + 33 * s},${cy - 42 * s} ${cx + 12 * s},${cy - 22 * s}`} fill="#FFB7C5" />
    </>
  )
}

function Nose({ cx, cy, s }: { cx: number; cy: number; s: number }) {
  return <ellipse cx={cx} cy={cy + 3 * s} rx={3 * s} ry={2 * s} fill="#FFB7C5" />
}

function Paws({ cx, cy, s }: { cx: number; cy: number; s: number }) {
  return (
    <>
      <ellipse cx={cx - 35 * s} cy={cy} rx={16 * s} ry={10 * s} fill="#F5A623" stroke="#D4880C" strokeWidth="1.5" />
      <circle cx={cx - 40 * s} cy={cy - 2 * s} r={3.5 * s} fill="#FFF0D4" />
      <circle cx={cx - 33 * s} cy={cy - 4 * s} r={3.5 * s} fill="#FFF0D4" />
      <circle cx={cx - 27 * s} cy={cy - 1 * s} r={3.5 * s} fill="#FFF0D4" />
      <ellipse cx={cx + 35 * s} cy={cy} rx={16 * s} ry={10 * s} fill="#F5A623" stroke="#D4880C" strokeWidth="1.5" />
      <circle cx={cx + 27 * s} cy={cy - 1 * s} r={3.5 * s} fill="#FFF0D4" />
      <circle cx={cx + 33 * s} cy={cy - 4 * s} r={3.5 * s} fill="#FFF0D4" />
      <circle cx={cx + 40 * s} cy={cy - 2 * s} r={3.5 * s} fill="#FFF0D4" />
    </>
  )
}

function HappyScene() {
  const cx = 165, cy = 198, s = 0.9
  return (
    <svg width="340" height="300" viewBox="0 0 340 300">
      <ellipse cx="170" cy="250" rx="120" ry="35" fill="#E8D5B7" stroke="#C9A96E" strokeWidth="1.5" />
      <rect x="55" y="220" width="230" height="30" rx="8" fill="#E8D5B7" stroke="#C9A96E" strokeWidth="1.5" />
      <ellipse cx="170" cy="220" rx="115" ry="20" fill="#F5E6CC" />
      <rect x="65" y="200" width="20" height="55" rx="4" fill="#C9A96E" stroke="#A68544" strokeWidth="1" />
      <rect x="255" y="200" width="20" height="55" rx="4" fill="#C9A96E" stroke="#A68544" strokeWidth="1" />
      <ellipse cx="170" cy="225" rx="90" ry="22" fill="#B8D4E8" />
      <ellipse cx="170" cy="218" rx="80" ry="16" fill="#D4E8F5" />
      <g className="breathe" style={{ transformOrigin: '170px 220px' }}>
        <ellipse cx="170" cy="215" rx="55" ry="30" fill="#F5A623" stroke="#D4880C" strokeWidth="1.5" />
        <path d="M225,210 Q240,190 250,195 Q260,200 245,215" fill="#F5A623" stroke="#D4880C" strokeWidth="1.5" />
        <ellipse cx="135" cy="228" rx="12" ry="8" fill="#F5A623" stroke="#D4880C" strokeWidth="1" />
        <circle cx="130" cy="226" r="3" fill="#FFF0D4" />
        <circle cx="136" cy="225" r="3" fill="#FFF0D4" />
        <ellipse cx="200" cy="230" rx="12" ry="8" fill="#F5A623" stroke="#D4880C" strokeWidth="1" />
        <Ears cx={cx} cy={cy} s={s} />
        <circle cx={cx} cy={cy} r={30 * s} fill="#F5A623" stroke="#D4880C" strokeWidth="1.5" />
        <ellipse cx={cx} cy={cy + 5 * s} rx={18 * s} ry={12 * s} fill="#FFF0D4" />
        <path d={`M${cx - 14 * s},${cy - 4 * s} Q${cx - 10 * s},${cy - 8 * s} ${cx - 6 * s},${cy - 4 * s}`} fill="none" stroke="#333" strokeWidth="2" strokeLinecap="round" />
        <path d={`M${cx + 6 * s},${cy - 4 * s} Q${cx + 10 * s},${cy - 8 * s} ${cx + 14 * s},${cy - 4 * s}`} fill="none" stroke="#333" strokeWidth="2" strokeLinecap="round" />
        <Nose cx={cx} cy={cy} s={s} />
        <path d={`M${cx - 6 * s},${cy + 7 * s} Q${cx},${cy + 14 * s} ${cx + 6 * s},${cy + 7 * s}`} fill="none" stroke="#333" strokeWidth="1.5" strokeLinecap="round" />
        <circle cx={cx - 20 * s} cy={cy + 5 * s} r={5 * s} fill="#FFB7C5" opacity="0.4" />
        <circle cx={cx + 20 * s} cy={cy + 5 * s} r={5 * s} fill="#FFB7C5" opacity="0.4" />
        <Whiskers cx={cx} cy={cy} s={s} />
      </g>
      <g className="zzz1"><text x="210" y="172" fill="#888" fontFamily="sans-serif" fontSize="16" fontStyle="italic">z</text></g>
      <g className="zzz2"><text x="225" y="157" fill="#AAA" fontFamily="sans-serif" fontSize="13" fontStyle="italic">z</text></g>
      <g className="zzz3"><text x="237" y="145" fill="#CCC" fontFamily="sans-serif" fontSize="11" fontStyle="italic">z</text></g>
    </svg>
  )
}

function NeutralScene() {
  const cx = 120, cy = 175, s = 1
  return (
    <svg width="240" height="300" viewBox="0 0 240 300">
      <g className="tail-wag" style={{ transformOrigin: '50px 230px' }}>
        <path d="M50,230 Q25,200 35,170 Q45,145 55,160" fill="none" stroke="#E8A020" strokeWidth="7" strokeLinecap="round" />
      </g>
      <g className="breathe-slow" style={{ transformOrigin: '120px 240px' }}>
        <ellipse cx="120" cy="240" rx="60" ry="45" fill="#F5A623" stroke="#D4880C" strokeWidth="1.5" />
        <ellipse cx="120" cy="248" rx="35" ry="28" fill="#FFF0D4" />
      </g>
      <g className="head-bob">
        <Ears cx={cx} cy={cy} s={s} />
        <circle cx={cx} cy={cy} r={30} fill="#F5A623" stroke="#D4880C" strokeWidth="1.5" />
        <ellipse cx={cx} cy={cy + 5} rx="18" ry="12" fill="#FFF0D4" />
        <g className="blink" style={{ transformOrigin: `${cx}px ${cy - 5}px` }}>
          <ellipse cx={cx - 10} cy={cy - 5} rx="5" ry="6" fill="white" stroke="#333" strokeWidth="1" />
          <circle cx={cx - 10} cy={cy - 4} r="3" fill="#333" />
          <circle cx={cx - 12} cy={cy - 6} r="1.2" fill="white" />
          <ellipse cx={cx + 10} cy={cy - 5} rx="5" ry="6" fill="white" stroke="#333" strokeWidth="1" />
          <circle cx={cx + 10} cy={cy - 4} r="3" fill="#333" />
          <circle cx={cx + 8} cy={cy - 6} r="1.2" fill="white" />
        </g>
        <Nose cx={cx} cy={cy} s={s} />
        <line x1={cx - 5} y1={cy + 8} x2={cx + 5} y2={cy + 8} stroke="#333" strokeWidth="1.5" strokeLinecap="round" />
        <Whiskers cx={cx} cy={cy} s={s} />
      </g>
      <Paws cx={120} cy={275} s={1} />
    </svg>
  )
}

function AnnoyedScene() {
  const cx = 120, cy = 175, s = 1
  return (
    <svg width="240" height="300" viewBox="0 0 240 300">
      <g className="tail-flick" style={{ transformOrigin: '50px 230px' }}>
        <path d="M50,230 Q35,215 40,200 Q44,190 46,198" fill="none" stroke="#E8A020" strokeWidth="7" strokeLinecap="round" />
      </g>
      <g className="breathe-fast" style={{ transformOrigin: '120px 240px' }}>
        <ellipse cx="120" cy="240" rx="60" ry="45" fill="#F5A623" stroke="#D4880C" strokeWidth="1.5" />
        <ellipse cx="120" cy="248" rx="35" ry="28" fill="#FFF0D4" />
      </g>
      <Ears cx={cx} cy={cy} s={s} animated />
      <circle cx={cx} cy={cy} r="30" fill="#F5A623" stroke="#D4880C" strokeWidth="1.5" />
      <ellipse cx={cx} cy={cy + 5} rx="18" ry="12" fill="#FFF0D4" />
      <ellipse cx={cx - 10} cy={cy - 4} rx="5" ry="3" fill="white" stroke="#333" strokeWidth="1" />
      <circle cx={cx - 10} cy={cy - 3} r="2.5" fill="#333" />
      <ellipse cx={cx + 10} cy={cy - 4} rx="5" ry="3" fill="white" stroke="#333" strokeWidth="1" />
      <circle cx={cx + 10} cy={cy - 3} r="2.5" fill="#333" />
      <line x1={cx - 16} y1={cy - 14} x2={cx - 5} y2={cy - 12} stroke="#D4880C" strokeWidth="2.5" strokeLinecap="round" />
      <line x1={cx + 5} y1={cy - 12} x2={cx + 16} y2={cy - 14} stroke="#D4880C" strokeWidth="2.5" strokeLinecap="round" />
      <Nose cx={cx} cy={cy} s={s} />
      <path d={`M${cx - 6},${cy + 10} Q${cx},${cy + 6} ${cx + 6},${cy + 10}`} fill="none" stroke="#333" strokeWidth="1.5" strokeLinecap="round" />
      <Whiskers cx={cx} cy={cy} s={s} />
      <g className="anger-pulse">
        <line x1="148" y1="155" x2="155" y2="148" stroke="#D85A30" strokeWidth="2" strokeLinecap="round" />
        <line x1="152" y1="158" x2="159" y2="151" stroke="#D85A30" strokeWidth="2" strokeLinecap="round" />
      </g>
      <Paws cx={120} cy={275} s={1} />
    </svg>
  )
}

function AngryScene() {
  const cx = 140, cy = 172, s = 1.05
  return (
    <svg width="280" height="300" viewBox="0 0 280 300">
      <g className="tail-angry" style={{ transformOrigin: '65px 240px' }}>
        <path d="M65,240 Q55,235 58,225 Q62,218 60,225" fill="none" stroke="#E8A020" strokeWidth="7" strokeLinecap="round" />
      </g>
      <g className="breathe-fast" style={{ transformOrigin: '140px 240px' }}>
        <ellipse cx="140" cy="240" rx="60" ry="45" fill="#F5A623" stroke="#D4880C" strokeWidth="1.5" />
        <ellipse cx="140" cy="248" rx="35" ry="28" fill="#FFF0D4" />
      </g>
      <Ears cx={cx} cy={cy} s={s} animated />
      <circle cx={cx} cy={cy} r={30 * s} fill="#F5A623" stroke="#D4880C" strokeWidth="1.5" />
      <ellipse cx={cx} cy={cy + 5 * s} rx={18 * s} ry={12 * s} fill="#FFF0D4" />
      <ellipse cx={cx - 10 * s} cy={cy - 5 * s} rx={6 * s} ry={7 * s} fill="white" stroke="#333" strokeWidth="1" />
      <circle cx={cx - 10 * s} cy={cy - 4 * s} r={3.5 * s} fill="#333" />
      <circle cx={cx - 12 * s} cy={cy - 6 * s} r={1.5 * s} fill="white" />
      <ellipse cx={cx + 10 * s} cy={cy - 5 * s} rx={6 * s} ry={7 * s} fill="white" stroke="#333" strokeWidth="1" />
      <circle cx={cx + 10 * s} cy={cy - 4 * s} r={3.5 * s} fill="#333" />
      <circle cx={cx + 8 * s} cy={cy - 6 * s} r={1.5 * s} fill="white" />
      <line x1={cx - 16 * s} y1={cy - 10 * s} x2={cx - 5 * s} y2={cy - 16 * s} stroke="#8B4513" strokeWidth="3" strokeLinecap="round" />
      <line x1={cx + 5 * s} y1={cy - 16 * s} x2={cx + 16 * s} y2={cy - 10 * s} stroke="#8B4513" strokeWidth="3" strokeLinecap="round" />
      <Nose cx={cx} cy={cy} s={s} />
      <path d={`M${cx - 6 * s},${cy + 10 * s} Q${cx},${cy + 6 * s} ${cx + 6 * s},${cy + 10 * s}`} fill="none" stroke="#333" strokeWidth="1.5" strokeLinecap="round" />
      <Whiskers cx={cx} cy={cy} s={s} />
      <g className="anger-pulse-fast">
        <line x1="175" y1="145" x2="183" y2="137" stroke="#E24B4A" strokeWidth="2.5" strokeLinecap="round" />
        <line x1="183" y1="145" x2="175" y2="137" stroke="#E24B4A" strokeWidth="2.5" strokeLinecap="round" />
      </g>
      <g className="anger-pulse-fast-delayed">
        <line x1="190" y1="152" x2="198" y2="144" stroke="#E24B4A" strokeWidth="2" strokeLinecap="round" />
        <line x1="198" y1="152" x2="190" y2="144" stroke="#E24B4A" strokeWidth="2" strokeLinecap="round" />
      </g>
      <Paws cx={140} cy={275} s={1} />
    </svg>
  )
}

function VeryAngryScene() {
  const cx = 155, cy = 155, s = 0.9
  return (
    <svg width="400" height="320" viewBox="0 0 400 320">
      <rect x="40" y="220" width="220" height="12" rx="2" fill="#A68544" stroke="#8B6914" strokeWidth="1" />
      <rect x="50" y="232" width="12" height="60" rx="2" fill="#A68544" stroke="#8B6914" strokeWidth="1" />
      <rect x="238" y="232" width="12" height="60" rx="2" fill="#A68544" stroke="#8B6914" strokeWidth="1" />
      <g className="obj-fall-1" style={{ transformOrigin: '100px 210px' }}>
        <ellipse cx="100" cy="210" rx="14" ry="14" fill="#4A90D9" stroke="#2C6CB0" strokeWidth="1" />
        <ellipse cx="100" cy="205" rx="10" ry="3" fill="#6BB0F0" />
      </g>
      <g className="obj-fall-2" style={{ transformOrigin: '140px 200px' }}>
        <rect x="130" y="195" width="22" height="25" rx="3" fill="#E24B4A" stroke="#A32D2D" strokeWidth="1" />
        <rect x="133" y="198" width="16" height="5" rx="1" fill="#F09595" />
      </g>
      <g className="obj-fall-3" style={{ transformOrigin: '200px 190px' }}>
        <path d="M200,175 Q200,165 195,160 Q190,155 200,150 Q210,155 205,160 Q200,165 200,175Z" fill="#639922" stroke="#3B6D11" strokeWidth="1" />
        <rect x="197" y="175" width="6" height="15" rx="2" fill="#A68544" />
        <circle cx="200" cy="210" r="10" fill="#639922" stroke="#3B6D11" strokeWidth="1" />
      </g>
      <g className="tail-angry" style={{ transformOrigin: '58px 230px' }}>
        <path d="M58,230 Q55,220 60,210" fill="none" stroke="#E8A020" strokeWidth="6" strokeLinecap="round" />
      </g>
      <g className="hiss-pulse" style={{ transformOrigin: '160px 200px' }}>
        <ellipse cx="160" cy="200" rx="50" ry="30" fill="#F5A623" stroke="#D4880C" strokeWidth="1.5" />
        <ellipse cx="160" cy="206" rx="30" ry="18" fill="#FFF0D4" />
      </g>
      <g className="paw-knock" style={{ transformOrigin: '205px 195px' }}>
        <path d="M205,195 Q220,185 235,190" fill="none" stroke="#F5A623" strokeWidth="8" strokeLinecap="round" />
        <ellipse cx="237" cy="190" rx="8" ry="6" fill="#F5A623" stroke="#D4880C" strokeWidth="1" />
        <circle cx="233" cy="188" r="2.5" fill="#FFF0D4" />
        <circle cx="238" cy="186" r="2.5" fill="#FFF0D4" />
        <circle cx="243" cy="189" r="2.5" fill="#FFF0D4" />
      </g>
      <ellipse cx="125" cy="222" rx="12" ry="8" fill="#F5A623" stroke="#D4880C" strokeWidth="1" />
      <ellipse cx="195" cy="222" rx="12" ry="8" fill="#F5A623" stroke="#D4880C" strokeWidth="1" />
      <Ears cx={cx} cy={cy} s={s} animated />
      <circle cx={cx} cy={cy} r={30 * s} fill="#F5A623" stroke="#D4880C" strokeWidth="1.5" />
      <ellipse cx={cx} cy={cy + 5 * s} rx={18 * s} ry={12 * s} fill="#FFF0D4" />
      <ellipse cx={cx - 10 * s} cy={cy - 5 * s} rx={6 * s} ry={7 * s} fill="white" stroke="#333" strokeWidth="1" />
      <circle cx={cx - 10 * s} cy={cy - 4 * s} r={3.5 * s} fill="#333" />
      <circle cx={cx - 12 * s} cy={cy - 6 * s} r={1.5 * s} fill="white" />
      <ellipse cx={cx + 10 * s} cy={cy - 5 * s} rx={6 * s} ry={7 * s} fill="white" stroke="#333" strokeWidth="1" />
      <circle cx={cx + 10 * s} cy={cy - 4 * s} r={3.5 * s} fill="#333" />
      <circle cx={cx + 8 * s} cy={cy - 6 * s} r={1.5 * s} fill="white" />
      <line x1={cx - 16 * s} y1={cy - 10 * s} x2={cx - 5 * s} y2={cy - 16 * s} stroke="#8B4513" strokeWidth="3" strokeLinecap="round" />
      <line x1={cx + 5 * s} y1={cy - 16 * s} x2={cx + 16 * s} y2={cy - 10 * s} stroke="#8B4513" strokeWidth="3" strokeLinecap="round" />
      <Nose cx={cx} cy={cy} s={s} />
      <ellipse cx={cx} cy={cy + 9 * s} rx={5 * s} ry={4 * s} fill="#FF6B6B" stroke="#333" strokeWidth="1" />
      <path d={`M${cx - 3 * s},${cy + 8 * s} L${cx - 1 * s},${cy + 10 * s} L${cx + 1 * s},${cy + 8 * s} L${cx + 3 * s},${cy + 10 * s}`} fill="none" stroke="white" strokeWidth="1" />
      <Whiskers cx={cx} cy={cy} s={s} />
      <g className="anger-pulse-fast">
        <line x1="182" y1="130" x2="192" y2="120" stroke="#E24B4A" strokeWidth="3" strokeLinecap="round" />
        <line x1="192" y1="130" x2="182" y2="120" stroke="#E24B4A" strokeWidth="3" strokeLinecap="round" />
      </g>
      <g className="anger-pulse-fast-delayed">
        <line x1="197" y1="138" x2="207" y2="128" stroke="#E24B4A" strokeWidth="2.5" strokeLinecap="round" />
        <line x1="207" y1="138" x2="197" y2="128" stroke="#E24B4A" strokeWidth="2.5" strokeLinecap="round" />
      </g>
      <g className="anger-pulse-fast-delayed-2">
        <line x1="202" y1="118" x2="210" y2="110" stroke="#E24B4A" strokeWidth="2" strokeLinecap="round" />
        <line x1="210" y1="118" x2="202" y2="110" stroke="#E24B4A" strokeWidth="2" strokeLinecap="round" />
      </g>
    </svg>
  )
}

const sceneComponents: Record<MoodKey, () => React.ReactElement> = {
  happy: HappyScene,
  neutral: NeutralScene,
  annoyed: AnnoyedScene,
  angry: AngryScene,
  very_angry: VeryAngryScene,
}

export function StreakCat({ moodKey, weeklyCompleted, totalTasksThisWeek, dailyCompleted }: StreakCatProps) {
  const info = moodLabels[moodKey]
  const SceneComponent = sceneComponents[moodKey]

  return (
    <div style={{ textAlign: 'center', paddingBottom: '2rem' }}>
      <div style={{ display: 'inline-block' }}>
        <SceneComponent />
      </div>
      <h2 style={{ margin: '19px 0 4px', fontSize: '20px', color: 'white' }}>{info.label}</h2>
      <p style={{ margin: '0 0 4px', color: 'white' }}>{weeklyCompleted}/{totalTasksThisWeek} tasks this week</p>
      <p style={{ color: 'white', margin: 0 }}>{dailyCompleted} completed today</p>
    </div>
  )
}