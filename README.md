# Movie Watchlist Website

## 📽️ Project Overview

Movie Watchlist is a comprehensive social platform that allows users to create, manage, and share movie watchlists with friends. Built as a full-featured web application with real-time collaboration features, the platform enables movie enthusiasts to discover recommendations, rate films, and connect with other viewers.

**Live Application:** https://runtime-website.vercel.app/
-As of 2025 firebase license has expired and database is non functional

---

## ✨ Key Features

- **User Accounts & Authentication** - Secure account creation and management via Firebase
- **Movie Watchlists** - Create, edit, and organize personal movie watchlists
- **Social Sharing** - Share watchlists with friends and view their lists
- **🤖 Movie-Bot AI Assistant** - AI-powered movie recommendation engine powered by OpenAI
  - Provides personalized movie recommendations based on user preferences
  - Responds to natural language queries about films
  - Suggests similar movies based on viewing history
- **Real-Time Chat** - Message friends and discuss movies instantly
- **Rating & Reviews** - Rate movies and read/write reviews
- **Analytics Dashboard** - Visualize viewing statistics and preferences
- **Movie Discovery** - Browse, search, and discover movies from TMDB database
- **User Profiles** - Customize profiles with bios, avatars, and dark mode themes
- **Multi-Language Support** - Internationalization for global users
- **Chrome Extension** - Extend functionality across your browser
- **Friends System** - Build a network and see what friends are watching

---

## 🛠️ Technologies & Framework

### Frontend Framework
- **React 18.2** - Modern JavaScript UI library
- **React Router 6.8** - Client-side routing and navigation
- **React Firebase Hooks 3.0** - Firebase integration utilities

### Styling & UI
- **Tailwind CSS 3.2** - Utility-first CSS framework
- **Styled Components 5.3** - CSS-in-JS styling
- **Material-UI (MUI) 5.11** - Comprehensive component library
- **React Bootstrap 2.7** - Bootstrap components for React
- **Framer Motion 10.0** - Animation library for smooth transitions
- **React Icons 4.8** - Icon library
- **Semantic UI React 2.1** - Semantic HTML components

### Backend & Services
- **Firebase 9.18** - Backend-as-a-Service for:
  - Authentication & Authorization
  - Realtime Firestore Database
  - Cloud Storage
- **OpenAI API 3.2** - Natural language processing for Movie-Bot AI recommendations
- **TMDB (The Movie Database) API** - Comprehensive movie data and information

### Additional Libraries
- **i18next 22.4** - Internationalization framework
- **React Color 2.19** - Color picker component
- **React Google Charts 4.0** - Data visualization
- **EmailJS 3.10** - Email service integration
- **UUID 9.0** - Unique identifier generation
- **Axios** - HTTP client for API requests

### Development & Build Tools
- **Create React App** - Zero-configuration React setup
- **Webpack 5** - Module bundler
- **PostCSS 8.4** - CSS processing
- **Autoprefixer 10.4** - Cross-browser CSS compatibility

---

## 🤖 Movie-Bot AI Assistant

The Movie-Bot is an intelligent recommendation engine that leverages OpenAI's language model to provide personalized movie suggestions. 

### How It Works
- **AI Integration**: Uses OpenAI's API (`text-davinci-002` model) to process natural language requests
- **Movie Recommendations**: Analyzes user preferences and recommends similar movies based on:
  - Favorite films in user's watchlist
  - Rating history
  - Viewing preferences
  - Natural language requests (e.g., "I liked Titanic, recommend something similar")
- **Natural Conversation**: Users can ask questions about movies in natural language
- **Smart Matching**: Combines AI suggestions with real movie data from TMDB

### User Interface
The Movie-Bot is accessible through an interactive interface where users can:
1. Input natural language queries about movies
2. Request personalized recommendations
3. Ask questions about specific films
4. Get AI-powered insights based on their viewing history

---

## 📁 Project Structure

```
src/
├── pages/                 # Route pages
│   ├── WatchListPage.jsx     # Main watchlist page
│   ├── Chat.jsx              # Real-time chat interface
│   ├── DashboardPage.jsx     # Analytics dashboard
│   ├── FriendsPage.jsx       # Friends management
│   ├── ProfilePage.jsx       # User profile
│   ├── RatingsPage.jsx       # Movie ratings & reviews
│   ├── DiscoverMoviesPage.jsx # Movie discovery
│   └── auth/                 # Authentication pages
├── features/
│   ├── watchlist/            # Watchlist management
│   │   ├── OpenAI.jsx        # Movie-Bot AI component
│   │   └── ...
│   ├── chat/                 # Real-time messaging
│   ├── profile/              # User profile features
│   ├── dashboard/            # Analytics
│   └── friends/              # Social features
├── components/
│   ├── chat/                 # Chat UI components
│   ├── navigation/           # Navigation components
│   ├── landingpage/          # Landing page components
│   └── ...
├── firebase.js               # Firebase configuration
├── i18n.js                   # i18n configuration
└── App.js                    # Root component
```

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v14+)
- npm or yarn
- Firebase account
- OpenAI API key
- TMDB API key

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd MovieWatchlist_website
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment variables**
   Create a `.env.local` file with:
   ```
   REACT_APP_FIREBASE_API_KEY=your_key
   REACT_APP_FIREBASE_AUTH_DOMAIN=your_domain
   REACT_APP_FIREBASE_DATABASE_URL=your_url
   REACT_APP_FIREBASE_PROJECT_ID=your_project_id
   REACT_APP_FIREBASE_STORAGE_BUCKET=your_bucket
   REACT_APP_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
   REACT_APP_FIREBASE_APP_ID=your_app_id
   REACT_APP_OPENAI_API_KEY=your_openai_key
   REACT_APP_TMDB_API_KEY=your_tmdb_key
   ```

4. **Start the development server**
   ```bash
   npm start
   ```
   Opens [http://localhost:3000](http://localhost:3000)

### Available Scripts

- `npm start` - Run development server
- `npm run build` - Build for production
- `npm test` - Run test suite
- `npm run serve` - Serve with webpack

---

## 📱 Chrome Extension

The project includes a Chrome extension (`chrome_extension/`) that extends Movie Watchlist functionality across your browser, allowing quick access to watchlist features while browsing.

---

## 🌍 Internationalization

Multi-language support via i18next. The application auto-detects user language and provides seamless translation across all pages.

---

## 📊 Database Structure (Firestore)

- **users** - User account information
- **watchlists** - User movie watchlists
- **movies** - Movie data cache
- **ratings** - User movie ratings
- **messages** - Chat messages between users
- **comments** - Movie/list comments
- **profiles** - Extended user profile data

---

## 🔒 Security

- Firebase Authentication for secure login
- Firestore security rules (`database.rules.json`) for data protection
- Environment variables for sensitive API keys

---

## 🎯 Future Enhancements

- Advanced filtering and sorting options
- Social feed and activity timeline
- Machine learning-based recommendation improvements
- Mobile app version
- Video trailer integration
- Enhanced analytics

---

## 📝 License

This project was developed as a senior project.

---

