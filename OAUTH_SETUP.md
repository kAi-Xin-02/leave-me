# Google & GitHub OAuth Setup Guide for leave.me

Both Google and GitHub providers are **toggled ON** in Supabase, but they need OAuth credentials to work.

## Required Callback URL
For both providers, use this:
```
https://pbrbmjpsynpmshmysmzq.supabase.co/auth/v1/callback
```

---

## 🔵 Google OAuth Setup

### Step 1: Create OAuth Credentials
1. Go to [Google Cloud Console](https://console.cloud.google.com/apis/credentials)
2. Click **"Create Credentials"** → **"OAuth client ID"**
3. If prompted, configure **OAuth consent screen** first:
   - User Type: **External**
   - App name: `leave.me`
   - User support email: your email
   - Developer contact: your email
   - Save and Continue
4. Back to **Create OAuth client ID**:
   - Application type: **Web application**
   - Name: `leave.me`
   - **Authorized redirect URIs**: Add `https://pbrbmjpsynpmshmysmzq.supabase.co/auth/v1/callback`
   - Click **Create**
5. **Copy the Client ID and Client Secret**

### Step 2: Add to Supabase
1. Go to https://supabase.com/dashboard/project/pbrbmjpsynpmshmysmzq/auth/providers
2. Click **Google**
3. Toggle **"Enable Sign in with Google"** to ON (if not already)
4. Paste your **Client ID**
5. Paste your **Client Secret**
6. Click **Save**

---

## ⚫ GitHub OAuth Setup

### Step 1: Create OAuth App
1. Go to [GitHub Developer Settings](https://github.com/settings/developers)
2. Click **"New OAuth App"**
3. Fill in:
   - Application name: `leave.me`
   - Homepage URL: `http://localhost:3000` (or your deployed URL)
   - Authorization callback URL: `https://pbrbmjpsynpmshmysmzq.supabase.co/auth/v1/callback`
4. Click **Register application**
5. **Copy the Client ID**
6. Click **"Generate a new client secret"**
7. **Copy the Client Secret** (it won't be shown again!)

### Step 2: Add to Supabase
1. Go to https://supabase.com/dashboard/project/pbrbmjpsynpmshmysmzq/auth/providers
2. Click **GitHub**
3. Toggle **"GitHub enabled"** to ON (if not already)
4. Paste your **Client ID**
5. Paste your **Client Secret**
6. Click **Save**

---

## 🧪 Testing
Once both are configured:
1. Refresh http://localhost:3000
2. Click **"Login with Google"** or **"Login with GitHub"**
3. You should be redirected to the provider's login page
4. After login, you'll be redirected to `dashboard.html`

## ⚠️ Important Notes
- The providers are **toggled ON** in Supabase but won't work until you add credentials
- You can test with **Email/Password** login immediately
- For production deployment, update the callback URLs in both Google and GitHub consoles to your live domain
