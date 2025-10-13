"use client"

import {useForm} from 'react-hook-form';
import {zodResolver} from '@hookform/resolvers/zod';
import {Card} from "@/components/ui/card"
import {Button} from "@/components/ui/button"
import {Input} from "@/components/ui/input"
import {Textarea} from "@/components/ui/textarea"
import * as z from 'zod';
import {useEffect, useRef, useState} from 'react';
import {Facebook, Instagram, Mail, Phone} from "lucide-react"

// 1. Define the validation schema with Zod
// This schema defines the shape of our form data and the validation rules.
const contactFormSchema = z.object({
    name: z.string().min(2, {message: "Ім'я має містити принаймні 2 символи"}),
    email: z.string().email({message: 'Введіть коректну email-адресу'}),
    phone: z.string().optional(), // Phone is optional
    message: z.string().min(10, {message: 'Повідомлення має містити принаймні 10 символів'}),
});

// Infer the type from the schema for TypeScript
type ContactFormInputs = z.infer<typeof contactFormSchema>;

export function ContactSection() {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [statusMessage, setStatusMessage] = useState('');
    const [isVisible, setIsVisible] = useState(false)
    const sectionRef = useRef<HTMLElement>(null)

    // 2. Initialize react-hook-form
    const {
        register,
        handleSubmit,
        formState: {errors},
        reset,
    } = useForm<ContactFormInputs>({
        resolver: zodResolver(contactFormSchema), // Connect Zod with react-hook-form
    });

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true)
                }
            },
            { threshold: 0.2 },
        )

        if (sectionRef.current) {
            observer.observe(sectionRef.current)
        }

        return () => observer.disconnect()
    }, [])

    // 3. Create the submit handler function
    const onSubmit = async (data: ContactFormInputs) => {
        setIsSubmitting(true);
        setStatusMessage('');

        try {
            const response = await fetch('/api/contact', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data), // Send the validated data
            });

            if (response.ok) {
                setStatusMessage('Повідомлення успішно надіслано!');
                reset(); // Reset form fields after successful submission
            } else {
                const result = await response.json();
                setStatusMessage(result.error || 'Сталася помилка. Спробуйте пізніше.');
            }
        } catch (error) {
            console.error('Fetch error:', error);
            setStatusMessage('Не вдалося підключитися до сервера.');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <section
            id="contact"
            ref={sectionRef}
            className="py-24 md:py-32 bg-gradient-to-b from-secondary/30 to-primary/20"
        >
            <div className="container mx-auto px-4">
                <div
                    className={`max-w-5xl mx-auto transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
                >
                    <div className="text-center mb-16">
                        <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4 text-balance">
                            Ставай частиною нашої спільноти!
                        </h2>
                        <p className="text-lg text-muted-foreground text-balance">
                            Зв'яжіться з нами та приєднуйтесь до Фантастичних Жінок
                        </p>
                    </div>
                    <div className="grid md:grid-cols-2 gap-8">
                        {/* Contact Form */}
                        <Card className="p-8 bg-card border-border/50 shadow-lg">
                            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                                <div>
                                    <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">
                                        Ім'я
                                    </label>
                                    <Input
                                        id="name"
                                        type="text"
                                        {...register('name')} // 5. Register the input field
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                        placeholder="Ваше ім'я"
                                    />
                                    {errors.name && <p className="mt-2 text-sm text-red-600">{errors.name.message}</p>}
                                </div>

                                <div>
                                    <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">
                                        Email
                                    </label>
                                    <Input
                                        id="email"
                                        type="email"
                                        {...register('email')}
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                        placeholder="your@email.com"
                                    />
                                    {errors.email &&
                                        <p className="mt-2 text-sm text-red-600">{errors.email.message}</p>}
                                </div>

                                <div>
                                    <label htmlFor="phone" className="block text-sm font-medium text-foreground mb-2">
                                        Телефон
                                    </label>
                                    <Input
                                        id="phone"
                                        type="tel"
                                        {...register('phone')}
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                        placeholder="+380..."
                                    />
                                    {/* No error message for optional field */}
                                </div>

                                <div>
                                    <label htmlFor="message" className="block text-sm font-medium text-foreground mb-2">
                                        Повідомлення
                                    </label>
                                    <Textarea
                                        id="message"
                                        rows={4}
                                        {...register('message')}
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                        placeholder="Розкажіть нам про себе..."
                                    />
                                    {errors.message &&
                                        <p className="mt-2 text-sm text-red-600">{errors.message.message}</p>}
                                </div>

                                <div>
                                    <Button
                                        type="submit"
                                        disabled={isSubmitting}
                                        className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
                                        size="lg"
                                    >
                                        {isSubmitting ? 'Надсилається...' : 'Надіслати'}
                                    </Button>
                                </div>

                                {statusMessage && <p className="mt-4 text-center text-sm">{statusMessage}</p>}
                            </form>
                        </Card>

                        {/* Contact Info */}
                        <div className="space-y-6">
                            <Card className="p-8 bg-card border-border/50 shadow-lg">
                                <h3 className="text-2xl font-semibold text-foreground mb-6">Контактна інформація</h3>
                                <div className="space-y-4">
                                    <div className="flex items-start gap-4">
                                        <div
                                            className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                                            <Mail className="w-5 h-5 text-primary"/>
                                        </div>
                                        <div>
                                            <div className="font-medium text-foreground text-sm sm:text-base">Email</div>
                                            <a
                                                href="mailto:fantasticwomen.ua@gmail.com"
                                                className="text-muted-foreground hover:text-primary transition-colors text-xs sm:text-base"
                                            >
                                                fantasticwomen.ua@gmail.com
                                            </a>
                                        </div>
                                    </div>

                                    <div className="flex items-start gap-4">
                                        <div
                                            className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                                            <Phone className="w-5 h-5 text-primary"/>
                                        </div>
                                        <div>
                                            <div className="font-medium text-foreground text-sm sm:text-base">Телефон</div>
                                            <a
                                                href="tel:+380958320208"
                                                className="text-muted-foreground hover:text-primary transition-colors text-xs sm:text-base"
                                            >
                                                +380 95 832 02 08
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </Card>

                            <Card className="p-8 bg-card border-border/50 shadow-lg">
                                <h3 className="text-2xl font-semibold text-foreground mb-6">Соціальні мережі</h3>
                                <div className="flex gap-4">
                                    <a
                                        href="https://www.facebook.com/p/%D0%93%D0%9E-%D0%A4%D0%B0%D0%BD%D1%82%D0%B0%D1%81%D1%82%D0%B8%D1%87%D0%BD%D1%96-%D0%B6%D1%96%D0%BD%D0%BA%D0%B8-100072101002580/"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-all duration-300 hover:scale-110"
                                    >
                                        <Facebook className="w-6 h-6"/>
                                    </a>
                                    <a
                                        href="https://www.instagram.com/fantasticwomen.ua/"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-all duration-300 hover:scale-110"
                                    >
                                        <Instagram className="w-6 h-6"/>
                                    </a>
                                </div>
                            </Card>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
