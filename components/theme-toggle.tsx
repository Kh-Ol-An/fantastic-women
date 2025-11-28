"use client"

import * as React from "react"
import {Sun, Moon} from "lucide-react"
import {useTheme} from "next-themes"

import {Button} from "@/components/ui/button"
import {cn} from "@/lib/utils"

type ThemeToggleProps = React.ComponentProps<typeof Button>

export function ThemeToggle({
    className,
    variant = "ghost",
    size = "icon",
    "aria-label": ariaLabel = "Перемкнути тему",
    ...props
}: ThemeToggleProps) {
    const {theme, setTheme} = useTheme()
    const [isMounted, setIsMounted] = React.useState(false)
    const {onClick, ...rest} = props

    React.useEffect(() => {
        setIsMounted(true)
    }, [])

    const toggleTheme = (event: React.MouseEvent<HTMLButtonElement>) => {
        onClick?.(event)
        if (event.defaultPrevented || !isMounted) {
            return
        }
        setTheme(theme === "dark" ? "light" : "dark")
    }

    return (
        <Button
            type="button"
            variant={variant}
            size={size}
            className={cn("relative transition-colors", className)}
            onClick={toggleTheme}
            aria-label={ariaLabel}
            aria-pressed={theme === "dark"}
            {...rest}
        >
            <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
            <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
            <span className="sr-only">{ariaLabel}</span>
        </Button>
    )
}
