const map = L.map('mapid').setView([51.919437, 19.145136], 5);

L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
    maxZoom: 18,
    id: 'mapbox.streets',
    accessToken: 'pk.eyJ1Ijoia2FydG9mZWxlazAwNyIsImEiOiJjanRpazhyM2owbHUwNDluem40Ynljdm5hIn0.kYoJkNni5ksRyA0gy1yV7A'
}).addTo(map);

/*--------------------------------------------------------------------------------------------------------
 !!! powyzszego nie ruszaj, to mapa wstawiona za pomocą leafletjs
 wzorowana na tutorialu ze strony: https://leafletjs.com/examples/quick-start/
 Skrypt pisz poniżej
 --------------------------------------------------------------------------------------------------------*/

document.addEventListener('DOMContentLoaded', function() {
    const countrySelect = document.getElementById('countrySelect');
    const countryFlag = document.getElementById('countryFlag');
    const countryData = document.getElementById('countryData');
    
    // Zadanie 1: Pobierz dane krajów i wypełnij select
    async function loadCountries() {
        try {
            console.log('Pobieram listę krajów...');
            
            const response = await fetch('https://restcountries.com/v3.1/all');
            
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            
            const countries = await response.json();
            
            // Sortuj kraje alfabetycznie
            countries.sort((a, b) => {
                const nameA = a.name.common || '';
                const nameB = b.name.common || '';
                return nameA.localeCompare(nameB);
            });
            
            // Wygeneruj opcje dla selecta
            countries.forEach(country => {
                const countryName = country.name.common;
                const option = document.createElement('option');
                option.value = countryName;
                option.textContent = countryName;
                countrySelect.appendChild(option);
            });
            
            // Aktywuj selekt
            countrySelect.disabled = false;
            console.log(`Załadowano ${countries.length} krajów`);
            
            // Ustaw domyślną wartość na Polskę (jeśli istnieje)
            const polandIndex = Array.from(countrySelect.options).findIndex(
                option => option.value === 'Poland'
            );
            if (polandIndex !== -1) {
                countrySelect.selectedIndex = polandIndex;
                // Wywołaj zmianę dla domyślnego kraju
                handleCountryChange();
            }
            
        } catch (error) {
            console.error('Błąd podczas pobierania krajów:', error);
            countrySelect.innerHTML = '<option value="">Błąd pobierania danych</option>';
        }
    }
    
    // Zadanie 2, 3, 4: Obsługa zmiany kraju
    async function handleCountryChange() {
        const selectedCountry = countrySelect.value;
        
        if (!selectedCountry) {
            return;
        }
        
        console.log(`Pobieram dane dla: ${selectedCountry}`);
        
        try {
            const response = await fetch(`https://restcountries.com/v3.1/name/${encodeURIComponent(selectedCountry)}?fullText=true`);
            
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            
            const data = await response.json();
            
            // UWAGA: Odpowiedź to TABLICA z 1 obiektem
            const country = data[0];
            
            // Zadanie 3: Zmień flagę
            if (country.flags && country.flags.png) {
                countryFlag.src = country.flags.png;
                countryFlag.alt = `Flaga ${country.name.common}`;
            }
            
            // Zadanie 2: Wypełnij dane kraju
            const capital = country.capital ? country.capital[0] : 'Brak danych';
            const region = country.region || 'Brak danych';
            const subregion = country.subregion || 'Brak danych';
            const population = country.population ? country.population.toLocaleString() : 'Brak danych';
            const timezones = country.timezones ? country.timezones.join(', ') : 'Brak danych';
            
            // Formatowanie walut
            let currencies = 'Brak danych';
            if (country.currencies) {
                const currencyCodes = Object.keys(country.currencies);
                currencies = currencyCodes.map(code => {
                    const currency = country.currencies[code];
                    return `${currency.name} (${currency.symbol || ''})`;
                }).join(', ');
            }
            
            // Formatowanie języków
            let languages = 'Brak danych';
            if (country.languages) {
                languages = Object.values(country.languages).join(', ');
            }
            
            countryData.innerHTML = `
                <h3 class="country-name">${country.name.common}</h3>
                <div>
                    Pełna nazwa: <strong>${country.name.official || 'Brak danych'}</strong>
                </div>
                <div>
                    Stolica: <strong>${capital}</strong>
                </div>
                <div>
                    Region: <strong>${region}</strong>
                </div>
                <div>
                    Podregion: <strong>${subregion}</strong>
                </div>
                <div>
                    Liczba ludności: <strong>${population}</strong>
                </div>
                <div>
                    Strefa czasowa: <strong>${timezones}</strong>
                </div>
                <div>
                    Waluta: <strong>${currencies}</strong>
                </div>
                <div>
                    Języki: <strong>${languages}</strong>
                </div>
            `;
            
            // Zadanie 4: Wycentruj mapę na kraju
            if (country.latlng && country.latlng.length >= 2) {
                const [lat, lng] = country.latlng;
                map.setView([lat, lng], 5);
                console.log(`Ustawiono mapę na: ${lat}, ${lng}`);
                
                // Dodaj marker na mapie
                L.marker([lat, lng])
                    .addTo(map)
                    .bindPopup(`<b>${country.name.common}</b><br>${capital}`)
                    .openPopup();
            } else {
                console.warn('Brak danych o współrzędnych dla kraju:', selectedCountry);
            }
            
        } catch (error) {
            console.error('Błąd podczas pobierania danych kraju:', error);
            countryData.innerHTML = `
                <h3 class="country-name">Błąd</h3>
                <div>Nie udało się pobrać danych dla kraju: ${selectedCountry}</div>
            `;
        }
    }
    
    // Inicjalizacja
    loadCountries();
    
    // Nasłuchiwanie zmiany w select
    countrySelect.addEventListener('change', handleCountryChange);
});