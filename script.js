document.addEventListener('DOMContentLoaded', () => {
  const calendar = document.getElementById('calendar');
  const quoteOverlay = document.getElementById('quoteOverlay');
  const quoteText = document.getElementById('quoteText');
  const quoteAuthor = document.getElementById('quoteAuthor');
  const gameOverScreen = document.getElementById('gameOver');
  const gameOverBtn = document.getElementById('gameOverBtn');
  const daysCount = document.getElementById('daysCount');

  const startDate = new Date(2025, 5, 8);
  const TOTAL_DAYS = 21;
  const storageKey = 'calendarioSinDulces';
  const savedState = JSON.parse(localStorage.getItem(storageKey)) || {};

  const quotes = [
    { text: "El secreto para salir adelante es comenzar.", author: "Mark Twain", book: "Autobiography of Mark Twain" },
    { text: "La felicidad no es algo hecho. Proviene de tus propias acciones.", author: "Dalai Lama", book: "The Art of Happiness" },
    { text: "Tú debes ser el cambio que deseas ver en el mundo.", author: "Mahatma Gandhi", book: "Collected Works" },
    { text: "Todo lo que puedas imaginar es real.", author: "Pablo Picasso", book: "Picasso on Art" },
    { text: "Haz lo que puedas, con lo que tengas, donde estés.", author: "Theodore Roosevelt", book: "The Strenuous Life" }
  ];

  let successCount = 0;

  for (let i = 0; i < TOTAL_DAYS; i++) {
    const dayDate = new Date(startDate);
    dayDate.setDate(startDate.getDate() + i);
    const dayStr = dayDate.toLocaleDateString('es-ES', { day: 'numeric', month: 'short' });

    const dayDiv = document.createElement('div');
    dayDiv.className = 'day';

    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.id = `day${i}`;

    const label = document.createElement('label');
    label.htmlFor = checkbox.id;
    label.innerText = `Día ${i + 1} (${dayStr}) sin dulces`;

    if (savedState[`day${i}`]) {
      checkbox.checked = true;
      successCount++;
    }

    checkbox.addEventListener('change', () => {
      savedState[`day${i}`] = checkbox.checked;
      localStorage.setItem(storageKey, JSON.stringify(savedState));

      successCount = Object.values(savedState).filter(v => v).length;
      daysCount.textContent = successCount;

      if (checkbox.checked) {
        const quote = quotes[Math.floor(Math.random() * quotes.length)];
        quoteText.innerText = `"${quote.text}"`;
        quoteAuthor.innerText = `- ${quote.author}, ${quote.book}`;
        quoteOverlay.classList.add('active');
        setTimeout(() => quoteOverlay.classList.remove('active'), 6000);
      }
    });

    dayDiv.appendChild(checkbox);
    dayDiv.appendChild(label);
    calendar.appendChild(dayDiv);
  }

  daysCount.textContent = successCount;

  gameOverBtn.addEventListener('click', () => {
    localStorage.removeItem(storageKey);
    gameOverScreen.style.display = 'flex';
  });
});
