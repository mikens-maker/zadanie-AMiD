document.addEventListener('DOMContentLoaded', function() {
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                // Przewiń do sekcji
                targetSection.scrollIntoView({ behavior: 'smooth' });
                
                // Zaktualizuj aktywne zakładki
                document.querySelectorAll('.nav-el').forEach(item => {
                    item.classList.remove('nav-el-active');
                });
                this.parentElement.classList.add('nav-el-active');
            }
        });
    });
});