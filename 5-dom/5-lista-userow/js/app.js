document.addEventListener('DOMContentLoaded', function() {
    const userList = document.querySelector('.user-list');
    const form = document.querySelector('.form');
    
    // Obsługa formularza
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const name = this.elements.name.value.trim();
        const phone = this.elements.phone.value.trim();
        
        if (name === '' || phone === '') {
            alert('Proszę wypełnić wszystkie pola!');
            return;
        }
        
        // Utwórz nowego użytkownika
        const li = document.createElement('li');
        li.className = 'user';
        
        li.innerHTML = `
            <div class="user-data">
                <div class="user-name">${name}</div>
                <div class="user-phone">${phone}</div>
            </div>
            <button type="button" class="btn user-delete">
                Usuń
            </button>
        `;
        
        userList.appendChild(li);
        this.reset();
        this.elements.name.focus();
    });
    
    // Obsługa usuwania
    userList.addEventListener('click', function(e) {
        if (e.target.classList.contains('user-delete')) {
            e.target.closest('.user').remove();
        }
    });
});