import { generatePageMetadata } from "@/lib/metadata";
import ContactForm from "@/components/contact-form";
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
      {/* Clears the floating nav (16px offset + 64px bar) with room to spare */}
      <div className="max-w-[var(--page-width)] mx-auto px-5 pt-32 sm:pt-36 pb-6 sm:pb-8 flex flex-col gap-10 sm:gap-12">
        {/*
          Title, one line of copy, the form. Nothing else.

          This ran as a two-column split — copy and a decorative dot grid on the
          left, form on the right, divided by a vertical hairline — which was
          built for the old 64rem rail. On the 45rem one each column came out
          around 320px, so the form fields were half the width of every other
          input on the site and the left column was mostly there to stop the
          right one looking lonely. The hairline was separating two things that
          did not need separating.

          One column also means the person filling this in reads top to bottom
          in the order the page is written, which on a page whose only job is a
          form is the entire brief.

          A dot lattice was tried again and removed again. The second attempt
          was a better object than the first — full rail rather than a column,
          proportional by construction, with one live dot tracking the cursor —
          and it still failed the same test. The page reads thin because the
          form is four wide, short, empty boxes, and a lattice decorates the gap
          beside that rather than touching it. Filling space next to a problem
          is not the same as solving it.

          Making the fields denser is the fix that would work, and it is the one
          this layout already spent: narrowing them is what the two-column split
          did, and at ~320px they came out half the width of every other input
          on the site.

          So the page stays sparse, which is what a page with one job looks
          like.
        */}
        <section className="flex flex-col gap-3 sm:gap-4">
          {/* One line. It was split across two hand-authored masks, which was
              written when the hero ran at 72px on a 64rem rail and genuinely
              needed the break. At 24px on a 45rem rail the whole phrase
              measures about a third of the column, so the break was inventing a
              second line out of nothing and leaving two thirds of the measure
              empty beside it. */}
          <h1 className="title-display text-2xl">
            <span className="anim-line-mask">
              <span className="block anim-line">Let&apos;s ship something great</span>
            </span>
          </h1>
          <p className="text-base leading-[1.6] text-ink-soft anim-rise [animation-delay:180ms]">
            Looking for feedback on your product or how to take an idea from 0 → 1? Reach out below.
          </p>
        </section>

        {/* Flowed as one block rather than per field: melting the form on its
            own schedule would fade inputs out from under someone filling them */}
        <div data-flow>
          <ContactForm />
        </div>

        <Footer />
      </div>
    </div>
  );
}
