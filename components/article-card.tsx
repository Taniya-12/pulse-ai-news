'use client'

import Image from 'next/image'
import Link from 'next/link'
import { Bookmark, BookmarkCheck, Clock, ExternalLink } from 'lucide-react'
import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'

interface ArticleCardProps {
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
  featured?: boolean
  delay?: number
}

export default function ArticleCard({ article, featured = false, delay = 0 }: ArticleCardProps) {
  const [isBookmarked, setIsBookmarked] = useState(false)
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    // Check if article is bookmarked
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
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: delay * 0.1, duration: 0.3 }}
      whileHover={{ y: -4 }}
    >
      <Link href={article.url} target="_blank" rel="noopener noreferrer">
        <div className={`h-full rounded-xl overflow-hidden bg-card border border-border hover:border-primary/50 transition-all duration-300 hover:shadow-lg group ${
          featured ? 'md:row-span-2 md:col-span-1' : ''
        }`}>
          {/* Image Container */}
          <div className={`relative overflow-hidden bg-muted ${
            featured ? 'h-64 md:h-full' : 'h-48'
          }`}>
            {article.image ? (
              <Image
                src={article.image}
                alt={article.title}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-300"
                sizes={featured ? '(max-width: 768px) 100vw, 400px' : '(max-width: 768px) 100vw, 300px'}
              />
            ) : (
              <div className="w-full h-full bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
                <span className="text-muted-foreground">No image</span>
              </div>
            )}

            {/* Category Badge */}
            {article.category && (
              <div className="absolute top-3 left-3">
                <motion.span
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-primary/90 text-white backdrop-blur-sm"
                >
                  {article.category.charAt(0).toUpperCase() + article.category.slice(1)}
                </motion.span>
              </div>
            )}

            {/* Bookmark Button */}
            <button
              onClick={toggleBookmark}
              className="absolute top-3 right-3 p-2 rounded-lg bg-white/90 dark:bg-black/90 hover:bg-white dark:hover:bg-black transition-colors backdrop-blur-sm"
              aria-label="Toggle bookmark"
            >
              {isLoaded && isBookmarked ? (
                <BookmarkCheck className="w-5 h-5 text-primary fill-primary" />
              ) : (
                <Bookmark className="w-5 h-5 text-muted-foreground hover:text-primary" />
              )}
            </button>

            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </div>

          {/* Content */}
          <div className="p-4 flex flex-col gap-3">
            <h3 className="font-bold text-base line-clamp-2 group-hover:text-primary transition-colors">
              {article.title}
            </h3>

            {article.description && (
              <p className="text-sm text-muted-foreground line-clamp-2">
                {article.description}
              </p>
            )}

            {/* Footer */}
            <div className="mt-auto pt-3 border-t border-border flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-muted-foreground" />
                <span className="text-xs text-muted-foreground">
                  {timeAgo(article.publishedAt)}
                </span>
              </div>
              <span className="text-xs font-medium text-primary flex items-center gap-1">
                {article.source}
                <ExternalLink className="w-3 h-3" />
              </span>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  )
}
