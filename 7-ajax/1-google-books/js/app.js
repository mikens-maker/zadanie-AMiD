document.addEventListener('DOMContentLoaded', function() {
    const searchForm = document.getElementById('searchForm');
    const searchInput = document.getElementById('search');
    
    // Obsługa formularza
    searchForm.addEventListener('submit', function(e) {
        e.preventDefault(); // Zatrzymaj domyślne wysłanie formularza
        
        const searchTerm = searchInput.value.trim();
        
        if (!searchTerm) {
            alert('Wpisz tytuł do wyszukania');
            return;
        }
        
        const apiUrl = `https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(searchTerm)}`;
        
        console.log(`Szukam książek: "${searchTerm}"`);
        
        // Uruchom wszystkie metody - wybierz jedną do testowania
        fetchBooksXMLHttpRequest(apiUrl);
        // fetchBooksFetch(apiUrl);
        // fetchBooksAxios(apiUrl);
        // fetchBooksJQuery(apiUrl); // Wymaga załadowania jQuery
    });
    
    // ============== METODA 1: XMLHttpRequest ==============
    function fetchBooksXMLHttpRequest(url) {
        console.log('Używam XMLHttpRequest...');
        
        const xhr = new XMLHttpRequest();
        
        xhr.open('GET', url, true);
        
        xhr.onload = function() {
            if (xhr.status >= 200 && xhr.status < 300) {
                const data = JSON.parse(xhr.responseText);
                displayBooks(data, 'XMLHttpRequest');
            } else {
                console.error('XMLHttpRequest error:', xhr.statusText);
            }
        };
        
        xhr.onerror = function() {
            console.error('XMLHttpRequest network error');
        };
        
        xhr.send();
    }
    
    // ============== METODA 2: Fetch API ==============
    function fetchBooksFetch(url) {
        console.log('Używam Fetch API...');
        
        fetch(url)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.json();
            })
            .then(data => {
                displayBooks(data, 'Fetch API');
            })
            .catch(error => {
                console.error('Fetch API error:', error);
            });
    }
    
    // ============== METODA 3: Axios (już załadowany z CDN) ==============
    function fetchBooksAxios(url) {
        console.log('Używam Axios...');
        
        axios.get(url)
            .then(response => {
                displayBooks(response.data, 'Axios');
            })
            .catch(error => {
                console.error('Axios error:', error);
            });
    }
    
    // ============== METODA 4: jQuery AJAX (wymaga załadowania jQuery) ==============
    function fetchBooksJQuery(url) {
        console.log('Używam jQuery AJAX...');
        
        // Ta metoda wymaga załadowania jQuery
        if (typeof $ === 'undefined') {
            console.error('jQuery nie jest załadowany!');
            return;
        }
        
        $.ajax({
            url: url,
            method: 'GET',
            dataType: 'json',
            success: function(data) {
                displayBooks(data, 'jQuery AJAX');
            },
            error: function(jqXHR, textStatus, errorThrown) {
                console.error('jQuery AJAX error:', textStatus, errorThrown);
            }
        });
    }
    
    // ============== FUNKCJA WSPÓLNA DO WYŚWIETLANIA WYNIKÓW ==============
    function displayBooks(data, methodName) {
        console.log(`\n=== Wyniki (${methodName}) ===`);
        
        if (!data.items || data.items.length === 0) {
            console.log('Brak wyników wyszukiwania');
            return;
        }
        
        console.log(`Znaleziono ${data.items.length} książek:`);
        
        data.items.forEach((item, index) => {
            const volumeInfo = item.volumeInfo;
            const title = volumeInfo.title || 'Brak tytułu';
            const authors = volumeInfo.authors ? volumeInfo.authors.join(', ') : 'Brak autora';
            
            console.log(`${index + 1}. "${title}" - ${authors}`);
        });
        
        // Dodatkowo: wypisz tylko tytuły (zgodnie z zadaniem)
        console.log('\n--- Tylko tytuły ---');
        data.items.forEach((item, index) => {
            const title = item.volumeInfo.title || 'Brak tytułu';
            console.log(`${index + 1}. ${title}`);
        });
    }
});