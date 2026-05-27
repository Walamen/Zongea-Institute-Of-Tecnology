'use client'

import { useFormState, useFormStatus } from 'react-dom'
import { sendContactEmail, type FormState } from './actions'
import { Send, CheckCircle, AlertCircle, Loader2 } from 'lucide-react'

const initialState: FormState = { status: 'idle' }

function SubmitButton() {
  const { pending } = useFormStatus()
  return (
    <button
      type="submit"
      disabled={pending}
      className="flex items-center justify-center gap-2 bg-secondary text-white font-bold text-2xs uppercase tracking-widest px-6 py-3.5 hover:bg-secondary-light transition-colors duration-200 disabled:opacity-60 disabled:cursor-not-allowed w-full"
    >
      {pending ? (
        <>
          <Loader2 size={13} className="animate-spin" />
          Sending…
        </>
      ) : (
        <>
          <Send size={13} strokeWidth={2} />
          Send Message
        </>
      )}
    </button>
  )
}

export default function ContactForm() {
  const [state, dispatch] = useFormState(sendContactEmail, initialState)

  if (state.status === 'success') {
    return (
      <div className="flex flex-col items-center justify-center flex-1 text-center py-12">
        <div className="w-16 h-16 rounded-full bg-secondary/20 flex items-center justify-center mb-6">
          <CheckCircle size={32} className="text-secondary" strokeWidth={1.5} />
        </div>
        <h3 className="font-display font-black text-primary text-2xl mb-3">
          Message Sent!
        </h3>
        <p className="text-stone text-sm leading-relaxed max-w-xs">
          Thank you for reaching out. Our team will get back to you as soon as possible.
        </p>
      </div>
    )
  }

  return (
    <form action={dispatch} className="flex flex-col gap-3 w-full">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div>
          <label className="block text-2xs font-bold uppercase tracking-widest text-stone mb-1">
            Full Name <span className="text-secondary">*</span>
          </label>
          <input
            name="name"
            type="text"
            required
            placeholder="Your name"
            className="w-full bg-white border border-rule text-ink placeholder:text-stone/40 px-3 py-2 text-sm focus:outline-none focus:ring-0 focus:border-primary transition-colors duration-200"
          />
        </div>
        <div>
          <label className="block text-2xs font-bold uppercase tracking-widest text-stone mb-1">
            Email <span className="text-secondary">*</span>
          </label>
          <input
            name="email"
            type="email"
            required
            placeholder="your@email.com"
            className="w-full bg-white border border-rule text-ink placeholder:text-stone/40 px-3 py-2 text-sm focus:outline-none focus:ring-0 focus:border-primary transition-colors duration-200"
          />
        </div>
      </div>

      <div>
        <label className="block text-2xs font-bold uppercase tracking-widest text-stone mb-1">
          Subject
        </label>
        <input
          name="subject"
          type="text"
          placeholder="What's this about? (optional)"
          className="w-full bg-white border border-rule text-ink placeholder:text-stone/40 px-3 py-2 text-sm focus:outline-none focus:ring-0 focus:border-primary transition-colors duration-200"
        />
      </div>

      <div>
        <label className="block text-2xs font-bold uppercase tracking-widest text-stone mb-1">
          Message <span className="text-secondary">*</span>
        </label>
        <textarea
          name="message"
          required
          rows={3}
          placeholder="Tell us how we can help…"
          className="w-full bg-white border border-rule text-ink placeholder:text-stone/40 px-3 py-2 text-sm focus:outline-none focus:ring-0 focus:border-primary transition-colors duration-200 resize-none"
        />
      </div>

      {state.status === 'error' && state.message && (
        <div className="flex items-center gap-2 text-red-600 text-xs bg-red-50 border border-red-200 px-3 py-2.5">
          <AlertCircle size={13} strokeWidth={2} className="flex-shrink-0" />
          {state.message}
        </div>
      )}

      <SubmitButton />
    </form>
  )
}
