import Link from 'next/link';

export function Logo() {

    return (
         <Link href="/" className="inline-block py-2">
      <h1 className="text-2xl font-extrabold tracking-tight text-slate-900">
        Green
        <span className="relative ml-2 inline-block text-emerald-600">
          Circle
          
          {/* The Hand-Drawn Circle around the text */}
          <svg 
            className="absolute -top-2 -left-3 -right-3 -bottom-2 -z-10 h-[140%] w-[130%] text-emerald-500" 
            viewBox="0 0 100 100" 
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