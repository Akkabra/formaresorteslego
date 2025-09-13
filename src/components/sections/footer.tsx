import Image from 'next/image';
import { Facebook, Instagram } from 'lucide-react';

const navLinks = [
    { href: '#home', label: 'Inicio' },
    { href: '#about', label: 'Nosotros' },
    { href: '#products', label: 'Productos' },
    { href: '#services', label: 'Servicios' },
    { href: '#contact', label: 'Contacto' },
];

const WhatsAppIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" className="h-6 w-6">
        <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.894 11.892-1.99 0-3.903-.52-5.586-1.459L.057 24zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.451-4.437-9.887-9.888-9.888-5.451 0-9.887 4.434-9.889 9.888-.001 2.225.651 4.315 1.847 6.03l-1.216 4.422 4.522-1.192z"/>
    </svg>
);


const GmailIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" className="h-6 w-6">
        <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm-1.3 2.5L12 11.25 5.3 6.5h13.4zM4 18V8l8 5 8-5v10H4z"/>
    </svg>
);


export default function Footer() {
    const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
        e.preventDefault();
        const targetId = href.substring(1);
        const targetElement = document.getElementById(targetId);
        if (targetElement) {
          const headerOffset = 80;
          const elementPosition = targetElement.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
    
          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
          });
        }
    };

    return (
        <footer className="bg-secondary text-gray-300">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center md:text-left">
                    <div className="md:col-span-1 flex flex-col items-center md:items-start">
                        <a href="#" className="flex items-center gap-2">
                           <Image src="/LOGO PRINCIPAL BLANCO.png" alt="FormaResortes Logo" width={200} height={40} />
                        </a>
                        <p className="mt-4 text-sm text-gray-400">
                            Ingeniería y precisión en cada resorte que fabricamos.
                        </p>
                    </div>

                    <div>
                        <h3 className="font-headline text-lg text-white">Navegación</h3>
                        <ul className="mt-4 space-y-2">
                            {navLinks.map((link) => (
                                <li key={link.href}>
                                    <a
                                        href={link.href}
                                        onClick={(e) => handleNavClick(e, link.href)}
                                        className="text-gray-400 hover:text-white transition-colors"
                                    >
                                        {link.label}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div>
                        <h3 className="font-headline text-lg text-white">Legal</h3>
                        <ul className="mt-4 space-y-2">
                            <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Política de Privacidad</a></li>
                            <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Términos de Servicio</a></li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="font-headline text-lg text-white">Síguenos</h3>
                        <div className="flex justify-center md:justify-start mt-4 space-x-4">
                            <a href="#" className="text-gray-400 hover:text-white transition-colors"><Facebook className="h-6 w-6" /></a>
                            <a href="#" className="text-gray-400 hover:text-white transition-colors"><Instagram className="h-6 w-6" /></a>
                            <a href="mailto:ventas@formaresortes.com" className="text-gray-400 hover:text-white transition-colors"><GmailIcon /></a>
                            <a href="https://wa.me/573101234567" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors"><WhatsAppIcon /></a>
                        </div>
                    </div>
                </div>

                <div className="mt-12 border-t border-gray-700 pt-8 text-center text-sm text-gray-400">
                    <p>&copy; {new Date().getFullYear()} FormaResortes LEGO SAS. Todos los derechos reservados.</p>
                </div>
            </div>
        </footer>
    );
}
