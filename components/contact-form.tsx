"use client"

import { useState } from "react"
import type React from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Send, CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"

// Define form schema with Zod
const formSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().email("Invalid email address"),
  company: z.string().optional(),
  message: z.string().min(1, "Message is required"),
  consent: z.boolean().refine(val => val === true, {
    message: "You must accept to proceed",
  }),
});

type FormValues = z.infer<typeof formSchema>;

export default function ContactForm() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  
  const {
    register,
    handleSubmit,
    watch,
    reset,
    setValue,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      company: "",
      message: "",
      consent: false,
    },
  });
  
  const consentValue = watch("consent");
  
  // Fix for handling checkbox changes
  const handleConsentChange = (checked: boolean | "indeterminate") => {
    setValue("consent", checked === true);
  };
  
  const onSubmit = async (data: FormValues) => {
    setIsSubmitting(true);
    setSubmitError(null);
    
    try {
      const response = await fetch('/api/send', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to send message');
      }
      
      // Show thank you state and reset form
      setIsSubmitted(true);
      reset();
    } catch (error) {
      console.error('Error submitting form:', error);
      setSubmitError(error instanceof Error ? error.message : 'An unexpected error occurred');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleNewMessage = () => {
    setIsSubmitted(false);
    setSubmitError(null);
  };

  if (isSubmitted) {
    return (
      <div className="text-center py-4 sm:py-8">
        <CheckCircle className="mx-auto h-12 w-12 sm:h-16 sm:w-16 text-green-500 mb-3 sm:mb-4" />
        <h1 className="text-xl sm:text-[24px] font-semibold mb-2 sm:mb-4">Thank you for your message!</h1>
        <p className="text-sm sm:text-base text-muted-foreground mb-4 sm:mb-6">
          I appreciate you reaching out and will get back to you as soon as possible.
        </p>
        <Button onClick={handleNewMessage} size="sm" className="sm:size-default">
          Send another message
        </Button>
      </div>
    );
  }

  return (
    <>
      <h1 className="text-xl sm:text-[24px] font-semibold mb-1 sm:mb-2">Let's go to market</h1>
      <p className="text-sm sm:text-base text-muted-foreground mb-6 sm:mb-8">
        Ready to take your product from 0 → 1 or looking to expand your team? Reach out below.
      </p>

      {submitError && (
        <div className="mb-4 p-3 bg-red-50 text-red-700 rounded-md border border-red-200 text-sm">
          <p className="font-medium">Error sending message:</p>
          <p>{submitError}</p>
        </div>
      )}

      <form 
        className="space-y-3 sm:space-y-4" 
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit(onSubmit)(e);
        }}
      >
        <div>
          <label htmlFor="firstName" className="block text-[13px] sm:text-[14px] mb-1 sm:mb-2">
            First name
          </label>
          <input
            id="firstName"
            {...register("firstName")}
            className={`w-full px-3 sm:px-4 py-2 rounded-lg border ${errors.firstName ? "border-red-500" : "border-input"} bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring text-sm sm:text-base`}
          />
          {errors.firstName && (
            <p className="text-red-500 text-xs mt-1">{errors.firstName.message}</p>
          )}
        </div>

        <div>
          <label htmlFor="lastName" className="block text-[13px] sm:text-[14px] mb-1 sm:mb-2">
            Last name
          </label>
          <input
            id="lastName"
            {...register("lastName")}
            className={`w-full px-3 sm:px-4 py-2 rounded-lg border ${errors.lastName ? "border-red-500" : "border-input"} bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring text-sm sm:text-base`}
          />
          {errors.lastName && (
            <p className="text-red-500 text-xs mt-1">{errors.lastName.message}</p>
          )}
        </div>

        <div>
          <label htmlFor="email" className="block text-[13px] sm:text-[14px] mb-1 sm:mb-2">
            Email
          </label>
          <input
            id="email"
            type="email"
            {...register("email")}
            className={`w-full px-3 sm:px-4 py-2 rounded-lg border ${errors.email ? "border-red-500" : "border-input"} bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring text-sm sm:text-base`}
          />
          {errors.email && (
            <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>
          )}
        </div>

        <div>
          <label htmlFor="company" className="block text-[13px] sm:text-[14px] mb-1 sm:mb-2">
            Company
          </label>
          <input
            id="company"
            {...register("company")}
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
            {...register("message")}
            rows={4}
            placeholder="Tell me about your project or idea..."
            className={`w-full px-3 sm:px-4 py-2 rounded-lg border ${errors.message ? "border-red-500" : "border-input"} bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring placeholder:text-muted-foreground text-sm sm:text-base`}
          />
          {errors.message && (
            <p className="text-red-500 text-xs mt-1">{errors.message.message}</p>
          )}
        </div>

        <div className="flex items-start sm:items-center gap-2 pt-1 sm:pt-2">
          <Checkbox
            id="consent"
            {...register("consent")}
            checked={consentValue}
            onCheckedChange={handleConsentChange}
            className="mt-0.5 sm:mt-0"
          />
          <label
            htmlFor="consent"
            className="text-[13px] sm:text-[14px] text-muted-foreground cursor-pointer"
          >
            I accept this information will be used to contact me.
          </label>
        </div>
        {errors.consent && (
          <p className="text-red-500 text-xs -mt-2">{errors.consent.message}</p>
        )}

        <Button
          type="submit"
          className="w-full h-9 sm:h-10 mt-2"
          disabled={!consentValue || isSubmitting}
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
    </>
  );
} 