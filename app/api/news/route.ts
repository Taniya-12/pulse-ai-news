import axios from 'axios'
import { NextRequest, NextResponse } from 'next/server'

const GNEWS_API_KEY = process.env.GNEWS_API_KEY || 'demo'
const GNEWS_API_URL = 'https://gnews.io/api/v4'

// Cache for articles (simple in-memory cache, expires after 5 minutes)
const cache = new Map<string, { data: any; timestamp: number }>()
const CACHE_DURATION = 5 * 60 * 1000 // 5 minutes

function getCacheKey(query: string, category?: string, lang?: string): string {
  return `${query}_${category || 'general'}_${lang || 'en'}`
}

function getFromCache(key: string): any | null {
  const cached = cache.get(key)
  if (cached && Date.now() - cached.timestamp < CACHE_DURATION) {
    return cached.data
  }
  cache.delete(key)
  return null
}

function setCache(key: string, data: any): void {
  cache.set(key, { data, timestamp: Date.now() })
}

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const q = searchParams.get('q') || 'latest news'
    const category = searchParams.get('category')
    const lang = searchParams.get('lang') || 'en'
    const page = parseInt(searchParams.get('page') || '1')
    const limit = Math.min(parseInt(searchParams.get('limit') || '10'), 100)

    // Check cache
    const cacheKey = getCacheKey(q, category, lang)
    const cachedData = getFromCache(cacheKey)
    if (cachedData) {
      return NextResponse.json(cachedData)
    }

    // Build query
    let query = q
    if (category && category !== 'general') {
      query = `${q} ${category}`
    }

    // Fetch from GNews API
    const response = await axios.get(`${GNEWS_API_URL}/search`, {
      params: {
        q: query,
        lang: lang,
        max: limit,
        sortby: 'publishedAt',
        token: GNEWS_API_KEY,
      },
      timeout: 5000,
    })

    const articles = response.data.articles || []

    // Format response
    const formattedArticles = articles.map((article: any) => ({
      id: article.url,
      title: article.title,
      description: article.description,
      content: article.content,
      image: article.image,
      url: article.url,
      source: article.source?.name || 'Unknown',
      publishedAt: article.publishedAt,
      category: category || 'general',
    }))

    const result = {
      articles: formattedArticles,
      totalArticles: response.data.totalArticles || formattedArticles.length,
    }

    // Cache the result
    setCache(cacheKey, result)

    return NextResponse.json(result)
  } catch (error) {
    console.error('News API error:', error)

    // Return mock data for demo/error fallback
    return NextResponse.json(
      {
        articles: [],
        totalArticles: 0,
        error: 'Failed to fetch news. Please check your API key.',
      },
      { status: error instanceof axios.AxiosError ? error.response?.status || 500 : 500 }
    )
  }
}
