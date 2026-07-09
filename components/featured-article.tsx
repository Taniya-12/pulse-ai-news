'use client'

import Image from 'next/image'
import Link from 'next/link'
import { Bookmark, BookmarkCheck, ExternalLink } from 'lucide-react'
import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'

interface FeaturedArticleProps {
  article: {
    id: string
    title: string
    description?: string
    image?: string
    url: string
    source: string
    publishedAt: string
    category?: string
  }
}

export default function FeaturedArticle({ article }: FeaturedArticleProps) {
  const [isBookmarked, setIsBookmarked] = useState(false)
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    const bookmarks = JSON.parse(localStorage.getItem('bookmarkedArticles') || '[]')
    setIsBookmarked(bookmarks.some((b: any) => b.id === article.id))
    setIsLoaded(true)
  }, [article.id])

  const toggleBookmark = (e: React.MouseEvent) => {
    e.preventDefault()
    const bookmarks = JSON.parse(localStorage.getItem('bookmarkedArticles') || '[]')
    const index = bookmarks.findIndex((b: any) => b.id === article.id)

    if (index > -1) {
      bookmarks.splice(index, 1)
      setIsBookmarked(false)
    } else {
      bookmarks.push(article)
      setIsBookmarked(true)
    }

    localStorage.setItem('bookmarkedArticles', JSON.stringify(bookmarks))
  }

  const timeAgo = (date: string) => {
    const now = new Date()
    const published = new Date(date)
    const diffMs = now.getTime() - published.getTime()
    const diffMins = Math.floor(diffMs / 60000)
    const diffHours = Math.floor(diffMins / 60)
    const diffDays = Math.floor(diffHours / 24)

    if (diffMins < 60) return `${diffMins}m ago`
    if (diffHours < 24) return `${diffHours}h ago`
    if (diffDays < 7) return `${diffDays}d ago`
    return published.toLocaleDateString()
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      whileHover={{ y: -8 }}
    >
      <Link href={article.url} target="_blank" rel="noopener noreferrer">
        <div className="group relative h-96 rounded-2xl overflow-hidden bg-card border-2 border-border hover:border-primary/50 transition-all duration-300 hover:shadow-2xl">
          {/* Background Image with Overlay */}
          {article.image ? (
            <Image
              src={article.image}
              alt={article.title}
              fill
              className="object-cover group-hover:scale-110 transition-transform duration-500"
              priority
              sizes="(max-width: 768px) 100vw, 800px"
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-primary/40 to-accent/40" />
          )}

          {/* Overlay Gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />

          {/* Content */}
          <motion.div
            className="absolute inset-0 flex flex-col justify-end p-6 md:p-8 text-white"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            {/* Category & Source */}
            <div className="flex items-center gap-3 mb-4">
              {article.category && (
                <motion.span
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.3 }}
                  className="inline-block px-4 py-1.5 rounded-full text-sm font-bold bg-primary/90 text-white backdrop-blur-sm"
                >
                  {article.category.charAt(0).toUpperCase() + article.category.slice(1)}
                </motion.span>
              )}
              <span className="text-sm font-semibold text-accent">
                {article.source}
              </span>
            </div>

            {/* Title */}
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold leading-tight mb-3 text-white group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-primary group-hover:to-accent group-hover:bg-clip-text transition-all">
              {article.title}
            </h2>

            {/* Description */}
            {article.description && (
              <p className="text-sm md:text-base text-gray-100 line-clamp-2 mb-4 opacity-90">
                {article.description}
              </p>
            )}

            {/* Footer */}
            <div className="flex items-center justify-between">
              <span className="text-xs md:text-sm text-gray-300">
                {timeAgo(article.publishedAt)}
              </span>
              <div className="flex items-center gap-2">
                <button
                  onClick={toggleBookmark}
                  className="p-2 rounded-lg bg-white/20 hover:bg-white/30 backdrop-blur-sm transition-colors"
                  aria-label="Toggle bookmark"
                >
                  {isLoaded && isBookmarked ? (
                    <BookmarkCheck className="w-5 h-5 fill-white text-white" />
                  ) : (
                    <Bookmark className="w-5 h-5 text-white" />
                  )}
                </button>
                <ExternalLink className="w-5 h-5 text-white opacity-70" />
              </div>
            </div>
          </motion.div>
        </div>
      </Link>
    </motion.div>
  )
}
