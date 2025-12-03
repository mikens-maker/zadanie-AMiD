document.addEventListener('DOMContentLoaded', function() {
    const header = document.querySelector('.header');
    const stickyThreshold = 100; // Próg w px, po którym dodajemy klasę sticky
    const minWidthForSticky = 600; // Minimalna szerokość ekranu dla sticky header
    
    // Funkcja do sprawdzania czy ekran jest wystarczająco szeroki
    function isScreenWideEnough() {
        return window.innerWidth >= minWidthForSticky;
    }
    
    // Funkcja do obsługi przewijania
    function handleScroll() {
        // Sprawdź czy ekran jest wystarczająco szeroki
        if (!isScreenWideEnough()) {
            // Dla małych ekranów usuwamy klasę sticky (jeśli jest)
            if (header.classList.contains('sticky')) {
                header.classList.remove('sticky');
            }
            return; // Nie wykonuj dalszego kodu dla małych ekranów
        }
        
        // Dla dużych ekranów sprawdzamy pozycję przewijania
        const scrollPosition = window.scrollY;
        
        // Debug: wypisz pozycję w konsoli
        console.log('Scroll position:', scrollPosition, 'px');
        
        if (scrollPosition > stickyThreshold) {
            header.classList.add('sticky');
        } else {
            header.classList.remove('sticky');
        }
    }
    
    // Funkcja do obsługi zmiany rozmiaru okna
    function handleResize() {
        // Wywołaj handleScroll aby zaktualizować stan na podstawie aktualnej szerokości
        handleScroll();
    }
    
    // Dodaj nasłuchiwanie zdarzeń
    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleResize);
    
    // Wywołaj funkcję na starcie, aby ustawić początkowy stan
    handleScroll();
    
    // Opcjonalnie: Dodaj informację debugową w konsoli
    console.log('Sticky header script loaded');
    console.log('Sticky threshold:', stickyThreshold, 'px');
    console.log('Min width for sticky:', minWidthForSticky, 'px');
    console.log('Current window width:', window.innerWidth, 'px');
});