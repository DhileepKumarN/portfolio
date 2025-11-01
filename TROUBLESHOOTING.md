# Troubleshooting Image Loading Issues on GitHub Pages

If your profile image is not loading on GitHub Pages, check the following:

## Common Issues and Solutions

### 1. File Not Committed to Git
Make sure the image file is committed and pushed:
```bash
git add images/profile.jpeg
git commit -m "Add profile image"
git push origin main
```

### 2. File Extension Case Sensitivity
GitHub Pages is case-sensitive. Ensure the extension matches exactly:
- ✅ `profile.jpeg` 
- ❌ `profile.JPEG` or `profile.Jpeg`

### 3. File Path Issues
The image should be in the `images/` folder at the root of your repository:
```
portfolio/
├── images/
│   └── profile.jpeg  ← Image should be here
├── index.html
├── styles.css
└── script.js
```

### 4. Verify File Exists on GitHub
1. Go to your repository: https://github.com/DhileepKumarN/portfolio
2. Check if `images/profile.jpeg` exists in the file list
3. Click on it to verify it uploaded correctly

### 5. Check Browser Console
1. Open your live site: https://dhileepkumarn.github.io/portfolio/
2. Press F12 to open Developer Tools
3. Go to the Console tab
4. Look for any 404 errors related to the image
5. Check the Network tab to see if the image request failed

### 6. Force Refresh GitHub Pages
After pushing changes:
- GitHub Pages can take a few minutes to update
- Try hard refresh: Ctrl+F5 (Windows) or Cmd+Shift+R (Mac)
- Clear browser cache

### 7. Alternative: Use Absolute Path
If relative paths don't work, you can use an absolute path from GitHub:
Replace in `index.html`:
```html
<!-- Instead of: -->
<img src="./images/profile.jpeg" ...>

<!-- Use: -->
<img src="https://raw.githubusercontent.com/DhileepKumarN/portfolio/main/images/profile.jpeg" ...>
```

### 8. Check File Size
- Ensure the image file is not too large (recommended < 1MB)
- Compress if needed using tools like TinyPNG

### 9. Verify .gitignore
Make sure `images/` folder is NOT in `.gitignore`:
```bash
# Check .gitignore file
cat .gitignore
# Should NOT contain: images/ or *.jpeg
```

## Quick Fix Commands

```bash
# Check if file exists locally
ls -la images/profile.jpeg

# Verify file is tracked by git
git ls-files | grep profile

# If not tracked, add it
git add images/profile.jpeg
git commit -m "Add profile image"
git push origin main
```

## Still Not Working?

1. Verify the exact file name on your local machine:
   ```bash
   cd /Users/dhileep.kumarn/portfolio-website
   ls -la images/
   ```

2. Make sure the file name in HTML matches exactly (case-sensitive)

3. Try renaming to a simple name without spaces or special characters

4. Check GitHub repository directly: https://github.com/DhileepKumarN/portfolio/tree/main/images

