# 🚀 Quick Setup Guide - Pulse AI News

Get your Pulse AI News app running in 3 minutes!

## Step 1: Get Your GNews API Key (1 min)

1. Go to [gnews.io](https://gnews.io)
2. Sign up for a **free account** (takes 1 minute)
3. Copy your API key from the dashboard
4. You're all set!

## Step 2: Configure Environment

1. Open the project folder
2. Create a file called `.env.local`
3. Add this line:
   ```
   GNEWS_API_KEY=your_api_key_here
   ```
4. Replace `your_api_key_here` with your actual key

## Step 3: Run the App

### Using shadcn CLI (Recommended)

```bash
npx shadcn-cli@latest init
# Select "Next.js - App Router"
# Then install the project
```

Or manually:

```bash
# Install dependencies
pnpm install

# Start development server
pnpm dev
```

## Step 4: Open in Browser

Visit **[http://localhost:3000](http://localhost:3000)** 🎉

---

## ✅ Verification Checklist

- [ ] .env.local file created
- [ ] GNews API key added
- [ ] Dev server running (`pnpm dev`)
- [ ] App loads at localhost:3000
- [ ] Articles are visible on home page
- [ ] Navigation links work

## 🎯 First Steps

1. **Explore the Home Page** - See featured and trending articles
2. **Try Search** - Go to `/feed` and search for topics
3. **Browse Categories** - Check `/categories` page
4. **Test Bookmarks** - Click bookmark icon on any article
5. **View Bookmarks** - Go to `/bookmarks` page

## 🔧 Troubleshooting

### Issue: "Articles not loading"
**Solution**: 
- Check `.env.local` exists
- Verify API key is correct
- Restart dev server (`pnpm dev`)

### Issue: "Module not found"
**Solution**:
- Run `pnpm install` again
- Delete `node_modules` and reinstall

### Issue: "Port 3000 in use"
**Solution**:
- Use different port: `pnpm dev -- -p 3001`

## 📚 Key Features

✨ **What You Can Do**:
- Read latest news from around the world
- Search by keywords or topics
- Browse 6 news categories
- Bookmark favorite articles
- Smooth animations and modern design

## 🚀 Deploy to Vercel

1. Push to GitHub
2. Visit [vercel.com](https://vercel.com)
3. Connect GitHub repo
4. Add `GNEWS_API_KEY` environment variable
5. Deploy! ✨

---

**Need help?** Check `README.md` for detailed documentation!
