import { generatePageMetadata } from "@/lib/metadata"
import ContactForm from "@/components/contact-form"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { FadeIn } from "@/components/fade-in"

export const metadata = generatePageMetadata({
  title: "Contact",
  path: "/contact",
})

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      <div className="max-w-[1024px] mx-auto px-5 pt-24 pb-6 sm:pb-8 flex flex-col gap-8">
        <FadeIn delay={0} duration={350}>
          <div className="sys-section">
            <span className="sys-section-num">[01]</span>
            <span className="sys-section-title">Contact</span>
            <div className="sys-section-rule" />
            <span className="sys-section-meta">Form / 001</span>
          </div>
        </FadeIn>

        <FadeIn delay={25} duration={350}>
          <div className="sys-cell">
            <div className="grid grid-cols-1 md:grid-cols-2">
              {/* Brief side — inverted block for rhythm */}
              <div className="relative bg-foreground text-background p-5 sm:p-7 flex flex-col gap-6 md:border-r md:border-foreground">
                <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-background/60">
                  Brief / 001
                </p>
                <h1 className="sys-display text-2xl sm:text-[28px]">
                  Let&apos;s build<br />something great.
                </h1>
                <p className="font-mono text-[13px] leading-relaxed text-background/80 max-w-[40ch]">
                  Ready to take your product from 0 → 1 or looking to expand your team? Reach out and let&apos;s talk.
                </p>
                <dl className="mt-auto grid grid-cols-2 gap-4 pt-4 border-t border-background/30">
                  <div>
                    <dt className="font-mono text-[10px] uppercase tracking-[0.16em] text-background/60 mb-1">
                      Response
                    </dt>
                    <dd className="font-mono text-[12px] uppercase tracking-[0.12em]">≤ 48 hrs</dd>
                  </div>
                  <div>
                    <dt className="font-mono text-[10px] uppercase tracking-[0.16em] text-background/60 mb-1">
                      Tz.
                    </dt>
                    <dd className="font-mono text-[12px] uppercase tracking-[0.12em]">EST / UTC-5</dd>
                  </div>
                </dl>
              </div>

              {/* Form side */}
              <div className="p-5 sm:p-7 border-t md:border-t-0 border-foreground">
                <p className="sys-label mb-5">Outbound message</p>
                <ContactForm />
              </div>
            </div>
          </div>
        </FadeIn>

        <Footer />
      </div>
    </div>
  )
}
