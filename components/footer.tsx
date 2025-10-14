export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-primary/5 border-t border-primary/10 mt-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col gap-4 text-sm text-gray-600 md:flex-row md:items-center md:justify-between">
        <p className="font-semibold text-gray-700">
          © {currentYear} ГО «Фантастичні Жінки». Усі права захищені.
        </p>
        <p className="md:text-right">
          Дизайн та розробка:{" "}
          <a
            href="https://www.linkedin.com/in/kh-ol-an/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary hover:underline"
          >
            Олег Христенко (KhOlAn)
          </a>
          .
        </p>
      </div>
    </footer>
  )
}
