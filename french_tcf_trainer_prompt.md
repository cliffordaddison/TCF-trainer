# 🇫🇷 French TCF Trainer: A1→C1 Mastery System (bolt.new)

## 🎯 **MISSION**: Transform a French beginner into C1 master using TCF-aligned pedagogy with intelligent space management

You are building a **production-ready French learning platform** that teaches from absolute beginner (A1) to advanced (C1) using **TCF exam format**, **pronunciation-first approach**, and **smart SRS that auto-deletes mastered content** to save database space.

---

## 🚀 **CORE INNOVATIONS** (Beyond Standard TCF Prep)

### 1. **Pronunciation-First Pedagogy** 🗣️
- **Phonetic Mastery**: Every lesson starts with IPA transcription + audio modeling
- **Liaison Training**: French-specific sound linking exercises
- **Silent Letter Mastery**: Systematic approach to French orthography
- **Accent Training**: Regional variations (Parisian, Quebec, African French)

### 2. **Intelligent Space Management** 💾
- **Mastery Detection**: AI identifies when you've truly mastered content
- **Auto-Archiving**: Moves mastered items to compressed storage
- **Progressive Deletion**: Removes A1-A2 content once B1+ achieved
- **Smart Caching**: Prioritizes current level + next level content

### 3. **TCF-Enhanced Learning Path** 📚
- **Real TCF Format**: Listening (29 items), Reading (29 items), Grammar (18 items)
- **Speaking & Writing**: Optional but integrated for C1 mastery
- **Exam Simulation**: Timed practice with real TCF scoring algorithms

---

## 🏗️ **TECHNICAL ARCHITECTURE** (bolt.new + Free Tier)

### **Frontend Stack**
```typescript
// Next.js 14 + TypeScript + Tailwind + Framer Motion
// PWA with offline French lessons
// Responsive design for mobile-first learning
```

### **AI & Speech Processing**
```typescript
// STT: Vosk WASM (French small model) - 100% client-side
// LLM: Groq free tier (Llama-3-8B) for feedback & evaluation
// Pronunciation: Custom French phoneme analysis
```

### **Database & Storage**
```typescript
// bolt.new Postgres + Prisma ORM
// File storage for audio models & user recordings
// Intelligent data lifecycle management
```

---

## 📊 **FRENCH LEARNING ROADMAP** (A1→C1)

### **A1 (Beginner) - Foundation Stones** 🧱
- **Phonetics**: French alphabet, basic sounds, IPA introduction
- **Greetings**: Bonjour, au revoir, comment allez-vous
- **Numbers**: 1-100, phone numbers, prices
- **Basic Verbs**: être, avoir, aller, faire (present tense)
- **Articles**: le, la, les, un, une, des
- **Pronunciation Focus**: Nasal sounds, silent letters, basic liaisons

### **A2 (Elementary) - Building Blocks** 🏠
- **Past Tense**: Passé composé with avoir/être
- **Future**: Futur simple, aller + infinitive
- **Daily Life**: Food, shopping, directions, weather
- **Pronouns**: Subject, object, reflexive
- **Pronunciation Focus**: Complex liaisons, rhythm patterns, stress

### **B1 (Intermediate) - Conversation Skills** 💬
- **Subjunctive**: Present subjunctive mood
- **Conditional**: Si clauses, hypothetical situations
- **Work & Travel**: Professional vocabulary, travel planning
- **Opinions**: Expressing agreement/disagreement
- **Pronunciation Focus**: Intonation patterns, emotion in speech

### **B2 (Upper Intermediate) - Academic Foundation** 🎓
- **Complex Grammar**: Plus-que-parfait, subjunctive past
- **Abstract Topics**: Politics, environment, technology
- **Academic Writing**: Essay structure, formal letters
- **Media Comprehension**: News, documentaries, films
- **Pronunciation Focus**: Native-like fluency, regional accents

### **C1 (Advanced) - Mastery Level** 🏆
- **Nuanced Expression**: Idioms, proverbs, cultural references
- **Academic French**: Research papers, presentations, debates
- **Literature**: Classic and contemporary French texts
- **Professional French**: Business meetings, negotiations
- **Pronunciation Focus**: Perfect accent, cultural intonation

---

## 🗄️ **SMART DATABASE SCHEMA** (Space-Optimized)

```prisma
model User {
  id            String   @id @default(cuid())
  email         String   @unique
  currentLevel  String   @default("A1") // A1, A2, B1, B2, C1
  targetLevel   String   @default("C1")
  createdAt     DateTime @default(now())
  lastActive    DateTime @default(now())
  
  // Learning progress
  srsReviews    SrsReview[]
  attempts      Attempt[]
  masteryLog    MasteryLog[]
  
  // Space management
  archivedItems ArchivedItem[]
}

model SrsItem {
  id          String   @id @default(cuid())
  type        SrsType  // WORD, PHRASE, GRAMMAR, PRONUNCIATION, LISTENING
  payload     Json     // { fr: "bonjour", en: "hello", ipa: "bɔ̃ʒuʁ", audio: "url" }
  cefr        String   // A1, A2, B1, B2, C1
  difficulty  Int      // 1-10 scale
  tags        String[] // ["greetings", "basic", "essential"]
  usageCount  Int      @default(0)
  lastUsed    DateTime @default(now())
  
  // SRS scheduling
  reviews     SrsReview[]
  
  // Space management
  isArchived  Boolean  @default(false)
  archiveDate DateTime?
}

model SrsReview {
  id          String   @id @default(cuid())
  user        User     @relation(fields: [userId], references: [id], onDelete: Cascade)
  userId      String
  item        SrsItem  @relation(fields: [itemId], references: [id], onDelete: Cascade)
  itemId      String
  
  // SM-2 algorithm
  ease        Int      @default(2) // 0-5 scale
  interval    Int      @default(1) // days
  dueAt       DateTime
  lastResult  String?  // AGAIN, HARD, GOOD, EASY
  
  // Error tracking
  errorTags   String[] // ["pronunciation", "gender", "tense"]
  attempts    Int      @default(0)
  
  // Mastery detection
  consecutiveCorrect Int @default(0)
  masteryScore      Float @default(0.0)
}

model MasteryLog {
  id          String   @id @default(cuid())
  user        User     @relation(fields: [userId], references: [id], onDelete: Cascade)
  userId      String
  
  // Mastery tracking
  skill       String   // "pronunciation", "grammar", "vocabulary"
  level       String   // "A1", "A2", etc.
  score       Float    // 0.0 - 1.0
  date        DateTime @default(now())
  
  // Space management triggers
  shouldArchive Boolean @default(false)
  archiveReason String?
}

model ArchivedItem {
  id          String   @id @default(cuid())
  user        User     @relation(fields: [userId], references: [id], onDelete: Cascade)
  userId      String
  
  // Compressed data
  originalId  String
  itemType    String
  compressedData Json  // Minimal representation
  archiveDate DateTime @default(now())
  
  // Recovery info
  canRestore  Boolean  @default(true)
  restoreDate DateTime?
}

model Attempt {
  id          String   @id @default(cuid())
  user        User     @relation(fields: [userId], references: [id], onDelete: Cascade)
  userId      String
  
  // TCF-aligned skills
  skill       Skill    // LISTENING, READING, GRAMMAR, SPEAKING, WRITING
  mode        Mode     // PRACTICE, EXAM, SIMULATOR
  level       String   // CEFR level
  
  // Content
  raw         Json     // Audio URL, transcript, answers
  scores      Score[]
  
  // Timing
  startedAt   DateTime @default(now())
  completedAt DateTime?
  duration    Int?     // seconds
}

model Score {
  id          String   @id @default(cuid())
  attempt     Attempt  @relation(fields: [attemptId], references: [id], onDelete: Cascade)
  attemptId   String
  
  // TCF scoring
  dimension   String   // pronunciation, fluency, grammar, lexis, task_fulfillment
  value       Float    // 0-100 or 0-12 for writing
  bandGuess   String   // CEFR estimate
  feedback    String   // Specific improvement suggestions
  
  // Mastery contribution
  masteryWeight Float  @default(1.0)
}
```

---

## 🎯 **PRONUNCIATION-FIRST LEARNING FLOW**

### **1. Phonetic Foundation** 🎵
```typescript
// Every new word/phrase starts with:
interface PhoneticLesson {
  word: string;           // "bonjour"
  ipa: string;           // "bɔ̃ʒuʁ"
  audio: string;         // Native speaker recording
  breakdown: string[];   // ["b", "ɔ̃", "ʒ", "u", "ʁ"]
  practice: string[];    // ["bɔ̃", "ʒu", "ʁ"]
}
```

### **2. Progressive Pronunciation Training** 📈
- **A1**: Basic sounds, minimal pairs
- **A2**: Liaisons, silent letters, rhythm
- **B1**: Intonation, stress patterns
- **B2**: Regional variations, emotion
- **C1**: Native-like fluency, cultural nuances

### **3. Speaking Evaluation Pipeline** 🎤
```typescript
// 1. User records audio
// 2. Vosk STT creates transcript
// 3. Custom French phoneme analysis
// 4. Groq LLM provides CEFR-aligned feedback
// 5. Generate targeted pronunciation drills
```

---

## 🧠 **INTELLIGENT SPACE MANAGEMENT**

### **Mastery Detection Algorithm** 🔍
```typescript
interface MasteryCriteria {
  consecutiveCorrect: number;    // Min 10 correct in a row
  easeFactor: number;           // Min 3.0 (easy to remember)
  timeInterval: number;          // Min 30 days without review
  errorRate: number;            // Max 5% error rate
  usageFrequency: number;       // Min 5 uses in last 30 days
}

function shouldArchive(item: SrsItem, reviews: SrsReview[]): boolean {
  // Complex logic combining all mastery criteria
  // Returns true when item is truly mastered
}
```

### **Progressive Content Archiving** 📦
```typescript
// A1 content archived when user reaches B1
// A2 content archived when user reaches B2
// B1 content archived when user reaches C1
// Only current level + next level + essential items kept active
```

### **Smart Caching Strategy** 💾
```typescript
// Priority 1: Current level content (100% cached)
// Priority 2: Next level preview (50% cached)
// Priority 3: Essential items (25% cached)
// Priority 4: Archived items (compressed, on-demand)
```

---

## 🎓 **TCF EXAM SIMULATOR** (C1 Target)

### **Compulsory Sections** 📝
```typescript
interface TCFExam {
  listening: {
    items: 29,
    timeLimit: 1500, // 25 minutes
    audioFiles: string[],
    questions: Question[]
  },
  
  grammar: {
    items: 18,
    timeLimit: 900,  // 15 minutes
    questionTypes: ["cloze", "error_correction", "sentence_completion"]
  },
  
  reading: {
    items: 29,
    timeLimit: 2700, // 45 minutes
    passages: Passage[],
    questions: Question[]
  }
}
```

### **Optional Sections** ✨
```typescript
interface TCFOptional {
  speaking: {
    prompts: string[],
    timeLimit: 300, // 5 minutes per prompt
    evaluation: SpeakingRubric
  },
  
  writing: {
    prompts: string[],
    timeLimit: 1800, // 30 minutes
    evaluation: WritingRubric
  }
}
```

### **C1 Scoring Algorithm** 🎯
```typescript
// TCF to CEFR mapping for C1 target
const C1Thresholds = {
  listening: 500,    // TCF score
  grammar: 500,      // TCF score
  reading: 500,      // TCF score
  speaking: 16,      // TCF score (0-20)
  writing: 16        // TCF score (0-20)
};
```

---

## 🤖 **AI-POWERED FEEDBACK SYSTEM**

### **Speaking Evaluation** 🗣️
```typescript
// Groq LLM prompt for French pronunciation coach
const speakingPrompt = `
You are a CEFR-aligned French pronunciation coach targeting C1 level mastery.

EVALUATE this learner's spoken French:
TARGET_TEXT: "${targetText}"
TRANSCRIPT: "${transcript}"
CURRENT_LEVEL: "${userLevel}"
TARGET_LEVEL: "C1"

Return JSON only:
{
  "scores": {
    "pronunciation": 0-100,
    "fluency": 0-100,
    "grammar": 0-100,
    "lexis": 0-100
  },
  "bandGuess": "A1|A2|B1|B2|C1|C2",
  "cefrDescriptors": {
    "strengths": ["..."],
    "weaknesses": ["..."],
    "nextSteps": ["..."]
  },
  "pronunciationDrills": [
    "shadow: ${specific_phrase}",
    "minimal_pair: ${word1} vs ${word2}",
    "liaison_practice: ${phrase_with_liaison}"
  ],
  "masteryProgress": {
    "currentLevel": "B2",
    "targetLevel": "C1",
    "estimatedWeeks": 12,
    "prioritySkills": ["intonation", "regional_accents"]
  }
}
`;
```

### **Writing Evaluation** ✍️
```typescript
// Groq LLM prompt for French writing coach
const writingPrompt = `
You are a CEFR-aligned French writing coach targeting C1 level mastery.

EVALUATE this learner's written French:
PROMPT: "${writingPrompt}"
TEXT: "${userText}"
CURRENT_LEVEL: "${userLevel}"
TARGET_LEVEL: "C1"

Return JSON only:
{
  "scores": {
    "task_fulfillment": 0-12,
    "coherence": 0-12,
    "grammar": 0-12,
    "vocabulary": 0-12
  },
  "bandGuess": "A1|A2|B1|B2|C1|C2",
  "cefrDescriptors": {
    "strengths": ["..."],
    "weaknesses": ["..."],
    "nextSteps": ["..."]
  },
  "edits": [
    {
      "start": 10,
      "end": 15,
      "replacement": "corrected_text",
      "reason": "grammar_error",
      "explanation": "Use subjunctive after 'il faut que'"
    }
  ],
  "masteryProgress": {
    "currentLevel": "B2",
    "targetLevel": "C1",
    "estimatedWeeks": 8,
    "prioritySkills": ["subjunctive_mood", "academic_style"]
  }
}
`;
```

---

## 🎨 **USER EXPERIENCE FLOW**

### **Daily Learning Session** 📅
```typescript
// 1. Pronunciation warm-up (5 min)
// 2. SRS vocabulary review (10 min)
// 3. New lesson content (15 min)
// 4. Speaking practice (10 min)
// 5. Progress check & next steps (5 min)
```

### **Weekly Mastery Assessment** 📊
```typescript
// Sunday: Comprehensive review
// Monday-Friday: Focused skill development
// Saturday: TCF simulator practice
```

### **Monthly Space Optimization** 🧹
```typescript
// Auto-archive mastered items
// Compress old data
// Update learning path
// Generate progress report
```

---

## 🚀 **IMPLEMENTATION ROADMAP**

### **Phase 1: Foundation** (Week 1-2)
- [ ] Database schema & migrations
- [ ] Basic SRS system
- [ ] User authentication
- [ ] Core UI components

### **Phase 2: Core Learning** (Week 3-4)
- [ ] Pronunciation training system
- [ ] Vosk STT integration
- [ ] Basic lesson content
- [ ] SRS scheduling algorithm

### **Phase 3: AI Integration** (Week 5-6)
- [ ] Groq LLM integration
- [ ] Speaking evaluation
- [ ] Writing evaluation
- [ ] Mastery detection

### **Phase 4: TCF Simulator** (Week 7-8)
- [ ] Exam format implementation
- [ ] Timing & scoring
- [ ] Progress tracking
- [ ] CEFR mapping

### **Phase 5: Space Optimization** (Week 9-10)
- [ ] Auto-archiving system
- [ ] Data compression
- [ ] Performance optimization
- [ ] Analytics & insights

---

## 📱 **MOBILE-FIRST DESIGN**

### **PWA Features** 📱
- Offline French lessons
- Audio recording & playback
- Push notifications for daily practice
- Install to home screen

### **Responsive Layout** 🎨
- Mobile-first design
- Touch-friendly controls
- Audio waveform visualization
- Progress charts & graphs

---

## 🔧 **DEPLOYMENT CHECKLIST**

### **Environment Variables** ⚙️
```bash
GROQ_API_KEY=gsk_...          # Required for AI feedback
DATABASE_URL=postgresql://...  # bolt.new provides
NEXTAUTH_SECRET=...           # Authentication
NEXTAUTH_URL=http://localhost:3000
```

### **File Structure** 📁
```
/public
  /models
    /vosk-fr-small          # French STT model
    /audio-samples          # Native speaker recordings
  /icons                    # PWA icons
  
/src
  /app                      # Next.js app router
  /components               # React components
  /lib                      # Utilities & configurations
  /api                      # API routes
  /types                    # TypeScript definitions
```

### **Dependencies** 📦
```json
{
  "dependencies": {
    "next": "14.x",
    "react": "18.x",
    "prisma": "^5.x",
    "framer-motion": "^10.x",
    "tailwindcss": "^3.x",
    "shadcn/ui": "latest",
    "groq": "^0.3.x",
    "vosk": "^0.3.x"
  }
}
```

---

## 🎯 **SUCCESS METRICS**

### **Learning Progress** 📈
- A1→C1 completion time: Target 12-18 months
- Daily practice consistency: Target 80%+
- Pronunciation accuracy: Target 90%+
- TCF practice scores: Target C1 threshold

### **System Performance** ⚡
- Database size: Target <100MB per user
- Response time: Target <2 seconds
- Offline functionality: Target 95%+
- User retention: Target 70%+ monthly

---

## 🌟 **UNIQUE VALUE PROPOSITIONS**

1. **Pronunciation-First**: Every lesson starts with sound mastery
2. **Space Intelligence**: Auto-deletes mastered content to save resources
3. **TCF Alignment**: Real exam format with C1 targeting
4. **Progressive Mastery**: Systematic approach from A1 to C1
5. **Mobile Excellence**: PWA with offline learning capabilities
6. **AI Coaching**: Personalized feedback for rapid improvement

---

## 🚀 **READY TO DEPLOY**

This prompt provides everything needed to build a **production-ready French TCF trainer** on bolt.new. The system will:

- ✅ Teach French from A1 to C1 with pronunciation focus
- ✅ Use TCF exam format for authentic preparation
- ✅ Automatically manage database space by archiving mastered content
- ✅ Provide AI-powered feedback for rapid improvement
- ✅ Work offline with PWA capabilities
- ✅ Cost $0 to run (free tier tools only)

**Copy this entire prompt into bolt.new and hit Deploy!** 🚀

---

*"Le français n'est pas difficile, il faut juste le pratiquer avec la bonne méthode!"* 🇫🇷
