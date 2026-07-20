const cards = document.querySelectorAll('.glass-card');

cards.forEach(card => {
  card.addEventListener('click', () => {
    const isActive = card.classList.contains('active');

    cards.forEach(c => c.classList.remove('active'));

    if (!isActive) {
      card.classList.add('active');
    }
  });
});

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
    }
  });
}, {
  threshold: 0.35
});

document.querySelectorAll(".step").forEach(step => {
  observer.observe(step);
});

const steps = document.querySelectorAll('.step');

steps.forEach((step, index) => {
  step.addEventListener('mouseenter', () => {
    const number = step.querySelector('span');
    if (number) {
      number.animate(
        [
          { transform: 'scale(1)', filter: 'brightness(1)' },
          { transform: 'scale(1.15)', filter: 'brightness(1.6)' },
          { transform: 'scale(1)', filter: 'brightness(1)' }
        ],
        {
          duration: 500,
          easing: 'ease-out'
        }
      );
    }
  });
});