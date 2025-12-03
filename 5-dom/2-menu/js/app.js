document.addEventListener('DOMContentLoaded', function() {
    const nav = document.querySelector('.nav');
    
    nav.addEventListener('click', function(e) {
        // Sprawdź czy kliknięto na element .nav-el
        const clickedItem = e.target.closest('.nav-el');
        
        if (clickedItem) {
            e.preventDefault();
            
            // Usuń klasę active z aktualnie aktywnego elementu
            const currentActive = document.querySelector('.nav-el-active');
            if (currentActive) {
                currentActive.classList.remove('nav-el-active');
            }
            
            // Dodaj klasę active do klikniętego elementu
            clickedItem.classList.add('nav-el-active');
        }
    });
});