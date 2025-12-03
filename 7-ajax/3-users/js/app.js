document.addEventListener('DOMContentLoaded', () => {
    const usersList = document.getElementById('usersList');
    const userTemplate = document.getElementById('templateElement');
    const postTemplate = document.getElementById('templatePost');
    const usersEndpoint = 'https://jsonplaceholder.typicode.com/users';
    const postsEndpoint = 'https://jsonplaceholder.typicode.com/posts';

    // Zadanie 1: Pobierz i wyświetl użytkowników
    async function fetchUsers() {
        try {
            const response = await fetch(usersEndpoint);
            const users = await response.json();
            
            console.log('Pobrani użytkownicy:', users);
            
            users.forEach(user => {
                const article = document.createElement('article');
                article.className = 'user-cnt';
                article.dataset.id = user.id;
                
                // Klonowanie i wypełnianie szablonu
                const clone = document.importNode(userTemplate.content, true);
                
                clone.querySelector('.user-name').textContent = user.name;
                clone.querySelector('.user-phone').textContent = user.phone;
                clone.querySelector('.user-email').textContent = user.email;
                clone.querySelector('.user-email').href = `mailto:${user.email}`;
                
                article.appendChild(clone);
                usersList.appendChild(article);
            });
            
            initPostsButtons();
        } catch (error) {
            console.error('Błąd podczas pobierania użytkowników:', error);
        }
    }

    // Zadanie 2: Obsługa pokazywania/ukrywania postów
    function initPostsButtons() {
        const buttons = document.querySelectorAll('.user-show-posts');
        
        buttons.forEach(button => {
            button.addEventListener('click', togglePosts);
        });
    }

    async function togglePosts(event) {
        const button = event.target;
        const article = button.closest('.user-cnt');
        const postsContainer = article.querySelector('.user-posts');
        const userId = article.dataset.id;
        
        // Jeśli posty są już załadowane - tylko pokaż/ukryj
        if (postsContainer.hasAttribute('data-loaded')) {
            toggleVisibility(postsContainer, button);
            return;
        }
        
        // Jeśli posty nie są załadowane - pobierz i wyświetl
        button.textContent = 'Loading...';
        button.disabled = true;
        
        try {
            const response = await fetch(`${postsEndpoint}?userId=${userId}`);
            const posts = await response.json();
            
            // Wyczyść kontener i dodaj posty
            postsContainer.innerHTML = '';
            
            posts.forEach(post => {
                const li = document.createElement('li');
                li.className = 'post';
                
                const clone = document.importNode(postTemplate.content, true);
                
                clone.querySelector('.post-title').textContent = post.title;
                clone.querySelector('.post-body').textContent = post.body;
                
                li.appendChild(clone);
                postsContainer.appendChild(li);
            });
            
            // Oznacz jako załadowane i pokaż
            postsContainer.setAttribute('data-loaded', 'true');
            toggleVisibility(postsContainer, button);
            
        } catch (error) {
            console.error('Błąd podczas pobierania postów:', error);
            button.textContent = 'Error! Try again';
        } finally {
            button.disabled = false;
        }
    }

    function toggleVisibility(postsContainer, button) {
        const isVisible = postsContainer.style.display === 'block';
        
        if (isVisible) {
            postsContainer.style.display = 'none';
            button.textContent = 'Show posts';
        } else {
            postsContainer.style.display = 'block';
            button.textContent = 'Hide posts';
        }
    }

    // Start aplikacji
    fetchUsers();
});