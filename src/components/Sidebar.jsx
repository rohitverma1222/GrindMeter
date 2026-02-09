import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import './Sidebar.css';

const Sidebar = ({ solvedByTier, solvedPercentage, onSync, isSyncing, lastSync, onImport, starredCount, onShowStarred, isShowingStarred }) => {
    const [username, setUsername] = React.useState('');
    const [importText, setImportText] = React.useState('');
    const [showImport, setShowImport] = React.useState(false);

    const chartData = Object.entries(solvedByTier).map(([tier, stats]) => ({
        name: tier,
        value: stats.solved,
        total: stats.total,
        color: stats.color
    }));


    const CustomTooltip = ({ active, payload }) => {
        if (active && payload && payload.length) {
            const data = payload[0].payload;
            return (
                <div className="custom-tooltip">
                    <p className="label">{`${data.name}: ${data.value} / ${data.total}`}</p>
                    <p className="desc">{((data.value / data.total) * 100).toFixed(1)}% Solved</p>
                </div>
            );
        }
        return null;
    };

    return (
        <div className="right-column">
            <div className="sidebar-widget solved-by-tier">
                <h3>Solved by Tier</h3>
                <div className="tier-chart-container">
                    <div className="pie-chart-wrapper">
                        <ResponsiveContainer width="100%" height={200}>
                            <PieChart>
                                <Pie
                                    data={chartData}
                                    cx="50%"
                                    cy="50%"
                                    innerRadius={60}
                                    outerRadius={80}
                                    paddingAngle={5}
                                    dataKey="value"
                                >
                                    {chartData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={entry.color} />
                                    ))}
                                </Pie>
                                <Tooltip content={<CustomTooltip />} />
                            </PieChart>
                        </ResponsiveContainer>
                        <div className="chart-center-text">
                            <span className="total-solved">
                                {Object.values(solvedByTier).reduce((acc, curr) => acc + curr.solved, 0)}
                            </span>
                            <span className="solved-label">SOLVED</span>
                            <span className="solved-percentage">{solvedPercentage}%</span>
                        </div>
                    </div>

                    <div className="tier-legend">
                        {chartData.map((item, index) => (
                            <div key={index} className="legend-item">
                                <div className="legend-left">
                                    <span className="legend-color" style={{ backgroundColor: item.color }}></span>
                                    <span className="legend-name">{item.name}</span>
                                </div>
                                <span className="legend-count">{item.value}/{item.total}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <div className="sidebar-widget sync-section" style={{ display: "none" }}>
                <div className="sync-header">
                    <span>Sync with LeetCode</span>
                </div>
                <div className="sync-input-group">
                    <input
                        type="text"
                        placeholder="username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        className="sync-input"
                    />
                    <button
                        className="sync-button"
                        onClick={() => onSync(username)}
                        disabled={isSyncing || !username}
                    >
                        {isSyncing ? 'Syncing...' : 'Sync'}
                    </button>
                </div>
                {lastSync && <div className="last-sync">Last synced: {new Date(lastSync).toLocaleString()}</div>}

                <div className="import-section">
                    <button
                        className="text-button"
                        onClick={() => setShowImport(!showImport)}
                    >
                        Manual Import (JSON)
                    </button>
                    {showImport && (
                        <div className="import-form">
                            <textarea
                                value={importText}
                                onChange={(e) => setImportText(e.target.value)}
                                placeholder='Paste JSON here: [{"titleSlug": "two-sum"}, ...]'
                                className="import-textarea"
                            />
                            <button
                                className="import-button"
                                onClick={() => {
                                    onImport(importText);
                                    setImportText('');
                                    setShowImport(false);
                                }}
                            >
                                Import
                            </button>
                        </div>
                    )}
                </div>
            </div>

            <div className="sidebar-widget starred-section">
                <div className="starred-header">
                    <span className="starred-icon">★</span>
                    <span className="starred-title">Problems to Revisit</span>
                </div>
                <button
                    className={`starred-button ${isShowingStarred ? 'active' : ''}`}
                    onClick={onShowStarred}
                >
                    <span className="starred-count">{starredCount}</span>
                    <span className="starred-label">{isShowingStarred ? 'Show All Problems' : 'Show Starred Problems'}</span>
                </button>
            </div>
        </div>
    );
};

export default Sidebar;
