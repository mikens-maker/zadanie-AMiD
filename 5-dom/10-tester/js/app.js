// ==================== ZADANIE 1 ====================
function addRandomOutlines() {
    // Pobierz wszystkie elementy w body
    const allElements = document.body.querySelectorAll('*');
    
    // Dla każdego elementu
    allElements.forEach(element => {
        // Wylosuj liczbę 0-360
        const randomHue = Math.floor(Math.random() * 361);
        
        // Zapisz w atrybucie data-my-debug-color
        element.dataset.myDebugColor = randomHue;
        
        // Ustaw obramowanie
        element.style.outline = `2px solid hsl(${randomHue}, 100%, 60%)`;
        element.style.outlineOffset = '-1px'; // Aby outline nie nakładał się na border
    });
}

// ==================== ZADANIE 1b ====================
function addDebugTooltip() {
    // Najpierw dodajmy obramowania (zadanie 1)
    addRandomOutlines();
    
    // Stwórz tooltip
    const tooltip = document.createElement('div');
    tooltip.id = 'debug-tooltip';
    tooltip.style.cssText = `
        position: fixed;
        top: -9999px;
        right: 10px;
        background: rgba(0, 0, 0, 0.8);
        color: white;
        padding: 8px 12px;
        border-radius: 4px;
        font-family: monospace;
        font-size: 12px;
        z-index: 999999;
        pointer-events: none;
        max-width: 300px;
        white-space: pre-wrap;
        box-shadow: 0 2px 10px rgba(0,0,0,0.3);
    `;
    document.body.appendChild(tooltip);
    
    // Obsługa mouseover
    document.body.addEventListener('mouseover', function(e) {
        const element = e.target;
        
        // Pobierz kolor z dataset
        const hue = element.dataset.myDebugColor || '0';
        
        // Dodaj tło
        element.style.backgroundColor = `hsla(${hue}, 100%, 60%, 0.2)`;
        
        // Pobierz wymiary
        const rect = element.getBoundingClientRect();
        
        // Przygotuj tekst tooltipa
        const tooltipText = `
Element: ${element.tagName.toLowerCase()}${element.id ? '#' + element.id : ''}${element.className ? '.' + element.className.split(' ').join('.') : ''}
Wymiary: ${Math.round(rect.width)}px × ${Math.round(rect.height)}px
Pozycja: ${Math.round(rect.left)}px, ${Math.round(rect.top)}px
`;
        
        // Ustaw tooltip
        tooltip.textContent = tooltipText;
        tooltip.style.top = '10px';
        
        // Event mouseout dla danego elementu
        element.addEventListener('mouseout', function onMouseOut() {
            // Usuń tło
            element.style.backgroundColor = '';
            
            // Ukryj tooltip
            tooltip.style.top = '-9999px';
            
            // Usuń nasłuchiwanie, aby nie kumulować eventów
            element.removeEventListener('mouseout', onMouseOut);
        }, { once: true }); // Opcja { once: true } sprawia, że event zostanie usunięty po jednym wykonaniu
    });
}

// ==================== ZADANIE 2 (Bookmarklet - kod do skompresowania) ====================
function createBookmarklet1() {
    const allElements = document.body.querySelectorAll('*');
    allElements.forEach(element => {
        const randomHue = Math.floor(Math.random() * 361);
        element.dataset.myDebugColor = randomHue;
        element.style.outline = `2px solid hsl(${randomHue}, 100%, 60%)`;
        element.style.outlineOffset = '-1px';
    });
}

// ==================== ZADANIE 3a (Bookmarklet - usuwanie styli) ====================
function removeAllStyles() {
    // Usuń wszystkie linki do CSS
    document.querySelectorAll('link[rel="stylesheet"]').forEach(link => link.remove());
    
    // Usuń wszystkie style inline
    document.querySelectorAll('style').forEach(style => style.remove());
    
    // Usuń atrybuty style ze wszystkich elementów
    document.querySelectorAll('*').forEach(el => el.removeAttribute('style'));
}

// ==================== ZADANIE 3b (Bookmarklet - informacje debugowe) ====================
function showDebugInfo() {
    console.clear();
    
    // 1. Liczba wszystkich elementów w body
    const allElements = document.body.querySelectorAll('*');
    console.log(`Liczba wszystkich elementów w BODY: ${allElements.length}`);
    
    // 2. Liczba linków z podziałem
    const allLinks = document.querySelectorAll('a');
    let internalLinks = 0;
    let externalLinks = 0;
    
    allLinks.forEach(link => {
        const href = link.getAttribute('href') || '';
        if (href.startsWith('http://') || href.startsWith('https://')) {
            externalLinks++;
        } else if (href.startsWith('#') || href.startsWith('/') || href.includes('.html') || href.includes('.php')) {
            internalLinks++;
        }
    });
    
    console.log(`Liczba linków: ${allLinks.length}`);
    console.log(`  - wewnętrzne: ${internalLinks}`);
    console.log(`  - zewnętrzne: ${externalLinks}`);
    
    // 3. Liczba grafik bez alt
    const allImages = document.querySelectorAll('img');
    const imagesWithoutAlt = Array.from(allImages).filter(img => !img.alt || img.alt.trim() === '');
    console.log(`Liczba grafik: ${allImages.length}`);
    console.log(`  - bez atrybutu alt: ${imagesWithoutAlt.length}`);
    
    // 4. Liczba nagłówków i ich lista
    const headings = document.querySelectorAll('h1, h2, h3, h4, h5, h6');
    console.log(`Liczba nagłówków: ${headings.length}`);
    
    headings.forEach(heading => {
        const level = heading.tagName.toLowerCase();
        const text = heading.textContent.trim().substring(0, 50); // Ogranicz do 50 znaków
        console.log(`  ${level.toUpperCase()} -> ${text}${text.length >= 50 ? '...' : ''}`);
    });
    
    // Dodatkowo: wypisz w alert
    const info = `
Liczba elementów: ${allElements.length}
Linki: ${allLinks.length} (wewnętrzne: ${internalLinks}, zewnętrzne: ${externalLinks})
Grafiki: ${allImages.length} (bez alt: ${imagesWithoutAlt.length})
Nagłówki: ${headings.length}
`;
    alert(info);
}

// ==================== URUCHOMIENIE (do testowania) ====================
document.addEventListener('DOMContentLoaded', function() {
    // Możesz odkomentować poniższe linie aby przetestować funkcje
    
    // Zadanie 1:
    // addRandomOutlines();
    
    // Zadanie 1b:
    // addDebugTooltip();
    
    // Zadanie 3a:
    // removeAllStyles();
    
    // Zadanie 3b:
    // showDebugInfo();
});