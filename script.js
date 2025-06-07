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

  // Tu lista de frases se mantiene intacta
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

  // ===== INICIO DEL CAMBIO PRINCIPAL =====
  // El bucle ahora genera la nueva estructura HTML
  for (let i = 0; i < TOTAL_DAYS; i++) {
    const dayDate = new Date(startDate);
    dayDate.setDate(startDate.getDate() + i);
    
    // --- 1. CREACIÓN DE LOS ELEMENTOS ---
    
    // La tarjeta principal
    const dayDiv = document.createElement('div');
    dayDiv.className = 'day';

    // El párrafo para la fecha (ej: "8 de junio")
    const fechaP = document.createElement('p');
    fechaP.className = 'fecha';
    fechaP.textContent = dayDate.toLocaleDateString('es-ES', { day: 'numeric', month: 'long' });
    
    // El contenedor para el check personalizado
    const checkContainer = document.createElement('div');
    checkContainer.className = 'control-check';

    // El checkbox (como lo tenías)
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.id = `day${i}`;
    
    // La etiqueta (label), ahora más simple porque la fecha ya está arriba
    const label = document.createElement('label');
    label.htmlFor = checkbox.id;
    label.innerText = `Día ${i + 1} sin dulces`;
    
    // --- 2. MONTAJE DE LA ESTRUCTURA ---
    // Se añaden el input y el label al contenedor del check
    checkContainer.appendChild(checkbox);
    checkContainer.appendChild(label);
    
    // Se añade la fecha y el contenedor del check a la tarjeta del día
    dayDiv.appendChild(fechaP);
    dayDiv.appendChild(checkContainer);
    
    // Se añade la tarjeta completa al calendario
    calendar.appendChild(dayDiv);

    // --- 3. LÓGICA Y EVENTOS (TU CÓDIGO INTACTO) ---

    // Comprobamos el estado guardado para marcar el día al cargar
    if (savedState[`day${i}`]) {
      checkbox.checked = true;
      checkbox.disabled = true; // Deshabilitamos si ya está guardado
      dayDiv.classList.add('completado'); // Añadimos la clase para el estilo visual
      successCount++;
    }

    // Tu event listener se mantiene igual, con un pequeño añadido
    checkbox.addEventListener('change', () => {
      savedState[`day${i}`] = checkbox.checked;
      localStorage.setItem(storageKey, JSON.stringify(savedState));

      successCount = Object.values(savedState).filter(v => v).length;
      daysCount.textContent = successCount;

      if (checkbox.checked) {
        // AÑADIDO: Activa la animación del CSS
        dayDiv.classList.add('completado');
        checkbox.disabled = true; // Lo deshabilitamos al marcarlo

        // Tu lógica para mostrar la frase
        const quote = quotes[i % quotes.length]; // Usamos % para evitar errores si hay más días que frases
        quoteText.innerText = `\"${quote.text}\"`;
        quoteAuthor.innerText = `– ${quote.author}${quote.book ? ", " + quote.book : ""}`;
        quoteOverlay.classList.add('active');
        
        // Tu lógica para ocultar la frase automáticamente
        setTimeout(() => quoteOverlay.classList.remove('active'), 6000);
      }
      // Nota: la lógica para desmarcar no es necesaria si deshabilitamos el check
    });
  }
  // ===== FIN DEL CAMBIO PRINCIPAL =====

  // Actualizamos el contador inicial
  daysCount.textContent = successCount;

  // Tu botón de Game Over se mantiene intacto
  gameOverBtn.addEventListener('click', () => {
    localStorage.removeItem(storageKey);
    gameOverScreen.style.display = 'flex';
    // Opcional: recargar la página para reiniciar el estado visual
    // setTimeout(() => location.reload(), 1500); 
  });

  // Añadimos un listener para cerrar la frase al hacer clic
  quoteOverlay.addEventListener('click', () => {
    quoteOverlay.classList.remove('active');
  });
});
