import React, { useEffect, useState } from 'react';
import { HeroSection } from './components/HeroSection';
import { CoupleSection } from './components/CoupleSection';
import { VenueSection } from './components/VenueSection';
import { TimelineSection } from './components/TimelineSection';
import { PhotoMomentsSection } from './components/PhotoMomentsSection';
import { RSVPSection } from './components/RSVPSection';
import { FooterClosingSection } from './components/FooterClosingSection';
import { AudioPlayer } from './components/AudioPlayer';
import { WEDDING_DATA } from './data/weddingData';
import { supabase } from './lib/supabaseClient';
import { 
  Heart, 
  MapPin, 
  Calendar, 
  CheckSquare, 
  Smartphone,
  Maximize2
} from 'lucide-react';

export default function App() {
  const [guestName, setGuestName] = useState<string | undefined>(undefined);

  // Personalized invite links (e.g. /Vo-Van-Nam) prefill the RSVP form with the guest's name.
  useEffect(() => {
    const slug = window.location.pathname.replace(/^\//, '');
    if (!slug || slug === 'admin') return;

    supabase
      .from('invite_links')
      .select('name')
      .eq('slug', slug)
      .maybeSingle()
      .then(({ data }) => {
        if (data) setGuestName(data.name);
      });
  }, []);

  const scrollToSection = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <main className="min-h-screen bg-[#2D1217] flex justify-center items-start text-[#2c1810] selection:bg-[#7A121D] selection:text-white font-body py-0 md:py-6 px-0 md:px-4">
      
      {/* Background Decorative Ambience */}
      <div className="fixed inset-0 pointer-events-none opacity-30 bg-[radial-gradient(#FAF6F0_1px,transparent_1px)] [background-size:24px_24px] z-0" />

      {/* Main Single Flowing Mobile Card Container */}
      <div className="relative w-full max-w-[480px] min-h-screen bg-[#FAF6F0] shadow-2xl md:rounded-[40px] overflow-hidden z-10 border-0 md:border-8 md:border-[#3D1A21]/40 flex flex-col">
        
        {/* iOS Dynamic Island / Top Header Bar for realistic story feel */}
        <header className="sticky top-0 z-40 bg-[#FAF6F0]/90 backdrop-blur-md px-4 py-3 border-b border-[#7A121D]/10 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="font-script text-xl text-[#7A121D] font-bold">
              {WEDDING_DATA.bride.shortName} & {WEDDING_DATA.groom.shortName}
            </span>
            <span className="text-[10px] uppercase font-semibold text-[#8C7377] tracking-wider hidden sm:inline">
              • {String(WEDDING_DATA.event.day).padStart(2, '0')}.{String(WEDDING_DATA.event.month).padStart(2, '0')}.{WEDDING_DATA.event.year}
            </span>
          </div>

        </header>

        {/* 1. HERO SECTION: Save the Date, Monogram, Mini Polaroids, Calendar, Parents */}
        <HeroSection />

        {/* 2. COUPLE SECTION: Torn Paper Effect, Photos of Bride & Groom with 3D White Paper Flowers */}
        <CoupleSection />

        {/* 3. VENUE SECTION: Date, Lunar Date, Location, White Palace & Maps */}
        <VenueSection />

        {/* 4. TIMELINE SECTION: Artistic Curvy Flow with 14:00, 17:00, 17:30, 19:00 */}
        <TimelineSection />

        {/* 6. OUR MOMENTS GALLERY SECTION: Romantic Collage with Lightbox */}
        <PhotoMomentsSection />

        {/* 7. RSVP FORM & GUESTBOOK SECTION */}
        <RSVPSection prefillName={guestName} />

        {/* 8. FOOTER CLOSING SECTION: Thank you, Ending Quote */}
        <FooterClosingSection />

        {/* Bottom Floating Navigation Dock */}
        <nav aria-label="Điều hướng nhanh" className="sticky bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-[#7A121D]/15 px-3 py-2 flex items-center justify-around shadow-lg">
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="flex flex-col items-center text-[#7A121D] hover:text-[#550C14] transition-colors p-1"
          >
            <Heart className="w-4 h-4" />
            <span className="text-[9px] font-medium mt-0.5">Trang Đầu</span>
          </button>

          <a
            href={WEDDING_DATA.event.mapLink}
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-col items-center text-[#7A121D] hover:text-[#550C14] transition-colors p-1"
          >
            <MapPin className="w-4 h-4" />
            <span className="text-[9px] font-medium mt-0.5">Chỉ Đường</span>
          </a>

          <button
            onClick={() => scrollToSection('rsvp-section')}
            className="flex flex-col items-center text-[#7A121D] hover:text-[#550C14] transition-colors p-1"
          >
            <CheckSquare className="w-4 h-4" />
            <span className="text-[9px] font-medium mt-0.5">RSVP</span>
          </button>
        </nav>

      </div>

      {/* Floating Audio Vinyl Disc Player in Corner */}
      <AudioPlayer />
    </main>
  );
}
