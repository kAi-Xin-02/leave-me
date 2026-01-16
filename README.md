# leave.me

A sleek, minimalist profile page where you can share your social identity with the world. Think of it as your personal corner of the internet — beautiful, functional, and entirely yours.

## What is this?

leave.me lets you create a stunning one-page profile with:

- **Your bio & avatar** — Who you are in a nutshell
- **Social links** — Connect all your platforms in one place
- **Custom backgrounds** — Images, GIFs, or videos
- **Background music** — Set the vibe for visitors
- **Anonymous messages** — Let people leave you notes
- **View counter** — See how many people checked you out

It's basically a link-in-bio page, but way cooler.

## Tech Stack

- **Frontend**: HTML, CSS, JavaScript (no frameworks needed)
- **Backend**: Supabase (Auth, Database, Storage)
- **Effects**: GSAP for smooth animations
- **Hosting**: GitHub Pages (free!)

## Getting Started

### 1. Clone this repo

```bash
git clone https://github.com/kAi-Xin-02/leave-me.git
cd leave-me
```

### 2. Set up Supabase

1. Create a free account at [supabase.com](https://supabase.com)
2. Create a new project
3. Go to **Project Settings > API**
4. Copy your **Project URL** and **anon public key**

### 3. Configure your credentials

```bash
cp js/config.example.js js/config.local.js
```

Edit `js/config.local.js` with your actual credentials:

```javascript
const CONFIG = {
    SUPABASE_URL: 'https://your-project-id.supabase.co',
    SUPABASE_ANON_KEY: 'your-anon-key-here'
};
window.APP_CONFIG = CONFIG;
```

### 4. Set up the database

Run these SQL commands in your Supabase SQL Editor:

```sql
CREATE TABLE profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id),
    username TEXT UNIQUE NOT NULL,
    display_name TEXT,
    email TEXT,
    bio TEXT,
    avatar_url TEXT,
    background_url TEXT,
    background_type TEXT DEFAULT 'image',
    music_url TEXT,
    music_start_time FLOAT DEFAULT 0,
    music_end_time FLOAT DEFAULT 0,
    theme JSONB DEFAULT '{"blur": 80, "opacity": 0.7, "accent": "#ffffff"}',
    social_links JSONB DEFAULT '[]',
    views INTEGER DEFAULT 0,
    created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE messages (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    to_user_id UUID REFERENCES profiles(id),
    from_user_id UUID,
    from_name TEXT,
    from_avatar TEXT,
    message TEXT NOT NULL,
    read BOOLEAN DEFAULT false,
    created_at TIMESTAMP DEFAULT NOW()
);

ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE messages ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public profiles" ON profiles FOR SELECT USING (true);
CREATE POLICY "Users can update own profile" ON profiles FOR UPDATE USING (auth.uid() = id);
CREATE POLICY "Anyone can send messages" ON messages FOR INSERT WITH CHECK (true);
CREATE POLICY "Users can read their messages" ON messages FOR SELECT USING (auth.uid() = to_user_id);
CREATE POLICY "Users can delete their messages" ON messages FOR DELETE USING (auth.uid() = to_user_id);
CREATE POLICY "Users can update their messages" ON messages FOR UPDATE USING (auth.uid() = to_user_id);
```

### 5. Enable OAuth (Optional)

To enable Google/GitHub login:

1. Go to **Supabase Dashboard > Authentication > Providers**
2. Enable **Google** and/or **GitHub**
3. Add your OAuth credentials
4. Set redirect URL to your Supabase callback URL

### 6. Create storage bucket

1. Go to **Supabase Dashboard > Storage**
2. Create a bucket named `public`
3. Make it public (enable "Public bucket")

### 7. Run locally

```bash
npx serve
```

Open [http://localhost:3000](http://localhost:3000)

## File Structure

```
leave-me/
├── index.html          # Landing/login page
├── dashboard.html      # User dashboard
├── u/
│   └── index.html      # Profile page (/u/username)
├── css/
│   ├── main.css        # Global styles
│   ├── landing.css     # Landing page styles
│   ├── dashboard.css   # Dashboard styles
│   └── profile.css     # Profile page styles
├── js/
│   ├── config.example.js   # Config template (commit this)
│   ├── config.local.js     # Your credentials (DO NOT commit)
│   ├── supabase-config.js  # Supabase client
│   ├── landing.js          # Login/signup logic
│   ├── dashboard.js        # Dashboard functionality
│   └── profile.js          # Profile page logic
└── assets/
    └── ...             # Your media files
```

## Deploying to GitHub Pages

1. Push your code to GitHub
2. Go to **Settings > Pages**
3. Set source to **main branch**
4. Your site will be live!

**Important**: Make sure `config.local.js` is in your `.gitignore` so your API keys stay private!

## Security Notes

- **Never commit** your `config.local.js` file
- The Supabase anon key is safe to expose (it's meant to be public)
- Row Level Security policies keep your data safe
- OAuth tokens are handled by Supabase, not stored locally

## Contributing

Found a bug? Got an idea? PRs are welcome!

1. Fork this repo
2. Create a feature branch
3. Make your changes
4. Submit a PR

## License

MIT — do whatever you want with it.

---

Made with ❤️ by kAi Xin
