# 🔑 GitHub Personal Access Token - Setup Guide

## What to Fill:

### 1. Note Field
**Enter:** `Veda Verse Deployment` (or any descriptive name)

This is just a label to remember what this token is for.

---

### 2. Expiration
**Select:** `90 days` or `No expiration` (your choice)

- **90 days** = Token expires in 3 months (more secure)
- **No expiration** = Token never expires (more convenient)

**Recommendation:** Start with `90 days` - you can always create a new token later.

---

### 3. Select Scopes (Checkboxes)

**You ONLY need to check this ONE checkbox:**

✅ **`repo`** - "Full control of private repositories"

**That's it!** Just check the `repo` checkbox. This gives you permission to:
- Push code to your repository
- Pull code from your repository
- Manage repository settings
- Everything you need to deploy!

**You DON'T need to check:**
- ❌ repo:status
- ❌ repo_deployment
- ❌ public_repo
- ❌ Any other checkboxes

Just the main **`repo`** checkbox is enough!

---

## Steps:

1. ✅ Fill in "Note": `Veda Verse Deployment`
2. ✅ Choose expiration: `90 days` (recommended)
3. ✅ Check **ONLY** the `repo` checkbox
4. ✅ Scroll down and click **"Generate token"**
5. ✅ **COPY THE TOKEN IMMEDIATELY!** It starts with `ghp_...`
6. ✅ Save it somewhere safe (you won't see it again!)

---

## After Creating Token:

Use this token as your "password" when pushing:

```powershell
git push -u origin main
```

- Username: `hopessugar`
- Password: Paste your token (the `ghp_...` code)

---

**That's it!** Just check `repo` and you're good to go! 🚀

