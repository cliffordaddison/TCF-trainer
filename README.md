# 🇫🇷 French TCF Trainer - A1→C1 Mastery System

A comprehensive French learning platform designed to take beginners from A1 to C1 level mastery using TCF exam format, pronunciation-first pedagogy, and intelligent spaced repetition.

## ✨ Features

### 🗣️ **Pronunciation-First Learning**
- **IPA Transcription**: Every word/phrase includes phonetic breakdown
- **Audio Recording**: Practice pronunciation with real-time feedback
- **Liaison Training**: Master French sound linking
- **Silent Letter Mastery**: Systematic approach to French orthography

### 🧠 **Intelligent SRS System**
- **Spaced Repetition**: SM-2 algorithm for optimal learning
- **Mastery Detection**: Auto-archives mastered content to save space
- **Progressive Learning**: A1→A2→B1→B2→C1 pathway
- **Smart Scheduling**: Mixes new, review, and challenging items

### 🎯 **TCF Exam Preparation**
- **Authentic Format**: Real TCF exam structure and timing
- **Compulsory Sections**: Listening (29), Reading (29), Grammar (18)
- **Optional Sections**: Speaking & Writing practice
- **C1 Targeting**: Specific preparation for advanced level

### 💾 **Space Management**
- **Auto-Archiving**: Removes mastered content automatically
- **Compressed Storage**: Efficient data management
- **Smart Caching**: Prioritizes current and next level content

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- npm or yarn
- PostgreSQL database (for production)

### Installation

1. **Clone the repository**
```bash
git clone <repository-url>
cd french-tcf-trainer
```

2. **Install dependencies**
```bash
npm install
```

3. **Set up environment variables**
```bash
cp .env.example .env.local
```

Edit `.env.local`:
```env
# Database
DATABASE_URL="postgresql://username:password@localhost:5432/french_tcf_trainer"

# Groq API (for AI feedback)
GROQ_API_KEY="your_groq_api_key_here"

# Authentication
NEXTAUTH_SECRET="your_secret_here"
NEXTAUTH_URL="http://localhost:3000"
```

4. **Set up the database**
```bash
npx prisma generate
npx prisma db push
```

5. **Run the development server**
```bash
npm run dev
```

6. **Open your browser**
Navigate to [http://localhost:3000](http://localhost:3000)

## 🏗️ Project Structure

```
french-tcf-trainer/
├── src/
│   ├── app/                    # Next.js app router
│   │   ├── globals.css        # Global styles
│   │   ├── layout.tsx         # Root layout
│   │   └── page.tsx           # Main page with navigation
│   ├── components/             # React components
│   │   ├── Navigation.tsx     # Main navigation
│   │   ├── Dashboard.tsx      # Learning dashboard
│   │   ├── PronunciationTrainer.tsx  # Pronunciation practice
│   │   ├── SRSTrainer.tsx     # Spaced repetition system
│   │   └── TCFSimulator.tsx   # TCF exam simulator
│   └── lib/                    # Utilities and configurations
├── prisma/                     # Database schema and migrations
│   └── schema.prisma          # Prisma schema
├── public/                     # Static assets
├── package.json                # Dependencies and scripts
├── tailwind.config.js          # Tailwind CSS configuration
└── README.md                   # This file
```

## 🎓 Learning Modules

### 1. **Dashboard**
- Progress overview and statistics
- Learning module navigation
- Daily practice recommendations
- Streak tracking and motivation

### 2. **Pronunciation Training**
- **Step 1**: Listen & Repeat native audio
- **Step 2**: Break down individual sounds
- **Step 3**: Record and practice
- **Step 4**: Get AI-powered feedback

### 3. **SRS Trainer**
- Spaced repetition flashcards
- Mastery tracking and scheduling
- Progress visualization
- Auto-archiving of learned content

### 4. **TCF Simulator**
- **Listening**: 29 questions (25 minutes)
- **Reading**: 29 questions (45 minutes)
- **Grammar**: 18 questions (15 minutes)
- **Speaking**: Optional practice (5 minutes)
- **Writing**: Optional practice (30 minutes)

## 🗄️ Database Schema

The application uses Prisma with PostgreSQL and includes:

- **User Management**: Profiles, progress tracking, preferences
- **SRS System**: Items, reviews, mastery tracking, scheduling
- **Learning Content**: Lessons, exercises, audio files
- **Progress Tracking**: Attempts, scores, CEFR level estimates
- **Space Management**: Archived items, compression, lifecycle

## 🤖 AI Integration

### **Groq LLM Integration**
- **Speaking Evaluation**: Pronunciation, fluency, grammar assessment
- **Writing Feedback**: Grammar correction and improvement suggestions
- **CEFR Alignment**: Level-appropriate feedback and recommendations

### **Speech Recognition**
- **Vosk WASM**: Client-side French STT (no API keys needed)
- **Audio Processing**: Real-time pronunciation analysis
- **Feedback Generation**: AI-powered improvement suggestions

## 📱 PWA Features

- **Offline Learning**: Access lessons without internet
- **Mobile-First**: Responsive design for all devices
- **Install Prompt**: Add to home screen for easy access
- **Push Notifications**: Daily practice reminders

## 🎨 UI/UX Features

- **Framer Motion**: Smooth animations and transitions
- **Tailwind CSS**: Modern, responsive design system
- **Dark Mode**: Eye-friendly interface options
- **Accessibility**: WCAG 2.1 AA compliant

## 🔧 Configuration

### **Environment Variables**

| Variable | Description | Required |
|----------|-------------|----------|
| `DATABASE_URL` | PostgreSQL connection string | Yes |
| `GROQ_API_KEY` | Groq API key for AI feedback | Yes |
| `NEXTAUTH_SECRET` | Authentication secret | Yes |
| `NEXTAUTH_URL` | Application URL | Yes |

### **Database Configuration**

The application uses Prisma with PostgreSQL. Key models include:

- **User**: Learning profiles and preferences
- **SrsItem**: Learning content (words, phrases, grammar)
- **SrsReview**: Spaced repetition tracking
- **MasteryLog**: Progress and skill development
- **ArchivedItem**: Compressed mastered content

## 🚀 Deployment

### **Vercel (Recommended)**

1. **Connect your repository**
2. **Set environment variables**
3. **Deploy automatically**

### **Docker**

```bash
# Build the image
docker build -t french-tcf-trainer .

# Run the container
docker run -p 3000:3000 french-tcf-trainer
```

### **Manual Deployment**

```bash
npm run build
npm start
```

## 📊 Performance

- **Database Size**: Target <100MB per user
- **Response Time**: <2 seconds for all operations
- **Offline Functionality**: 95%+ content available offline
- **User Retention**: Target 70%+ monthly retention

## 🔒 Security

- **Authentication**: NextAuth.js with secure sessions
- **API Protection**: Rate limiting and validation
- **Data Privacy**: Minimal data collection, export/delete options
- **HTTPS**: Secure communication for all requests

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **TCF Exam Format**: Based on official France Éducation internationale specifications
- **CEFR Standards**: Aligned with Common European Framework of Reference
- **SRS Algorithm**: Implementation of SuperMemo SM-2 algorithm
- **French Phonetics**: IPA transcriptions and pronunciation guides

## 📞 Support

For questions, issues, or feature requests:

- **Issues**: [GitHub Issues](https://github.com/your-repo/issues)
- **Discussions**: [GitHub Discussions](https://github.com/your-repo/discussions)
- **Email**: support@french-tcf-trainer.com

---

**Happy Learning! Bon apprentissage! 🇫🇷**

*"Le français n'est pas difficile, il faut juste le pratiquer avec la bonne méthode!"*
