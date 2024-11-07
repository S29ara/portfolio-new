
  ///////////////
  ///navigatie///
  //////////////

      // Variabelen voor navigatie en scroll
      const nav = document.querySelector('.container-menu');
      let lastScrollY = window.scrollY;
  
      // Event listener voor scrollen
      window.addEventListener('scroll', () => {
          if (window.scrollY > lastScrollY) {
              // Als er naar beneden is gescrold
              nav.classList.add('hidden');
          } else {
              // Als er naar boven is gescrold
              nav.classList.remove('hidden');
          }
          // Update lastScrollY
          lastScrollY = window.scrollY;
      });


  document.addEventListener("DOMContentLoaded", () => {
    const workLink = document.getElementById("work-link");
    const aboutLink = document.getElementById("about-link");

    workLink.addEventListener("click", () => {
        workLink.classList.add("active");
        workLink.classList.remove("inactive");
        aboutLink.classList.add("inactive");
        aboutLink.classList.remove("active");
    });

    aboutLink.addEventListener("click", () => {
        aboutLink.classList.add("active");
        aboutLink.classList.remove("inactive");
        workLink.classList.add("inactive");
        workLink.classList.remove("active");
    });
});

    //////////////////////
    /////scroll text//////
    /////////////////////

const scrollTextContainer = document.querySelector('.scroll-text');
const scrollText = document.querySelectorAll('.scroll-text h1'); // NodeList van alle h1-elementen
let scrollPosition = window.scrollY;
let isScrolling = false;

// Functie om de tekstpositie bij te werken
function updateScrollText() {
    scrollText.forEach((text) => {
        // Pas de stijl toe op elk individueel h1-element
        text.style.transform = `translateX(${scrollPosition * 0.3}px)`; // Langzamere scroll-snelheid
    });
    isScrolling = false;
}

// Maak een observer om te kijken of scrollTextContainer in beeld komt
const seeObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            // Wanneer de container in beeld komt, maak het zichtbaar en start de animatie
            scrollTextContainer.style.opacity = 1;

            // Scroll event met debounce
            window.addEventListener('scroll', () => {
                scrollPosition = window.scrollY;

                if (!isScrolling) {
                    window.requestAnimationFrame(updateScrollText);
                    isScrolling = true;
                }
            });

            // Initialiseer de juiste positie bij laden van de pagina
            updateScrollText();

            // Stop de observer na het eerste in beeld komen om performance te verbeteren
            seeObserver.unobserve(scrollTextContainer);
        }
    });
}, { threshold: 0.1 });

// Start het observeren van de scrollTextContainer
seeObserver.observe(scrollTextContainer);

//////////////////////////////
//// zichtbaar projecten ////
////////////////////////////

// Selecteer de project elementen
const projectItems = document.querySelectorAll('.projects-section div');

// Maak een nieuwe Intersection Observer
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        // Check of het element zichtbaar is in de viewport
        if (entry.isIntersecting) {
            entry.target.classList.add('project-visible'); // Voeg de animatieklasse toe
        }
    });
}, {
    threshold: 0.1 // Start de animatie wanneer 10% van het element zichtbaar is
});

// Observeer elk project-item
projectItems.forEach(item => {
    observer.observe(item);
});

///////////////////////////////
/////Hover button project//////
//////////////////////////////

// Selecteer de hover-button en alle project-items
const hoverButton = document.querySelector('.hover-button');
const projectElements = document.querySelectorAll('.project-item'); // Nieuwe constante naam

// Functie om de positie van de hover-button te volgen
function moveButton(e) {
    hoverButton.style.left = `${e.pageX + 10}px`; // 10px offset van de cursor
    hoverButton.style.top = `${e.pageY + 10}px`;
}

// Voeg een event listener toe aan elk project-item
projectElements.forEach(item => { // Gebruik de nieuwe constante
    item.addEventListener('mouseenter', (e) => {
        hoverButton.style.display = 'block'; // Maak de button zichtbaar
        document.addEventListener('mousemove', moveButton); // Laat de button de muis volgen
    });

    item.addEventListener('mouseleave', () => {
        hoverButton.style.display = 'none'; // Verberg de button
        document.removeEventListener('mousemove', moveButton); // Stop het volgen van de muis
    });
});

/////////////////////////////////
////////kleur overgang//////////
///////////////////////////////

document.addEventListener("DOMContentLoaded", function() {
    const section = document.querySelector('.freetime-work-section');
    const heading = section ? section.querySelector('h4') : null;

    console.log("Section:", section);
    console.log("Heading:", heading);

    if (!section || !heading) {
        console.error("Section of heading is niet gevonden.");
        return;
    }

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                section.classList.add('scrolled-in');      // Kleurverandering van de sectie
                heading.classList.add('scrolled-in');      // Animatie voor de lijn in h4
            } else {
                section.classList.remove('scrolled-in');
                heading.classList.remove('scrolled-in');
            }
        });
    }, {
        threshold: 0.5 // De hele sectie moet in beeld zijn
    });

    observer.observe(section);
});


/////////////////////////////////
//////Soepel scroll effect///////
/////////////////////////////////

//laad page weer bij begin//
if ('scrollRestoration' in history) {
    history.scrollRestoration = 'manual';
}
