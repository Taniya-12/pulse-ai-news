'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowRight, Loader2 } from 'lucide-react'
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

interface CategoryData {
  name: string
  description: string
  icon: string
  articles: Article[]
  loading: boolean
}

const CATEGORIES = [
  {
    id: 'technology',
    name: 'Technology',
    description: 'Latest tech news and innovations',
    icon: '💻',
    color: 'from-blue-500 to-cyan-500',
  },
  {
    id: 'business',
    name: 'Business',
    description: 'Finance and corporate updates',
    icon: '📈',
    color: 'from-green-500 to-emerald-500',
  },
  {
    id: 'health',
    name: 'Health',
    description: 'Medical and wellness news',
    icon: '🏥',
    color: 'from-red-500 to-pink-500',
  },
  {
    id: 'science',
    name: 'Science',
    description: 'Scientific discoveries and research',
    icon: '🔬',
    color: 'from-purple-500 to-indigo-500',
  },
  {
    id: 'sports',
    name: 'Sports',
    description: 'Sports news and updates',
    icon: '⚽',
    color: 'from-orange-500 to-yellow-500',
  },
  {
    id: 'entertainment',
    name: 'Entertainment',
    description: 'Movies, music, and celebrity news',
    icon: '🎬',
    color: 'from-pink-500 to-rose-500',
  },
]

export default function CategoriesPage() {
  const [categoriesData, setCategoriesData] = useState<Record<string, CategoryData>>(
    Object.fromEntries(
      CATEGORIES.map((cat) => [
        cat.id,
        { name: cat.name, description: cat.description, icon: cat.icon, articles: [], loading: true },
      ])
    )
  )
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)

  useEffect(() => {
    // Fetch articles for each category
    const fetchCategoryArticles = async () => {
      for (const category of CATEGORIES) {
        try {
          const response = await fetch(`/api/news?q=${category.name}&category=${category.id}&limit=6`)
          const data = await response.json()

          setCategoriesData((prev) => ({
            ...prev,
            [category.id]: {
              ...prev[category.id],
              articles: data.articles || [],
              loading: false,
            },
          }))
        } catch (err) {
          console.error(`Failed to fetch ${category.name} articles:`, err)
          setCategoriesData((prev) => ({
            ...prev,
            [category.id]: {
              ...prev[category.id],
              loading: false,
            },
          }))
        }
      }
    }

    fetchCategoryArticles()
  }, [])

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

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.3 },
    },
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Header */}
      <motion.section
        className="bg-gradient-to-b from-primary/10 to-background pt-12 pb-8 px-4 sm:px-6 lg:px-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold mb-3">Browse Categories</h1>
          <p className="text-lg text-muted-foreground">
            Explore news organized by topic and find what interests you
          </p>
        </div>
      </motion.section>

      {/* Categories Grid */}
      <section className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {CATEGORIES.map((category) => (
              <motion.div
                key={category.id}
                variants={itemVariants}
                whileHover={{ y: -8 }}
                onClick={() => setSelectedCategory(selectedCategory === category.id ? null : category.id)}
                className="cursor-pointer"
              >
                <div className={`relative h-48 rounded-xl overflow-hidden bg-gradient-to-br ${category.color} p-6 text-white transition-all duration-300 hover:shadow-2xl hover:shadow-${category.color.split(' ')[1]}/50`}>
                  {/* Background Blur Elements */}
                  <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl" />
                    <div className="absolute bottom-0 left-0 w-32 h-32 bg-white/10 rounded-full blur-2xl" />
                  </div>

                  {/* Content */}
                  <div className="relative z-10 flex flex-col h-full justify-between">
                    <div>
                      <div className="text-4xl mb-3">{category.icon}</div>
                      <h3 className="text-2xl font-bold">{category.name}</h3>
                    </div>
                    <div className="flex items-center justify-between">
                      <p className="text-sm text-white/80">{category.description}</p>
                      <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Selected Category Articles */}
          {selectedCategory && (
            <motion.div
              className="mt-12"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="mb-8">
                <h2 className="text-3xl font-bold mb-2">
                  {CATEGORIES.find((c) => c.id === selectedCategory)?.name} News
                </h2>
                <p className="text-muted-foreground">
                  Latest articles in this category
                </p>
              </div>

              {categoriesData[selectedCategory]?.loading ? (
                <motion.div
                  className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  {[...Array(6)].map((_, i) => (
                    <div key={i} className="rounded-lg bg-muted h-64 animate-pulse" />
                  ))}
                </motion.div>
              ) : categoriesData[selectedCategory]?.articles.length === 0 ? (
                <motion.div
                  className="text-center py-12"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  <p className="text-muted-foreground mb-4">
                    No articles found in this category
                  </p>
                  <button
                    onClick={() => setSelectedCategory(null)}
                    className="px-4 py-2 rounded-lg bg-primary text-white font-semibold hover:shadow-lg transition-all"
                  >
                    Back to Categories
                  </button>
                </motion.div>
              ) : (
                <motion.div
                  className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                  variants={containerVariants}
                  initial="hidden"
                  animate="visible"
                >
                  {categoriesData[selectedCategory]?.articles.map((article, index) => (
                    <ArticleCard
                      key={article.id}
                      article={article}
                      delay={index % 3}
                    />
                  ))}
                </motion.div>
              )}
            </motion.div>
          )}
        </div>
      </section>
    </div>
  )
}
