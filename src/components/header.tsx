import Image from "next/image";

"use client";

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { Menu, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger, SheetClose } from '@/components/ui/sheet';

const navLinks = [
  { href: '#home', label: 'Inicio' },
  { href: '#about', label: 'Nosotros' },
  { href: '#products', label: 'Productos' },
  { href: '#services', label: 'Servicios' },
  { href: '#contact', label: 'Contacto' },
];

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeLink, setActiveLink] = useState('');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);

      const sections = navLinks.map(link => {
        const elem = document.querySelector(link.href);
        return elem ? elem : null;
      }).filter(Boolean);
      
      let current = '';
      for (const section of sections) {
        if (section) {
          const sectionTop = (section as HTMLElement).offsetTop;
          if (window.scrollY >= sectionTop - 100) {
            current = section.id;
          }
        }
      }
      setActiveLink(`#${current}`);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); 

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const targetElement = document.querySelector(href);
    if (targetElement) {
      const headerOffset = 64; // height of the header
      const elementPosition = targetElement.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
      setIsMobileMenuOpen(false); // Close mobile menu on click
    }
  };

  return (
    <header className={cn(
      "sticky top-0 z-40 w-full transition-all duration-300",
      isScrolled ? 'bg-background/80 backdrop-blur-lg border-b' : 'bg-transparent'
    )}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14">
          <a href="#" className="flex items-center gap-2">
            <Image src="/LOGO PRINCIPAL BLANCO.png" alt="FormaResortes Logo" width={80} height={16} className="w-20 md:w-24"/>
          </a>
          <nav className="hidden md:flex items-center space-x-1 lg:space-x-2">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className={cn(
                  "relative px-3 py-2 rounded-full transition-colors duration-300 font-headline font-medium text-sm lg:text-base tracking-wide text-foreground/80 btn-shine",
                  "hover:text-primary",
                  activeLink === link.href && "text-primary"
                )}
              >
                {link.label}
                {activeLink === link.href && (
                  <span className="absolute inset-x-2 bottom-0 h-0.5 bg-primary"></span>
                )}
              </a>
            ))}
          </nav>
          <div className="md:hidden">
            <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu className="h-6 w-6" />
                  <span className="sr-only">Abrir menú</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-full max-w-xs bg-background p-6">
                <div className="flex flex-col h-full">
                  <div className="flex justify-between items-center mb-8">
                     <Image src="/LOGO PRINCIPAL FORMARESORTES LEGOBLANCO SIN FONDO SAS.png" alt="FormaResortes Logo" width={120} height={24} />
                    <SheetClose asChild>
                       <Button variant="ghost" size="icon">
                        <X className="h-6 w-6" />
                         <span className="sr-only">Cerrar menú</span>
                      </Button>
                    </SheetClose>
                  </div>
                  <nav className="flex flex-col items-center justify-center flex-1 space-y-6">
                    {navLinks.map((link) => (
                      <a
                        key={link.href}
                        href={link.href}
                        onClick={(e) => {
                          handleNavClick(e, link.href);
                          setIsMobileMenuOpen(false);
                        }}
                        className={cn(
                          "relative text-2xl font-headline tracking-wide text-foreground/80 transition-colors duration-300 btn-shine",
                          "hover:text-primary",
                          activeLink === link.href && "text-primary"
                        )}
                      >
                        {link.label}
                      </a>
                    ))}
                  </nav>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}
