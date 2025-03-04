import Header from "@/components/header"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import Footer from "@/components/footer"
import { Button } from "@/components/ui/button"
import { FadeIn } from "@/components/fade-in"

export default function About() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      <div className="max-w-[1024px] mx-auto px-4 py-6 sm:py-8">
        <div className="flex justify-center">
          <FadeIn delay={0} duration={350}>
            <div className="w-full max-w-[528px] border border-border rounded-xl p-4 sm:p-8">
              <h1 className="text-xl sm:text-[24px] font-semibold mb-4 sm:mb-6">About me</h1>

              <div className="space-y-4 sm:space-y-6 text-muted-foreground">
                <p className="text-sm sm:text-base">
                  In 2018, I joined medtech startup Immertec as the second hire to lead all design efforts, increasing
                  usability by 15 points on the SUS scale, from 68 to 83, and helping the company scale to over 50
                  employees while securing $12M in funding.
                </p>

                <p className="text-sm sm:text-base">
                  After Immertec, I joined FCB Health NY and designed healthcare products for Fortune 100 companies used
                  by over 5M users. Later, at Spontivly, I led design initiatives for a platform that democratized data
                  dashboards and supported over 120 API integrations. In 2023, I joined Corellium, where I led the
                  redesign of their virtualization platform, focusing on scalability, mobile optimization, and
                  accessibility.
                </p>

                <p className="text-sm sm:text-base">
                  I also founded Paidly in 2020, a Stripe-integrated invoicing app used by over 2,000 SMEs, and Magier
                  in 2023, an AI startup acquired the same year and accepted into Techstars' 2024 cohort. I've also
                  published research on accessibility and virtual environments in publications by HFES and SSH. When not
                  designing, I'm probably playing music.
                </p>
              </div>

              <div className="mt-6 sm:mt-8">
                <Button asChild className="px-4" size="lg">
                  <Link href="/contact">
                    Let's work together <ArrowRight className="ml-1 h-4 w-4 transition-all duration-200" />
                  </Link>
                </Button>
              </div>
            </div>
          </FadeIn>
        </div>

        <Footer />
      </div>
    </div>
  )
}

