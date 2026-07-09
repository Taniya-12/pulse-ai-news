'use client'

import { motion } from 'framer-motion'
import Navbar from '@/components/navbar'
import { Sparkles, Zap, TrendingUp, Users, Shield, Rocket } from 'lucide-react'
import Link from 'next/link'

export default function About() {
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
      transition: { duration: 0.5 },
    },
  }

  const features = [
    {
      icon: Sparkles,
      title: 'AI-Powered Curation',
      description: 'Intelligent algorithms select the most relevant news for you from thousands of sources daily.',
    },
    {
      icon: Zap,
      title: 'Real-Time Updates',
      description: 'Get breaking news instantly as stories develop around the world, 24/7.',
    },
    {
      icon: TrendingUp,
      title: 'Trending Analysis',
      description: 'Discover what\'s trending globally and understand the stories people are talking about.',
    },
    {
      icon: Users,
      title: 'Community Driven',
      description: 'Join millions of readers who trust Pulse for unbiased, comprehensive news coverage.',
    },
    {
      icon: Shield,
      title: 'Verified Sources',
      description: 'All articles come from trusted, verified news sources and publishers worldwide.',
    },
    {
      icon: Rocket,
      title: 'Fast Performance',
      description: 'Lightning-fast loading times and smooth navigation for the best reading experience.',
    },
  ]

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
            className="absolute top-20 right-10 w-96 h-96 bg-primary/15 rounded-full blur-3xl"
            animate={{ y: [0, 30, 0], x: [0, 20, 0] }}
            transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
          />
        </div>

        <div className="max-w-4xl mx-auto relative z-10">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <h1 className="text-5xl md:text-6xl font-black mb-6 leading-tight">
              About
              <br />
              <span className="gradient-text">Pulse AI News</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              A modern news platform designed to keep you informed with curated stories, real-time updates, and intelligent insights.
            </p>
          </motion.div>

          {/* Mission Statement */}
          <motion.div
            className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-2xl p-8 md:p-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <h2 className="text-3xl font-bold mb-6 text-foreground">Our Mission</h2>
            <p className="text-lg text-muted-foreground leading-relaxed mb-6">
              At Pulse, we believe everyone deserves access to quality news. Our mission is to leverage AI and advanced curation techniques to deliver the most relevant, timely, and trustworthy news stories to millions of readers worldwide.
            </p>
            <p className="text-lg text-muted-foreground leading-relaxed">
              We aggregate news from hundreds of verified sources, filter out noise, and present stories that matter in a beautiful, intuitive interface. Whether you're interested in breaking news, technology, business, or global events, Pulse has you covered.
            </p>
          </motion.div>
        </div>
      </motion.section>

      {/* Features Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-secondary/5">
        <div className="max-w-7xl mx-auto">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <h2 className="text-4xl font-black mb-4">Why Choose Pulse?</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Discover what makes Pulse the premier news platform for modern readers
            </p>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {features.map((feature, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{ y: -8, borderColor: 'rgb(16, 185, 129)' }}
                className="p-8 rounded-xl bg-card/50 border border-border/50 backdrop-blur-sm hover:bg-card/80 transition-all duration-300"
              >
                <feature.icon className="w-8 h-8 text-primary mb-4" />
                <h3 className="text-xl font-bold mb-3 text-foreground">{feature.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            className="grid grid-cols-2 md:grid-cols-4 gap-8"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {[
              { number: '500+', label: 'News Sources' },
              { number: '10M+', label: 'Articles' },
              { number: '2M+', label: 'Active Users' },
              { number: '24/7', label: 'Live Updates' },
            ].map((stat, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="text-center p-6 rounded-xl bg-card/50 border border-border/50"
              >
                <div className="text-4xl md:text-5xl font-black text-primary mb-2">
                  {stat.number}
                </div>
                <div className="text-muted-foreground font-medium">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <motion.section
        className="py-20 px-4 sm:px-6 lg:px-8"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
      >
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-black mb-6">Start Reading Today</h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Join millions of readers who use Pulse to stay informed about what matters most.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link
                href="/feed"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-lg bg-primary text-white font-bold hover:shadow-lg hover:shadow-primary/40 transition-all"
              >
                <TrendingUp className="w-5 h-5" />
                Explore News Feed
              </Link>
            </motion.div>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link
                href="/categories"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-lg bg-secondary/40 text-foreground font-bold hover:bg-secondary/60 transition-all border border-border/50"
              >
                <Sparkles className="w-5 h-5" />
                Browse Categories
              </Link>
            </motion.div>
          </div>
        </div>
      </motion.section>
    </div>
  )
}
