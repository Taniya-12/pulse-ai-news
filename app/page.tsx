'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Sparkles, TrendingUp, Clock, Zap, ArrowRight } from 'lucide-react'
import Navbar from '@/components/navbar'
import FeaturedArticle from '@/components/featured-article'
import ArticleCard from '@/components/article-card'
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

export default function Home() {
  const [featuredArticles, setFeaturedArticles] = useState<Article[]>([])
  const [trendingArticles, setTrendingArticles] = useState<Article[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        setLoading(true)
        const [featuredRes, trendingRes] = await Promise.all([
          fetch('/api/news?q=breaking&limit=5'),
          fetch('/api/news?q=trending&limit=8'),
        ])

        const featuredData = await featuredRes.json()
        const trendingData = await trendingRes.json()

        setFeaturedArticles(featuredData.articles || [])
        setTrendingArticles(trendingData.articles || [])
      } catch (err) {
        console.error('Failed to fetch articles:', err)
        setError('Failed to load articles. Please make sure GNEWS_API_KEY is set.')
      } finally {
        setLoading(false)
      }
    }

    fetchArticles()
  }, [])

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.3,
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
        className="relative overflow-hidden pt-24 md:pt-32 pb-16 md:pb-24"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        {/* Animated Background Blobs */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none -z-10">
          <motion.div
            className="absolute top-20 right-10 w-96 h-96 bg-primary/15 rounded-full blur-3xl"
            animate={{
              y: [0, 30, 0],
              x: [0, 20, 0],
            }}
            transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
          />
          <motion.div
            className="absolute -bottom-20 -left-20 w-96 h-96 bg-accent/15 rounded-full blur-3xl"
            animate={{
              y: [0, -30, 0],
              x: [0, -20, 0],
            }}
            transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
          />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            className="text-center mb-12 md:mb-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
          >
            {/* Badge */}
            <div className="flex justify-center mb-8">
              <motion.div
                className="flex items-center gap-2 px-4 py-2.5 rounded-full bg-primary/10 border border-primary/30 backdrop-blur-sm"
                whileHover={{ scale: 1.08, borderColor: 'rgb(16, 185, 129)' }}
                whileTap={{ scale: 0.95 }}
              >
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
                >
                  <Sparkles className="w-4 h-4 text-primary" />
                </motion.div>
                <span className="text-sm font-bold text-primary">
                  AI-Powered News Platform
                </span>
              </motion.div>
            </div>

            {/* Main Headline */}
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-black mb-6 leading-tight tracking-tight">
              Your Premium
              <br />
              <span className="gradient-text inline-block">News Companion</span>
            </h1>

            {/* Subheading */}
            <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto mb-10 leading-relaxed">
              Stay informed with curated stories, real-time updates, and intelligent news summaries. 
              Pulse brings you the stories that matter most.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-4">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: 'spring', stiffness: 400, damping: 10 }}
              >
                <Link
                  href="/feed"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-lg bg-primary text-primary-foreground font-bold text-lg hover:shadow-2xl hover:shadow-primary/40 transition-all duration-300"
                >
                  <TrendingUp className="w-5 h-5" />
                  Explore News Feed
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: 'spring', stiffness: 400, damping: 10 }}
              >
                <Link
                  href="/categories"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-lg bg-secondary/40 text-foreground font-bold text-lg hover:bg-secondary/60 transition-all duration-300 border border-border/50 hover:border-primary/50"
                >
                  <Zap className="w-5 h-5" />
                  Browse Categories
                </Link>
              </motion.div>
            </div>
          </motion.div>

          {/* Feature Cards */}
          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-16"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {[
              {
                icon: TrendingUp,
                title: 'Real-Time Updates',
                description: 'Get the latest breaking stories as they unfold worldwide',
              },
              {
                icon: Zap,
                title: 'Smart Filtering',
                description: 'Find exactly what interests you with powerful search',
              },
              {
                icon: Sparkles,
                title: 'Curated Stories',
                description: 'Handpicked articles from trusted sources daily',
              },
            ].map((feature, index) => (
              <motion.div
                key={feature.title}
                variants={itemVariants}
                whileHover={{ y: -8, borderColor: 'rgb(16, 185, 129)' }}
                className="p-6 rounded-xl bg-card/50 border border-border/50 backdrop-blur-sm hover:bg-card/80 transition-all duration-300"
              >
                <motion.div
                  whileHover={{ scale: 1.1, rotate: 10 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 10 }}
                >
                  <feature.icon className="w-7 h-7 text-primary mb-3" />
                </motion.div>
                <h3 className="font-bold text-lg mb-2 text-foreground">{feature.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{feature.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.section>

      {/* Main Content */}
      <section className="py-16 md:py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {error ? (
            <motion.div
              className="text-center py-12"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <p className="text-lg text-destructive font-semibold mb-4">{error}</p>
              <p className="text-muted-foreground mb-6">
                Please set your GNEWS_API_KEY environment variable to get started.
              </p>
              <a
                href="https://gnews.io"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-primary text-white font-bold hover:shadow-lg hover:shadow-primary/40 transition-all"
              >
                Get Free API Key
                <ArrowRight className="w-4 h-4" />
              </a>
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
            <>
              {/* Featured Articles */}
              {featuredArticles.length > 0 && (
                <motion.div
                  className="mb-20"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3, duration: 0.8 }}
                >
                  <motion.div
                    className="mb-8"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 }}
                  >
                    <h2 className="text-3xl md:text-4xl font-black mb-3 text-foreground">Featured Stories</h2>
                    <p className="text-muted-foreground text-lg">Breaking news and top stories handpicked for you</p>
                  </motion.div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {featuredArticles.slice(0, 2).map((article) => (
                      <FeaturedArticle key={article.id} article={article} />
                    ))}
                  </div>
                </motion.div>
              )}

              {/* Trending Articles */}
              {trendingArticles.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4, duration: 0.8 }}
                >
                  <motion.div
                    className="mb-8"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4 }}
                  >
                    <h2 className="text-3xl md:text-4xl font-black mb-3 text-foreground">Trending Now</h2>
                    <p className="text-muted-foreground text-lg">
                      What millions of readers are discovering right now
                    </p>
                  </motion.div>

                  <motion.div
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                  >
                    {trendingArticles.map((article, index) => (
                      <ArticleCard
                        key={article.id}
                        article={article}
                        delay={index % 4}
                      />
                    ))}
                  </motion.div>
                </motion.div>
              )}

              {/* CTA Section */}
              <motion.section
                className="mt-20 p-8 md:p-16 rounded-2xl bg-gradient-to-r from-primary/80 to-accent/80 text-white text-center overflow-hidden relative"
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.8 }}
              >
                {/* Background Elements */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                  <motion.div
                    className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl"
                    animate={{
                      scale: [1, 1.2, 1],
                    }}
                    transition={{ duration: 4, repeat: Infinity }}
                  />
                </div>

                <div className="relative z-10">
                  <h3 className="text-3xl md:text-4xl font-black mb-4">
                    Discover More Stories
                  </h3>
                  <p className="text-white/90 text-lg mb-8 max-w-xl mx-auto">
                    Explore our full collection of news articles across all categories and find stories that matter to you.
                  </p>
                  <motion.div
                    whileHover={{ scale: 1.08 }}
                    whileTap={{ scale: 0.95 }}
                    transition={{ type: 'spring', stiffness: 400, damping: 10 }}
                  >
                    <Link
                      href="/feed"
                      className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-lg bg-white text-primary font-bold text-lg hover:shadow-2xl transition-all duration-300"
                    >
                      <TrendingUp className="w-5 h-5" />
                      View All Articles
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </motion.div>
                </div>
              </motion.section>
            </>
          )}
        </div>
      </section>
    </div>
  )
}
