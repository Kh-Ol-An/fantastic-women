import type React from "react"
import type {Metadata} from "next"
import {GeistSans} from "geist/font/sans"
import {GeistMono} from "geist/font/mono"
import {Analytics} from "@vercel/analytics/next"
import {Suspense} from "react"
import {ThemeProvider} from "@/components/theme-provider"
import "./globals.css"

export const metadata: Metadata = {
    title: "ГО «Фантастичні Жінки» | Психологічна підтримка та розвиток жінок у Полтаві",
    description:
        "Громадська Організація «Фантастичні Жінки» (м. Полтава) — простір психологічної підтримки, творчого розвитку та культурних ініціатив для жінок.",
    keywords: [
        "Фантастичні Жінки",
        "громадська організація Полтава",
        "психологічна підтримка жінок",
        "творчий розвиток",
        "культурні події Полтава",
        "жіноча спільнота Україна",
    ],
    generator: "v0.app",
    icons: {
        icon: "/favicon.png",
        shortcut: "/favicon.png",
        apple: "/favicon.png",
    },
    openGraph: {
        title: "ГО «Фантастичні Жінки» | Полтава",
        description:
            "Офіційний сайт Громадської Організації «Фантастичні Жінки» з Полтави. Психологічна допомога, розвиток, творчість та спільнота для жінок.",
        locale: "uk_UA",
        type: "website",
        siteName: "Фантастичні Жінки",
    }
}

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode
}>) {
    return (
        <html lang="uk" suppressHydrationWarning>
            <body className={`font-sans ${GeistSans.variable} ${GeistMono.variable} antialiased`}>
                <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false} disableTransitionOnChange>
                    <Suspense fallback={<div>Loading...</div>}>
                        {children}
                        <Analytics/>
                    </Suspense>
                </ThemeProvider>
            </body>
        </html>
    )
}
