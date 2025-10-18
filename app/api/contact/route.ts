import { NextResponse } from 'next/server';
import { Resend } from 'resend';

export const runtime = 'nodejs';

const resend = new Resend(process.env.RESEND_API_KEY);
const toEmail = process.env.CONTACT_FORM_EMAIL_TO;

type Body = { name?: string; email?: string; phone?: string; message?: string };

export async function POST(req: Request) {
    try {
        const { name, email, phone, message } = (await req.json()) as Body;

        if (!name || !email || !message) {
            return NextResponse.json({ error: 'Name, email, and message are required.' }, { status: 400 });
        }
        if (!toEmail) {
            return NextResponse.json({ error: 'Server configuration error.' }, { status: 500 });
        }

        const { error } = await resend.emails.send({
            from: 'Contact Form <onboarding@resend.dev>',
            to: [toEmail],
            subject: `Нове повідомлення від ${name} — "Фантастичні Жінки"`,
            replyTo: email,
            html: `
        <p><strong>Ім'я:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Телефон:</strong> ${phone || 'Не вказано'}</p>
        <hr />
        <p><strong>Повідомлення:</strong></p>
        <p>${(message || '').replace(/\n/g, '<br>')}</p>
      `,
        });

        if (error) return NextResponse.json({ error: 'Could not send message.' }, { status: 400 });
        return NextResponse.json({ message: 'Message sent successfully!' });
    } catch (err) {
        return NextResponse.json({ error: 'Internal Server Error.' }, { status: 500 });
    }
}
