"use client"

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useState } from 'react';

// 1. Define the validation schema with Zod
// This schema defines the shape of our form data and the validation rules.
const contactFormSchema = z.object({
    name: z.string().min(2, { message: "Ім'я має містити принаймні 2 символи" }),
    email: z.string().email({ message: 'Введіть коректну email-адресу' }),
    phone: z.string().optional(), // Phone is optional
    message: z.string().min(10, { message: 'Повідомлення має містити принаймні 10 символів' }),
});

// Infer the type from the schema for TypeScript
type ContactFormInputs = z.infer<typeof contactFormSchema>;

export default function ContactForm() {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [statusMessage, setStatusMessage] = useState('');

    // 2. Initialize react-hook-form
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm<ContactFormInputs>({
        resolver: zodResolver(contactFormSchema), // Connect Zod with react-hook-form
    });

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
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                    Ім'я
                </label>
                <input
                    id="name"
                    type="text"
                    {...register('name')} // 5. Register the input field
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    placeholder="Ваше ім'я"
                />
                {errors.name && <p className="mt-2 text-sm text-red-600">{errors.name.message}</p>}
            </div>

            <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                    Email
                </label>
                <input
                    id="email"
                    type="email"
                    {...register('email')}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    placeholder="your@email.com"
                />
                {errors.email && <p className="mt-2 text-sm text-red-600">{errors.email.message}</p>}
            </div>

            <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                    Телефон
                </label>
                <input
                    id="phone"
                    type="tel"
                    {...register('phone')}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    placeholder="+380..."
                />
                {/* No error message for optional field */}
            </div>

            <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700">
                    Повідомлення
                </label>
                <textarea
                    id="message"
                    rows={4}
                    {...register('message')}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    placeholder="Розкажіть нам про себе..."
                />
                {errors.message && <p className="mt-2 text-sm text-red-600">{errors.message.message}</p>}
            </div>

            <div>
                <button
                    type="submit"
                    disabled={isSubmitting}
                    className="flex w-full justify-center rounded-md border border-transparent bg-black py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-50"
                >
                    {isSubmitting ? 'Надсилається...' : 'Надіслати'}
                </button>
            </div>

            {statusMessage && <p className="mt-4 text-center text-sm">{statusMessage}</p>}
        </form>
    );
}
