# 🚀 GitHub Pages Deployment Guide

This guide will help you publish the LJL project on GitHub Pages for **free hosting**.

---

## 📋 Prerequisites

1. **GitHub Account** - Create one at [github.com](https://github.com) (free)
2. **Git Installed** - Download from [git-scm.com](https://git-scm.com/downloads)

To check if Git is installed:

```powershell
git --version
```

---

## 🎯 Step-by-Step Deployment

### Step 1: Initialize Git Repository

Open PowerShell in your project folder:

```powershell
# Navigate to project directory
cd "g:\Docs\Coding\LearnJapaneseLanguage - LJL"

# Initialize Git repository
git init

# Add all files
git add .

# Create first commit
git commit -m "v0.8 - Initial release with GitHub Pages support"
```

---

### Step 2: Create GitHub Repository

1. **Go to GitHub**: Visit [github.com](https://github.com) and log in
2. **Click "+" icon** (top right) → "New repository"
3. **Repository name**: `LJL` (or any name you prefer)
4. **Description**: "Interactive Japanese Hiragana & Katakana Learning Web App"
5. **Visibility**:
   - ✅ **Public** (required for free GitHub Pages)
   - ❌ Private (requires GitHub Pro for Pages)
6. **DO NOT** check "Initialize with README" (we already have one)
7. **Click "Create repository"**

---

### Step 3: Connect Local Repository to GitHub

GitHub will show you commands - use these:

```powershell
# Add remote repository (replace YOUR_USERNAME with your GitHub username)
git remote add origin https://github.com/YOUR_USERNAME/LJL.git

# Rename branch to main (if needed)
git branch -M main

# Push code to GitHub
git push -u origin main
```

**Note**: You may need to authenticate with GitHub:

- Enter your GitHub username
- For password, use a [Personal Access Token](https://github.com/settings/tokens) (not your account password)

---

### Step 4: Enable GitHub Pages

1. **Go to your repository** on GitHub
2. **Click "Settings"** tab
3. **Click "Pages"** in left sidebar
4. **Under "Source"**:
   - Branch: `main`
   - Folder: `/ (root)`
5. **Click "Save"**

GitHub will show a message:

> "Your site is ready to be published at `https://YOUR_USERNAME.github.io/LJL/`"

**Wait 1-2 minutes** for deployment to complete.

---

### Step 5: Visit Your Live Site! 🎉

Your app is now live at:

```
https://YOUR_USERNAME.github.io/LJL/
```

**Share this URL** with anyone - works on all devices!

---

## 🔄 Updating Your Site

Whenever you make changes to the code:

```powershell
# 1. Add changes
git add .

# 2. Commit with descriptive message
git commit -m "Description of changes"

# 3. Push to GitHub
git push

# GitHub Pages will automatically rebuild (1-2 minutes)
```

---

## 🌐 Custom Domain (Optional)

Want a custom domain like `learnjapanese.com` instead of `username.github.io/LJL`?

### Cost: ~$10-15/year

1. **Buy domain** from:

   - [Namecheap](https://www.namecheap.com) (recommended)
   - [Google Domains](https://domains.google)
   - [GoDaddy](https://www.godaddy.com)

2. **In GitHub repository Settings → Pages**:

   - Enter your domain in "Custom domain"
   - Click "Save"

3. **In your domain registrar's DNS settings**, add:

   ```
   Type: CNAME
   Host: www
   Value: YOUR_USERNAME.github.io
   ```

4. **Wait 24-48 hours** for DNS propagation

---

## ✅ Verification Checklist

After deployment, check:

- [ ] Site loads at `https://YOUR_USERNAME.github.io/LJL/`
- [ ] All modes work (Romaji, Draw, Romaji to Kana)
- [ ] Both alphabets work (Hiragana, Katakana)
- [ ] Settings modal opens and saves
- [ ] Statistics track correctly
- [ ] Google AI recognition works
- [ ] Mobile/tablet responsive design works
- [ ] Theme switcher works

---

## 🐛 Troubleshooting

### Issue: "404 - Page not found"

**Solution**:

- Check GitHub Pages is enabled in Settings
- Wait 2-3 minutes after first deployment
- Ensure branch is set to `main` and folder is `/ (root)`

### Issue: "Styles not loading"

**Solution**:

- Check file paths in `index.html` are relative (not absolute)
- Verify all files were committed: `git status`

### Issue: "Google API not working"

**Solution**:

- This is expected - Google Handwriting API works on any domain
- If issues persist, check browser console for errors

### Issue: "Git authentication failed"

**Solution**:

- Create Personal Access Token: [github.com/settings/tokens](https://github.com/settings/tokens)
- Use token instead of password when pushing

---

## 📊 GitHub Pages Features (Free Tier)

✅ **Included:**

- Unlimited bandwidth
- SSL certificate (HTTPS)
- Automatic deployments
- CDN hosting
- Custom domain support
- 1GB storage limit
- 100GB bandwidth/month (soft limit)

❌ **Limitations:**

- Must be public repository
- Static sites only (no server-side code)
- 10 builds per hour limit

---

## 🔒 Security Notes

- ✅ Code is visible (this is normal for web apps)
- ✅ MIT License protects your copyright
- ✅ HTTPS enabled automatically
- ⚠️ Don't commit API keys (your project doesn't have any)
- ⚠️ Don't commit sensitive data

---

## 📈 Next Steps

After deployment:

1. **Share your site** on social media
2. **Add to your portfolio/resume**
3. **Get feedback** from users
4. **Continue development** with confidence
5. **Track visitors** with [Google Analytics](https://analytics.google.com) (optional)

---

## 💡 Tips

- **Custom 404 page**: Create `404.html` in root for custom error page
- **Add favicon**: Add `favicon.ico` or `favicon.png` to root
- **Analytics**: Add Google Analytics to track visitors
- **SEO**: Already optimized with meta tags!

---

## 📞 Need Help?

- **GitHub Pages Docs**: [docs.github.com/pages](https://docs.github.com/pages)
- **Git Tutorial**: [git-scm.com/docs](https://git-scm.com/docs)
- **Community**: GitHub Discussions in your repo

---

**Congratulations! Your site is live! 🎉**

Now anyone can learn Japanese Hiragana & Katakana with your app!
