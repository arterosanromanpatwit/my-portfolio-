"use client"

import { useState, useEffect, useRef } from "react"

interface TypeAnimationProps {
  phrases: string[]
  typingSpeed?: number
  deletingSpeed?: number
  delayAfterPhrase?: number
}

export default function TypeAnimation({
  phrases,
  typingSpeed = 100,
  deletingSpeed = 50,
  delayAfterPhrase = 1500,
}: TypeAnimationProps) {
  const [displayText, setDisplayText] = useState("")
  const [isDeleting, setIsDeleting] = useState(false)
  const [currentPhraseIndex, setCurrentPhraseIndex] = useState(0)
  // Use a ref to track if the component is mounted
  const isMounted = useRef(true)

  useEffect(() => {
    // Set mounted state
    isMounted.current = true

    // Cleanup function to set mounted to false when component unmounts
    return () => {
      isMounted.current = false
    }
  }, [])

  useEffect(() => {
    // Don't blink cursor during typing/deleting
    if (isDeleting || displayText.length < phrases[currentPhraseIndex].length) {
    }

    const timeout = setTimeout(
      () => {
        if (!isMounted.current) return

        // Handle deleting state
        if (isDeleting) {
          if (displayText.length === 0) {
            setIsDeleting(false)
            setCurrentPhraseIndex((prevIndex) => (prevIndex + 1) % phrases.length)
          } else {
            setDisplayText((text) => text.substring(0, text.length - 1))
          }
          return
        }

        // Handle typing state
        if (displayText.length < phrases[currentPhraseIndex].length) {
          setDisplayText(phrases[currentPhraseIndex].substring(0, displayText.length + 1))
        } else {
          // Finished typing current phrase

          // Wait before starting to delete
          setTimeout(() => {
            if (isMounted.current) {
              setIsDeleting(true)
            }
          }, delayAfterPhrase)
        }
      },
      isDeleting ? deletingSpeed : typingSpeed,
    )

    return () => clearTimeout(timeout)
  }, [displayText, isDeleting, currentPhraseIndex, phrases, typingSpeed, deletingSpeed, delayAfterPhrase])

  return (
    <div className="inline-flex items-center">
      <span className="text-blue-400 font-medium text-lg md:text-xl">{displayText}</span>
      <span className="w-1 h-6 bg-blue-400 ml-0.5" aria-hidden="true"></span>
    </div>
  )
}
