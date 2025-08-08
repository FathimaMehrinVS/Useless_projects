// Comic Productivity Survey App
// Handles landing -> survey -> results flow with star-based questions

// 15 questions, each with 5 comic options (1 star = productive, 5 stars = lazy)
const questions = [
  {
    text: "How many dishes did you wash today?",
    options: [
      "All of them — Dishwashing ninja!",
      "Half of the pile — Trying, kind of",
      "One or two — Just to show you cared",
      "None, but I looked at them seriously",
      "Sink is a swimming pool, and I’m the lifeguard",
    ],
  },
  {
    text: "Your morning alarm went off. You…",
    options: [
      "Got up on the first beep — hero arc unlocked",
      "Hit snooze once — classic warmup",
      "Snoozed a few times — negotiation phase",
      "Turned it off — new timeline begins",
      "Threw the phone — destiny delayed",
    ],
  },
  {
    text: "That email your boss sent…",
    options: [
      "Replied immediately, with bullet points",
      "Drafted a reply, sent after a coffee",
      "Flagged it for later (hopefully)",
      "Marked as unread for dramatic effect",
      "Closed laptop — if I can’t see it, it can’t see me",
    ],
  },
  {
    text: "Gym plans today?",
    options: [
      "Crushed a workout — sweat and glory",
      "Walked or stretched — wholesome vibes",
      "Considered going — intent counts",
      "Carried groceries — functional fitness",
      "I exercised my right to rest",
    ],
  },
  {
    text: "Laundry situation?",
    options: [
      "Washed, dried, folded, and put away — legendary",
      "Washed and dried — 80% is enough",
      "It’s washed… somewhere in a chair",
      "Mountain of clean clothes, no folding in sight",
      "I live out of The Pile™",
    ],
  },
  {
    text: "How tidy is your workspace?",
    options: [
      "Minimalist masterpiece — everything sparkles",
      "Mostly clean with a snack wrapper boss",
      "Organized chaos — emphasis on chaos",
      "Somewhere under these papers is my desk",
      "Archaeologists have started a dig",
    ],
  },
  {
    text: "Water intake today?",
    options: [
      "Hydration station — 8+ glasses",
      "Sipped steadily — plant-like",
      "Had water when coffee ran out",
      "Counted soup as hydration",
      "Does ice cream count? Asking for a friend",
    ],
  },
  {
    text: "Dinner plans?",
    options: [
      "Cooked a real meal — chef’s kiss",
      "Simple but homemade — wholesome",
      "Microwave magic — beep boop dinner",
      "Cereal o’clock — no regrets",
      "Air was delicious tonight",
    ],
  },
  {
    text: "Side project progress?",
    options: [
      "Shipped a feature — commits and glory",
      "Small improvements — brick by brick",
      "Opened the repo and stared at it",
      "Wrote a sticky note that says ‘soon’",
      "I had an idea… and then a nap",
    ],
  },
  {
    text: "How many browser tabs are open?",
    options: [
      "Under 5 — focused like a laser",
      "Around 10 — manageable chaos",
      "15–25 — tabs are friends",
      "26–50 — the fan is getting louder",
      "50+ — my laptop is a space heater now",
    ],
  },
  {
    text: "Social media time today?",
    options: [
      "Checked for 5 mins and bailed",
      "A few scrolls during breaks",
      "Accidentally fell into a reel or two",
      "Time lost to the algorithm void",
      "I reached the end of the internet",
    ],
  },
  {
    text: "Meeting starts at 10. You arrive…",
    options: [
      "At 9:55 — early and caffeinated",
      "At 10:00 — punctual perfection",
      "At 10:03 — fashionably late",
      "At 10:10 — creative timekeeping",
      "I emailed ‘technical difficulties’",
    ],
  },
  {
    text: "To‑do list status?",
    options: [
      "Everything checked — inbox zero energy",
      "Most done — only dragons remain",
      "Half done — balancing act",
      "Wrote the list — progress-ish",
      "Wrote ‘make to‑do list’ and took a nap",
    ],
  },
  {
    text: "How often did you stretch today?",
    options: [
      "Multiple stretch breaks — flexible legend",
      "A couple of good ones — spine says thanks",
      "One stretch while waiting on the kettle",
      "Stretched… my excuses",
      "I am one with the chair now",
    ],
  },
  {
    text: "That one annoying chore at home?",
    options: [
      "Did it immediately — who am I",
      "Did it before bed — victory lap",
      "Put it on tomorrow’s list",
      "Moved it to next week like a pro",
      "Renamed it ‘Future Me’s Problem’",
    ],
  },
];

// DOM elements
const landingSection = document.getElementById('landing');
const surveySection = document.getElementById('survey');
const resultsSection = document.getElementById('results');

const startBtn = document.getElementById('startBtn');
const nextBtn = document.getElementById('nextBtn');
const retakeBtn = document.getElementById('retakeBtn');
const leaderboardBtn = document.getElementById('leaderboardBtn');

const questionNumberEl = document.getElementById('questionNumber');
const progressBarEl = document.getElementById('progressBar');
const questionTextEl = document.getElementById('questionText');
const optionsForm = document.getElementById('optionsForm');

const totalScoreEl = document.getElementById('totalScore');
const resultBlurbEl = document.getElementById('resultBlurb');

// App state
let currentIndex = 0;
let answers = []; // stores selected star (1-5) per question index

function showSection(section) {
  // Simple view switcher
  for (const node of [landingSection, surveySection, resultsSection]) {
    node.classList.add('hidden');
    node.classList.remove('active');
  }
  section.classList.remove('hidden');
  section.classList.add('active');
}

function startSurvey() {
  currentIndex = 0;
  answers = new Array(questions.length).fill(null);
  showSection(surveySection);
  renderQuestion();
}

function renderQuestion() {
  const q = questions[currentIndex];
  questionNumberEl.textContent = String(currentIndex + 1);
  const progress = ((currentIndex) / questions.length) * 100;
  progressBarEl.style.width = `${progress}%`;

  // Render question text
  questionTextEl.textContent = q.text;

  // Render options as radio buttons with star visuals
  optionsForm.innerHTML = '';
  optionsForm.setAttribute('aria-label', `Star rating for: ${q.text}`);

  for (let i = 1; i <= 5; i++) {
    const optionId = `q${currentIndex}-opt${i}`;
    const wrapper = document.createElement('div');
    wrapper.className = 'option';

    const input = document.createElement('input');
    input.type = 'radio';
    input.name = `q${currentIndex}`;
    input.value = String(i);
    input.id = optionId;

    const label = document.createElement('label');
    label.className = 'option-label';
    label.setAttribute('for', optionId);

    const stars = document.createElement('span');
    stars.className = 'stars';
    stars.textContent = '★'.repeat(i);

    const text = document.createElement('span');
    text.textContent = q.options[i - 1];

    label.appendChild(stars);
    label.appendChild(text);

    wrapper.appendChild(input);
    wrapper.appendChild(label);
    optionsForm.appendChild(wrapper);

    // Pre-select if previously answered
    if (answers[currentIndex] === i) {
      input.checked = true;
    }

    // Enable Next when selected
    input.addEventListener('change', () => {
      nextBtn.disabled = false;
    });
  }

  // Disable next until a choice is made
  const alreadySelected = typeof answers[currentIndex] === 'number';
  nextBtn.disabled = !alreadySelected;

  // Change button text on last question
  nextBtn.textContent = currentIndex === questions.length - 1 ? 'See Results ⭐' : 'Next ▶';
}

function captureAnswerAndContinue() {
  // Find selected radio
  const selected = optionsForm.querySelector('input[type="radio"]:checked');
  if (!selected) return; // guard
  const stars = Number(selected.value); // 1..5
  answers[currentIndex] = stars;

  // If last question, show results; else next
  if (currentIndex === questions.length - 1) {
    showResults();
  } else {
    currentIndex += 1;
    renderQuestion();
  }
}

function computeTotalScore() {
  return answers.reduce((sum, v) => sum + (typeof v === 'number' ? v : 0), 0);
}

function getDescription(total) {
  // Map total star score to funny description
  if (total >= 15 && total <= 25) {
    return "The Hardworking Hustler - You actually get stuff done — your productivity level makes the rest of us look like sloths. Keep flexing that work muscle, champ!";
  }
  if (total >= 26 && total <= 45) {
    return "The Slightly Functional Human - You do enough to keep people off your back. Not bad, not great — somewhere comfortably in “trying” mode. Could be worse, right?";
  }
  if (total >= 46 && total <= 65) {
    return "The Professional ‘Maybe Tomorrow’ - Your motto is “I’ll do it later.” Tasks fear you; procrastination is your best friend. You float through the day like a casual breeze.";
  }
  if (total >= 66 && total <= 75) {
    return "The Certified Couch Potato - If there was an Olympic event for chilling, you’d have the gold medal. Productivity? Nah. You’ve mastered the art of couch surfing like a pro.";
  }
  if (total >= 76 && total <= 85) {
    return "The King/Queen of Doing Nothing - You make laziness look like an art form. NASA wants to study your energy conservation techniques. Teach us your ways, oh mighty sloth!";
  }
  // Fallback (shouldn't happen with 15 questions)
  return "Result out of range — you broke the scale with your mysterious energy.";
}

function showResults() {
  const total = computeTotalScore();
  totalScoreEl.textContent = String(total);
  resultBlurbEl.textContent = getDescription(total);

  // Save last score so leaderboard can optionally show it
  try {
    localStorage.setItem('surveyLastScore', String(total));
  } catch (e) {
    // ignore storage errors
  }

  progressBarEl.style.width = '100%';
  showSection(resultsSection);
}

function retakeSurvey() {
  // Clear saved score but keep it for leaderboard if user wants
  showSection(landingSection);
}

// Navigation handlers
startBtn.addEventListener('click', startSurvey);
nextBtn.addEventListener('click', (e) => {
  e.preventDefault();
  captureAnswerAndContinue();
});
leaderboardBtn.addEventListener('click', () => {
  window.location.href = '/leaderboard.html';
});
retakeBtn.addEventListener('click', retakeSurvey);

// Keyboard accessibility: Enter advances when a radio is focused
optionsForm?.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') {
    const selected = optionsForm.querySelector('input[type="radio"]:checked');
    if (selected) {
      e.preventDefault();
      captureAnswerAndContinue();
    }
  }
});