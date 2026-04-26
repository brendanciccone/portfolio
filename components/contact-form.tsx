"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { Send } from "lucide-react"

interface FormData {
  name: string
  email: string
  company: string
  message: string
  termsAccepted: boolean
}

interface FormErrors {
  name?: string
  email?: string
  company?: string
  message?: string
  termsAccepted?: string
  submit?: string
}

const FieldLabel = ({ htmlFor, children, optional }: { htmlFor: string; children: React.ReactNode; optional?: boolean }) => (
  <label
    htmlFor={htmlFor}
    className="flex items-center justify-between text-[10px] font-mono uppercase tracking-[0.16em] mb-1.5 text-foreground"
  >
    <span>{children}</span>
    {optional ? <span className="text-muted-foreground">Optional</span> : null}
  </label>
)

export default function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    company: "",
    message: "",
    termsAccepted: false,
  })
  const [errors, setErrors] = useState<FormErrors>({})

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {}

    if (!formData.name.trim()) {
      newErrors.name = "Name is required"
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required"
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address"
    }

    if (!formData.message.trim()) {
      newErrors.message = "Message is required"
    } else if (formData.message.length < 10) {
      newErrors.message = "Message must be at least 10 characters long"
    } else if (formData.message.length > 1000) {
      newErrors.message = "Message must be less than 1000 characters"
    }

    if (!formData.termsAccepted) {
      newErrors.termsAccepted = "You must accept the terms to send a message"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }))
    if (errors[id as keyof FormErrors]) {
      setErrors((prev) => ({
        ...prev,
        [id]: undefined,
      }))
    }
  }

  const handleCheckboxChange = (checked: boolean) => {
    setFormData((prev) => ({
      ...prev,
      termsAccepted: checked,
    }))
    if (errors.termsAccepted) {
      setErrors((prev) => ({
        ...prev,
        termsAccepted: undefined,
      }))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) {
      return
    }

    setIsSubmitting(true)

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || "Failed to send message")
      }

      setFormData({
        name: "",
        email: "",
        company: "",
        message: "",
        termsAccepted: false,
      })
      setIsSuccess(true)
    } catch (error) {
      console.error("Form submission error:", error)
      setErrors((prev) => ({
        ...prev,
        submit: error instanceof Error ? error.message : "Failed to send message. Please try again later.",
      }))
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isSuccess) {
    return (
      <div className="border border-foreground p-6 flex flex-col gap-4">
        <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-muted-foreground">
          Status / Sent
        </p>
        <h3 className="sys-display text-xl">Message received.</h3>
        <p className="font-mono text-[13px] leading-relaxed text-muted-foreground">
          Thanks for reaching out — I&apos;ll get back to you as soon as possible.
        </p>
        <Button onClick={() => setIsSuccess(false)} variant="outline" className="w-full mt-2">
          Send another
        </Button>
      </div>
    )
  }

  return (
    <div className="w-full">
      {errors.submit ? (
        <div className="mb-4 p-3 border border-destructive text-destructive font-mono text-[12px]">
          <p className="font-medium uppercase tracking-[0.14em] text-[10px] mb-1">Error</p>
          <p>{errors.submit}</p>
        </div>
      ) : null}

      <form className="space-y-4 w-full" onSubmit={handleSubmit}>
        <div>
          <FieldLabel htmlFor="name">Name</FieldLabel>
          <Input
            id="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full"
            aria-invalid={!!errors.name}
            aria-describedby={errors.name ? "name-error" : undefined}
          />
          {errors.name ? (
            <p className="text-destructive text-[11px] font-mono mt-1" id="name-error">
              {errors.name}
            </p>
          ) : null}
        </div>

        <div>
          <FieldLabel htmlFor="email">Email</FieldLabel>
          <Input
            id="email"
            value={formData.email}
            onChange={handleChange}
            type="email"
            required
            className="w-full"
            aria-invalid={!!errors.email}
            aria-describedby={errors.email ? "email-error" : undefined}
          />
          {errors.email ? (
            <p className="text-destructive text-[11px] font-mono mt-1" id="email-error">
              {errors.email}
            </p>
          ) : null}
        </div>

        <div>
          <FieldLabel htmlFor="company" optional>Company</FieldLabel>
          <Input
            id="company"
            value={formData.company}
            onChange={handleChange}
            className="w-full"
            aria-describedby={errors.company ? "company-error" : undefined}
          />
          {errors.company ? (
            <p className="text-destructive text-[11px] font-mono mt-1" id="company-error">
              {errors.company}
            </p>
          ) : null}
        </div>

        <div>
          <FieldLabel htmlFor="message">Message</FieldLabel>
          <Textarea
            id="message"
            value={formData.message}
            onChange={handleChange}
            className="min-h-[120px] w-full"
            required
            placeholder="Tell me about your project or idea…"
            aria-invalid={!!errors.message}
            aria-describedby={errors.message ? "message-error" : undefined}
          />
          {errors.message ? (
            <p className="text-destructive text-[11px] font-mono mt-1" id="message-error">
              {errors.message}
            </p>
          ) : null}
        </div>

        <div className="flex items-start gap-2.5 pt-1">
          <Checkbox
            id="termsAccepted"
            checked={formData.termsAccepted}
            onCheckedChange={handleCheckboxChange}
            className="mt-0.5"
            aria-invalid={!!errors.termsAccepted}
            aria-describedby={errors.termsAccepted ? "terms-error" : undefined}
          />
          <label
            htmlFor="termsAccepted"
            className={`font-mono text-[12px] leading-snug cursor-pointer ${formData.termsAccepted ? "text-foreground" : "text-muted-foreground"}`}
          >
            I accept this information will be used to contact me.
          </label>
        </div>
        {errors.termsAccepted ? (
          <p className="text-destructive text-[11px] font-mono" id="terms-error">
            {errors.termsAccepted}
          </p>
        ) : null}

        <Button
          type="submit"
          className="w-full mt-2"
          disabled={isSubmitting || !formData.termsAccepted}
        >
          {isSubmitting ? (
            <span className="flex items-center">
              <svg className="animate-spin -ml-1 mr-2 h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
              </svg>
              Sending…
            </span>
          ) : (
            <>
              <Send className="mr-1 h-4 w-4" /> Transmit
            </>
          )}
        </Button>
      </form>
    </div>
  )
}

export { ContactForm }
