
  ///////////////
  ///navigatie///
  //////////////

// Variabelen voor navigatie en scroll
const nav = document.querySelector('.container-menu');
let lastScrollY = window.scrollY;

// Event listener voor scrollen
window.addEventListener('scroll', () => {
    // Get the mobile menu
    const mobileMenu = document.querySelector('.mobile-menu');
    // Als mobiel menu open is, doe niets
    if (mobileMenu && mobileMenu.classList.contains('open')) {
        return;
    }
    // Anders, normale logica
    if (window.scrollY > lastScrollY) {
        // Naar beneden gescrold
        nav.classList.add('hidden');
    } else {
        // Naar boven gescrold
        nav.classList.remove('hidden');
    }
    lastScrollY = window.scrollY;
});

document.addEventListener("DOMContentLoaded", () => {
  const workLink = document.getElementById("work-link");
  const aboutLink = document.getElementById("about-link");

  if (workLink && aboutLink) {
    workLink.addEventListener("click", (e) => {
      if (workLink.getAttribute("href") === "#") {
        e.preventDefault();
        workLink.classList.add("active");
        workLink.classList.remove("inactive");
        aboutLink.classList.add("inactive");
        aboutLink.classList.remove("active");
      }
      // else: allow navigation!
    });

    aboutLink.addEventListener("click", (e) => {
      if (aboutLink.getAttribute("href") === "#") {
        e.preventDefault();
        aboutLink.classList.add("active");
        aboutLink.classList.remove("inactive");
        workLink.classList.add("inactive");
        workLink.classList.remove("active");
      }
      // else: allow navigation!
    });
  }
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

  // Null check to avoid JS error!
  if (scrollTextContainer) {
    seeObserver.observe(scrollTextContainer);
  } else {
    console.warn('scrollTextContainer not found!');
  }

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

///////////////////////////////
////////kleur overgang//////////
///////////////////////////////

// Hex to RGB
function hexToRgb(hex) {
  hex = hex.replace('#', '');
  if (hex.length === 3) hex = hex.split('').map(c => c + c).join('');
  let num = parseInt(hex, 16);
  return [
    (num >> 16) & 255,
    (num >> 8) & 255,
    num & 255
  ];
}

// Interpolate between two RGB colors
function interpolateColor(color1, color2, factor) {
  return color1.map((c, i) => Math.round(c + (color2[i] - c) * factor));
}

// Convert RGB array to CSS string
function rgbToCss(rgb) {
  return `rgb(${rgb[0]},${rgb[1]},${rgb[2]})`;
}

// Only run if body does NOT have .no-bg-effect
function shouldUpdateBackground() {
  return !document.body.classList.contains('no-bg-effect');
}

function updateBackground() {
  if (!shouldUpdateBackground()) return; // Skip effect on About Me page

  const scrollY = window.scrollY;
  const docHeight = document.documentElement.scrollHeight - window.innerHeight;
  const scrollProgress = docHeight === 0 ? 0 : scrollY / docHeight;

  const colorStart = hexToRgb('#f7f6f5');
  const colorMiddle = hexToRgb('#F2C7BD'); // Remove space!
  const colorEnd = hexToRgb('#474747');

  let bgColor;
  if (scrollProgress < 0.5) {
    // First half: start → middle
    const factor = scrollProgress / 0.5; // 0 to 1
    bgColor = interpolateColor(colorStart, colorMiddle, factor);
  } else {
    // Second half: middle → end
    const factor = (scrollProgress - 0.5) / 0.5; // 0 to 1
    bgColor = interpolateColor(colorMiddle, colorEnd, factor);
  }
  document.body.style.background = rgbToCss(bgColor);
}

window.addEventListener('scroll', updateBackground);
window.addEventListener('resize', updateBackground);
window.addEventListener('DOMContentLoaded', updateBackground);

///////////////////////
////////Underline scroll///////
//////////////////////////////

document.addEventListener('DOMContentLoaded', function () {
    const section = document.querySelector('.freetime-work-section');
    const h4 = section.querySelector('h4');
    const ps = section.querySelectorAll('p');

    // Color values: black to pink for h4, dark gray to pink for p
    const colorStartH4 = [0, 0, 0];             // #000
    const colorEndH4 = [242, 199, 189];         // #F2C7BD
    const colorStartP = [34, 34, 34];           // #222
    const colorEndP = [242, 199, 189];          // #F2C7BD

    function interpolateColor(color1, color2, factor) {
      return color1.map((c, i) => Math.round(c + (color2[i] - c) * factor));
    }
    function rgbToCss(rgb) {
      return `rgb(${rgb[0]},${rgb[1]},${rgb[2]})`;
    }

    function updateOnScroll() {
      const rect = section.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      if (rect.top < windowHeight && rect.bottom > 0) {
        let visibleFraction = 1 - Math.min(Math.max(rect.top / windowHeight, 0), 1);

        // H4 color
        const newColorH4 = interpolateColor(colorStartH4, colorEndH4, visibleFraction);
        h4.style.color = rgbToCss(newColorH4);
        h4.style.setProperty('--underline-scale', visibleFraction);
        h4.classList.add('underline-animated');

        // P color
        ps.forEach(p => {
          const newColorP = interpolateColor(colorStartP, colorEndP, visibleFraction);
          p.style.color = rgbToCss(newColorP);
        });

      } else {
        h4.style.color = '';
        h4.style.setProperty('--underline-scale', 0);
        h4.classList.remove('underline-animated');
        ps.forEach(p => {
          p.style.color = '';
        });
      }
    }

    window.addEventListener('scroll', updateOnScroll);
    window.addEventListener('resize', updateOnScroll);
    updateOnScroll();
  });

/////////////////////////////////
//////Soepel scroll effect///////
/////////////////////////////////

//laad page weer bij begin//
if ('scrollRestoration' in history) {
    history.scrollRestoration = 'manual';
}

//////////////////////////////////
///////hamburger menu////////////
////////////////////////////////

document.addEventListener('DOMContentLoaded', function () {
    const menuToggle = document.querySelector('.menu-toggle');
    const mobileMenu = document.querySelector('.mobile-menu');
    const menuOverlay = document.querySelector('.menu-overlay');
    const navLinks = document.querySelectorAll('.mobile-nav-links a');
  
    function toggleMenu(open) {
      if (open) {
        console.log('toggleMenu:', open);
        menuToggle.classList.add('open');
        mobileMenu.classList.add('open');
        menuOverlay.classList.add('open');
        document.body.style.overflow = 'hidden';
      } else {
        menuToggle.classList.remove('open');
        mobileMenu.classList.remove('open');
        menuOverlay.classList.remove('open');
        document.body.style.overflow = '';
      }
    }
  
    menuToggle.addEventListener('click', () => {
      const isOpen = menuToggle.classList.contains('open');
      toggleMenu(!isOpen);
    });
  
    menuOverlay.addEventListener('click', () => {
      toggleMenu(false);
    });
  
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        toggleMenu(false);
      });
    });
  
    document.addEventListener('keydown', e => {
      if (e.key === 'Escape') {
        toggleMenu(false);
      }
    });
  });