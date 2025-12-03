document.addEventListener('DOMContentLoaded', function() {
    const menu = document.querySelector('ul');
    const items = menu.querySelectorAll('li');
    const links = menu.querySelectorAll('a');
    
    // 1. Dodanie klasy .menu
    menu.classList.add('menu');
    
    // 2-4. Dodanie klas
    items[0].classList.add('first');
    items[items.length - 1].classList.add('last');
    items[2].classList.add('active');
    
    // 5. Kolor tekstu dla aktywnego
    items[2].style.color = '#fff';
    
    // 6-7. Ustawienie atrybutów dla linków
    links.forEach(link => {
        const text = link.textContent.trim();
        link.title = `Przejdź na stronę ${text}`;
        link.href = '#';
    });
    
    // 8. Zdarzenia click
    links.forEach(link => {
        const parent = link.parentElement;
        
        if (!parent.classList.contains('active')) {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                alert(`Kliknięto ${this.textContent.trim()}`);
            });
        } else {
            // 9. Dla aktywnego - tylko preventDefault
            link.addEventListener('click', function(e) {
                e.preventDefault();
            });
        }
    });
    
    console.log('Menu zostało skonfigurowane!');
});