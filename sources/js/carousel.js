const carousel = () => {
    const buttons = document.querySelectorAll('[data-carousel-button]');
    buttons.forEach(button => {
        button.addEventListener("click", () => {
            const offset = button.dataset.carouselButton === "next" ? 1 : -1;
            const slides = button.closest("[data-slides]").querySelectorAll(".product");
            const activeSlides = button.closest("[data-slides]").querySelectorAll("[data-active]");
            const lastIndex = [...slides].length - 1;

            // 4 active slides [0, 1, 2]
            let firstActiveIndex = [...slides].indexOf(activeSlides[0]);
            let lastActiveIndex = [...slides].indexOf(activeSlides[3]);
            
            // // show next slides
            if (offset === 1 && lastActiveIndex === lastIndex) {
                // delete 4 last slides
                let a = 0;
                while (a <= 3) { 
                    delete slides[lastIndex - a].dataset.active;
                    a++;
                }
                // back to 4 first slides
                let b = 0;
                while (b <= 3) { 
                    slides[b].dataset.active = true;
                    b++;
                }
            } else if (offset === 1) {
                delete slides[firstActiveIndex].dataset.active;
                slides[lastActiveIndex + offset].dataset.active = true; 
            // show previous slides    
            } else if (offset === -1 && lastActiveIndex === 3) {
                // delete 4 first slides
                let a = 0;
                while (a <= 3) { 
                    delete slides[a].dataset.active;
                    a++;
                }             
                // back to 4 last slides
                let b = 0;
                while (b <= 3) { 
                    slides[lastIndex - b].dataset.active = true;
                    b++;
                }                            
            } else if (offset === -1) {
                delete slides[lastActiveIndex].dataset.active;
                slides[firstActiveIndex + offset].dataset.active = true;
            } else {
            }
        })
    })
}

export default carousel;