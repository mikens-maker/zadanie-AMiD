document.addEventListener('DOMContentLoaded', function() {
    const map = document.querySelector('.map');
    
    // 1) Generowanie markerów dla każdego miasta
    cities.forEach(city => {
        // Tworzymy element <a>
        const marker = document.createElement('a');
        
        // Ustawiamy atrybuty
        marker.href = city.href;
        marker.classList.add('map-marker');
        
        // Używamy dataset do przechowywania danych
        marker.dataset.name = city.name;
        marker.dataset.population = city.population;
        
        // Ustawiamy pozycję za pomocą style
        marker.style.left = city.map_x + 'px';
        marker.style.top = city.map_y + 'px';
        
        // Ustawiamy tekst (niewidoczny przez CSS, ale dostępny dla accessibility)
        marker.textContent = city.name;
        
        // Dodajemy marker do mapy
        map.appendChild(marker);
    });
    
    // 2) Tworzymy tooltip
    const tooltip = document.createElement('div');
    tooltip.classList.add('map-tooltip');
    tooltip.style.left = '-9999px';
    tooltip.style.top = '-9999px';
    map.appendChild(tooltip);
    
    // 3) Łapiemy wszystkie markery
    const markers = document.querySelectorAll('.map-marker');
    
    // Dodajemy event listeners do każdego markera
    markers.forEach(marker => {
        // a) mouseover - pokaż tooltip
        marker.addEventListener('mouseover', function(e) {
            // Wypełniamy tooltip danymi z dataset
            tooltip.innerHTML = `
                <h2>${this.dataset.name}</h2>
                <div>Population: <strong>${this.dataset.population}</strong></div>
            `;
            
            // Pokazujemy tooltip
            tooltip.style.display = 'inline-block';
            
            // Ustawiamy pozycję tooltipa przy pierwszym najechaniu
            updateTooltipPosition(e);
        });
        
        // b) mousemove - aktualizuj pozycję tooltipa
        marker.addEventListener('mousemove', function(e) {
            updateTooltipPosition(e);
        });
        
        // c) mouseout - ukryj tooltip
        marker.addEventListener('mouseout', function() {
            // Ukrywamy tooltip
            tooltip.style.display = 'none';
            tooltip.style.left = '-9999px';
            tooltip.style.top = '-9999px';
            
            // Czyścimy zawartość (opcjonalnie)
            tooltip.innerHTML = '';
        });
    });
    
    // Funkcja pomocnicza do aktualizacji pozycji tooltipa
    function updateTooltipPosition(event) {
        // Pobieramy pozycję kursora względem dokumentu
        const x = event.clientX + 30;
        const y = event.clientY + 30;
        
        // Ustawiamy pozycję tooltipa
        tooltip.style.left = x + 'px';
        tooltip.style.top = y + 'px';
    }
});