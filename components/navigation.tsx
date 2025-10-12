"use client"

import { useState, useEffect } from "react"
import { Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"

export function Navigation() {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

    useEffect(() => {
        if (isMobileMenuOpen) {
            document.body.style.overflow = "hidden"
        } else {
            document.body.style.overflow = "unset"
        }
        return () => {
            document.body.style.overflow = "unset"
        }
    }, [isMobileMenuOpen])

    const scrollToSection = (sectionId: string) => {
        const element = document.getElementById(sectionId)
        if (element) {
            const offset = 80
            const elementPosition = element.getBoundingClientRect().top
            const offsetPosition = elementPosition + window.pageYOffset - offset

            window.scrollTo({
                top: offsetPosition,
                behavior: "smooth",
            })
            setIsMobileMenuOpen(false)
        }
    }

    const navLinks = [
        { label: "Головна", id: "hero" },
        { label: "Про нас", id: "about" },
        { label: "Діяльність", id: "activities" },
        { label: "Події", id: "events" },
        { label: "Контакти", id: "contact" },
    ]

    return (
        <>
            <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-xl border-b border-white/20 shadow-lg shadow-black/5">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-20">
                        {/* Logo */}
                        <button onClick={() => scrollToSection("hero")} className="flex items-center gap-3 group cursor-pointer">
                            <div className="relative w-12 h-12 rounded-full overflow-hidden flex items-center justify-center shadow-lg shadow-primary/30 group-hover:shadow-xl group-hover:shadow-primary/40 group-hover:scale-105 transition-all duration-300">
                                <img src="/logo.png" alt="Логотип"/>
                            </div>
                            <div className="hidden lg:block">
                                <h1 className="text-xl font-bold leading-tight">
                                    Фантастичні Жінки
                                </h1>
                            </div>
                        </button>

                        {/* Desktop Navigation */}
                        <div className="hidden md:flex items-center gap-8">
                            {navLinks.map((link) => (
                                <button
                                    key={link.id}
                                    onClick={() => scrollToSection(link.id)}
                                    className="text-sm font-semibold text-gray-700 hover:text-primary transition-colors relative group px-2 py-1"
                                >
                                    {link.label}
                                    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-primary to-accent group-hover:w-full transition-all duration-300" />
                                </button>
                            ))}
                        </div>

                        <Button
                            variant="ghost"
                            size="icon"
                            className="md:hidden hover:bg-primary/10 text-gray-700 relative z-[60]"
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        >
                            {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                        </Button>
                    </div>
                </div>
            </nav>

            <div
                className={`fixed inset-0 z-40 md:hidden transition-all duration-300 ${
                    isMobileMenuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
                }`}
            >
                {/* Backdrop */}
                <div className="absolute inset-0 bg-black/10 backdrop-blur-sm" onClick={() => setIsMobileMenuOpen(false)} />

                {/* Menu Panel */}
                <div
                    className={`absolute top-20 left-0 right-0 bottom-0 bg-gradient-to-br from-white/90 to-accent/10 backdrop-blur-2xl transition-transform duration-300 ${
                        isMobileMenuOpen ? "translate-y-0" : "-translate-y-full"
                    }`}
                >
                    <div className="container mx-auto px-6 py-12 h-full flex flex-col">
                        {/* Navigation Links */}
                        <div className="flex flex-col gap-2 flex-1">
                            {navLinks.map((link, index) => (
                                <button
                                    key={link.id}
                                    onClick={() => scrollToSection(link.id)}
                                    className={`text-left text-2xl font-bold text-gray-800 hover:text-primary hover:bg-white/50 transition-all py-4 px-6 rounded-2xl backdrop-blur-sm border border-transparent hover:border-primary/20 hover:shadow-lg hover:shadow-primary/10 transform hover:translate-x-2 ${
                                        isMobileMenuOpen ? "animate-in slide-in-from-left" : ""
                                    }`}
                                    style={{
                                        animationDelay: `${index * 50}ms`,
                                        animationFillMode: "backwards",
                                    }}
                                >
                                    {link.label}
                                </button>
                            ))}
                        </div>

                        {/* Decorative Element */}
                        <div className="mt-auto pt-8 border-t border-primary/10">
                            <div className="flex items-center justify-center gap-3">
                                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary via-accent to-secondary flex items-center justify-center shadow-xl shadow-primary/30">
                                    <span className="text-white font-bold text-2xl">ФЖ</span>
                                </div>
                                <div>
                                    <p className="text-lg font-bold bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent">
                                        Фантастичні Жінки
                                    </p>
                                    <p className="text-sm text-gray-600">Разом ми сильніші</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
