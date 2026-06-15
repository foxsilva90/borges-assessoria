"use client"

import { useEffect } from "react"

declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void
  }
}

interface Props {
  contentId: string
  contentName: string
  value: number
}

export default function PixelViewContent({ contentId, contentName, value }: Props) {
  useEffect(() => {
    if (typeof window !== "undefined" && window.fbq) {
      window.fbq("track", "ViewContent", {
        content_ids: [contentId],
        content_name: contentName,
        content_type: "product",
        value,
        currency: "BRL",
      })
    }
  }, [contentId, contentName, value])

  return null
}
