//////////////////////////////////////////
////////////Image carousel////////////////
/////////////////////////////////////////

document.addEventListener('DOMContentLoaded', function () {
    // Selecteer de elementen
    const leftArrow = document.querySelector('.carousel-left-arrow');
    const rightArrow = document.querySelector('.carousel-right-arrow');
    const containerSchetsen = document.querySelector('.container-schetsen');

    // Controleer of de elementen bestaan
    if (!leftArrow || !rightArrow || !containerSchetsen) {
        console.error("Een van de vereiste elementen werd niet gevonden in de DOM.");
        return; // Stop de code als de elementen niet bestaan
    }

    // Smooth scrollen naar links
    leftArrow.addEventListener('click', function() {
        containerSchetsen.scrollBy({
            left: -containerSchetsen.clientWidth, 
            behavior: 'smooth'
        });
    });

    // Smooth scrollen naar rechts
    rightArrow.addEventListener('click', function() {
        containerSchetsen.scrollBy({
            left: containerSchetsen.clientWidth, 
            behavior: 'smooth'
        });
    });
});


////////Video laden///////////

document.addEventListener('DOMContentLoaded', function() {
    const video = document.querySelector('.background-video');

    // Zorg ervoor dat de video na het laden van de pagina langzaam inkomt
    video.style.opacity = 1;
});

