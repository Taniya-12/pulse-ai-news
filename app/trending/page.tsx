'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import Navbar from '@/components/navbar'
import ArticleCard from '@/components/article-card'
import { TrendingUp, Flame } from 'lucide-react'
import Link from 'next/link'

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

export default function Trending() {
  const [articles, setArticles] = useState<Article[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const trendingTopics = [
    { label: 'Technology', query: 'technology', color: 'from-blue-500 to-blue-600' },
    { label: 'Business', query: 'business', color: 'from-green-500 to-green-600' },
    { label: 'Science', query: 'science', color: 'from-purple-500 to-purple-600' },
    { label: 'Health', query: 'health', color: 'from-red-500 to-red-600' },
    { label: 'Sports', query: 'sports', color: 'from-orange-500 to-orange-600' },
    { label: 'Entertainment', query: 'entertainment', color: 'from-pink-500 to-pink-600' },
    { label: 'Politics', query: 'politics', color: 'from-indigo-500 to-indigo-600' },
    { label: 'World', query: 'world', color: 'from-cyan-500 to-cyan-600' },
  ]

  useEffect(() => {
    const fetchTrendingArticles = async () => {
      try {
        setLoading(true)
        const response = await fetch('/api/news?q=trending&limit=12')
        const data = await response.json()
        setArticles(data.articles || [])
      } catch (err) {
        console.error('Failed to fetch trending articles:', err)
        setError('Failed to load trending articles.')
      } finally {
        setLoading(false)
      }
    }

    fetchTrendingArticles()
  }, [])

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4 },
    },
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero Section */}
      <motion.section
        className="relative overflow-hidden pt-24 md:pt-32 pb-16 md:pb-24 px-4 sm:px-6 lg:px-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        <div className="absolute inset-0 overflow-hidden pointer-events-none -z-10">
          <motion.div
            className="absolute top-20 right-10 w-96 h-96 bg-accent/15 rounded-full blur-3xl"
            animate={{ y: [0, 30, 0], x: [0, 20, 0] }}
            transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
          />
        </div>

        <div className="max-w-4xl mx-auto relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 border border-accent/30 backdrop-blur-sm mb-6">
              <Flame className="w-4 h-4 text-accent" />
              <span className="text-sm font-bold text-accent">What's Hot Right Now</span>
            </div>

            <h1 className="text-5xl md:text-6xl font-black mb-6 leading-tight">
              Trending
              <br />
              <span className="gradient-text">Topics & Stories</span>
            </h1>

            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Discover what everyone is talking about. Stay ahead of the curve with the hottest stories across all categories.
            </p>
          </motion.div>
        </div>
      </motion.section>

      {/* Topics Grid */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            className="mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <h2 className="text-2xl md:text-3xl font-bold mb-2">Explore Topics</h2>
            <p className="text-muted-foreground">Click on a topic to see trending stories in that category</p>
          </motion.div>

          <motion.div
            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {trendingTopics.map((topic, index) => (
              <motion.div
                key={topic.query}
                variants={itemVariants}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link
                  href={`/feed?search=${topic.query}`}
                  className={`block p-6 rounded-xl bg-gradient-to-br ${topic.color} text-white font-bold text-center hover:shadow-lg transition-all duration-300 transform`}
                >
                  <div className="flex items-center justify-center mb-2">
                    <Flame className="w-5 h-5" />
                  </div>
                  {topic.label}
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Trending Articles */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-secondary/5">
        <div className="max-w-7xl mx-auto">
          <motion.div
            className="mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <div className="flex items-center gap-2 mb-2">
              <TrendingUp className="w-6 h-6 text-primary" />
              <h2 className="text-2xl md:text-3xl font-bold">Most Popular Now</h2>
            </div>
            <p className="text-muted-foreground">
              The hottest stories that everyone is reading right now
            </p>
          </motion.div>

          {error ? (
            <motion.div
              className="text-center py-12"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <p className="text-lg text-destructive font-semibold">{error}</p>
            </motion.div>
          ) : loading ? (
            <motion.div
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              {[...Array(6)].map((_, i) => (
                <div key={i} className="rounded-xl bg-muted/50 h-80 animate-pulse" />
              ))}
            </motion.div>
          ) : (
            <motion.div
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              {articles.map((article, index) => (
                <ArticleCard
                  key={article.id}
                  article={article}
                  delay={index % 3}
                />
              ))}
            </motion.div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <motion.section
        className="py-16 px-4 sm:px-6 lg:px-8"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-black mb-4">Want More?</h2>
          <p className="text-lg text-muted-foreground mb-6">
            Explore the full news feed with advanced search and filtering options.
          </p>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Link
              href="/feed"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-lg bg-primary text-white font-bold hover:shadow-lg hover:shadow-primary/40 transition-all"
            >
              <TrendingUp className="w-5 h-5" />
              Go to News Feed
            </Link>
          </motion.div>
        </div>
      </motion.section>
    </div>
  )
}
