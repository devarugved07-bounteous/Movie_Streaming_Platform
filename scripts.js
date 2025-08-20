const carousel = document.getElementById('movie-carousel');
const nextBtn = document.getElementById('next');

let movies = [];
let currentIndex = 0;
const cardWidth = 190;

async function fetchMovies() {
    try {
        const response = await fetch('https://www.omdbapi.com/?apikey=943946bf&s=Hacker');
        const data = await response.json();

        if (data.Response === "True") {
            movies = data.Search.slice(0, 10);
            populateCarousel();
        } else {
            carousel.innerHTML = '<p>No movies found.</p>';
        }
    } catch (error) {
        carousel.innerHTML = '<p>Error loading movies.</p>';
        console.error(error);
    }
}


function populateCarousel() {
    carousel.innerHTML = '';

    movies.forEach(movie => {
        const card = document.createElement('div');
        card.classList.add('movie-card');
        card.innerHTML = `
      <img src="${movie.Poster !== "N/A" ? movie.Poster : 'https://via.placeholder.com/180x270?text=No+Image'}" alt="Image not found" />
      <p>${movie.Title} (${movie.Year})</p>
    `;
        carousel.appendChild(card);
    });

    updateCarouselPosition();
}

function updateCarouselPosition() {
    carousel.style.transform = `translateX(-${currentIndex * cardWidth}px)`;
}

nextBtn.addEventListener('click', () => {
    if (currentIndex < movies.length - 5) {
        currentIndex++;
        updateCarouselPosition();
    }
});


setInterval(() => {
    if (currentIndex < movies.length - 5) {
        currentIndex++;
    } else {
        currentIndex = 0;
    }
    updateCarouselPosition();
}, 10000);

document.querySelectorAll('.faq-question').forEach(btn => {
    btn.addEventListener('click', () => {
        const answer = btn.nextElementSibling;
        const isOpen = answer.style.display === 'block';
        answer.style.display = isOpen ? 'none' : 'block';
    });
});

document.getElementById('subscription-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    const emailInput = document.getElementById('email');
    await fetch('https://email-subscribe-app.vercel.app/api/subscribe', {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email: emailInput.value })
    }).then(response => {
        if (response.ok) {
            alert('Subscription successful!');
        } else {
            alert('Subscription failed.');
        }
        return response.json();
    }).then(data => {
        console.log(data.message);
    });
});

const heroCarousel = document.getElementById('hero-carousel');
let heroIndex = 0;

function updateHeroCarousel() {
    heroCarousel.style.transform = `translateX(-${heroIndex * 100}%)`;
}

setInterval(() => {
    heroIndex = (heroIndex + 1) % 3;
    updateHeroCarousel();
}, 2000);


fetchMovies();
