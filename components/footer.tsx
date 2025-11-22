import Link from "next/link";
import { Twitter, Linkedin, Facebook, Github } from 'lucide-react';
import { Logo } from "./logo/greencirlce-logo";

export function Footer() {
  return (
    <footer className="bg-slate-950 pt-20 pb-10">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 gap-12 md:grid-cols-4 lg:gap-8">
          
          {/* Brand Column */}
          <div className="col-span-1 md:col-span-1">
            {/* Dark Mode Logo Adaptation */}
            <Logo variant="white"/>
            
            <p className="text-sm leading-relaxed text-slate-400 mb-6 max-w-xs">
              The central hub for Ethiopia's innovation ecosystem. Connecting vetted startups with the resources they need to scale.
            </p>

            {/* Social Icons */}
            <div className="flex gap-4">
              <SocialLink href="#" icon={<Twitter className="h-4 w-4" />} label="Twitter" />
              <SocialLink href="#" icon={<Linkedin className="h-4 w-4" />} label="LinkedIn" />
              <SocialLink href="#" icon={<Facebook className="h-4 w-4" />} label="Facebook" />
              <SocialLink href="#" icon={<Github className="h-4 w-4" />} label="GitHub" />
            </div>
          </div>

          {/* Navigation Columns */}
          <div className="md:col-span-3 grid grid-cols-2 sm:grid-cols-3 gap-8">
            <div>
              <h4 className="mb-6 text-sm font-bold uppercase tracking-wider text-slate-100">Platform</h4>
              <ul className="space-y-4">
                <FooterLink href="/startups">Browse Startups</FooterLink>
                <FooterLink href="/submit">Submit Startup</FooterLink>
                <FooterLink href="/register">Investors</FooterLink>
                <FooterLink href="/partners">Partners</FooterLink>
              </ul>
            </div>

            <div>
              <h4 className="mb-6 text-sm font-bold uppercase tracking-wider text-slate-100">Support</h4>
              <ul className="space-y-4">
                <FooterLink href="/help">Help Center</FooterLink>
                <FooterLink href="/contact">Contact Us</FooterLink>
                <FooterLink href="/guidelines">Verification Guide</FooterLink>
                <FooterLink href="/faq">FAQ</FooterLink>
              </ul>
            </div>

            <div>
              <h4 className="mb-6 text-sm font-bold uppercase tracking-wider text-slate-100">Legal</h4>
              <ul className="space-y-4">
                <FooterLink href="/privacy">Privacy Policy</FooterLink>
                <FooterLink href="/terms">Terms of Service</FooterLink>
                <FooterLink href="/law">Startup Law (Proclamation)</FooterLink>
                <FooterLink href="/cookies">Cookie Settings</FooterLink>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-16 border-t border-slate-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-slate-500 text-center md:text-left">
            &copy; {new Date().getFullYear()} Green Circle. All rights reserved.
          </p>
          
          <div className="flex items-center gap-2 text-xs text-slate-500">
            <span>Built in Ethiopia</span>
            <span className="h-1 w-1 rounded-full bg-emerald-500"></span>
            <span>Empowering Africa</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

// Helper Components for clean code
function FooterLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <li>
      <Link 
        href={href} 
        className="text-sm text-slate-400 transition-colors hover:text-emerald-400 hover:underline hover:underline-offset-4"
      >
        {children}
      </Link>
    </li>
  );
}

function SocialLink({ href, icon, label }: { href: string; icon: React.ReactNode; label: string }) {
  return (
    <Link 
      href={href} 
      aria-label={label}
      className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-900 text-slate-400 transition-all hover:bg-emerald-500 hover:text-white hover:-translate-y-1"
    >
      {icon}
    </Link>
  );
}