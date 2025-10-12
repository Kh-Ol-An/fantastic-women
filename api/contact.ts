import type { NextApiRequest, NextApiResponse } from 'next';
import { Resend } from 'resend';

// 3. (ВАЖЛИВО) Видаліть "NEXT_PUBLIC_" з префіксів змінних середовища
// Секретні ключі НІКОЛИ не повинні мати префікс NEXT_PUBLIC_
const resend = new Resend(process.env.RESEND_API_KEY);
const toEmail = process.env.CONTACT_FORM_EMAIL_TO;

// (Опціонально, але гарна практика) Створіть тип для даних відповіді
type ResponseData = {
    message?: string;
    error?: string;
};

// 4. Додайте типи до параметрів хендлера
export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<ResponseData> // Використовуйте створений тип
) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method Not Allowed' });
    }

    try {
        const { name, email, phone, message } = req.body;

        if (!name || !email || !message) {
            return res.status(400).json({ error: 'Name, email, and message are required.' });
        }

        if (!toEmail) {
            console.error('CONTACT_FORM_EMAIL_TO is not defined in .env.local');
            return res.status(500).json({ error: 'Server configuration error.' });
        }

        const { data, error } = await resend.emails.send({
            from: 'Contact Form <onboarding@resend.dev>',
            to: [toEmail],
            subject: `Нове повідомлення від ${name} з сайту "Фантастичні Жінки"`,
            replyTo: email,
            html: `
              <p><strong>Ім'я:</strong> ${name}</p>
              <p><strong>Email:</strong> ${email}</p>
              <p><strong>Телефон:</strong> ${phone || 'Не вказано'}</p>
              <hr />
              <p><strong>Повідомлення:</strong></p>
              <p>${message.replace(/\n/g, '<br>')}</p>
            `,
        });

        if (error) {
            console.error({ error });
            return res.status(400).json({ error: 'Could not send message.' });
        }

        return res.status(200).json({ message: 'Message sent successfully!' });

    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Internal Server Error.' });
    }
}