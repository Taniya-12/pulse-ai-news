'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Search, Filter, X } from 'lucide-react'
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

const CATEGORIES = [
  { id: 'technology', label: 'Technology' },
  { id: 'business', label: 'Business' },
  { id: 'health', label: 'Health' },
  { id: 'science', label: 'Science' },
  { id: 'sports', label: 'Sports' },
  { id: 'entertainment', label: 'Entertainment' },
]

export default function FeedPage() {
  const [articles, setArticles] = useState<Article[]>([])
  const [loading, setLoading] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('general')
  const [showMobileFilter, setShowMobileFilter] = useState(false)

  const fetchArticles = async (query: string, category: string) => {
    try {
      setLoading(true)
      const params = new URLSearchParams()
      if (query) params.append('q', query)
      if (category && category !== 'general') params.append('category', category)
      params.append('limit', '20')

      const response = await fetch(`/api/news?${params.toString()}`)
      const data = await response.json()
      setArticles(data.articles || [])
    } catch (err) {
      console.error('Failed to fetch articles:', err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    // Initial fetch
    fetchArticles('latest', 'general')
  }, [])

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    fetchArticles(searchQuery || 'latest', selectedCategory)
  }

  const handleCategoryChange = (categoryId: string) => {
    setSelectedCategory(categoryId)
    fetchArticles(searchQuery, categoryId)
    setShowMobileFilter(false)
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
        <div className="max-w-7xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl md:text-4xl font-bold mb-2">News Feed</h1>
            <p className="text-muted-foreground">
              Explore thousands of articles from around the world
            </p>
          </div>

          {/* Search Bar */}
          <form onSubmit={handleSearch} className="mb-6">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search news..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 rounded-lg bg-card border border-border focus:border-primary outline-none transition-colors"
              />
              <button
                type="submit"
                className="absolute right-2 top-1/2 -translate-y-1/2 px-4 py-2 rounded-lg bg-primary text-white font-semibold hover:shadow-lg transition-all"
              >
                Search
              </button>
            </div>
          </form>

          {/* Categories */}
          <div>
            {/* Desktop Categories */}
            <div className="hidden md:flex gap-2 overflow-x-auto pb-2">
              {CATEGORIES.map((category) => (
                <motion.button
                  key={category.id}
                  onClick={() => handleCategoryChange(category.id)}
                  className={`px-4 py-2 rounded-full font-semibold whitespace-nowrap transition-all ${
                    selectedCategory === category.id
                      ? 'bg-primary text-white'
                      : 'bg-muted text-foreground hover:bg-muted/80'
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {category.label}
                </motion.button>
              ))}
            </div>

            {/* Mobile Categories */}
            <div className="md:hidden">
              <button
                onClick={() => setShowMobileFilter(!showMobileFilter)}
                className="flex items-center gap-2 px-4 py-2 rounded-lg bg-muted text-foreground font-semibold"
              >
                <Filter className="w-4 h-4" />
                {CATEGORIES.find((c) => c.id === selectedCategory)?.label || 'Filter'}
              </button>

              {showMobileFilter && (
                <motion.div
                  className="mt-2 space-y-2"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  {CATEGORIES.map((category) => (
                    <button
                      key={category.id}
                      onClick={() => handleCategoryChange(category.id)}
                      className={`w-full px-4 py-2 rounded-lg font-semibold text-left transition-all ${
                        selectedCategory === category.id
                          ? 'bg-primary text-white'
                          : 'bg-muted text-foreground hover:bg-muted/80'
                      }`}
                    >
                      {category.label}
                    </button>
                  ))}
                </motion.div>
              )}
            </div>
          </div>
        </div>
      </motion.section>

      {/* Articles Grid */}
      <section className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {loading ? (
            <motion.div
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              {[...Array(9)].map((_, i) => (
                <div key={i} className="rounded-lg bg-muted h-64 animate-pulse" />
              ))}
            </motion.div>
          ) : articles.length === 0 ? (
            <motion.div
              className="text-center py-16"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <p className="text-lg text-muted-foreground font-semibold mb-2">
                No articles found
              </p>
              <p className="text-muted-foreground">
                Try adjusting your search or selecting a different category
              </p>
            </motion.div>
          ) : (
            <motion.div
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
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
    </div>
  )
}
