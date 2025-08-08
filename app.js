// Comic Productivity Survey App (React, JSX)
// - Landing page with Start button
// - 15 comic-style questions with star options (1 = productive, 5 = lazy)
// - Results screen with total score and a funny description
// - Leaderboard button goes to /leaderboard.html; Retake resets

const { useState, useMemo } = React;

// Small star component for option visuals
function Stars({ value }) {
  const stars = [];
  for (let i = 1; i <= 5; i += 1) {
    const isFilled = i <= value;
    stars.push(
      <span key={i} className={`star ${isFilled ? 'filled' : 'empty'}`}>
        {isFilled ? '★' : '☆'}
      </span>
    );
  }
  return <span className="stars" aria-label={`${value} star option`}>{stars}</span>;
}

// 15 questions; each option text aligns to 1..5 stars (1 = most productive)
const QUESTIONS = [
  {
    text: 'How many dishes did you wash today?',
    options: [
      'All of them — Dishwashing ninja!',
      'Half of the pile — Trying, kind of',
      'One or two — Just to show you cared',
      'None, but I looked at them seriously',
      'Sink is a swimming pool, and I’m the lifeguard',
    ],
  },
  {
    text: 'What happened with your morning alarm?',
    options: [
      'Up on the first beep — who needs snooze?',
      'Snoozed once — just to feel alive',
      'Snoozed thrice — a respectful negotiation',
      'Turned it off — fate will wake me',
      'Alarm now fears me — I woke up tomorrow',
    ],
  },
  {
    text: 'How’s your email situation?',
    options: [
      'Inbox Zero — I am order incarnate',
      'Replied to the important stuff',
      'Marked as unread to “circle back”',
      'Archived everything — out of sight, out of mind',
      'Auto-reply: “Who dis?”',
    ],
  },
  {
    text: 'Gym or movement today?',
    options: [
      'Full workout — sweat achieved',
      'Walked a solid 20 minutes',
      'Did 3 stretches and called it balance',
      'Thought about it with intensity',
      'Lifted snacks repeatedly — gains are gains',
    ],
  },
  {
    text: 'Made your bed this morning?',
    options: [
      'Yes, military crisp — bounce-a-coin level',
      'Mostly — the blanket is “abstract art”',
      'Pillows are in the vicinity',
      'It’s a duvet island in a sheet ocean',
      'What is a bed but a suggestion?',
    ],
  },
  {
    text: 'How did your to-do list go?',
    options: [
      'Crushed it — every checkbox conquered',
      'Most of it — a noble fight',
      'Halfway — progress-ish',
      'Wrote the list — surely counts',
      'Lost the list — destiny chose otherwise',
    ],
  },
  {
    text: 'What was your meeting energy?',
    options: [
      'Contributed ideas and solutions',
      'Nodded thoughtfully on cue',
      'Said “great point” twice — strategic',
      'Camera off, soul off',
      'I was a ghost — present in legend only',
    ],
  },
  {
    text: 'Screen time confession (socials)?',
    options: [
      'Under 30 mins — monk mode',
      'About an hour — civilized scrolling',
      'Two hours — meme anthropology',
      'Three+ hours — infinite doom loop',
      'Time is a construct — I live online now',
    ],
  },
  {
    text: 'Lunch strategy?',
    options: [
      'Cooked a balanced meal — chef vibes',
      'Meal-prepped leftovers like a pro',
      'Microwave masterpiece',
      'Chips and vibes',
      'Forgot to eat — powered by air and chaos',
    ],
  },
  {
    text: 'Laundry status right now?',
    options: [
      'Folded and put away — victory',
      'Clean pile, pending fold — negotiable',
      'Clean pile on chair — modern dresser',
      'Everything in the dryer — storage unit',
      'Wearing the “floor collection”',
    ],
  },
  {
    text: 'Hydration game?',
    options: [
      'Eight glasses? Hydration deity',
      'Water bottle is half full — optimist',
      'Two sips and a promise',
      'Iced coffee counts, right?',
      'Moisturized by vibes alone',
    ],
  },
  {
    text: 'Work output today?',
    options: [
      'Delivered major tasks — chef’s kiss',
      'Made real progress — not bad',
      'Plans made — future you will handle it',
      'Stared at the screen — powerful thinking',
      'Accidentally opened Netflix — research',
    ],
  },
  {
    text: 'Pet care check (or plant)?',
    options: [
      'Walked, fed, watered — thriving',
      'Fed and watered — content',
      'Talked to them about taxes — moral support',
      'Waved from afar — spiritual care',
      'They’re raising me now',
    ],
  },
  {
    text: 'Nap situation today?',
    options: [
      'No nap — focused like a laser',
      'Power nap — tactical reboot',
      'Two naps — strategy unclear',
      'Lost count — blissful mystery',
      'I awoke in a new timeline',
    ],
  },
  {
    text: 'Weekend prep level?',
    options: [
      'Meal plan, cleaned, schedule locked',
      'Some prep — we’ll improvise a little',
      'Prep-ish — vibes and hopes',
      'I prepared to not prepare',
      'Chaos mode unlocked',
    ],
  },
];

function getResultDescriptor(totalScore) {
  if (totalScore <= 25) {
    return {
      title: 'The Hardworking Hustler',
      description:
        'You actually get stuff done — your productivity level makes the rest of us look like sloths. Keep flexing that work muscle, champ!',
      tone: 'success',
    };
  }
  if (totalScore <= 45) {
    return {
      title: 'The Slightly Functional Human',
      description:
        'You do enough to keep people off your back. Not bad, not great — somewhere comfortably in “trying” mode. Could be worse, right?',
      tone: 'success',
    };
  }
  if (totalScore <= 65) {
    return {
      title: 'The Professional “Maybe Tomorrow”',
      description:
        'Your motto is “I’ll do it later.” Tasks fear you; procrastination is your best friend. You float through the day like a casual breeze.',
      tone: 'warn',
    };
  }
  if (totalScore <= 75) {
    return {
      title: 'The Certified Couch Potato',
      description:
        'If there was an Olympic event for chilling, you’d have the gold medal. Productivity? Nah. You’ve mastered the art of couch surfing like a pro.',
      tone: 'danger',
    };
  }
  // This final range is unreachable with 15 questions, but included per spec.
  return {
    title: 'The King/Queen of Doing Nothing',
    description:
      'You make laziness look like an art form. NASA wants to study your energy conservation techniques. Teach us your ways, oh mighty sloth!',
    tone: 'danger',
  };
}

function Landing({ onStart }) {
  return (
    <div className="container">
      <div className="card">
        <div className="header">
          <h1 className="title">Comic Productivity Survey</h1>
          <p className="subtitle">15 questions. 5-star chaos. Find out your vibe.</p>
        </div>
        <div className="hero">
          <img alt="comic splash" src="https://images.unsplash.com/photo-1534796636912-3b95b3ab5986?q=80&w=1200&auto=format&fit=crop" style={{ width: '100%', borderRadius: 16, boxShadow: 'var(--shadow)' }} />
          <p>Rate your day the honest way — from “I did everything” to “my couch knows me by name.”</p>
          <div className="actions">
            <button className="btn" onClick={onStart}>
              <span>🚀</span>
              <span>Start Survey</span>
            </button>
            <a className="btn ghost" href="/leaderboard.html" aria-label="See Leaderboard">
              <span>🏆</span>
              <span>See Leaderboard</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

function Survey({ questions, onComplete }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState([]);
  const totalQuestions = questions.length;

  const handleSelect = (stars) => {
    const updated = [...answers, stars];
    setAnswers(updated);
    if (currentIndex + 1 < totalQuestions) {
      setCurrentIndex(currentIndex + 1);
    } else {
      const totalScore = updated.reduce((sum, n) => sum + n, 0);
      onComplete({ answers: updated, totalScore });
    }
  };

  const progressPercent = Math.round(((currentIndex) / totalQuestions) * 100);
  const q = questions[currentIndex];

  return (
    <div className="container">
      <div className="card">
        <div className="meta">
          <div>Question {currentIndex + 1} / {totalQuestions}</div>
          <div>{progressPercent}% done</div>
        </div>
        <div className="progress" aria-hidden>
          <div className="bar" style={{ width: `${progressPercent}%` }} />
        </div>

        <div className="question">{q.text}</div>
        <div className="options">
          {q.options.map((text, index) => {
            const stars = index + 1; // 1..5
            return (
              <button key={index} className="option" onClick={() => handleSelect(stars)}>
                <Stars value={stars} />
                <span className="option-text">{text}</span>
              </button>
            );
          })}
        </div>

        <p className="footer-note">Pick one — lower stars = more productive, higher stars = master of chill.</p>
      </div>
    </div>
  );
}

function Results({ totalScore, onRetake }) {
  const { title, description, tone } = useMemo(() => getResultDescriptor(totalScore), [totalScore]);
  return (
    <div className="container">
      <div className="card">
        <div className="header">
          <h2 className="title">Your Results</h2>
          <p className="subtitle">The stars have spoken.</p>
        </div>

        <div className="result-banner">
          <div className="score-pill">
            <span>⭐</span>
            <strong>Total Stars:</strong>
            <span>{totalScore}</span>
          </div>
          <div className={`badge ${tone}`}>
            <span>{tone === 'success' ? '💪' : tone === 'warn' ? '🌀' : '🥔'}</span>
            <span>{title}</span>
          </div>
        </div>

        <div className="divider"></div>
        <p>{description}</p>

        <div className="actions">
          <button className="btn secondary" onClick={() => (window.location.href = '/leaderboard.html')}>
            <span>🏆</span>
            <span>See Leaderboard</span>
          </button>
          <button className="btn" onClick={onRetake}>
            <span>🔁</span>
            <span>Retake Survey</span>
          </button>
        </div>
      </div>
    </div>
  );
}

function App() {
  const [phase, setPhase] = useState('landing'); // 'landing' | 'survey' | 'results'
  const [totalScore, setTotalScore] = useState(null);

  const startSurvey = () => setPhase('survey');
  const handleComplete = ({ answers, totalScore }) => {
    setTotalScore(totalScore);
    setPhase('results');
  };
  const retake = () => {
    setTotalScore(null);
    setPhase('survey');
  };

  if (phase === 'landing') return <Landing onStart={startSurvey} />;
  if (phase === 'survey') return <Survey questions={QUESTIONS} onComplete={handleComplete} />;
  return <Results totalScore={totalScore} onRetake={retake} />;
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);