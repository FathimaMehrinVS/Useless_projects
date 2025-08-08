// Comic Productivity Survey - Leaderboard
// Sorted by most useless (highest total stars) to least useless.

const MOCK_SCORES = [
  { username: 'LazyLad', score: 75 },
  { username: 'ChillBill', score: 69 },
  { username: 'KingNap', score: 72 },
  { username: 'WorkaholicWale', score: 22 },
  { username: 'ProcrastiNate', score: 61 },
  { username: 'MediocreMike', score: 44 },
];

function rangeDescriptor(score) {
  if (score <= 25) return 'Hardworking Hustler';
  if (score <= 45) return 'Slightly Functional';
  if (score <= 65) return 'Maybe Tomorrow';
  if (score <= 75) return 'Couch Potato';
  return 'Doing Nothing Royalty';
}

function Leaderboard() {
  const sorted = [...MOCK_SCORES].sort((a, b) => b.score - a.score);
  return (
    <div className="container">
      <div className="card">
        <div className="header">
          <h1 className="title">Leaderboard</h1>
          <p className="subtitle">Ranked from most useless to least useless. Shine on, you chaotic diamonds.</p>
        </div>

        <div className="actions" style={{ justifyContent: 'flex-start', marginBottom: 10 }}>
          <a className="btn" href="/index.html">
            <span>⬅️</span>
            <span>Back to Survey</span>
          </a>
        </div>

        <div style={{ overflowX: 'auto' }}>
          <table className="leaderboard">
            <thead>
              <tr>
                <th>#</th>
                <th>User</th>
                <th>Score (⭐)</th>
                <th>Vibe</th>
              </tr>
            </thead>
            <tbody>
              {sorted.map((row, idx) => {
                const rank = idx + 1;
                const medal = rank === 1 ? '🥇' : rank === 2 ? '🥈' : rank === 3 ? '🥉' : '✨';
                return (
                  <tr key={row.username}>
                    <td className="rank"><span className="medal">{medal}</span> {rank}</td>
                    <td>{row.username}</td>
                    <td>{row.score}</td>
                    <td>{rangeDescriptor(row.score)}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        <p className="footer-note">Mock data for demo purposes. Submit your score by telling your friends you won.</p>
      </div>
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById('leaderboard-root'));
root.render(<Leaderboard />);