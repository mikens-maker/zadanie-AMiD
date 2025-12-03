document.addEventListener('DOMContentLoaded', function() {
    const tabElements = document.querySelectorAll('.tab-el');
    const tabLinks = document.querySelectorAll('.tab-link');
    const tabContents = document.querySelectorAll('.tab-content');
    
    // Obsługa kliknięcia w zakładkę
    tabLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Pobierz ID zakładki z href
            const targetId = this.getAttribute('href').substring(1);
            
            // 1. Usuń klasę aktywną ze wszystkich zakładek
            tabElements.forEach(el => {
                el.classList.remove('tab-el-active');
            });
            
            // 2. Dodaj klasę aktywną do klikniętej zakładki (rodzic LI klikniętego linka)
            this.parentElement.classList.add('tab-el-active');
            
            // 3. Ukryj wszystkie treści zakładek
            tabContents.forEach(content => {
                content.classList.remove('tab-content-active');
            });
            
            // 4. Pokaż treść odpowiadającą klikniętej zakładce
            const targetContent = document.getElementById(targetId);
            if (targetContent) {
                targetContent.classList.add('tab-content-active');
            }
        });
    });
});