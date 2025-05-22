"use client"

import { useState } from "react"
import { handleContactFormSubmission } from "@/app/actions/contact"

export default function ContactForm() {
  const [formStatus, setFormStatus] = useState<{
    success?: boolean
    error?: string
  }>({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  async function handleSubmit(formData: FormData) {
    setIsSubmitting(true)
    setFormStatus({})

    try {
      const result = await handleContactFormSubmission(formData)
      setFormStatus(result)

      // Reset form on success
      if (result.success) {
        const form = document.getElementById("contact-form") as HTMLFormElement
        form.reset()
      }
    } catch (error) {
      setFormStatus({ error: "An unexpected error occurred. Please try again." })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form id="contact-form" action={handleSubmit} className="space-y-4 mb-12">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <input
          type="text"
          name="name"
          placeholder="Name"
          className="w-full px-3 py-2 text-sm bg-zinc-900 border border-zinc-800 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          className="w-full px-3 py-2 text-sm bg-zinc-900 border border-zinc-800 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
          required
        />
      </div>
      <textarea
        name="message"
        placeholder="Message"
        rows={5}
        className="w-full px-3 py-2 text-sm bg-zinc-900 border border-zinc-800 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
        required
      ></textarea>

      <div>
        <button
          type="submit"
          disabled={isSubmitting}
          className="py-2 px-4 bg-blue-500/10 text-blue-400 rounded-md hover:bg-blue-500/20 transition-colors text-sm font-medium disabled:opacity-50"
        >
          {isSubmitting ? "Sending..." : "Send Message"}
        </button>

        {formStatus.success && (
          <p className="mt-2 text-green-400 text-sm">Message sent successfully! I'll get back to you soon.</p>
        )}

        {formStatus.error && <p className="mt-2 text-red-400 text-sm">{formStatus.error}</p>}
      </div>
    </form>
  )
}
