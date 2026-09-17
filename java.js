
document.addEventListener('DOMContentLoaded', () => {
    // Lock scroll initially if envelope overlay present
    if (document.getElementById('envelope-overlay')) {
        document.body.classList.add('lock-scroll');
    }

    const envelopeOverlay = document.getElementById('envelope-overlay');
    const mainEnvelope = document.getElementById('main-envelope');

    if (mainEnvelope) {
        mainEnvelope.addEventListener('click', () => {
            mainEnvelope.classList.add('open');
            setTimeout(() => {
                if (envelopeOverlay) envelopeOverlay.classList.add('fade-out');
                document.body.classList.remove('lock-scroll');
            }, 500);
        });
    }

    // Safe RSVP form handling (only attach if present)
    const rsvpForm = document.getElementById('fullRsvpForm') || document.getElementById('rsvpForm');
    if (rsvpForm) {
        rsvpForm.addEventListener('submit', (e) => {
            e.preventDefault();
            rsvpForm.innerHTML = `
                <div class="rsvp-thank">
                    <div class="portfolio__ornament" style="margin-top: 6px;">❧ ⚜ ☙</div>
                    <p class="rsvp-thank__msg">Thank you! Your noble response has been safely delivered via royal letter.</p>
                </div>
            `;
            // ensure the new content is announced to screen readers
            rsvpForm.setAttribute('aria-live', 'polite');
        });
    }

    // IntersectionObserver for scroll animations
    const animatedItems = document.querySelectorAll('.animate-on-scroll');
    if (animatedItems.length) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('in-view');
                    // Optionally unobserve to animate only once
                    observer.unobserve(entry.target);
                }
            });
        }, { root: null, rootMargin: '0px 0px -8% 0px', threshold: 0.12 });

        animatedItems.forEach(el => observer.observe(el));
    }
});
// НАСТРОЙКА ПЛЕЕРА И КОНВЕРТА
document.body.classList.add('lock-scroll');

const envelopeOverlay = document.getElementById('envelope-overlay');
const mainEnvelope = document.getElementById('main-envelope');
const music = document.getElementById('weddingMusic');
const musicBtn = document.getElementById('music-btn');

// Функция включения/выключения музыки на кнопке
function toggleMusic() {
    if (music.paused) {
        music.play();
        musicBtn.classList.add('playing');
    } else {
        music.pause();
        musicBtn.classList.remove('playing');
    }
}

// Открытие конверта при старте
mainEnvelope.addEventListener('click', () => {
    // Включаем музыку и запускаем вращение диска
    if (music) {
        music.play().then(() => {
            musicBtn.classList.add('playing');
        }).catch(error => {
            console.log("Автовоспроизведение заблокировано:", error);
        });
    }

    mainEnvelope.classList.add('open');
    setTimeout(() => {
        envelopeOverlay.classList.add('fade-out');
        document.body.classList.remove('lock-scroll');
    }, 500);
});

// Клик по самой кнопке-диску в углу экрана (Вкл / Выкл)
musicBtn.addEventListener('click', (e) => {
    e.stopPropagation(); // Защита от багов клика
    toggleMusic();
});

// Ждем, пока абсолютно весь контент (включая картинки и музыку) полностью загрузится
window.addEventListener('load', () => {
    const preloader = document.getElementById('site-preloader');
    
    // Добавляем задержку в 800мс, чтобы гости успели насладиться красивой анимацией
    setTimeout(() => {
        if (preloader) {
            preloader.classList.add('disappear');
        }
    }, 800);
});
// 5. BEZPIECZNA WYSYŁKA ANKIETY NA E-MAIL BEZ WYCHODZENIA ZE STRONY
const rsvpForm = document.getElementById('fullRsvpForm');

if (rsvpForm) {
    rsvpForm.addEventListener('submit', function(e) {
        e.preventDefault(); // Blokujemy tradycyjne przeładowanie strony

        const data = new FormData(rsvpForm);
        const actionUrl = rsvpForm.getAttribute('action');

        // Wysyłamy dane w tle za pomocą technologii AJAX (fetch)
        fetch(actionUrl, {
            method: 'POST',
            body: data,
            headers: {
                'Accept': 'application/json'
            }
        }).then(response => {
            if (response.ok) {
                // Po udanej wysyłce pokazujemy piękne podziękowanie dworskie
                rsvpForm.innerHTML = `
                    <div class="footer-decor" style="font-size: 28px; margin-top: 20px;">❧ ⚜ ☙</div>
                    <p style="font-style: italic; font-size: 18px; color: #4a148c; margin-top: 15px; font-family: 'Playfair Display', serif;">
                        Thank you! Your noble response has been safely delivered via royal letter.
                    </p>
                `;
            } else {
                alert('Oops! Coś poszło nie tak. Spróbuj wysłać ankietę ponownie.');
            }
        }).catch(error => {
            alert('Błąd sieci. Sprawdź swoje połączenie z internetem.');
        });
    });
}
// ========================================== */
// LICZNIK CZASU DO ŚLUBU (DATA: 20.07.2027)  */
// ========================================== */

// Ustawienie daty ślubu: Rok, Miesiąc (0-11), Dzień, Godzina, Minuta
const weddingDate = new Date(2027, 6, 20, 16, 0, 0).getTime(); 

const timerInterval = setInterval(() => {
    const now = new Date().getTime();
    const timeLeft = weddingDate - now;

    // Gdy data minie
    if (timeLeft < 0) {
        clearInterval(timerInterval);
        const activeLangEl = document.querySelector('#lang-switcher a.active');
        const currentLang = activeLangEl ? activeLangEl.getAttribute('data-lang') : 'en';
        
        let endMessage = "The Royal Celebration Has Begun!";
        if (currentLang === 'ua') endMessage = "Королівське свято розпочалося!";
        if (currentLang === 'ru') endMessage = "Королевский праздник начался!";

        document.querySelector('.countdown-grid').innerHTML = `<p style='font-style:italic; font-size: 20px; color: #4a148c;'>${endMessage}</p>`;
        return;
    }

    // Wyliczanie dni, godzin, minut i sekund
    const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
    const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

    // Dodawanie zera z przodu, jeśli liczba jest jednocyfrowa (np. 05 zamiast 5)
    document.getElementById('days').innerText = days < 10 ? '0' + days : days;
    document.getElementById('hours').innerText = hours < 10 ? '0' + hours : hours;
    document.getElementById('minutes').innerText = minutes < 10 ? '0' + minutes : minutes;
    document.getElementById('seconds').innerText = seconds < 10 ? '0' + seconds : seconds;
}, 1000);
