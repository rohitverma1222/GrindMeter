import React from 'react';
import './ProblemTable.css';

const ProblemTable = ({ paginatedData, solvedProblems, toggleSolved, starredProblems, toggleStarred, currentPage, totalPages, setCurrentPage, itemsPerPage, setItemsPerPage, sortKey, setSortKey, sortOrder, setSortOrder }) => {
    const difficultyColors = {
        'Easy': '#00af9b',
        'Medium': '#ffb800',
        'Hard': '#ff2d55'
    };

    const handleSort = (key) => {
        if (sortKey === key) {
            setSortOrder(prev => prev === 'asc' ? 'desc' : 'asc');
        } else {
            setSortKey(key);
            setSortOrder('desc');
        }
    };

    const getSortIndicator = (key) => {
        if (sortKey !== key) return '';
        return sortOrder === 'asc' ? ' ↑' : ' ↓';
    };

    return (
        <section className="table-section">
            <table className="problem-table">
                <thead>
                    <tr>
                        <th className="col-status">Status</th>
                        <th className="col-title">Title</th>
                        <th
                            className={`col-acceptance sortable ${sortKey === 'Rating' ? 'active-sort' : ''}`}
                            onClick={() => handleSort('Rating')}
                        >
                            Rating{getSortIndicator('Rating')}
                        </th>
                        <th
                            className={`col-likes sortable ${sortKey === 'likes' ? 'active-sort' : ''}`}
                            onClick={() => handleSort('likes')}
                        >
                            Likes{getSortIndicator('likes')}
                        </th>
                        <th
                            className={`col-difficulty sortable ${sortKey === 'difficulty' ? 'active-sort' : ''}`}
                            onClick={() => handleSort('difficulty')}
                        >
                            Difficulty{getSortIndicator('difficulty')}
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {paginatedData.map((problem) => {
                        const difficulty = problem.difficulty || 'Easy';
                        const color = difficultyColors[difficulty] || '#00af9b';
                        return (
                            <tr key={problem.ID} className={`${solvedProblems.has(problem.ID) ? 'solved-row' : ''} ${starredProblems.has(problem.ID) ? 'starred-row' : ''}`}>
                                <td className="col-status">
                                    <div className="status-wrapper">
                                        <div
                                            className={`status-check ${solvedProblems.has(problem.ID) ? 'checked' : ''}`}
                                            onClick={() => toggleSolved(problem.ID)}
                                        >
                                            {solvedProblems.has(problem.ID) ? '✓' : '○'}
                                        </div>
                                        <div
                                            className={`star-check ${starredProblems.has(problem.ID) ? 'starred' : ''}`}
                                            onClick={() => toggleStarred(problem.ID)}
                                            title={starredProblems.has(problem.ID) ? 'Remove from revisit list' : 'Mark for revisit'}
                                        >
                                            {starredProblems.has(problem.ID) ? '★' : '☆'}
                                        </div>
                                    </div>
                                </td>
                                <td className="col-title">
                                    <a
                                        href={`https://leetcode.com/problems/${problem.TitleSlug}/`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className={solvedProblems.has(problem.ID) ? 'solved' : ''}
                                    >
                                        {problem.ID}. {problem.Title}
                                    </a>
                                </td>
                                <td className="col-acceptance">
                                    {problem.Rating.toFixed(0)}
                                </td>
                                <td className="col-likes">
                                    <span><span className="likes-icon">👍</span>{problem.likes ?? 0}</span>
                                </td>
                                <td className="col-difficulty" style={{ color: color }}>
                                    {difficulty}
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>

            <div className="pagination">
                <button
                    disabled={currentPage === 1}
                    onClick={() => setCurrentPage(prev => prev - 1)}
                >
                    ‹
                </button>
                <span className="page-info">{currentPage} / {totalPages}</span>
                <button
                    disabled={currentPage === totalPages || totalPages === 0}
                    onClick={() => setCurrentPage(prev => prev + 1)}
                >
                    ›
                </button>
                <select
                    value={itemsPerPage}
                    onChange={(e) => setItemsPerPage(Number(e.target.value))}
                    className="items-select"
                >
                    <option value={10}>10 / page</option>
                    <option value={20}>20 / page</option>
                    <option value={50}>50 / page</option>
                    <option value={100}>100 / page</option>
                </select>
            </div>
        </section>
    );
};

export default ProblemTable;
