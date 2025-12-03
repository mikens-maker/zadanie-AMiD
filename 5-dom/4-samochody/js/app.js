document.addEventListener('DOMContentLoaded', function() {
    const toggleButtons = document.querySelectorAll('.car-toggle-detail');
    
    toggleButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Znajdź rodzica .car dla tego przycisku
            const carElement = this.closest('.car');
            
            // Znajdź element .car-detail w tym samochodzie
            const carDetail = carElement.querySelector('.car-detail');
            
            // Sprawdź czy detale są aktualnie widoczne
            const isVisible = carDetail.style.display === 'block';
            
            if (isVisible) {
                // Schowaj detale
                carDetail.style.display = 'none';
                this.textContent = 'Pokaż detale';
                carElement.classList.remove('car-show-detail');
            } else {
                // Pokaż detale
                carDetail.style.display = 'block';
                this.textContent = 'Schowaj detale';
                carElement.classList.add('car-show-detail');
            }
        });
    });
});