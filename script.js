document.addEventListener('DOMContentLoaded', () => {
  const calendar = document.getElementById('calendar');
  const quoteOverlay = document.getElementById('quoteOverlay');
  const quoteText = document.getElementById('quoteText');
  const quoteAuthor = document.getElementById('quoteAuthor');
  const gameOverScreen = document.getElementById('gameOver');
  const gameOverBtn = document.getElementById('gameOverBtn');
  const daysCount = document.getElementById('daysCount');

  const startDate = new Date(2025, 5, 8); // 8 junio 2025
  const TOTAL_DAYS = 21;
  const storageKey = 'calendarioSinDulces';
  const savedState = JSON.parse(localStorage.getItem(storageKey)) || {};

  const quotes = [
    { text: "No hay errores en la vida, solo lecciones.", author: "Robin Sharma", book: "El monje que vendió su Ferrari" },
    { text: "La felicidad no es algo hecho. Proviene de tus propias acciones.", author: "Dalai Lama", book: "The Art of Happiness" },
    { text: "Tú debes ser el cambio que deseas ver en el mundo.", author: "Mahatma Gandhi", book: "Collected Works" },
    { text: "El propósito de la vida es una vida con propósito.", author: "Robin Sharma", book: "El monje que vendió su Ferrari" },
    { text: "Haz lo que puedas, con lo que tengas, donde estés.", author: "Theodore Roosevelt", book: "The Strenuous Life" },
    { text: "La motivación es lo que te pone en marcha, el hábito es lo que hace que sigas.", author: "Jim Ryun", book: "" },
    { text: "Cuida tus pensamientos, se convierten en tus palabras.", author: "Robin Sharma", book: "El monje que vendió su Ferrari" },
    { text: "No cuentes los días, haz que los días cuenten.", author: "Muhammad Ali", book: "" },
    { text: "El futuro pertenece a quienes creen en la belleza de sus sueños.", author: "Eleanor Roosevelt", book: "" },
    { text: "Cuando realmente deseas algo, el universo conspira para ayudarte.", author: "Paulo Coelho", book: "El Alquimista" },
    { text: "La disciplina tarde o temprano vencerá a la inteligencia.", author: "Jim Rohn", book: "" },
    { text: "El único modo de hacer un gran trabajo es amar lo que haces.", author: "Steve Jobs", book: "" },
    { text: "Una meta sin un plan es solo un deseo.", author: "Antoine de Saint-Exupéry", book: "El Principito" },
    { text: "No importa lo lento que vayas, mientras no te detengas.", author: "Confucio", book: "" },
    { text: "No desistas de tus sueños. Sigue las señales.", author: "Paulo Coelho", book: "El Alquimista" },
    { text: "Nuestro mayor miedo no es que seamos inadecuados, sino que somos poderosos más allá de toda medida.", author: "Marianne Williamson", book: "A Return to Love" },
    { text: "Empieza donde estás. Usa lo que tienes. Haz lo que puedas.", author: "Arthur Ashe", book: "" },
    { text: "Lo que no nos mata nos hace más fuertes.", author: "Friedrich Nietzsche", book: "" },
    { text: "El miedo a sufrir es peor que el sufrimiento mismo.", author: "Paulo Coelho", book: "El Alquimista" },
    { text: "Si puedes soñarlo, puedes hacerlo.", author: "Walt Disney", book: "" },
    { text: "La única manera de hacer realidad lo imposible es creer que es posible.", author: "Lewis Carroll", book: "Alicia en el país de las maravillas" }
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
        const quote = quotes[i];
        quoteText.innerText = `\"${quote.text}\"`;
        quoteAuthor.innerText = `– ${quote.author}${quote.book ? ", " + quote.book : ""}`;
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
