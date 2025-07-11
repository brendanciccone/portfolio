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
      <div className="max-w-[1024px] mx-auto px-4 py-6 sm:py-8 flex flex-col gap-6">
        {/* About Me */}
        <FadeIn delay={0} duration={350}>
          <section className="w-full border border-border rounded-xl p-4 sm:p-8 flex flex-col">
            <h1 className="text-xl sm:text-[24px] font-semibold mb-4 sm:mb-6">About me</h1>
            <div className="space-y-4 sm:space-y-6 text-muted-foreground">
              <p className="text-sm sm:text-base">
                I'm a staff product designer with 7 years of experience turning ideas into fully realized B2B products across healthcare, cybersecurity, and finance.
              </p>
              <p className="text-sm sm:text-base">
                As founding designer at Immertec, I led a platform redesign that increased SUS from 68 to 83, hired and managed 2 product designers, and helped secure $12M in Series A funding. At Corellium, I owned end-to-end product design, shipped CI/CD-integrated threat analysis tools, and achieved an 81 SUS score that contributed to a $200M acquisition by Cellebrite.
              </p>
              <p className="text-sm sm:text-base">
                I founded Paidly in 2020, a Stripe-integrated invoicing app used by over 2,000 SMEs, and Magier in 2023, an AI startup that was acquired the same year and accepted into Techstars' 2024 cohort. I've also published research on accessibility and virtual environments in publications by HFES and SSH.
              </p>
            </div>
          </section>
        </FadeIn>

        {/* Experience | Publications & Certificates */}
        <div className="flex flex-col md:flex-row gap-6 md:items-stretch min-h-[600px]">
          {/* Experience */}
          <FadeIn delay={0.1} duration={350} className="w-full md:w-1/2 flex">
            <section className="w-full max-w-[528px] mx-auto border border-border rounded-xl p-4 sm:p-8 flex flex-col flex-1">
              <h2 className="text-xl sm:text-[24px] font-semibold mb-4 sm:mb-6">Experience</h2>
              <div>
                <ul className="space-y-6">
                {/* Corellium */}
                <li className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-8 h-8 rounded-md bg-background border border-border flex items-center justify-center overflow-hidden">
                    <Image
                      src="/about/logos/corellium.jpeg"
                      alt="Corellium logo"
                      width={32}
                      height={32}
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <div className="flex-1 flex justify-between min-w-0">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-medium leading-none">Staff Product Designer</span>
                      </div>
                      <div className="text-sm text-muted-foreground flex items-center gap-2 mt-1">
                        <Link 
                          href="https://www.corellium.com" 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="hover:underline transition-colors"
                        >
                          Corellium
                        </Link>
                        <span className="text-xs bg-secondary text-secondary-foreground px-2 py-0.5 rounded-full">Acquired</span>
                      </div>
                    </div>
                    <span className="text-sm text-muted-foreground flex-shrink-0 ml-2 leading-none">2023–Present</span>
                  </div>
                </li>
                {/* Spontivly */}
                <li className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-8 h-8 rounded-md bg-background border border-border flex items-center justify-center overflow-hidden">
                    <Image
                      src="/about/logos/spontivly.jpeg"
                      alt="Spontivly logo"
                      width={32}
                      height={32}
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <div className="flex-1 flex justify-between min-w-0">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-medium leading-none">Senior Product Designer</span>
                      </div>
                      <div className="text-sm text-muted-foreground mt-1">
                        <Link 
                          href="https://www.spontivly.com"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="hover:underline transition-colors"
                        >
                          Spontivly
                        </Link>
                      </div>
                    </div>
                    <span className="text-sm text-muted-foreground flex-shrink-0 ml-2 leading-none">2023</span>
                  </div>
                </li>
                {/* FCB Health NY */}
                <li className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-8 h-8 rounded-md bg-background border border-border flex items-center justify-center overflow-hidden">
                    <Image
                      src="/about/logos/fcb_health_ny.jpeg"
                      alt="FCB Health logo"
                      width={32}
                      height={32}
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <div className="flex-1 flex justify-between min-w-0">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-medium leading-none">Senior Product Designer</span>
                      </div>
                      <div className="text-sm text-muted-foreground mt-1">
                        <Link 
                          href="https://www.fcb.com" 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="hover:underline transition-colors"
                        >
                          FCB Health NY
                        </Link>
                      </div>
                    </div>
                    <span className="text-sm text-muted-foreground flex-shrink-0 ml-2 leading-none">2023</span>
                  </div>
                </li>
                {/* Immertec Senior */}
                <li className="relative flex items-start gap-3">
                  <div className="flex-shrink-0 w-8 h-8 rounded-md bg-background border border-border flex items-center justify-center overflow-hidden">
                    <Image
                      src="/about/logos/immertec.jpeg"
                      alt="Immertec logo"
                      width={32}
                      height={32}
                      className="w-full h-full object-contain"
                    />
                  </div>
                  {/* Vertical connecting line */}
                  <div className="absolute left-4 top-8 h-[2rem] border-l border-border"></div>
                  <div className="flex-1 flex justify-between min-w-0">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-medium leading-none">Senior Product Designer</span>
                      </div>
                      <div className="text-sm text-muted-foreground mt-1">
                        <Link 
                          href="https://www.immertec.com"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="hover:underline transition-colors"
                        >
                          Immertec
                        </Link>
                      </div>
                    </div>
                    <span className="text-sm text-muted-foreground flex-shrink-0 ml-2 leading-none">2020–2023</span>
                  </div>
                </li>
                {/* Immertec Product Designer */}
                <li className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-8 h-8 rounded-md bg-background border border-border flex items-center justify-center overflow-hidden">
                    <Image
                      src="/about/logos/immertec.jpeg"
                      alt="Immertec logo"
                      width={32}
                      height={32}
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <div className="flex-1 flex justify-between min-w-0">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-medium leading-none">Product Designer</span>
                      </div>
                      <div className="text-sm text-muted-foreground mt-1">
                        <Link 
                          href="https://www.immertec.com"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="hover:underline transition-colors"
                        >
                          Immertec
                        </Link>
                      </div>
                    </div>
                    <span className="text-sm text-muted-foreground flex-shrink-0 ml-2 leading-none">2018–2020</span>
                  </div>
                </li>
              </ul>
              </div>
              <div className="h-px bg-border my-8" />
              <h3 className="text-lg font-medium mb-4 sm:mb-6">Side projects</h3>
              <ul className="space-y-6">
                {/* Magier */}
                <li className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-8 h-8 rounded-md bg-background border border-border flex items-center justify-center overflow-hidden">
                    <Image
                      src="/about/logos/magier.jpeg"
                      alt="Magier logo"
                      width={32}
                      height={32}
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <div className="flex-1 flex justify-between min-w-0">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-medium leading-none">Founder</span>
                      </div>
                      <div className="text-sm text-muted-foreground flex items-center gap-2 mt-1">
                        <Link 
                          href="https://magier.ai"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="hover:underline transition-colors"
                        >
                          Magier
                        </Link>
                        <span className="text-xs bg-secondary text-secondary-foreground px-2 py-0.5 rounded-full">Acquired</span>
                      </div>
                    </div>
                    <span className="text-sm text-muted-foreground flex-shrink-0 ml-2 leading-none">2023</span>
                  </div>
                </li>
                {/* Paidly */}
                <li className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-8 h-8 rounded-md bg-background border border-border flex items-center justify-center overflow-hidden">
                    <Image
                      src="/about/logos/paidly.jpeg"
                      alt="Paidly logo"
                      width={32}
                      height={32}
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <div className="flex-1 flex justify-between min-w-0">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-medium leading-none">Founder</span>
                      </div>
                      <div className="text-sm text-muted-foreground mt-1">
                        <Link 
                          href="/work/paidly"
                          className="hover:underline transition-colors"
                        >
                          Paidly
                        </Link>
                      </div>
                    </div>
                    <span className="text-sm text-muted-foreground flex-shrink-0 ml-2 leading-none">2020</span>
                  </div>
                </li>
              </ul>
            </section>
          </FadeIn>

          {/* Publications & Certificates */}
          <div className="w-full md:w-1/2 flex flex-col gap-6 flex-1">
            <FadeIn delay={0.15} duration={350} className="flex-1">
              <section className="w-full border border-border rounded-xl p-4 sm:p-8 flex flex-col flex-1">
                <h2 className="text-xl sm:text-[24px] font-semibold mb-4 sm:mb-6">Publications</h2>
                <div className="space-y-6 flex-1">
                  <div className="border-l border-border pl-4">
                    <h3 className="font-medium mb-2">
                      <Link 
                        href="https://journals.sagepub.com/doi/10.1177/10648046211002578"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:underline"
                      >
                        The Next Generation of Virtual Reality: Recommendations for Accessible and Ergonomic Design
                      </Link>
                    </h3>
                    <p className="text-sm text-muted-foreground mb-1">Ergonomics in Design: The Quarterly of Human Factors Applications</p>
                    <p className="text-xs text-muted-foreground">Mar 23, 2021</p>
                  </div>
                  <div className="border-l border-border pl-4">
                    <h3 className="font-medium mb-2">
                      <Link 
                        href="https://journals.sagepub.com/doi/abs/10.1177/1071181320641514"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:underline"
                      >
                        Virtual Reality, Augmented Reality, and Virtual Environments: Demonstrations of Current Technologies and Future Directions
                      </Link>
                    </h3>
                    <p className="text-sm text-muted-foreground mb-1">Proceedings of the Human Factors and Ergonomics Society Annual Meeting</p>
                    <p className="text-xs text-muted-foreground">Feb 9, 2021</p>
                  </div>
                  <div className="border-l border-border pl-4">
                    <h3 className="font-medium mb-2">
                      <Link 
                        href="https://pubmed.ncbi.nlm.nih.gov/35093978/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:underline"
                      >
                        Assessing Usability of Untethered Head-Mounted Displays for Medical Education: A Within-Person Randomized Trial
                      </Link>
                    </h3>
                    <p className="text-sm text-muted-foreground mb-1">Society for Simulation in Healthcare</p>
                    <p className="text-xs text-muted-foreground">Jan 31, 2021</p>
                  </div>
                </div>
              </section>
            </FadeIn>
            <FadeIn delay={0.18} duration={350}>
              <section className="w-full border border-border rounded-xl p-4 sm:p-8">
                <h2 className="text-xl sm:text-[24px] font-semibold mb-4 sm:mb-6">Certificates</h2>
                <ul className="space-y-4">
                    <li className="flex items-start gap-3">
                      <div className="flex-shrink-0 w-8 h-8 rounded-md bg-background border border-border flex items-center justify-center overflow-hidden">
                        {/* Nielsen Norman Group Logo */}
                        <Image
                          src="/about/logos/nielsen_norman_group.jpeg"
                          alt="Nielsen Norman Group logo"
                          width={32}
                          height={32}
                          className="w-full h-full object-contain"
                        />
                      </div>
                      <div className="flex-1 flex justify-between min-w-0">
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-medium leading-none">UX Management</span>
                          </div>
                          <div className="text-sm text-muted-foreground mt-1">
                            <Link 
                              href="https://www.nngroup.com/ux-certification/people/" 
                              target="_blank" 
                              rel="noopener noreferrer"
                              className="hover:underline transition-colors"
                            >
                              Nielsen Norman Group
                            </Link>
                          </div>
                        </div>
                        <span className="text-sm text-muted-foreground flex-shrink-0 ml-2 leading-none">2020</span>
                      </div>
                    </li>
                  </ul>
              </section>
            </FadeIn>
          </div>
        </div>

        {/* Currently */}
        <FadeIn delay={0.2} duration={350}>
          <section className="w-full border border-border rounded-xl p-4 sm:p-8">
            <h2 className="text-xl sm:text-[24px] font-semibold mb-4 sm:mb-6">Currently</h2>
            <div className="flex flex-col md:flex-row gap-8">
              <div className="w-full md:w-1/2">
                <h3 className="text-lg font-medium mb-4">Listening to</h3>
                <div className="grid grid-cols-2 gap-4">
                  {[
                    {
                      name: "Eternal Return",
                      artist: "Windhand",
                      cover: "/about/albums/album1.webp",
                      url: "https://music.apple.com/us/album/eternal-return/1410436187"
                    },
                    {
                      name: "Madvillainy",
                      artist: "Madvillain",
                      cover: "/about/albums/album2.webp",
                      url: "https://music.apple.com/us/album/madvillainy/887699504"
                    },
                    {
                      name: "Wide Awake!",
                      artist: "Parquet Courts",
                      cover: "/about/albums/album3.webp",
                      url: "https://music.apple.com/us/album/wide-awake/1342585603"
                    },
                    {
                      name: "Black Hole Superette",
                      artist: "Aesop Rock",
                      cover: "/about/albums/album4.webp",
                      url: "https://music.apple.com/us/album/black-hole-superette/1792042033"
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
                      cover: "/about/books/book1.webp",
                      url: "https://bookshop.org/p/books/blood-meridian-or-the-evening-redness-in-the-west-cormac-mccarthy/6697128?ean=9780679728757&next=t"
                    },
                    {
                      name: "The Water Knife",
                      author: "Paolo Bacigalupi",
                      cover: "/about/books/book2.webp",
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
          </section>
        </FadeIn>
        <Footer />
      </div>
    </div>
  )
}

