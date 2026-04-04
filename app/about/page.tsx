import Header from "@/components/header"
import Link from "next/link"
import Footer from "@/components/footer"
import { Badge } from "@/components/ui/badge"
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
      <div className="max-w-[1024px] mx-auto px-5 pt-24 pb-6 sm:pb-8 flex flex-col gap-6">
        {/* Intro Section */}
        <FadeIn delay={0} duration={350}>
          <section className="w-full sys-panel p-4 sm:p-7 flex flex-col">
            <div className="sys-section-header mb-6">
              <h1 className="sys-section-label">About</h1>
              <div className="sys-section-line" />
            </div>
            <div className="space-y-4 sm:space-y-6 text-muted-foreground">
              <p className="text-sm sm:text-base">
                I&apos;m a staff product designer with <span className="text-foreground font-medium">8 years of experience</span> turning ideas into fully realized B2B products across healthcare, cybersecurity, and finance.
              </p>
              <p className="text-sm sm:text-base">
                As founding product designer at Immertec, I led a platform redesign that <span className="text-foreground font-medium">increased SUS from 68 to 83</span>, hired and managed 2 product designers, and helped secure <span className="text-foreground font-medium">$12M in Series A</span> funding. At Corellium, I owned end-to-end product design, shipped CI/CD-integrated threat analysis tools, and achieved an 81 SUS score that contributed to a <span className="text-foreground font-medium">$200M acquisition</span> by Cellebrite.
              </p>
              <p className="text-sm sm:text-base">
                I founded Paidly in 2020, a Stripe-integrated invoicing app used by <span className="text-foreground font-medium">over 2,000 SMEs</span>, and Magier in 2023, an AI startup that was <span className="text-foreground font-medium">acquired the same year</span> and accepted into <span className="text-foreground font-medium">Techstars&apos; 2024</span> cohort. I&apos;ve also published research on accessibility and virtual environments in publications by HFES and SSH.
              </p>
            </div>
          </section>
        </FadeIn>

        {/* Experience | Publications & Certificates */}
        <div className="flex flex-col md:flex-row gap-6 md:items-stretch min-h-[600px]">
          {/* Experience */}
          <FadeIn delay={0.1} duration={350} className="w-full md:w-1/2 flex">
            <section className="w-full sys-panel p-4 sm:p-7 flex flex-col flex-1">
              <div className="sys-section-header mb-6">
                <h2 className="sys-section-label">Experience</h2>
                <div className="sys-section-line" />
              </div>
              <div>
                <ul className="space-y-6">
                {/* Corellium */}
                <li className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-8 h-8 rounded-sm bg-muted/50 border border-border flex items-center justify-center overflow-hidden">
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
                        <Badge>Acquired</Badge>
                      </div>
                    </div>
                    <span className="text-xs font-mono text-muted-foreground flex-shrink-0 ml-2 leading-none uppercase tracking-wider">2023-Present</span>
                  </div>
                </li>
                {/* Spontivly */}
                <li className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-8 h-8 rounded-sm bg-muted/50 border border-border flex items-center justify-center overflow-hidden">
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
                      <div className="text-sm text-muted-foreground flex items-center gap-2 mt-1">
                        <Link 
                          href="https://www.spontivly.com"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="hover:underline transition-colors"
                        >
                          Spontivly
                        </Link>
                        <Badge>Contract</Badge>
                      </div>
                    </div>
                    <span className="text-xs font-mono text-muted-foreground flex-shrink-0 ml-2 leading-none uppercase tracking-wider">2023</span>
                  </div>
                </li>
                {/* FCB Health NY */}
                <li className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-8 h-8 rounded-sm bg-muted/50 border border-border flex items-center justify-center overflow-hidden">
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
                      <div className="text-sm text-muted-foreground flex items-center gap-2 mt-1">
                        <Link 
                          href="https://www.fcb.com" 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="hover:underline transition-colors"
                        >
                          FCB Health NY
                        </Link>
                        <Badge>Contract</Badge>
                      </div>
                    </div>
                    <span className="text-xs font-mono text-muted-foreground flex-shrink-0 ml-2 leading-none uppercase tracking-wider">2023</span>
                  </div>
                </li>
                {/* Immertec Senior */}
                <li className="relative flex items-start gap-3">
                  <div className="flex-shrink-0 w-8 h-8 rounded-sm bg-muted/50 border border-border flex items-center justify-center overflow-hidden">
                    <Image
                      src="/about/logos/immertec.jpeg"
                      alt="Immertec logo"
                      width={32}
                      height={32}
                      className="w-full h-full object-contain"
                    />
                  </div>
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
                    <span className="text-xs font-mono text-muted-foreground flex-shrink-0 ml-2 leading-none uppercase tracking-wider">2020-2023</span>
                  </div>
                </li>
                {/* Immertec Founding */}
                <li className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-8 h-8 rounded-sm bg-muted/50 border border-border flex items-center justify-center overflow-hidden">
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
                        <span className="font-medium leading-none">Founding Product Designer</span>
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
                    <span className="text-xs font-mono text-muted-foreground flex-shrink-0 ml-2 leading-none uppercase tracking-wider">2018-2020</span>
                  </div>
                </li>
                {/* Four Pixels */}
                <li className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-8 h-8 rounded-sm bg-muted/50 border border-border flex items-center justify-center overflow-hidden">
                    <Image
                      src="/about/logos/four_pixels.jpeg"
                      alt="Four Pixels logo"
                      width={32}
                      height={32}
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <div className="flex-1 flex justify-between min-w-0">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-medium leading-none">Designer</span>
                      </div>
                      <div className="text-sm text-muted-foreground mt-1">
                        <Link 
                          href="https://www.fourpixels.xyz"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="hover:underline transition-colors"
                        >
                          Four Pixels
                        </Link>
                      </div>
                    </div>
                    <span className="text-xs font-mono text-muted-foreground flex-shrink-0 ml-2 leading-none uppercase tracking-wider">2015-2018</span>
                  </div>
                </li>
              </ul>
              </div>
              <div className="sys-section-header mt-8 mb-6">
                <h3 className="sys-section-label">Other experience</h3>
                <div className="h-px bg-border flex-1" />
              </div>
              <ul className="space-y-6">
                {/* Magier */}
                <li className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-8 h-8 rounded-sm bg-muted/50 border border-border flex items-center justify-center overflow-hidden">
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
                        <Badge>Acquired</Badge>
                      </div>
                    </div>
                    <span className="text-xs font-mono text-muted-foreground flex-shrink-0 ml-2 leading-none uppercase tracking-wider">2023</span>
                  </div>
                </li>
                {/* Biobox */}
                <li className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-8 h-8 rounded-sm bg-muted/50 border border-border flex items-center justify-center overflow-hidden">
                    <Image
                      src="/about/logos/biobox.jpeg"
                      alt="Biobox logo"
                      width={32}
                      height={32}
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <div className="flex-1 flex justify-between min-w-0">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-medium leading-none">Cofounder</span>
                      </div>
                      <div className="text-sm text-muted-foreground flex items-center gap-2 mt-1">
                        <span>Biobox</span>
                        <Badge>ETHGlobal Winner</Badge>
                      </div>
                    </div>
                    <span className="text-xs font-mono text-muted-foreground flex-shrink-0 ml-2 leading-none uppercase tracking-wider">2021</span>
                  </div>
                </li>
                {/* Paidly */}
                <li className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-8 h-8 rounded-sm bg-muted/50 border border-border flex items-center justify-center overflow-hidden">
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
                    <span className="text-xs font-mono text-muted-foreground flex-shrink-0 ml-2 leading-none uppercase tracking-wider">2020</span>
                  </div>
                </li>
              </ul>
            </section>
          </FadeIn>

          {/* Publications & Certificates */}
          <div className="w-full md:w-1/2 flex flex-col gap-6 flex-1">
            <FadeIn delay={0.15} duration={350} className="flex-1">
              <section className="w-full sys-panel p-4 sm:p-7 flex flex-col flex-1">
                <div className="sys-section-header mb-6">
                  <h2 className="sys-section-label">Publications</h2>
                  <div className="sys-section-line" />
                </div>
                <div className="space-y-6 flex-1">
                  <div className="border-l-2 border-border pl-4">
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
                    <p className="text-xs font-mono text-muted-foreground uppercase tracking-wider">Mar 23, 2021</p>
                  </div>
                  <div className="border-l-2 border-border pl-4">
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
                    <p className="text-xs font-mono text-muted-foreground uppercase tracking-wider">Feb 9, 2021</p>
                  </div>
                  <div className="border-l-2 border-border pl-4">
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
                    <p className="text-xs font-mono text-muted-foreground uppercase tracking-wider">Jan 31, 2021</p>
                  </div>
                </div>
              </section>
            </FadeIn>
            <FadeIn delay={0.18} duration={350}>
              <section className="w-full sys-panel p-4 sm:p-7">
                <div className="sys-section-header mb-6">
                  <h2 className="sys-section-label">Certificates</h2>
                  <div className="sys-section-line" />
                </div>
                <ul className="space-y-4">
                    <li className="flex items-start gap-3">
                      <div className="flex-shrink-0 w-8 h-8 rounded-sm bg-muted/50 border border-border flex items-center justify-center overflow-hidden">
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
                        <span className="text-xs font-mono text-muted-foreground flex-shrink-0 ml-2 leading-none uppercase tracking-wider">2020</span>
                      </div>
                    </li>
                  </ul>
              </section>
            </FadeIn>
          </div>
        </div>

        {/* Currently */}
        <FadeIn delay={0.2} duration={350}>
          <section className="w-full sys-panel p-4 sm:p-7">
            <div className="sys-section-header mb-6">
              <h2 className="sys-section-label">Currently</h2>
              <div className="sys-section-line" />
            </div>
            <div className="flex flex-col md:flex-row gap-8">
              <div className="w-full md:w-1/2">
                <h3 className="text-sm font-mono uppercase tracking-widest text-muted-foreground mb-4">Listening to</h3>
                <div className="grid grid-cols-2 gap-4">
                  {[
                    {
                      name: "I Used to Go to This Bar",
                      artist: "Joyce Manor",
                      cover: "/about/albums/album1.webp",
                      url: "https://music.apple.com/us/album/i-used-to-go-to-this-bar/1839918836"
                    },
                    {
                      name: "I Love People",
                      artist: "Cory Hanson",
                      cover: "/about/albums/album2.webp",
                      url: "https://music.apple.com/us/album/i-love-people/1806705948"
                    },
                    {
                      name: "Burnover",
                      artist: "Greg Freeman",
                      cover: "/about/albums/album3.webp",
                      url: "https://music.apple.com/us/album/burnover/1803343332"
                    },
                    {
                      name: "LOTTO",
                      artist: "They Are Gutting a Body of Water",
                      cover: "/about/albums/album4.webp",
                      url: "https://music.apple.com/us/album/lotto/1821845532"
                    }
                  ].map((album, index) => (
                    <Link 
                      key={index} 
                      href={album.url}
                      className="group flex flex-col items-center text-center transition-opacity hover:opacity-80"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <div className="relative w-full aspect-square mb-2 rounded-sm overflow-hidden border border-border">
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
                <h3 className="text-sm font-mono uppercase tracking-widest text-muted-foreground mb-4">Reading</h3>
                <div className="grid grid-cols-2 gap-4">
                  {[
                    {
                      name: "Brave New World",
                      author: "Aldous Huxley",
                      cover: "/about/books/book1.webp",
                      url: "https://bookshop.org/p/books/brave-new-world-aldous-huxley/f7c8af7eeabea853?ean=9780060850524&next=t"
                    },
                    {
                      name: "Blood Meridian",
                      author: "Cormac McCarthy",
                      cover: "/about/books/book2.webp",
                      url: "https://bookshop.org/p/books/blood-meridian-or-the-evening-redness-in-the-west-cormac-mccarthy/6697128?ean=9780679728757&next=t"
                    }
                  ].map((book, index) => (
                    <Link 
                      key={index} 
                      href={book.url}
                      className="group flex flex-col items-center text-center transition-opacity hover:opacity-80"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <div className="relative w-full aspect-[2/3] mb-2 rounded-sm overflow-hidden border border-border">
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
