"use client"
import { useState } from "react"
import type React from "react"

import { Send, CheckCircle } from "lucide-react"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { FadeIn } from "@/components/fade-in"

export default function Contact() {
  const [isConsented, setIsConsented] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (!isConsented) {
      return
    }

    // Get form data
    const formData = new FormData(e.currentTarget)

    // Submit the form programmatically to the email
    const form = e.currentTarget
    form.action = `mailto:brendan@fourpixels.xyz?subject=Contact Form Submission&body=${encodeURIComponent(
      `Name: ${formData.get("firstName")} ${formData.get("lastName")}
Email: ${formData.get("email")}
Company: ${formData.get("company") || "Not provided"}
Message: ${formData.get("message")}`,
    )}`

    // Show thank you state
    setIsSubmitted(true)

    // Submit the form
    form.submit()
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      <div className="max-w-[1024px] mx-auto px-4 py-6 sm:py-8">
        <div className="flex justify-center">
          <FadeIn delay={0} duration={350}>
            <div className="w-full max-w-[528px] border border-border rounded-xl p-4 sm:p-8">
              {isSubmitted ? (
                <div className="text-center py-4 sm:py-8">
                  <CheckCircle className="mx-auto h-12 w-12 sm:h-16 sm:w-16 text-green-500 mb-3 sm:mb-4" />
                  <h1 className="text-xl sm:text-[24px] font-semibold mb-2 sm:mb-4">Thank you for your message!</h1>
                  <p className="text-sm sm:text-base text-muted-foreground mb-4 sm:mb-6">
                    I appreciate you reaching out and will get back to you as soon as possible.
                  </p>
                  <Button onClick={() => setIsSubmitted(false)} size="sm" className="sm:size-default">
                    Send another message
                  </Button>
                </div>
              ) : (
                <>
                  <h1 className="text-xl sm:text-[24px] font-semibold mb-1 sm:mb-2">Let's go to market</h1>
                  <p className="text-sm sm:text-base text-muted-foreground mb-6 sm:mb-8">
                    Ready to take your product from 0 → 1 or looking to expand your team? Reach out below.
                  </p>

                  <form className="space-y-3 sm:space-y-4" onSubmit={handleSubmit} method="post">
                    <div>
                      <label htmlFor="firstName" className="block text-[13px] sm:text-[14px] mb-1 sm:mb-2">
                        First name
                      </label>
                      <input
                        type="text"
                        id="firstName"
                        name="firstName"
                        className="w-full px-3 sm:px-4 py-2 rounded-lg border border-input bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring text-sm sm:text-base"
                        required
                      />
                    </div>

                    <div>
                      <label htmlFor="lastName" className="block text-[13px] sm:text-[14px] mb-1 sm:mb-2">
                        Last name
                      </label>
                      <input
                        type="text"
                        id="lastName"
                        name="lastName"
                        className="w-full px-3 sm:px-4 py-2 rounded-lg border border-input bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring text-sm sm:text-base"
                        required
                      />
                    </div>

                    <div>
                      <label htmlFor="email" className="block text-[13px] sm:text-[14px] mb-1 sm:mb-2">
                        Email
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        className="w-full px-3 sm:px-4 py-2 rounded-lg border border-input bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring text-sm sm:text-base"
                        required
                      />
                    </div>

                    <div>
                      <label htmlFor="company" className="block text-[13px] sm:text-[14px] mb-1 sm:mb-2">
                        Company
                      </label>
                      <input
                        type="text"
                        id="company"
                        name="company"
                        placeholder="Optional"
                        className="w-full px-3 sm:px-4 py-2 rounded-lg border border-input bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring placeholder:text-muted-foreground text-sm sm:text-base"
                      />
                    </div>

                    <div>
                      <label htmlFor="message" className="block text-[13px] sm:text-[14px] mb-1 sm:mb-2">
                        Message
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        rows={4}
                        placeholder="Tell me about your project or idea..."
                        className="w-full px-3 sm:px-4 py-2 rounded-lg border border-input bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring placeholder:text-muted-foreground text-sm sm:text-base"
                        required
                      />
                    </div>

                    <div className="flex items-start sm:items-center gap-2 pt-1 sm:pt-2">
                      <Checkbox
                        id="consent"
                        checked={isConsented}
                        onCheckedChange={(checked) => setIsConsented(checked === true)}
                        required
                        className="mt-0.5 sm:mt-0"
                      />
                      <label
                        htmlFor="consent"
                        className="text-[13px] sm:text-[14px] text-muted-foreground cursor-pointer"
                        onClick={() => setIsConsented(!isConsented)}
                      >
                        I accept this information will be used to contact me.
                      </label>
                    </div>

                    <Button
                      type="submit"
                      className="w-full"
                      disabled={!isConsented}
                      size="sm"
                      className="w-full h-9 sm:h-10 mt-2"
                    >
                      <Send className="mr-2 h-4 w-4" /> Send message
                    </Button>
                  </form>
                </>
              )}
            </div>
          </FadeIn>
        </div>

        <Footer />
      </div>
    </div>
  )
}

