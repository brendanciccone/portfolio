import Link from "next/link"

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="mt-12 sm:mt-16 py-6">
      <div className="flex justify-between items-center">
        <div className="text-xs sm:text-sm text-muted-foreground">© {currentYear} Brendan Ciccone</div>
        <div className="flex gap-4">
          <Link href="https://www.linkedin.com/in/brendanciccone/" aria-label="LinkedIn">
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="text-muted-foreground"
            >
              <g clipPath="url(#clip0_579_402)">
                <path
                  d="M22.2234 0H1.77187C0.792187 0 0 0.773438 0 1.72969V22.2656C0 23.2219 0.792187 24 1.77187 24H22.2234C23.2031 24 24 23.2219 24 22.2703V1.72969C24 0.773438 23.2031 0 22.2234 0ZM7.12031 20.4516H3.55781V8.99531H7.12031V20.4516ZM5.33906 7.43438C4.19531 7.43438 3.27188 6.51094 3.27188 5.37187C3.27188 4.23281 4.19531 3.30937 5.33906 3.30937C6.47813 3.30937 7.40156 4.23281 7.40156 5.37187C7.40156 6.50625 6.47813 7.43438 5.33906 7.43438ZM20.4516 20.4516H16.8937V14.8828C16.8937 13.5562 16.8703 11.8453 15.0422 11.8453C13.1906 11.8453 12.9094 13.2937 12.9094 14.7891V20.4516H9.35625V8.99531H12.7687V10.5609H12.8156C13.2891 9.66094 14.4516 8.70938 16.1813 8.70938C19.7859 8.70938 20.4516 11.0813 20.4516 14.1656V20.4516Z"
                  className="fill-current"
                />
              </g>
              <defs>
                <clipPath id="clip0_579_402">
                  <rect width="24" height="24" rx="2" fill="white" />
                </clipPath>
              </defs>
            </svg>
          </Link>
          <Link href="https://dribbble.com/brendanciccone" aria-label="Dribbble">
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="text-muted-foreground"
            >
              <g clipPath="url(#clip0_579_405)">
                <path
                  d="M19.7717 4.46829C15.5098 8.88279 9.82 10.2998 1.3725 10.8448M22.6276 12.9158C15.4118 11.3789 9.39503 14.0058 4.77343 19.8046M8.25046 1.9176C13.0138 8.4576 14.7905 12.1854 16.9705 21.2324M22.9 12.0001C22.9 18.02 18.0199 22.9001 12 22.9001C5.9801 22.9001 1.1 18.02 1.1 12.0001C1.1 5.98019 5.9801 1.1001 12 1.1001C18.0199 1.1001 22.9 5.98019 22.9 12.0001Z"
                  className="stroke-current"
                  strokeWidth="2.18"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </g>
              <defs>
                <clipPath id="clip0_579_405">
                  <rect width="24" height="24" fill="white" />
                </clipPath>
              </defs>
            </svg>
          </Link>
          <Link href="https://www.producthunt.com/@brendanciccone" aria-label="Product Hunt">
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="text-muted-foreground"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M12 24C18.6274 24 24 18.6274 24 12C24 5.37258 18.6274 0 12 0C5.37258 0 0 5.37258 0 12C0 18.6274 5.37258 24 12 24ZM13.7148 6H7.71484V18H10.2863V14.5714H13.7148C16.0818 14.5714 18.0006 12.6526 18.0006 10.2857C18.0006 7.91878 16.0818 6 13.7148 6ZM10.2863 8.57143V12H13.7148C14.6616 12 15.4291 11.2325 15.4291 10.2857C15.4291 9.33894 14.6616 8.57143 13.7148 8.57143H10.2863Z"
                className="fill-current"
              />
            </svg>
          </Link>
        </div>
      </div>
    </footer>
  )
}

