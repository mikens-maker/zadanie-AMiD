document.addEventListener('DOMContentLoaded', function() {
    const addButton = document.getElementById('add');
    const list = document.querySelector('.list');
    const template = document.getElementById('elementInner');
    
    // Dodawanie nowego elementu
    addButton.addEventListener('click', function() {
        const elements = list.querySelectorAll('.element');
        const newNum = elements.length + 1;
        
        const newElement = document.createElement('div');
        newElement.className = 'element';
        newElement.innerHTML = template.innerHTML.replace('1', newNum);
        
        list.appendChild(newElement);
    });
    
    // Obsługa klonowania i usuwania
    list.addEventListener('click', function(e) {
        const element = e.target.closest('.element');
        if (!element) return;
        
        // Usuwanie
        if (e.target.classList.contains('delete')) {
            element.remove();
            updateNumbers();
        }
        
        // Klonowanie
        if (e.target.classList.contains('clone')) {
            const clone = element.cloneNode(true);
            list.appendChild(clone);
            updateNumbers();
        }
    });
    
    // Aktualizacja numerów
    function updateNumbers() {
        const elements = list.querySelectorAll('.element');
        elements.forEach((el, i) => {
            const nr = el.querySelector('.nr');
            if (nr) nr.textContent = i + 1;
        });
    }
});