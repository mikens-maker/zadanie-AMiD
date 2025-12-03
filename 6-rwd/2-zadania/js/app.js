document.addEventListener('DOMContentLoaded', function() {
    const element = document.querySelector('.element');
    const minWidth = 600; // Próg dla dużych ekranów
    
    // Funkcja do aktualizacji rozmiarów okna w elemencie
    function updateWindowSize() {
        const width = window.innerWidth;
        const height = window.innerHeight;
        
        // Zadanie 1: Aktualizuj tekst tylko dla ekranów > 600px
        if (width > minWidth) {
            element.textContent = `${width}x${height}`;
        } else {
            element.textContent = ''; // Usuń tekst dla małych ekranów
        }
        
        // Zadanie 2: Zmień kolor tła dla małych ekranów
        if (width <= minWidth) {
            element.style.backgroundColor = 'blue';
        } else {
            element.style.backgroundColor = 'orangered'; // Przywróć domyślny kolor
        }
    }
    
    // Zadanie 2: Obsługa kliknięcia na div
    function handleClick() {
        // Sprawdź czy ekran jest większy niż 600px
        if (window.innerWidth > minWidth) {
            const width = window.innerWidth;
            const height = window.innerHeight;
            console.log(`Rozmiar okna: ${width}x${height}px`);
        }
        // Dla ekranów ≤ 600px kliknięcie nie działa (nic się nie dzieje)
    }
    
    // Inicjalizacja
    updateWindowSize(); // Ustaw początkowy tekst
    element.addEventListener('click', handleClick); // Dodaj nasłuchiwanie kliknięć
    window.addEventListener('resize', updateWindowSize); // Aktualizuj przy zmianie rozmiaru
    
    // Opcjonalnie: Dodajemy też obsługę orientacji dla urządzeń mobilnych
    window.addEventListener('orientationchange', function() {
        // Małe opóźnienie, aby rozmiary się zaktualizowały
        setTimeout(updateWindowSize, 100);
    });
});