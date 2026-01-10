# 📊 GrindMeter

Your personal LeetCode progress tracker. Filter problems by rating, track your progress across difficulty tiers, and stay motivated with Hindi meme celebrations!

![GrindMeter](https://img.shields.io/badge/Made%20with-React-61DAFB?style=flat-square&logo=react)
![Vite](https://img.shields.io/badge/Powered%20by-Vite-646CFF?style=flat-square&logo=vite)
![License](https://img.shields.io/badge/License-MIT-green?style=flat-square)

## ✨ Features

- 🎯 **Filter by Rating** - Find problems in your skill range with min/max rating filters
- 📊 **Track Progress** - Visual pie chart showing solved problems by difficulty tier (Easy/Medium/Hard)
- ✅ **Mark Solved** - Click to mark problems as completed with strikethrough effect
- 💾 **Auto Save** - Progress saved locally in your browser
- 🔍 **Search** - Quick search through problem titles
- 📈 **Sorting** - Sort problems by rating (ascending/descending)
- 🎉 **Hindi Meme Celebrations** - Fun popup memes when you solve a problem!
- 👋 **Welcome Modal** - First-time user greeting with feature overview

## 🚀 Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/grindmeter.git
cd grindmeter
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open [http://localhost:5174](http://localhost:5174) in your browser.

## 🛠️ Tech Stack

- **React** - UI library
- **Vite** - Build tool and dev server
- **Recharts** - Charts and visualizations
- **CSS3** - Styling with CSS variables and animations

## 📁 Project Structure

```
src/
├── components/
│   ├── FilterBar.jsx       # Rating and search filters
│   ├── FeaturedCards.jsx   # Top feature cards
│   ├── Navbar.jsx          # Navigation bar with logo
│   ├── ProblemTable.jsx    # Main problems table
│   ├── Sidebar.jsx         # Progress charts and stats
│   ├── SolvedToast.jsx     # Meme popup on solve
│   ├── TopicFilters.jsx    # Topic filter buttons
│   └── WelcomeModal.jsx    # First-time welcome popup
├── App.jsx                 # Main app component
├── App.css                 # Global styles
└── main.jsx               # Entry point
```

## 🤝 Contributing

Contributions are welcome! Here's how you can help:

### Ways to Contribute

1. **🐛 Bug Reports** - Found a bug? Open an issue with details
2. **💡 Feature Requests** - Have an idea? Share it in issues
3. **🔧 Code Contributions** - Submit a pull request
4. **🎨 Design Improvements** - UI/UX enhancements welcome
5. **📝 Documentation** - Help improve docs and README
6. **🎉 Add Memes** - Add more Hindi celebration memes!

### Pull Request Process

1. Fork the repository
2. Create a feature branch:
```bash
git checkout -b feature/your-feature-name
```

3. Make your changes and commit:
```bash
git commit -m "Add: your feature description"
```

4. Push to your fork:
```bash
git push origin feature/your-feature-name
```

5. Open a Pull Request

### Code Style Guidelines

- Use meaningful variable and function names
- Add comments for complex logic
- Keep components small and focused
- Use CSS variables for colors
- Follow existing code patterns

### Adding New Memes

To add celebration memes:

1. Add your GIF/image to `/public/` folder
2. Update the `memes` array in `src/components/SolvedToast.jsx`:
```javascript
const memes = [
    { image: '/your-meme.gif', text: 'Your Hindi Text!' },
    // ... existing memes
];
```

## 📊 Data Source

Problem data is stored in `data.json` with the following structure:
- Rating (difficulty score)
- ID, Title, TitleSlug
- Contest information

## 🎨 Customization

### Colors

Edit CSS variables in `App.css`:
```css
:root {
    --bg-dark: #1a1a1a;
    --bg-card: #282828;
    --accent-orange: #ffa116;
    /* ... more variables */
}
```

### Tier Thresholds

Modify difficulty tier ranges in `App.jsx`:
```javascript
if (p.Rating < 1300) tier = 'Easy';
else if (p.Rating < 1700) tier = 'Medium';
else tier = 'Hard';
```

## 📜 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- LeetCode for the problems
- Recharts for beautiful charts
- The Bollywood meme community 🎬

---

**Happy Grinding!** 🔥

Made with ❤️ by the GrindMeter team
