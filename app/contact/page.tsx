import { generatePageMetadata } from "@/lib/metadata";
import ContactForm from "@/components/contact-form";
import Header from "@/components/header";
import Footer from "@/components/footer";
import { FadeIn } from "@/components/fade-in";

export const metadata = generatePageMetadata({
  title: "Contact",
  path: "/contact",
});

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      {/* pt-24 accounts for fixed floating header height */}
      <div className="max-w-[1024px] mx-auto px-5 pt-24 pb-6 sm:pb-8 flex flex-col gap-6">
        <FadeIn delay={0} duration={350}>
          <div className="sys-panel">
            <div className="grid grid-cols-1 md:grid-cols-2">
              {/* Abstract dither side */}
              <div className="relative min-h-0 md:min-h-[240px] overflow-hidden border-b md:border-b-0 md:border-r border-border flex flex-col">
                <div className="relative z-10 p-6 sm:p-7">
                  <h1 className="text-lg sm:text-xl font-heading font-semibold uppercase tracking-wide mb-1 sm:mb-2">
                    Let&apos;s build something great
                  </h1>
                  <p className="text-sm sm:text-base text-muted-foreground">
                    Ready to take your product from 0 → 1 or looking to expand your team? Reach out and let&apos;s talk!
                  </p>
                </div>
                <div
                  aria-hidden
                  className="block h-24 md:h-auto pointer-events-none select-none [mask-image:linear-gradient(to_bottom,black_25%,transparent)] md:[mask-image:linear-gradient(to_bottom,black_75%,transparent)] md:flex-1"
                >
                  <div className="grid h-full grid-cols-12 content-between px-6 pb-6 text-[10px] leading-none font-mono text-foreground/50">
                    {Array.from({ length: 15 }).map((_, row) => (
                      <div key={row} className={`col-span-12 grid grid-cols-12 ${row >= 3 ? "hidden md:grid" : ""}`}>
                        {Array.from({ length: 12 }).map((_, col) => (
                          <span key={`${row}-${col}`} className="text-center">+</span>
                        ))}
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Form side */}
              <div className="p-4 sm:p-7">
                <ContactForm />
              </div>
            </div>
          </div>
        </FadeIn>
        <Footer />
      </div>
    </div>
  );
}

