import { useState, useMemo, useEffect } from 'react'
import data from '../data.json'
import './App.css'

// Import components
import Navbar from './components/Navbar'
import FeaturedCards from './components/FeaturedCards'
import TopicFilters from './components/TopicFilters'
import FilterBar from './components/FilterBar'
import ProblemTable from './components/ProblemTable'
import Sidebar from './components/Sidebar'
import WelcomeModal from './components/WelcomeModal'
import SolvedToast from './components/SolvedToast'

function App() {
  const [searchQuery, setSearchQuery] = useState('')
  const [sortOrder, setSortOrder] = useState('desc')
  const [minRating, setMinRating] = useState('')
  const [maxRating, setMaxRating] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage, setItemsPerPage] = useState(10)
  const [isSyncing, setIsSyncing] = useState(false)
  const [lastSync, setLastSync] = useState(() => localStorage.getItem('lastSync'))
  const [showToast, setShowToast] = useState(false)
  const [solvedProblemTitle, setSolvedProblemTitle] = useState('')

  // Solved problems state with localStorage persistence
  const [solvedProblems, setSolvedProblems] = useState(() => {
    const saved = localStorage.getItem('solvedProblems')
    return saved ? new Set(JSON.parse(saved)) : new Set()
  })

  useEffect(() => {
    localStorage.setItem('solvedProblems', JSON.stringify([...solvedProblems]))
  }, [solvedProblems])

  const handleSync = async (username) => {
    if (!username) return;
    setIsSyncing(true);
    try {
      // Using alfa-leetcode-api to fetch accepted submissions
      // Note: This API returns the last 20 accepted submissions by default.
      // We'll try to fetch more if possible, but for now let's start with this.
      const response = await fetch(`https://alfa-leetcode-api.onrender.com/${username}/acSubmission?limit=100`);
      const dataResponse = await response.json();

      if (dataResponse.submission) {
        const syncedIds = new Set(solvedProblems);
        dataResponse.submission.forEach(sub => {
          // Find the problem in our local data.json by title or slug
          const problem = data.find(p => p.TitleSlug === sub.titleSlug || p.Title === sub.title);
          if (problem) {
            syncedIds.add(problem.ID);
          }
        });

        setSolvedProblems(syncedIds);
        const now = new Date().toISOString();
        setLastSync(now);
        localStorage.setItem('lastSync', now);
        alert(`Synced ${dataResponse.submission.length} recent solved problems!`);
      } else {
        alert("No solved problems found or user not found.");
      }
    } catch (error) {
      console.error("Sync failed:", error);
      alert("Sync failed. Please check the username and try again.");
    } finally {
      setIsSyncing(false);
    }
  };

  const handleManualImport = (text) => {
    if (!text.trim()) return;

    const items = text.split(/[,\n]+/).map(item => item.trim().toLowerCase()).filter(Boolean);
    const syncedIds = new Set(solvedProblems);
    let count = 0;

    items.forEach(item => {
      // Try to match by ID or TitleSlug
      const problem = data.find(p =>
        p.ID.toString() === item ||
        p.TitleSlug.toLowerCase() === item
      );

      if (problem && !syncedIds.has(problem.ID)) {
        syncedIds.add(problem.ID);
        count++;
      }
    });

    if (count > 0) {
      setSolvedProblems(syncedIds);
      alert(`Successfully imported ${count} new solved problems!`);
    } else {
      alert("No new matching problems found. Please check the slugs or IDs.");
    }
  };

  const toggleSolved = (id) => {
    setSolvedProblems(prev => {
      const next = new Set(prev)
      if (next.has(id)) {
        next.delete(id)
      } else {
        next.add(id)
        // Show toast when marking as solved
        const problem = data.find(p => p.ID === id)
        if (problem) {
          setSolvedProblemTitle(problem.Title)
          setShowToast(true)
        }
      }
      return next
    })
  }

  const filteredAndSortedData = useMemo(() => {
    let result = data.filter(item =>
      item.Title.toLowerCase().includes(searchQuery.toLowerCase()) &&
      (minRating === '' || item.Rating >= Number(minRating)) &&
      (maxRating === '' || item.Rating <= Number(maxRating))
    )

    result.sort((a, b) => {
      if (sortOrder === 'asc') {
        return a.Rating - b.Rating
      } else {
        return b.Rating - a.Rating
      }
    })

    return result
  }, [searchQuery, sortOrder, minRating, maxRating])

  // Pagination logic
  const totalItems = filteredAndSortedData.length
  const totalPages = Math.ceil(totalItems / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const paginatedData = filteredAndSortedData.slice(startIndex, startIndex + itemsPerPage)

  const solvedCount = useMemo(() => {
    return filteredAndSortedData.filter(p => solvedProblems.has(p.ID)).length
  }, [filteredAndSortedData, solvedProblems])

  const solvedPercentage = useMemo(() => {
    if (totalItems === 0) return 0
    return ((solvedCount / totalItems) * 100).toFixed(1)
  }, [solvedCount, totalItems])

  const solvedByTier = useMemo(() => {
    const tiers = {
      Easy: { solved: 0, total: 0, color: '#00af9b' },
      Medium: { solved: 0, total: 0, color: '#ffb800' },
      Hard: { solved: 0, total: 0, color: '#ff2d55' }
    };

    filteredAndSortedData.forEach(p => {
      const tier = p.difficulty || 'Easy';

      if (tiers[tier]) {
        tiers[tier].total++;
        if (solvedProblems.has(p.ID)) {
          tiers[tier].solved++;
        }
      }
    });

    return tiers;
  }, [solvedProblems, filteredAndSortedData])

  return (
    <div className="leetcode-app">
      <WelcomeModal />
      <SolvedToast
        show={showToast}
        problemTitle={solvedProblemTitle}
        onClose={() => setShowToast(false)}
      />
      <Navbar />

      <main className="main-content">
        <div className="content-container">
          <div className="left-column">
            <FeaturedCards />
            <TopicFilters />

            <FilterBar
              searchQuery={searchQuery}
              setSearchQuery={(val) => { setSearchQuery(val); setCurrentPage(1); }}
              minRating={minRating}
              setMinRating={(val) => { setMinRating(val); setCurrentPage(1); }}
              maxRating={maxRating}
              setMaxRating={(val) => { setMaxRating(val); setCurrentPage(1); }}
            />

            <ProblemTable
              paginatedData={paginatedData}
              solvedProblems={solvedProblems}
              toggleSolved={toggleSolved}
              currentPage={currentPage}
              totalPages={totalPages}
              setCurrentPage={setCurrentPage}
              itemsPerPage={itemsPerPage}
              setItemsPerPage={(val) => { setItemsPerPage(val); setCurrentPage(1); }}
              sortOrder={sortOrder}
              setSortOrder={setSortOrder}
            />
          </div>

          <Sidebar
            solvedByTier={solvedByTier}
            solvedPercentage={solvedPercentage}
            onSync={handleSync}
            isSyncing={isSyncing}
            lastSync={lastSync}
            onImport={handleManualImport}
          />
        </div>
      </main>
    </div>
  )
}

export default App
