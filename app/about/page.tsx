import Header from "@/components/header"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import Footer from "@/components/footer"
import { Button } from "@/components/ui/button"
import { FadeIn } from "@/components/fade-in"
import { generatePageMetadata } from "@/lib/metadata"
import Image from "next/image"

export const metadata = generatePageMetadata({
  title: "About",
  path: "/about",
})

export default function About() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      <div className="max-w-[1024px] mx-auto px-4 py-6 sm:py-8">
        <div className="flex flex-col gap-6 sm:gap-8">
          <FadeIn delay={0} duration={350}>
            <div className="w-full max-w-[528px] mx-auto border border-border rounded-xl p-4 sm:p-8">
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

          <FadeIn delay={0.2} duration={350}>
            <div className="w-full max-w-[528px] mx-auto border border-border rounded-xl p-4 sm:p-8">
              <h2 className="text-xl sm:text-[24px] font-semibold mb-4 sm:mb-6">Currently</h2>
              
              <div className="space-y-8">
                <div>
                  <h3 className="text-lg font-medium mb-4">Listening to</h3>
                  <div className="grid grid-cols-2 gap-4">
                    {[
                      {
                        name: "Multi-Love",
                        artist: "Unknown Mortal Orchestra",
                        cover: "/about/album1.webp",
                        url: "https://music.apple.com/us/album/multi-love/962057741"
                      },
                      {
                        name: "Madvillainy",
                        artist: "Madvillain",
                        cover: "/about/album2.webp",
                        url: "https://music.apple.com/us/album/madvillainy/887699504"
                      },
                      {
                        name: "Integrated Tech Solutions",
                        artist: "Aesop Rock",
                        cover: "/about/album3.webp",
                        url: "https://music.apple.com/us/album/integrated-tech-solutions/1699280993"
                      },
                      {
                        name: "Nocturne",
                        artist: "Wild Nothing",
                        cover: "/about/album4.webp",
                        url: "https://music.apple.com/us/album/nocturne/553227907"
                      }
                    ].map((album, index) => (
                      <Link 
                        key={index} 
                        href={album.url}
                        className="flex flex-col items-center text-center transition-opacity hover:opacity-80"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <div className="relative w-full aspect-square mb-2 rounded-lg overflow-hidden">
                          <Image
                            src={album.cover}
                            alt={`${album.name} by ${album.artist}`}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <p className="text-sm font-medium">{album.name}</p>
                        <p className="text-xs text-muted-foreground">{album.artist}</p>
                      </Link>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-medium mb-4">Reading</h3>
                  <div className="grid grid-cols-2 gap-4">
                    {[
                      {
                        name: "Blood Meridian",
                        author: "Cormac McCarthy",
                        cover: "/about/book1.webp",
                        url: "https://bookshop.org/p/books/blood-meridian-or-the-evening-redness-in-the-west-cormac-mccarthy/6697128?ean=9780679728757&next=t"
                      },
                      {
                        name: "The Water Knife",
                        author: "Paolo Bacigalupi",
                        cover: "/about/book2.webp",
                        url: "https://bookshop.org/p/books/the-water-knife-paolo-bacigalupi/7434664?ean=9780804171533&next=t"
                      }
                    ].map((book, index) => (
                      <Link 
                        key={index} 
                        href={book.url}
                        className="flex flex-col items-center text-center transition-opacity hover:opacity-80"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <div className="relative w-full aspect-[2/3] mb-2 rounded-lg overflow-hidden">
                          <Image
                            src={book.cover}
                            alt={`${book.name} by ${book.author}`}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <p className="text-sm font-medium">{book.name}</p>
                        <p className="text-xs text-muted-foreground">{book.author}</p>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </FadeIn>
        </div>

        <Footer />
      </div>
    </div>
  )
}

