export default function Logo({size = 40}) {
    return (
        <svg width={size} height={size} viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg" aria-label="EMS logo">
            <defs>
                <linearGradient id="logoGrad" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0" stopColor="#42a5f5"/>
                    <stop offset="1" stopColor="#ab47bc"/>
                </linearGradient>
            </defs>
            <rect x="2" y="2" width="60" height="60" rx="16" fill="url(#logoGrad)" stroke="#fff" strokeWidth="3"/>
            <circle cx="32" cy="24" r="8" fill="#fff"/>
            <path d="M16 49c0-9 7-15 16-15s16 6 16 15z" fill="#fff"/>
            <circle cx="49" cy="17" r="3" fill="#fff" opacity="0.7"/>
        </svg>
    );
}