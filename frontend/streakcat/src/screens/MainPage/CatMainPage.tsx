import './CatMainPage.css'

export function CatMainPage() {
  return (
    <div className="walking-cat-area">
      <div className="walk-container">
        <svg width="120" height="120" viewBox="0 0 120 120">
          {/* Tail */}
          <g className="tail-sway-walk" style={{ transformOrigin: '20px 52px' }}>
            <path d="M20,52 Q5,35 10,18 Q14,8 18,20" fill="none" stroke="#E8A020" strokeWidth="5" strokeLinecap="round" />
          </g>

          <g className="body-bob-walk">
            {/* Back legs */}
            <g className="leg-back-left" style={{ transformOrigin: '35px 82px' }}>
              <rect x="30" y="82" width="10" height="24" rx="4" fill="#D4880C" />
              <ellipse cx="35" cy="108" rx="7" ry="4" fill="#D4880C" />
            </g>
            <g className="leg-back-right" style={{ transformOrigin: '45px 82px' }}>
              <rect x="40" y="82" width="10" height="24" rx="4" fill="#E8A020" />
              <ellipse cx="45" cy="108" rx="7" ry="4" fill="#E8A020" />
            </g>

            {/* Front legs */}
            <g className="leg-front-left" style={{ transformOrigin: '72px 82px' }}>
              <rect x="67" y="82" width="10" height="24" rx="4" fill="#D4880C" />
              <ellipse cx="72" cy="108" rx="7" ry="4" fill="#D4880C" />
            </g>
            <g className="leg-front-right" style={{ transformOrigin: '82px 82px' }}>
              <rect x="77" y="82" width="10" height="24" rx="4" fill="#E8A020" />
              <ellipse cx="82" cy="108" rx="7" ry="4" fill="#E8A020" />
            </g>

            {/* Body */}
            <ellipse cx="55" cy="72" rx="35" ry="22" fill="#F5A623" stroke="#D4880C" strokeWidth="1" />
            <ellipse cx="55" cy="76" rx="22" ry="14" fill="#FFF0D4" />

            {/* Left ear with wiggle */}
            <g className="ear-wiggle-walk" style={{ transformOrigin: '78px 38px' }}>
              <polygon points="70,38 65,12 83,30" fill="#F5A623" stroke="#D4880C" strokeWidth="1" />
              <polygon points="73,36 68,18 81,32" fill="#FFB7C5" />
            </g>
            {/* Right ear */}
            <polygon points="92,38 97,12 79,30" fill="#F5A623" stroke="#D4880C" strokeWidth="1" />
            <polygon points="89,36 94,18 81,32" fill="#FFB7C5" />

            {/* Head */}
            <circle cx="82" cy="45" r="20" fill="#F5A623" stroke="#D4880C" strokeWidth="1" />
            <ellipse cx="82" cy="50" rx="13" ry="9" fill="#FFF0D4" />

            {/* Eyes - happy closed */}
            <path d="M75,42 Q77,39 79,42" fill="none" stroke="#333" strokeWidth="1.5" strokeLinecap="round" />
            <path d="M85,42 Q87,39 89,42" fill="none" stroke="#333" strokeWidth="1.5" strokeLinecap="round" />

            {/* Nose */}
            <ellipse cx="82" cy="47" rx="2.5" ry="1.5" fill="#FFB7C5" />

            {/* Mouth */}
            <path d="M78,51 Q82,55 86,51" fill="none" stroke="#333" strokeWidth="1" strokeLinecap="round" />

            {/* Whiskers */}
            <line x1="65" y1="46" x2="74" y2="48" stroke="#D4880C" strokeWidth="1" strokeLinecap="round" />
            <line x1="64" y1="50" x2="74" y2="50" stroke="#D4880C" strokeWidth="1" strokeLinecap="round" />
            <line x1="90" y1="48" x2="99" y2="46" stroke="#D4880C" strokeWidth="1" strokeLinecap="round" />
            <line x1="90" y1="50" x2="100" y2="50" stroke="#D4880C" strokeWidth="1" strokeLinecap="round" />

            {/* Blush */}
            <circle cx="72" cy="52" r="4" fill="#FFB7C5" opacity="0.3" />
            <circle cx="92" cy="52" r="4" fill="#FFB7C5" opacity="0.3" />
          </g>
        </svg>
      </div>
    </div>
  )
}