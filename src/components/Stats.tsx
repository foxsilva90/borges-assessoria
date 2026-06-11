"use client"

import { useEffect, useRef, useState } from "react"

function AnimatedNumber({ target, suffix }: { target: number; suffix: string }) {
  const [count, setCount] = useState(0)
  const spanRef = useRef<HTMLSpanElement>(null)
  const started = useRef(false)

  useEffect(() => {
    const el = spanRef.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true
          const duration = 1600
          const start = performance.now()
          const tick = (now: number) => {
            const progress = Math.min((now - start) / duration, 1)
            const eased = 1 - Math.pow(1 - progress, 3)
            setCount(Math.round(eased * target))
            if (progress < 1) requestAnimationFrame(tick)
          }
          requestAnimationFrame(tick)
        }
      },
      { threshold: 0.5 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [target])

  return (
    <span ref={spanRef}>
      {count}{suffix}
    </span>
  )
}

const stats = [
  { type: "number" as const, target: 30,  suffix: "+", label: "Anos de Experiência" },
  { type: "number" as const, target: 500, suffix: "+", label: "Imóveis Negociados" },
  { type: "text"   as const, value: "CRECI",           label: "40466 — Licenciados" },
  { type: "number" as const, target: 100, suffix: "%", label: "Assessoria Jurídica" },
]

export default function Stats() {
  return (
    <section className="bg-[#F5F0E8] py-20 border-y border-[#E5E0D8]">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:divide-x divide-[#E5E0D8]">
          {stats.map((stat) => (
            <div key={stat.label} className="text-center md:px-8">
              <p className="font-display text-4xl md:text-5xl text-[#C4933A] mb-2">
                {stat.type === "number" ? (
                  <AnimatedNumber target={stat.target} suffix={stat.suffix} />
                ) : (
                  stat.value
                )}
              </p>
              <p className="text-xs text-[#6B6B6B] tracking-[0.15em] uppercase">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
