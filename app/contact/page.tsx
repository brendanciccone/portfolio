import { generatePageMetadata } from "@/lib/metadata";
import ContactForm from "@/components/contact-form";
import { DotGrid } from "@/components/dot-grid";
import Header from "@/components/header";
import Footer from "@/components/footer";

export const metadata = generatePageMetadata({
  title: "Contact",
  path: "/contact",
});

export default function ContactPage() {
  return (
    <div className="min-h-screen text-foreground">
      <Header />
      {/* pt-24 accounts for fixed header height */}
      <div className="max-w-[1024px] mx-auto px-5 pt-24 pb-6 sm:pb-8 flex flex-col gap-6 sm:gap-8">
        <div className="flex flex-col gap-6 sm:gap-8">
          {/* Display title, hairline below — same pattern as home/about.
              Lines rise in staggered; the red period stamps in last; the
              hairline draws itself left to right. */}
          <section>
            <h1 className="title-display text-[44px] sm:text-6xl md:text-[72px]">
              <span className="block anim-rise">Let&apos;s ship</span>
              <span className="block anim-rise [animation-delay:100ms]">
                something <span className="text-primary">great</span>
                <span className="text-primary inline-block anim-stamp">.</span>
              </span>
            </h1>
            <div aria-hidden className="mt-6 sm:mt-8 h-px bg-border anim-rule" />
          </section>

          {/* Copy + decoration | form, split by a vertical hairline */}
          <div className="grid grid-cols-1 md:grid-cols-2">
            <div className="md:pr-10 pb-8 md:pb-0 flex flex-col gap-6">
              <p className="text-[15px] leading-[1.55] text-ink-soft">
                Looking for feedback on your product or how to take an idea from 0 → 1? Reach out and let&apos;s chat!
              </p>
              {/* Square-dot grid on the layout's column rhythm, echoing the headline's red full stop; one square runs in accent */}
              <div className="hidden md:block flex-1 select-none">
                <DotGrid />
              </div>
            </div>

            <div className="md:pl-10 md:border-l md:border-border flex flex-col">
              <ContactForm />
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </div>
  );
}
