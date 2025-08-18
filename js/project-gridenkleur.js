//////////////////////////////////////////////////////////
//////Project 2 schetsen in beeld laten komen//////////////////
////////////////////////////////////////////////////////////

document.addEventListener("DOMContentLoaded", () => {
    const images = document.querySelectorAll(".schets-image");
    const texts = document.querySelectorAll(".schets-text");

    // Controleer of er elementen zijn gevonden voordat je observe toepast
    if (images.length > 0 && texts.length > 0) {
        const options = {
            threshold: 0.2, // Element is zichtbaar bij 20%
        };

        const monitor = new IntersectionObserver((entries, monitor) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("visible");
                    monitor.unobserve(entry.target); // Stop met observeren als het element eenmaal zichtbaar is
                }
            });
        }, options);

        images.forEach(img => {
            if (img) { // Controleer of het element bestaat
                monitor.observe(img);
            }
        });

        texts.forEach(text => {
            if (text) { // Controleer of het element bestaat
                monitor.observe(text);
            }
        });
    } else {
        console.log("Geen beelden of teksten gevonden.");
    }
});

