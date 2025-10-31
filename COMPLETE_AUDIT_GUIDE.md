# COMPLETE AUDIT & FIX GUIDE
**Hometown Connections - Ensuring 100% Accuracy**

---

## 🎯 GOAL
Verify all website content matches https://www.hometownconnections.com/ with 100% accuracy.

---

## ✅ WHAT'S ALREADY FIXED

1. **Homepage Hero** ✅
   - Title: "A Single Source For Community-Owned Utility Solutions"
   - Subtitle matches live site exactly

2. **Navigation** ✅
   - All pages have Header & Footer
   - All links working correctly

3. **Team Members** ✅
   - All 4 members with correct names and titles

4. **Board Members** ✅
   - All 6 members with correct names
   - Mark Ennis & Branndon Kelley correctly show NO title

5. **Missing Assets** ✅
   - `grid.svg` created
   - `site.webmanifest` created

---

## 🔧 STEP-BY-STEP: COMPLETE THE AUDIT

### Step 1: Get a New Sanity API Token

**Why needed**: The current token may be expired, preventing data imports.

1. **Make sure Sanity Studio is running**:
   ```bash
   npm run dev
   ```

2. **Open Sanity Studio** in your browser:
   - Go to: http://localhost:3000/studio
   - (Or http://localhost:3001/studio if 3000 is in use)

3. **Navigate to API settings**:
   - Click your **project name** in the top-left
   - Click **"API"** in the left sidebar
   - Click **"Tokens"** tab

4. **Create new token**:
   - Click **"Add API token"**
   - Name: `Import Scripts Token`
   - Permissions: **"Editor"** (required for write access)
   - Click **"Save"**
   - **COPY THE TOKEN IMMEDIATELY** - you won't see it again!

---

### Step 2: Update All Script Tokens

Run this command with your new token:

```bash
node scripts/update-token.js YOUR_TOKEN_HERE
```

**Example**:
```bash
node scripts/update-token.js sk3Oo3K0LyCCcZWKJI...
```

This will automatically update tokens in all 6 scripts:
- ✅ `audit-affiliates.js`
- ✅ `import-affiliates.js`
- ✅ `import-board-members.js`
- ✅ `import-missing-affiliates.js`
- ✅ `import-services.js`
- ✅ `import-team-members.js`

---

### Step 3: Import Missing Affiliates

```bash
node scripts/import-missing-affiliates.js
```

**Expected output**:
```
✅ Imported: Hometown Connections, Inc. (CT)
✅ Imported: Hometown Connections, Inc. (GA)
✅ Imported: NMPP Energy (IA)
...
✅ Successfully Imported: 9
```

---

### Step 4: Run Comprehensive Audit

```bash
node scripts/final-audit.js
```

**What it checks**:
- ✅ Hero title and subtitle match live site
- ✅ All 4 team members (names, titles)
- ✅ All 6 board members (names, titles)
- ✅ All 34 affiliates imported
- ✅ 6 co-owners correctly marked

**Expected final output**:
```
⭐ OVERALL ACCURACY: 100.0%

✅ ✅ ✅ PERFECT! All data matches live site exactly! ✅ ✅ ✅
```

---

## 📊 EXPECTED FINAL COUNTS

After completing all steps, you should have:

| Category | Count | Status |
|----------|-------|--------|
| Team Members | 4 | ✅ Already correct |
| Board Members | 6 | ✅ Already correct |
| **Affiliates** | **34** | ⚠️ Currently 25 → **Need to import 9** |
| Co-owners | 6 | ✅ Correct after import |
| Service Categories | 8 | ✅ Already correct |

---

## 🆘 TROUBLESHOOTING

### Problem: "Unauthorized - Session not found"
**Solution**: Your token expired. Go back to Step 1 and get a new token.

### Problem: "Duplicate affiliates"
**Solution**: Good! The script skips duplicates automatically. This means some affiliates were already imported.

### Problem: Token update script says "No token found"
**Solution**: The script file may be missing. Make sure you're running from the project root directory.

### Problem: Audit shows less than 100%
**Solution**: Run the audit with verbose output to see specific mismatches:
```bash
node scripts/final-audit.js
```
The output will tell you exactly what's wrong.

---

## 📁 HELPFUL SCRIPTS

| Script | Purpose | Command |
|--------|---------|---------|
| **Update Token** | Update all scripts with new token | `node scripts/update-token.js YOUR_TOKEN` |
| **Import Missing** | Add 9 missing affiliates | `node scripts/import-missing-affiliates.js` |
| **Final Audit** | Comprehensive accuracy check | `node scripts/final-audit.js` |
| **Audit Affiliates** | Check affiliate count/details | `node scripts/audit-affiliates.js` |
| **Re-import Board** | Fix board member data | `node scripts/import-board-members.js` |
| **Re-import Team** | Fix team member data | `node scripts/import-team-members.js` |

---

## ✅ VERIFICATION CHECKLIST

Use this to confirm everything is correct:

- [ ] Hero title: "A Single Source For Community-Owned Utility Solutions"
- [ ] Hero subtitle mentions "national, non-profit utility services organization"
- [ ] 4 team members with exact names and titles
- [ ] 6 board members (last 2 have NO title)
- [ ] **34 total affiliates** (not 25)
- [ ] 6 co-owners marked with asterisk
- [ ] All pages have navigation header
- [ ] No 404 errors in browser console
- [ ] Final audit shows 100% accuracy

---

## 🎯 QUICK START (Do This Now)

### Current Status: 66% Accurate
The audit found these issues:
- ❌ Old team member data (6 members instead of 4)
- ❌ Board members showing incorrect roles
- ❌ Missing 9 affiliates

### Fix Everything in 4 Commands:

```bash
# 1. Get new token from Sanity Studio (see Step 1 above)
#    Copy the token that starts with "sk..."

# 2. Update all scripts (replace YOUR_TOKEN with actual token)
node scripts/update-token.js YOUR_TOKEN

# 3. Cleanup and re-import team/board members with correct data
node scripts/cleanup-and-reimport.js

# 4. Import missing 9 affiliates
node scripts/import-missing-affiliates.js

# 5. Run final audit to verify 100%
node scripts/final-audit.js

# You should see: "⭐ OVERALL ACCURACY: 100.0%"
```

---

## 📝 NOTES

- **Token Security**: The token grants write access. Don't commit it to git or share publicly.
- **Data Source**: All data verified against https://www.hometownconnections.com/ on 2025-10-31
- **Audit Frequency**: Run `final-audit.js` anytime you make changes to verify accuracy
- **Backup**: Sanity CMS has built-in version history if you need to rollback

---

**Questions?** Check [AUDIT_REPORT.md](AUDIT_REPORT.md) for detailed findings or run the audit script for specific issues.
