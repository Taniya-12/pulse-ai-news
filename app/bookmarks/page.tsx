'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Trash2, BookmarkX } from 'lucide-react'
import Navbar from '@/components/navbar'
import ArticleCard from '@/components/article-card'

interface Article {
  id: string
  title: string
  description?: string
  image?: string
  url: string
  source: string
  publishedAt: string
  category?: string
}

export default function BookmarksPage() {
  const [bookmarks, setBookmarks] = useState<Article[]>([])
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    // Load bookmarks from localStorage
    const savedBookmarks = JSON.parse(localStorage.getItem('bookmarkedArticles') || '[]')
    setBookmarks(savedBookmarks)
    setIsLoaded(true)
  }, [])

  const removeBookmark = (articleId: string) => {
    const updated = bookmarks.filter((b) => b.id !== articleId)
    setBookmarks(updated)
    localStorage.setItem('bookmarkedArticles', JSON.stringify(updated))
  }

  const clearAll = () => {
    if (window.confirm('Are you sure you want to clear all bookmarks?')) {
      setBookmarks([])
      localStorage.setItem('bookmarkedArticles', JSON.stringify([]))
    }
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Header Section */}
      <motion.section
        className="bg-gradient-to-b from-primary/10 to-background pt-8 pb-8 px-4 sm:px-6 lg:px-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold mb-2">Bookmarks</h1>
            <p className="text-muted-foreground">
              {isLoaded && bookmarks.length > 0
                ? `You have ${bookmarks.length} saved article${bookmarks.length !== 1 ? 's' : ''}`
                : 'Start bookmarking articles to read later'}
            </p>
          </div>

          {isLoaded && bookmarks.length > 0 && (
            <motion.button
              onClick={clearAll}
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-destructive/20 text-destructive hover:bg-destructive/30 font-semibold transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Trash2 className="w-4 h-4" />
              Clear All
            </motion.button>
          )}
        </div>
      </motion.section>

      {/* Content Section */}
      <section className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {!isLoaded ? (
            <motion.div
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              {[...Array(6)].map((_, i) => (
                <div key={i} className="rounded-lg bg-muted h-64 animate-pulse" />
              ))}
            </motion.div>
          ) : bookmarks.length === 0 ? (
            <motion.div
              className="text-center py-16"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <BookmarkX className="w-16 h-16 text-muted-foreground mx-auto mb-4 opacity-50" />
              <h2 className="text-2xl font-bold mb-2">No bookmarks yet</h2>
              <p className="text-muted-foreground mb-6">
                Start exploring the news and bookmark your favorite articles to read later
              </p>

              <motion.a
                href="/feed"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-primary text-white font-semibold hover:shadow-lg transition-all"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Explore News Feed
              </motion.a>
            </motion.div>
          ) : (
            <motion.div
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              {bookmarks.map((article, index) => (
                <motion.div
                  key={article.id}
                  className="relative"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: (index % 3) * 0.1 }}
                >
                  {/* Remove Button */}
                  <button
                    onClick={() => removeBookmark(article.id)}
                    className="absolute top-2 right-2 z-10 p-2 rounded-lg bg-white/90 dark:bg-black/90 hover:bg-destructive hover:text-white transition-colors"
                    aria-label="Remove bookmark"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>

                  <ArticleCard article={article} delay={0} />
                </motion.div>
              ))}
            </motion.div>
          )}
        </div>
      </section>
    </div>
  )
}
