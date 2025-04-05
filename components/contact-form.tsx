"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Checkbox } from "@/components/ui/checkbox"
import { Send } from "lucide-react"

interface FormData {
  firstName: string
  lastName: string
  email: string
  company: string
  message: string
  termsAccepted: boolean
}

interface FormErrors {
  firstName?: string
  lastName?: string
  email?: string
  company?: string
  message?: string
  termsAccepted?: string
  submit?: string
}

export default function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [formData, setFormData] = useState<FormData>({
    firstName: "",
    lastName: "",
    email: "",
    company: "",
    message: "",
    termsAccepted: false,
  })
  const [errors, setErrors] = useState<FormErrors>({})

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {}

    if (!formData.firstName.trim()) {
      newErrors.firstName = "First name is required"
    }

    if (!formData.lastName.trim()) {
      newErrors.lastName = "Last name is required"
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
    // Clear error when user starts typing
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

      // Reset form
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        company: "",
        message: "",
        termsAccepted: false,
      })
      setIsSuccess(true)
    } catch (error) {
      console.error("Form submission error:", error)
      // Show error in the form
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
      <div className="w-full flex flex-col items-center justify-center space-y-4 text-center">
        <div className="rounded-full bg-green-100 p-3 dark:bg-green-900">
          <Send className="h-6 w-6 text-green-600 dark:text-green-400" />
        </div>
        <h3 className="text-xl font-semibold">Thank you for your message!</h3>
        <p className="text-sm text-muted-foreground">
          I'll get back to you as soon as possible.
        </p>
        <Button 
          onClick={() => setIsSuccess(false)}
          variant="outline"
          className="px-6 mt-2"
        >
          Send another message
        </Button>
      </div>
    )
  }

  return (
    <div className="w-full">
      {errors.submit && (
        <div className="mb-4 p-3 bg-red-50 text-red-700 rounded-md border border-red-200 text-sm">
          <p className="font-medium">Error sending message:</p>
          <p>{errors.submit}</p>
        </div>
      )}

      <form className="space-y-3 sm:space-y-4 w-full" onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 gap-3 sm:gap-4 sm:grid-cols-2">
          <div>
            <label
              htmlFor="firstName"
              className="block text-[13px] sm:text-[14px] mb-1 sm:mb-2"
            >
              First name
            </label>
            <Input 
              id="firstName" 
              value={formData.firstName} 
              onChange={handleChange} 
              required 
              className="w-full"
              aria-invalid={!!errors.firstName}
              aria-describedby={errors.firstName ? "firstName-error" : undefined}
            />
            {errors.firstName && (
              <p className="text-red-500 text-xs mt-1" id="firstName-error">
                {errors.firstName}
              </p>
            )}
          </div>
          <div>
            <label
              htmlFor="lastName"
              className="block text-[13px] sm:text-[14px] mb-1 sm:mb-2"
            >
              Last name
            </label>
            <Input 
              id="lastName" 
              value={formData.lastName} 
              onChange={handleChange} 
              required 
              className="w-full"
              aria-invalid={!!errors.lastName}
              aria-describedby={errors.lastName ? "lastName-error" : undefined}
            />
            {errors.lastName && (
              <p className="text-red-500 text-xs mt-1" id="lastName-error">
                {errors.lastName}
              </p>
            )}
          </div>
        </div>
        <div>
          <label
            htmlFor="email"
            className="block text-[13px] sm:text-[14px] mb-1 sm:mb-2"
          >
            Email
          </label>
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
          {errors.email && (
            <p className="text-red-500 text-xs mt-1" id="email-error">
              {errors.email}
            </p>
          )}
        </div>
        <div>
          <label
            htmlFor="company"
            className="block text-[13px] sm:text-[14px] mb-1 sm:mb-2"
          >
            Company
          </label>
          <Input
            id="company"
            value={formData.company}
            onChange={handleChange}
            placeholder="Optional"
            className="w-full"
            aria-describedby={errors.company ? "company-error" : undefined}
          />
          {errors.company && (
            <p className="text-red-500 text-xs mt-1" id="company-error">
              {errors.company}
            </p>
          )}
        </div>
        <div>
          <label
            htmlFor="message"
            className="block text-[13px] sm:text-[14px] mb-1 sm:mb-2"
          >
            Message
          </label>
          <Textarea
            id="message"
            value={formData.message}
            onChange={handleChange}
            className="min-h-[120px] w-full"
            required
            placeholder="Tell me about your project or idea..."
            aria-invalid={!!errors.message}
            aria-describedby={errors.message ? "message-error" : undefined}
          />
          {errors.message && (
            <p className="text-red-500 text-xs mt-1" id="message-error">
              {errors.message}
            </p>
          )}
        </div>
        <div className="flex items-start sm:items-center gap-2 pt-1 sm:pt-2">
          <Checkbox
            id="termsAccepted"
            checked={formData.termsAccepted}
            onCheckedChange={handleCheckboxChange}
            className="mt-0.5 sm:mt-0"
            aria-invalid={!!errors.termsAccepted}
            aria-describedby={errors.termsAccepted ? "terms-error" : undefined}
          />
          <label
            htmlFor="termsAccepted"
            className={`text-[13px] sm:text-[14px] ${formData.termsAccepted ? "text-foreground" : "text-muted-foreground"} cursor-pointer`}
          >
            I accept this information will be used to contact me.
          </label>
        </div>
        {errors.termsAccepted && (
          <p className="text-red-500 text-xs -mt-2" id="terms-error">
            {errors.termsAccepted}
          </p>
        )}
        <Button 
          type="submit" 
          className="w-full h-9 sm:h-10 mt-2" 
          disabled={isSubmitting || !formData.termsAccepted}
          size="sm"
        >
          {isSubmitting ? (
            <span className="flex items-center">
              <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Sending...
            </span>
          ) : (
            <>
              <Send className="mr-2 h-4 w-4" /> Send message
            </>
          )}
        </Button>
      </form>
    </div>
  )
}

// Add named export for backward compatibility
export { ContactForm } 