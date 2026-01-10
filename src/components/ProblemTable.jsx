import React from 'react';
import './ProblemTable.css';

const ProblemTable = ({ paginatedData, solvedProblems, toggleSolved, currentPage, totalPages, setCurrentPage, itemsPerPage, setItemsPerPage, sortOrder, setSortOrder }) => {
    const getDifficulty = (rating) => {
        if (rating < 1300) return { label: 'Easy', color: '#00af9b' };
        if (rating < 1600) return { label: 'Medium', color: '#ffb800' };
        return { label: 'Hard', color: '#ff2d55' };
    };

    const handleSort = () => {
        setSortOrder(prev => prev === 'asc' ? 'desc' : 'asc');
    };

    return (
        <section className="table-section">
            <table className="problem-table">
                <thead>
                    <tr>
                        <th className="col-status">Status</th>
                        <th className="col-title">Title</th>
                        <th
                            className="col-acceptance sortable"
                            onClick={handleSort}
                        >
                            Rating {sortOrder === 'asc' ? '↑' : '↓'}
                        </th>
                        <th className="col-likes">Likes</th>
                        <th
                            className="col-difficulty sortable"
                            onClick={handleSort}
                        >
                            Difficulty
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {paginatedData.map((problem) => {
                        const diff = getDifficulty(problem.Rating);
                        return (
                            <tr key={problem.ID} className={solvedProblems.has(problem.ID) ? 'solved-row' : ''}>
                                <td className="col-status">
                                    <div
                                        className={`status-check ${solvedProblems.has(problem.ID) ? 'checked' : ''}`}
                                        onClick={() => toggleSolved(problem.ID)}
                                    >
                                        {solvedProblems.has(problem.ID) ? '✓' : '○'}
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
                                    <span><span className="likes-icon">👍</span>{problem.Likes || Math.floor((problem.ID % 500) + (problem.Rating / 10))}</span>
                                </td>
                                <td className="col-difficulty" style={{ color: diff.color }}>
                                    {diff.label}
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
