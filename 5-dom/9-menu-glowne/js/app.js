document.addEventListener('DOMContentLoaded', function() {
    const menu = document.getElementById('menu');
    menu.classList.add('menu');
    
    const menuItems = menu.querySelectorAll('li');
    const menuLinks = menu.querySelectorAll('a');
    
    // Obsługa mouseenter
    menuItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            menuItems.forEach(li => li.classList.remove('active'));
            this.classList.add('active');
        });
    });
    
    // Obsługa kliknięcia
    menuLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const clickedLi = this.parentElement;
            const clickedHref = this.getAttribute('href');
            
            menuItems.forEach(li => li.classList.remove('collapsed'));
            menuItems.forEach(li => {
                if (li !== clickedLi) li.classList.add('collapsed');
            });
            
            clickedLi.classList.add('expand');
            clickedLi.dataset.href = clickedHref;
            
            function handleTransitionEnd(e) {
                if (e.propertyName === 'width' || e.propertyName === 'flex-grow') {
                    clickedLi.removeEventListener('transitionend', handleTransitionEnd);
                    console.log('Href:', clickedHref);
                }
            }
            
            clickedLi.addEventListener('transitionend', handleTransitionEnd);
        });
    });
});