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
      <div className="max-w-[1024px] mx-auto px-4 pt-24 pb-6 sm:pb-8 flex flex-col gap-6">
        <div className="flex flex-col items-center">
          <FadeIn delay={0} duration={350}>
            <div className="w-full max-w-[528px] mb-6">
              <h1 className="text-xl sm:text-[24px] font-semibold mb-1 sm:mb-2 text-center">Let's go to market</h1>
              <p className="text-sm sm:text-base text-muted-foreground text-center">
                Ready to take your product from 0 → 1 or looking to expand your team? Reach out below.
              </p>
            </div>
            <div className="w-full max-w-[528px] bg-card border border-border rounded-xl p-4 sm:p-8">
              <ContactForm />
            </div>
          </FadeIn>
        </div>
        <Footer />
      </div>
    </div>
  );
}

