import type { SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement> & { className?: string };

function Svg({ children, className, ...props }: IconProps & { children: React.ReactNode }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true" {...props}>
      {children}
    </svg>
  );
}

export function Check(props: IconProps) { return <Svg {...props}><polyline points="20 6 9 17 4 12" /></Svg>; }
export function Plus(props: IconProps) { return <Svg {...props}><line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" /></Svg>; }
export function X(props: IconProps) { return <Svg {...props}><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></Svg>; }
export function Bookmark(props: IconProps) { return <Svg {...props}><path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" /></Svg>; }
export function Play(props: IconProps) { return <Svg {...props}><polygon points="5 3 19 12 5 21 5 3" /></Svg>; }
export function ChevronLeft(props: IconProps) { return <Svg {...props}><polyline points="15 18 9 12 15 6" /></Svg>; }
export function ChevronRight(props: IconProps) { return <Svg {...props}><polyline points="9 18 15 12 9 6" /></Svg>; }
export function ArrowRight(props: IconProps) { return <Svg {...props}><line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" /></Svg>; }
export function ArrowUpRight(props: IconProps) { return <Svg {...props}><line x1="7" y1="17" x2="17" y2="7" /><polyline points="7 7 17 7 17 17" /></Svg>; }
export function Sparkles(props: IconProps) { return <Svg {...props}><path d="M12 3l1.9 5.8L20 10l-5.8 1.9L12 18l-1.9-5.8L4 10l5.8-1.9L12 3z" /><path d="M5 3v4M3 5h4" /><path d="M19 17v4M17 19h4" /></Svg>; }
export function ArrowLeft(props: IconProps) { return <Svg {...props}><line x1="19" y1="12" x2="5" y2="12" /><polyline points="12 19 5 12 12 5" /></Svg>; }
export function Search(props: IconProps) { return <Svg {...props}><circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" /></Svg>; }
export function Bell(props: IconProps) { return <Svg {...props}><path d="M18 8a6 6 0 0 0-12 0c0 7-3 9-3 9h18s-3-2-3-9" /><path d="M13.73 21a2 2 0 0 1-3.46 0" /></Svg>; }
export function BellOff(props: IconProps) { return <Svg {...props}><path d="M13.73 21a2 2 0 0 1-3.46 0" /><path d="M18.63 13A17.9 17.9 0 0 1 18 8" /><path d="M6.26 6.26A6 6 0 0 0 6 8c0 7-3 9-3 9h14" /><path d="M18 8a6 6 0 0 0-9.33-5" /><line x1="1" y1="1" x2="23" y2="23" /></Svg>; }
export function User(props: IconProps) { return <Svg {...props}><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" /></Svg>; }
export function Home(props: IconProps) { return <Svg {...props}><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" /><polyline points="9 22 9 12 15 12 15 22" /></Svg>; }
export function Radar(props: IconProps) { return <Svg {...props}><path d="M19.07 4.93A10 10 0 1 1 12 2" /><path d="M12 12l8-4" /><circle cx="12" cy="12" r="2" /></Svg>; }
export function Gamepad2(props: IconProps) { return <Svg {...props}><line x1="6" y1="11" x2="10" y2="11" /><line x1="8" y1="9" x2="8" y2="13" /><line x1="15" y1="12" x2="15.01" y2="12" /><line x1="18" y1="10" x2="18.01" y2="10" /><path d="M17.32 5H6.68a4 4 0 0 0-3.98 3.59c-.34 3.4-.78 6.41 2.98 7.41a3 3 0 0 0 3.5-1.5l.5-1h4.64l.5 1a3 3 0 0 0 3.5 1.5c3.76-1 3.32-4.01 2.98-7.41A4 4 0 0 0 17.32 5z" /></Svg>; }
export function Star(props: IconProps) { return <Svg {...props}><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" /></Svg>; }
export function Settings2(props: IconProps) { return <Svg {...props}><path d="M20 7h-9" /><path d="M14 17H5" /><circle cx="17" cy="17" r="3" /><circle cx="7" cy="7" r="3" /></Svg>; }
export function Trash2(props: IconProps) { return <Svg {...props}><polyline points="3 6 5 6 21 6" /><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" /><line x1="10" y1="11" x2="10" y2="17" /><line x1="14" y1="11" x2="14" y2="17" /></Svg>; }
export function CalendarClock(props: IconProps) { return <Svg {...props}><path d="M21 7.5V6a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h6" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" /><circle cx="18" cy="17" r="3" /><path d="M18 16v1l1 1" /></Svg>; }
export function Tag(props: IconProps) { return <Svg {...props}><path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z" /><line x1="7" y1="7" x2="7.01" y2="7" /></Svg>; }
export function MessageSquare(props: IconProps) { return <Svg {...props}><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" /></Svg>; }
export function Heart(props: IconProps) { return <Svg {...props}><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" /></Svg>; }
export function Zap(props: IconProps) { return <Svg {...props}><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" /></Svg>; }
export function Compass(props: IconProps) { return <Svg {...props}><circle cx="12" cy="12" r="10" /><polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76" /></Svg>; }
export function Scale(props: IconProps) { return <Svg {...props}><path d="M12 3v18" /><path d="M5 7h14" /><path d="M6 7l-3 6h6z" /><path d="M18 7l3 6h-6z" /><path d="M8 21h8" /></Svg>; }
export function FileText(props: IconProps) { return <Svg {...props}><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><polyline points="14 2 14 8 20 8" /><line x1="16" y1="13" x2="8" y2="13" /><line x1="16" y1="17" x2="8" y2="17" /></Svg>; }
export function RefreshCw(props: IconProps) { return <Svg {...props}><polyline points="23 4 23 10 17 10" /><polyline points="1 20 1 14 7 14" /><path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15" /></Svg>; }
export function Newspaper(props: IconProps) { return <Svg {...props}><path d="M4 22h16a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v16a2 2 0 0 1-2 2zm0 0a2 2 0 0 1-2-2v-9c0-1.1.9-2 2-2h2" /><path d="M18 14h-8" /><path d="M15 18h-5" /><path d="M10 6h8v4h-8z" /></Svg>; }
export function Clock(props: IconProps) { return <Svg {...props}><circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" /></Svg>; }
