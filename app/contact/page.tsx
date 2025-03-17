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
      <div className="max-w-[1024px] mx-auto px-4 py-6 sm:py-8">
        <div className="flex justify-center">
          <FadeIn delay={0} duration={350}>
            <div className="w-full max-w-[528px] border border-border rounded-xl p-4 sm:p-8">
              <ContactForm />
            </div>
          </FadeIn>
        </div>
        <Footer />
      </div>
    </div>
  );
}

