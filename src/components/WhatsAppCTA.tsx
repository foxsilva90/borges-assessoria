"use client"

interface Props {
  href: string
  className?: string
  children: React.ReactNode
}

export default function WhatsAppCTA({ href, className, children }: Props) {
  const handleClick = () => {
    if (typeof window !== "undefined" && (window as any).fbq) {
      ;(window as any).fbq("track", "Contact")
    }
  }

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      onClick={handleClick}
      className={className}
    >
      {children}
    </a>
  )
}
