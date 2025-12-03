document.addEventListener('DOMContentLoaded', () => {
    const API_URL = 'http://localhost:3000/users';
    const ITEMS_PER_PAGE = 10;
    
    // Elementy DOM
    const form = document.querySelector('.form');
    const tableBody = document.querySelector('.tab tbody');
    const tabContainer = document.querySelector('.tab-cnt');
    const prevBtn = document.getElementById('prev');
    const nextBtn = document.getElementById('next');
    const tableHeaders = document.querySelectorAll('.tab th[data-id]');
    
    // Stan aplikacji
    let currentPage = 1;
    let totalPages = 1;
    let currentSort = { field: null, order: null };
    let currentFilters = {};
    
    // Inicjalizacja
    init();
    
    function init() {
        loadUsers();
        setupEventListeners();
    }
    
    function setupEventListeners() {
        // Formularz filtrowania
        form.addEventListener('submit', handleFormSubmit);
        form.addEventListener('reset', handleFormReset);
        
        // Przyciski stronicowania
        prevBtn.addEventListener('click', () => changePage(-1));
        nextBtn.addEventListener('click', () => changePage(1));
        
        // Sortowanie nagłówków
        tableHeaders.forEach(header => {
            header.addEventListener('click', () => handleSort(header.dataset.id));
        });
    }
    
    async function loadUsers() {
        try {
            setLoading(true);
            
            // Budowanie URL z parametrami
            const url = buildApiUrl();
            console.log('Ładuję dane z:', url);
            
            const response = await fetch(url);
            const data = await response.json();
            
            // Pobierz informacje o stronicowaniu z nagłówków
            const linkHeader = response.headers.get('Link');
            totalPages = getTotalPagesFromLinkHeader(linkHeader);
            
            // Renderuj tabelę
            renderTable(data);
            updatePaginationButtons();
            
        } catch (error) {
            console.error('Błąd podczas ładowania danych:', error);
            alert('Wystąpił błąd podczas ładowania danych');
        } finally {
            setLoading(false);
        }
    }
    
    function buildApiUrl() {
        const params = new URLSearchParams();
        
        // Stronicowanie
        params.append('_page', currentPage);
        params.append('_limit', ITEMS_PER_PAGE);
        
        // Sortowanie
        if (currentSort.field && currentSort.order) {
            const sortOrder = currentSort.order === 'desc' ? '_desc' : '';
            params.append('_sort', currentSort.field + sortOrder);
        }
        
        // Filtrowanie
        Object.entries(currentFilters).forEach(([field, value]) => {
            if (value && value.trim() !== '') {
                if (field === 'id') {
                    params.append(field, value);
                } else {
                    params.append(field + '_like', value);
                }
            }
        });
        
        return `${API_URL}?${params.toString()}`;
    }
    
    function getTotalPagesFromLinkHeader(linkHeader) {
        if (!linkHeader) return 1;
        
        const links = linkHeader.split(', ');
        let totalPages = 1;
        
        links.forEach(link => {
            if (link.includes('rel="last"')) {
                const match = link.match(/_page=(\d+)/);
                if (match) {
                    totalPages = parseInt(match[1]);
                }
            }
        });
        
        return totalPages;
    }
    
    function renderTable(users) {
        tableBody.innerHTML = '';
        
        if (users.length === 0) {
            const row = document.createElement('tr');
            const cell = document.createElement('td');
            cell.colSpan = 6;
            cell.textContent = 'Brak danych do wyświetlenia';
            cell.style.textAlign = 'center';
            cell.style.padding = '20px';
            row.appendChild(cell);
            tableBody.appendChild(row);
            return;
        }
        
        users.forEach(user => {
            const row = document.createElement('tr');
            
            // Kolumny odpowiadające nagłówkom
            const columns = [
                user.id,
                user.first_name,
                user.last_name,
                user.email,
                user.gender,
                user.ip_address
            ];
            
            columns.forEach(value => {
                const cell = document.createElement('td');
                cell.textContent = value;
                row.appendChild(cell);
            });
            
            tableBody.appendChild(row);
        });
    }
    
    function updatePaginationButtons() {
        // Przycisk "prev"
        prevBtn.disabled = currentPage <= 1;
        
        // Przycisk "next"
        nextBtn.disabled = currentPage >= totalPages;
        
        console.log(`Strona ${currentPage} z ${totalPages}`);
    }
    
    function handleFormSubmit(e) {
        e.preventDefault();
        
        // Zbierz dane z formularza
        currentFilters = {
            id: document.getElementById('formId').value,
            first_name: document.getElementById('formName').value,
            last_name: document.getElementById('formSurname').value,
            email: document.getElementById('formEmail').value,
            gender: document.getElementById('formGender').value,
            ip_address: document.getElementById('formIp').value
        };
        
        // Resetuj do pierwszej strony przy nowym filtrowaniu
        currentPage = 1;
        
        loadUsers();
    }
    
    function handleFormReset() {
        // Resetuj filtry
        currentFilters = {};
        currentPage = 1;
        
        // Opcjonalnie: resetuj sortowanie
        // currentSort = { field: null, order: null };
        // resetSortHeaders();
        
        loadUsers();
    }
    
    function handleSort(field) {
        // Jeśli kliknięto to samo pole, zmień kolejność
        if (currentSort.field === field) {
            currentSort.order = currentSort.order === 'asd' ? 'desc' : 'asd';
        } else {
            // Jeśli kliknięto nowe pole, ustaw domyślną kolejność
            currentSort.field = field;
            currentSort.order = 'asd';
        }
        
        // Zaktualizuj wizualną reprezentację sortowania
        updateSortHeaders();
        
        loadUsers();
    }
    
    function updateSortHeaders() {
        // Resetuj wszystkie nagłówki
        tableHeaders.forEach(header => {
            header.removeAttribute('data-order');
        });
        
        // Ustaw aktywny nagłówek
        if (currentSort.field) {
            const activeHeader = document.querySelector(`.tab th[data-id="${currentSort.field}"]`);
            if (activeHeader) {
                activeHeader.setAttribute('data-order', currentSort.order);
            }
        }
    }
    
    function resetSortHeaders() {
        tableHeaders.forEach(header => {
            header.removeAttribute('data-order');
        });
        currentSort = { field: null, order: null };
    }
    
    function changePage(direction) {
        const newPage = currentPage + direction;
        
        if (newPage >= 1 && newPage <= totalPages) {
            currentPage = newPage;
            loadUsers();
            
            // Przewiń do góry tabeli
            window.scrollTo({
                top: form.offsetTop,
                behavior: 'smooth'
            });
        }
    }
    
    function setLoading(isLoading) {
        if (isLoading) {
            tabContainer.classList.add('loading-data');
        } else {
            tabContainer.classList.remove('loading-data');
        }
    }
});