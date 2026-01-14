
import React from 'react';
import { GoldButton } from './components/GoldButton';
import { ConciergeChat } from './components/ConciergeChat';
import { SUITES, EXPERIENCES, CONTACT_INFO, LOGO_URLS } from './constants';

const App: React.FC = () => {
  return (
    <div className="min-h-screen">
      {/* Navigation */}
      <nav className="fixed w-full z-50 top-0 bg-royal-blue/95 border-b border-gold-primary/30">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 flex flex-col items-center py-4">
          <div className="mb-4">
            <img 
              alt="Grand Melody Logo" 
              className="h-12 md:h-16 w-auto" 
              src={LOGO_URLS.nav} 
            />
          </div>
          <div className="flex items-center space-x-8 md:space-x-12">
            <a className="gold-heading text-[10px] md:text-sm tracking-[0.2em] hover:text-white transition-colors" href="#suites">SUITES</a>
            <a className="gold-heading text-[10px] md:text-sm tracking-[0.2em] hover:text-white transition-colors" href="#menu">FOOD MENU</a>
            <a className="gold-heading text-[10px] md:text-sm tracking-[0.2em] hover:text-white transition-colors" href="#drinks">DRINK LIST</a>
          </div>
        </div>
      </nav>

      {/* Hero Header */}
      <header className="relative h-screen flex items-center justify-center pt-24 overflow-hidden">
        <div className="absolute inset-0 z-0 scale-105 animate-pulse-slow">
          <img 
            alt="Luxury Karaoke Room" 
            className="w-full h-full object-cover opacity-30" 
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuDkqPyAoMqIGRS5NHgWMBzXKOjKeu9A5EQCrY7Vy09aGBB_aKP8NvYecj0uHKtw1T92ssaZUIaYMBF2dGmg78zTyYUPgIu9IREyo9mNUMsfLx379Mef2_RVcTaUyM3aJoihk2-1dXY7MRo-CuR4nmAXzXW7MJzyWy9zrRAI5AIBc1XOaVqoi_YxgfX1nkELgHKjJfLv5_sH5IaLsiI9Fcn55jCgQdLSK9DdrnC_YEUFYupQoN6Avu_tphQeu9rc6bCSxc7PLvNI_J0" 
          />
          <div className="absolute inset-0 bg-gradient-to-b from-royal-blue/80 via-transparent to-royal-blue"></div>
        </div>
        
        <div className="relative z-10 text-center px-4 max-w-5xl">
          <img 
            alt="Grand Melody Logo Large" 
            className="h-32 md:h-64 mx-auto mb-8 drop-shadow-[0_0_25px_rgba(212,175,55,0.6)]" 
            src={LOGO_URLS.hero} 
          />
          <h1 className="gold-heading text-4xl md:text-8xl mb-6 tracking-tight">GRAND MELODY</h1>
          <p className="gold-heading italic text-lg md:text-2xl mb-12 tracking-[0.3em]">VIP KARAOKE EXPERIENCE</p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <GoldButton text="RESERVE NOW" revealText={CONTACT_INFO.phone} />
            <a 
              className="border-2 border-gold-primary text-gold-primary px-12 py-4 rounded-full font-serif text-sm md:text-lg tracking-widest hover:bg-gold-primary/10 transition-all flex items-center justify-center" 
              href="#suites"
            >
              VIEW SUITES
            </a>
          </div>
        </div>
      </header>

      {/* Suites Section */}
      <section className="py-24 md:py-32 bg-royal-blue" id="suites">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="text-center mb-16 md:mb-24">
            <h2 className="gold-heading text-3xl md:text-6xl mb-4 uppercase">Luxury Suites</h2>
            <div className="w-32 h-0.5 bg-gold-primary mx-auto opacity-50"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10">
            {SUITES.map((suite) => (
              <div key={suite.id} className="group relative overflow-hidden rounded-xl gold-border-card bg-deep-blue flex flex-col">
                <div className="aspect-[4/5] overflow-hidden">
                  <img 
                    alt={suite.name} 
                    className="w-full h-full object-cover grayscale-[40%] group-hover:grayscale-0 transition-all duration-700 group-hover:scale-110" 
                    src={suite.imageUrl} 
                  />
                </div>
                <div className="p-8 flex flex-col flex-1">
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="gold-heading text-xl md:text-2xl">{suite.name}</h3>
                    <span className="text-[10px] tracking-[0.2em] text-gold-primary/70 uppercase">{suite.capacity}</span>
                  </div>
                  <p className="text-white/70 text-sm leading-relaxed mb-8 flex-1">
                    {suite.description}
                  </p>
                  <GoldButton text="BOOK SUITE" revealText={CONTACT_INFO.phone} fullWidth />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* VIP Experience Section */}
      <section className="py-24 md:py-32 bg-deep-blue border-y border-gold-primary/20" id="menu">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 md:gap-20 items-center">
            <div className="relative">
              <div className="rounded-2xl overflow-hidden gold-border-card aspect-square">
                <img 
                  alt="VIP Service Experience" 
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-[2s]" 
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuC2E9tK9wzr92a0d5raacaCuL8kpcT1J6MhcGqzdQ_3uUdV4WgtwP8fswe46jCUAqV-JqUMfo54LDcNN1sPAeGfJcQeiKetX-87EKU5uHppFSiKKgHHYSj3l2fDP1b_5Eiy0JaaLWjBxr-Dod3gjcpLPWW_fRU9jU5WzlzoEZddYA2fYPL2kbLj37FlePRXq-aYyQBCvQIoE6uihah58E0BW0sAzeaG7Ik9XMBm0YLnMzZTseT4oTS3MkXnvdK6iuP76Y8w0n1lMj8" 
                />
              </div>
              <div className="absolute -bottom-8 -left-8 bg-royal-blue border border-gold-primary p-6 md:p-8 rounded-lg shadow-2xl hidden md:block">
                <p className="gold-heading text-3xl md:text-5xl font-bold">500K+</p>
                <p className="white-body text-[10px] tracking-[0.2em] uppercase text-white/60">Premium Library</p>
              </div>
            </div>

            <div className="space-y-10 md:space-y-12">
              <h2 className="gold-heading text-3xl md:text-5xl leading-tight uppercase">Exclusive VIP Experiences</h2>
              <div className="space-y-10 md:space-y-12">
                {EXPERIENCES.map((exp, idx) => (
                  <div key={idx} className="flex gap-6 group">
                    <span className="material-symbols-outlined text-gold-primary text-4xl md:text-5xl group-hover:scale-110 transition-transform">
                      {exp.icon}
                    </span>
                    <div>
                      <h4 className="gold-heading text-lg md:text-xl mb-2" id={exp.title.includes('DRINK') ? 'drinks' : undefined}>
                        {exp.title}
                      </h4>
                      <p className="white-body text-sm md:text-base text-white/70 leading-relaxed">
                        {exp.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 md:py-32 bg-royal-blue text-center relative overflow-hidden">
        <div className="max-w-3xl mx-auto px-6 relative z-10">
          <h2 className="gold-heading text-3xl md:text-6xl mb-8 uppercase">Take the Stage</h2>
          <p className="white-body text-base md:text-xl mb-12 leading-relaxed opacity-80">
            Join the ranks of the city's elite. Book your private suite today and experience karaoke as it was meant to be: grand, luxurious, and unforgettable.
          </p>
          <GoldButton 
            text="RESERVE NOW" 
            revealText={CONTACT_INFO.phone} 
            className="px-16 py-5 text-xl shadow-2xl"
          />
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#000c24] border-t border-gold-primary/30 py-20">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="flex flex-col items-center text-center">
            <img 
              alt="Grand Melody Logo" 
              className="h-20 md:h-24 mb-12 opacity-80" 
              src={LOGO_URLS.footer} 
            />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-16 mb-16 w-full text-sm">
              <div>
                <h4 className="gold-heading mb-4 tracking-[0.3em] uppercase">Address</h4>
                <p className="white-body opacity-70 leading-loose">
                  {CONTACT_INFO.address.split(', ').map((part, i) => (
                    <React.Fragment key={i}>{part}<br/></React.Fragment>
                  ))}
                </p>
              </div>
              <div>
                <h4 className="gold-heading mb-4 tracking-[0.3em] uppercase">Contact</h4>
                <p className="white-body opacity-70 leading-loose">
                  Reservations: {CONTACT_INFO.phone}<br/>
                  Events: {CONTACT_INFO.email}
                </p>
              </div>
              <div>
                <h4 className="gold-heading mb-4 tracking-[0.3em] uppercase">Hours</h4>
                <p className="white-body opacity-70 leading-loose">
                  {CONTACT_INFO.hours.weekday}<br/>
                  {CONTACT_INFO.hours.weekend}
                </p>
              </div>
            </div>
            <p className="white-body text-[9px] md:text-[10px] tracking-[0.4em] text-white/30 uppercase font-light">
              © 2024 Grand Melody VIP Karaoke. All Rights Reserved.
            </p>
          </div>
        </div>
      </footer>

      {/* AI Concierge Chat */}
      <ConciergeChat />
    </div>
  );
};

export default App;
