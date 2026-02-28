"use client"

import { useState, useEffect } from "react"

const roles = [
  "Staff Product Designer",
  "Founder",
  "Healthtech Designer",
  "Cybersecurity Designer",
  "Startup Designer",
]

export function HeroTitle() {
  const [index, setIndex] = useState(0)
  const [fade, setFade] = useState(true)

  useEffect(() => {
    const interval = setInterval(() => {
      setFade(false)
      setTimeout(() => {
        setIndex((prev) => (prev + 1) % roles.length)
        setFade(true)
      }, 200)
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  return (
    <h1 className="text-2xl sm:text-3xl md:text-4xl font-medium leading-tight sm:leading-tight tracking-tight">
      Hi, I&apos;m Brendan&mdash;
      <span
        className={`inline-block bg-foreground text-background px-2 py-0.5 rounded-sm mx-1 transition-opacity duration-200 ${
          fade ? "opacity-100" : "opacity-0"
        }`}
      >
        {roles[index]}
      </span>
    </h1>
  )
}
