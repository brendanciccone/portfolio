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
          <div className="flex flex-col md:flex-row gap-6 sm:gap-8 md:items-stretch">
            <div className="w-full md:w-1/2">
              <FadeIn delay={0} duration={350} className="h-full">
                <div className="w-full max-w-[528px] mx-auto border border-border rounded-xl p-4 sm:p-8 h-full flex flex-col">
                  <h1 className="text-xl sm:text-[24px] font-semibold mb-4 sm:mb-6">About me</h1>
                  <div className="space-y-4 sm:space-y-6 text-muted-foreground">
                    <p className="text-sm sm:text-base">
                      In 2018, I joined medtech startup Immertec as the founding designer, 
                      leading design across VR, web, and mobile. I led a platform redesign 
                      that increased SUS from 68 to 83, supported growth to 50+ employees, 
                      and helped secure $12M in Series A funding.
                    </p>
                    <p className="text-sm sm:text-base">
                      After Immertec, I joined FCB Health NY and contributed to healthcare 
                      products used by over 5 million users at Fortune 100 companies. Later, 
                      at Spontivly, I was the only designer and created a dashboard platform 
                      that supports 120+ API integrations and sales tools.
                    </p>
                    <p className="text-sm sm:text-base">
                      In 2023, I joined Corellium as the sole product designer, owning platform 
                      design and partnering with product and engineering to ship a CI/CD-integrated 
                      mobile threat analysis tool. I led a redesign focused on scalability, 
                      accessibility, and mobile optimization, resulting in a SUS score of 81.
                    </p>
                    <p className="text-sm sm:text-base">
                      I also founded Paidly in 2020, a Stripe-integrated invoicing app used by over 
                      2,000 SMEs, and Magier in 2023, an AI startup that was acquired the same year 
                      and accepted into Techstars' 2024 cohort. I've also published research on 
                      accessibility and virtual environments in publications by HFES and SSH. When I'm not designing, I'm probably making music.
                    </p>
                  </div>
                  <div className="mt-auto pt-6 sm:pt-8">
                    <Button asChild className="px-4" size="lg">
                      <Link href="/contact">
                        Let's work together <ArrowRight className="ml-1 h-4 w-4 transition-all duration-200" />
                      </Link>
                    </Button>
                  </div>
                </div>
              </FadeIn>
            </div>
            <div className="w-full md:w-1/2">
              <FadeIn delay={0.1} duration={350} className="h-full">
                <div className="w-full max-w-[528px] mx-auto border border-border rounded-xl p-4 sm:p-8 h-full flex flex-col">
                  <h2 className="text-xl sm:text-[24px] font-semibold mb-4 sm:mb-6">Experience</h2>
                  <ul className="space-y-4">
                    <li className="flex justify-between items-start">
                      <div>
                        <span className="font-medium">Senior Product Designer</span>
                        <div className="text-sm text-muted-foreground">Corellium</div>
                      </div>
                      <span className="text-sm text-muted-foreground">2023–Present</span>
                    </li>
                    <li className="flex justify-between items-start">
                      <div>
                        <span className="font-medium">Senior Product Designer <span className="font-normal text-muted-foreground">(Contract)</span></span>
                        <div className="text-sm text-muted-foreground">Spontivly</div>
                      </div>
                      <span className="text-sm text-muted-foreground">2023</span>
                    </li>
                    <li className="flex justify-between items-start">
                      <div>
                        <span className="font-medium">Senior Product Designer <span className="font-normal text-muted-foreground">(Contract)</span></span>
                        <div className="text-sm text-muted-foreground">FCB Health NY</div>
                      </div>
                      <span className="text-sm text-muted-foreground">2023</span>
                    </li>
                    <li className="flex justify-between items-start">
                      <div>
                        <span className="font-medium">Senior Product Designer</span>
                        <div className="text-sm text-muted-foreground">Immertec</div>
                      </div>
                      <span className="text-sm text-muted-foreground">2020–2023</span>
                    </li>
                    <li className="flex justify-between items-start">
                      <div>
                        <span className="font-medium">Product Designer</span>
                        <div className="text-sm text-muted-foreground">Immertec</div>
                      </div>
                      <span className="text-sm text-muted-foreground">2018–2020</span>
                    </li>
                  </ul>
                  <div className="h-px bg-border my-8" />
                  <h3 className="text-lg font-medium mb-4 sm:mb-6">Side projects</h3>
                  <ul className="space-y-4">
                    <li className="flex justify-between items-start">
                      <div>
                        <span className="font-medium">Founder <span className="font-normal text-muted-foreground">(Acquired)</span></span>
                        <div className="text-sm text-muted-foreground">Magier</div>
                      </div>
                      <span className="text-sm text-muted-foreground">2023</span>
                    </li>
                    <li className="flex justify-between items-start">
                      <div>
                        <span className="font-medium">Founder</span>
                        <div className="text-sm text-muted-foreground">Paidly</div>
                      </div>
                      <span className="text-sm text-muted-foreground">2020</span>
                    </li>
                  </ul>
                  <div className="h-px bg-border my-8" />
                  <h3 className="text-lg font-medium mb-4 sm:mb-6">Certificates</h3>
                  <ul className="space-y-4">
                    <li className="flex justify-between items-start">
                      <div>
                        <span className="font-medium">UX Management</span>
                        <div className="text-sm text-muted-foreground">Nielsen Norman Group</div>
                      </div>
                      <span className="text-sm text-muted-foreground">2020</span>
                    </li>
                  </ul>
                </div>
              </FadeIn>
            </div>
          </div>
          <FadeIn delay={0.2} duration={350}>
            <div className="w-full border border-border rounded-xl p-4 sm:p-8">
              <h2 className="text-xl sm:text-[24px] font-semibold mb-4 sm:mb-6">Currently</h2>
              <div className="flex flex-col md:flex-row gap-8">
                <div className="w-full md:w-1/2">
                  <h3 className="text-lg font-medium mb-4">Listening to</h3>
                  <div className="grid grid-cols-2 gap-4">
                    {[
                      {
                        name: "Eternal Return",
                        artist: "Windhand",
                        cover: "/about/album1.webp",
                        url: "https://music.apple.com/us/album/eternal-return/1410436187"
                      },
                      {
                        name: "Madvillainy",
                        artist: "Madvillain",
                        cover: "/about/album2.webp",
                        url: "https://music.apple.com/us/album/madvillainy/887699504"
                      },
                      {
                        name: "Wide Awake!",
                        artist: "Parquet Courts",
                        cover: "/about/album3.webp",
                        url: "https://music.apple.com/us/album/wide-awake/1342585603"
                      },
                      {
                        name: "Manning Fireworks",
                        artist: "MJ Lenderman",
                        cover: "/about/album4.webp",
                        url: "https://music.apple.com/us/album/manning-fireworks/1749088991"
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
                <div className="w-full md:w-1/2">
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

