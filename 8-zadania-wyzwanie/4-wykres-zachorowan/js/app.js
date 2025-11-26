const API_BASE = 'https://api.covid19api.com';
const chartCanvas = document.querySelector('#myChart');
const form = document.querySelector('#filterForm');
const countrySelect = document.querySelector('#countrySelect');
const dateFromInput = document.querySelector('#dateFrom');
const dateToInput = document.querySelector('#dateTo');

let chartInstance = null;

function formatDate(date) {
    const d = new Date(date);
    let month = '' + (d.getMonth() + 1);
    let day = '' + d.getDate();
    const year = d.getFullYear();

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;

    return [year, month, day].join('-');
}

function setInitialDates() {
    const today = new Date();
    dateToInput.value = formatDate(today);
    dateFromInput.value = '2020-01-01';
}

function processDataForDailyCases(data) {
    const dates = [];
    const dailyCases = [];
    let previousCases = 0;

    data.forEach(item => {
        dates.push(formatDate(item.Date).substring(0, 10));
        const currentCases = item.Cases;
        let newCases = currentCases - previousCases;
        
        if (newCases < 0) { 
            newCases = 0; 
        }

        dailyCases.push(newCases);
        previousCases = currentCases;
    });

    return { dates, dailyCases };
}

function renderChart(dates, data, country) {
    if (chartInstance) {
        chartInstance.destroy();
    }

    chartInstance = new Chart(chartCanvas, {
        type: 'bar',
        data: {
            labels: dates,
            datasets: [{
                label: `Dzienne potwierdzone przypadki w ${country}`,
                data: data,
                backgroundColor: 'rgba(54, 162, 235, 0.5)',
                borderColor: 'rgba(54, 162, 235, 1)',
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true
                    }
                }]
            }
        }
    });
}

async function fetchCovidData(countrySlug, dateFrom, dateTo) {
    const url = `${API_BASE}/country/${countrySlug}/status/confirmed?from=${dateFrom}T00:00:00Z&to=${dateTo}T00:00:00Z`;
    
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error('Błąd ładowania danych: ' + response.statusText);
        }
        const data = await response.json();
        
        if (data.length === 0) {
            if (chartInstance) chartInstance.destroy();
            return;
        }

        const { dates, dailyCases } = processDataForDailyCases(data);
        const countryName = countrySelect.options[countrySelect.selectedIndex].textContent;
        renderChart(dates, dailyCases, countryName);

    } catch (error) {
        console.error('Błąd pobierania danych COVID-19:', error);
    }
}

async function fetchAndPopulateCountries() {
    try {
        const response = await fetch(`${API_BASE}/countries`);
        const countries = await response.json();
        
        countries.sort((a, b) => a.Country.localeCompare(b.Country));
        
        countrySelect.innerHTML = '';
        countries.forEach(country => {
            const option = document.createElement('option');
            option.value = country.Slug;
            option.textContent = country.Country;
            countrySelect.appendChild(option);
            
            if (country.Country === 'Poland') {
                option.selected = true;
            }
        });
        
    } catch (error) {
        console.error('Błąd ładowania listy krajów:', error);
    }
}

function handleFormSubmit(event) {
    event.preventDefault();
    const countrySlug = countrySelect.value;
    const dateFrom = dateFromInput.value;
    const dateTo = dateToInput.value;
    
    if (countrySlug && dateFrom && dateTo) {
        fetchCovidData(countrySlug, dateFrom, dateTo);
    }
}

function init() {
    setInitialDates();
    fetchAndPopulateCountries().then(() => {
        handleFormSubmit({ preventDefault: () => {} });
    });
    
    if (form) {
        form.addEventListener('submit', handleFormSubmit);
    }
}

init();