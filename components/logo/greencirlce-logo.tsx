import Link from 'next/link';

interface LogoProps {
    variant?: 'default' | "white"
}
export function Logo({variant = 'default'}: LogoProps) {

    const color = variant === "default" ? "text-slate-900" : "text-white"
    return (
         <Link href="/" className="inline-block py-2">
      <h1 className={`text-2xl font-extrabold tracking-tight ${color}`}>
        Green
        <span className="relative ml-2 inline-block text-emerald-600">
          Circle
          
          {/* The Hand-Drawn Circle a   round the text */}
          <svg 
            className="absolute -top-2 -left-3 -right-3 -bottom-2 -z-10 h-[130%] w-[140%] text-emerald-500" 
            viewBox="0 -2 100 100" 
            preserveAspectRatio="none"
          >
            <path 
              d="M10,50 Q20,5 50,5 T90,50 T50,95 T10,50" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="3" 
              className="opacity-20"
            />
          </svg>
        </span>
      </h1>
    </Link>
    )
}