// Zadanie 1: Wypisz ile miast jest w Polsce
// Wszystkie miasta w tablicy są polskie, więc:
console.log(`Zadanie 1: Liczba miast w Polsce: ${cities.length}`);

// Zadanie 2: Wypisz ile jest ludzi w tych miastach
const totalPopulation = cities.reduce((sum, city) => sum + city.people, 0);
console.log(`Zadanie 2: Łączna liczba ludzi we wszystkich miastach: ${totalPopulation}`);

// Zadanie 3: Wypisz pierwsze miasto, w którym jest ponad 10000 ludzi
const firstCityOver10000 = cities.find(city => city.people > 10000);
console.log(`Zadanie 3: Pierwsze miasto z >10000 ludzi: ${firstCityOver10000 ? `${firstCityOver10000.name} (${firstCityOver10000.people} ludzi)` : 'brak'}`);

// Zadanie 4: Wypisz miasta, w których ludzi jest ponad średnią
const averagePopulation = totalPopulation / cities.length;
const citiesAboveAverage = cities.filter(city => city.people > averagePopulation);
console.log(`Zadanie 4: Miasta z populacją powyżej średniej (${averagePopulation.toFixed(0)}):`);
citiesAboveAverage.forEach(city => {
    console.log(`  ${city.name}: ${city.people} ludzi`);
});

// Zadanie 5: Wypisz nazwy wszystkich miast, w których jest ponad 10000 ludzi
const citiesOver10000 = cities.filter(city => city.people > 10000);
const cityNamesOver10000 = citiesOver10000.map(city => city.name);
console.log(`Zadanie 5: Miasta z >10000 ludzi (${cityNamesOver10000.length}):`);
console.log(cityNamesOver10000);

// Zadanie 6: Wypisz czy więcej jest miast z > 10000 ludzi czy mniejszych
const citiesUnder10000 = cities.filter(city => city.people <= 10000).length;

console.log(`Zadanie 6:`);
console.log(`  Miast z >10000 ludzi: ${citiesOver10000.length}`);
console.log(`  Miast z ≤10000 ludzi: ${citiesUnder10000}`);

if (citiesOver10000.length > citiesUnder10000) {
    console.log("  Więcej jest miast z ponad 10000 ludzi");
} else if (citiesOver10000.length < citiesUnder10000) {
    console.log("  Więcej jest miast z 10000 lub mniej ludzi");
} else {
    console.log("  Liczba miast z >10000 i ≤10000 ludzi jest taka sama");
}

// Dodatkowe statystyki
console.log("\n--- Dodatkowe statystyki ---");
console.log(`Wszystkich miast: ${cities.length}`);

const mostPopulated = cities.reduce((max, city) => city.people > max.people ? city : max);
console.log(`Najludniejsze miasto: ${mostPopulated.name} (${mostPopulated.people} ludzi)`);

const leastPopulated = cities.reduce((min, city) => city.people < min.people ? city : min);
console.log(`Najmniej ludne miasto: ${leastPopulated.name} (${leastPopulated.people} ludzi)`);

console.log(`Średnia populacja miasta: ${averagePopulation.toFixed(0)} ludzi`);

// Statystyki według województw
const provinces = {};
cities.forEach(city => {
    if (!provinces[city.province]) {
        provinces[city.province] = {
            count: 0,
            population: 0,
            cities: []
        };
    }
    provinces[city.province].count++;
    provinces[city.province].population += city.people;
    provinces[city.province].cities.push(city.name);
});

console.log(`\nLiczba województw: ${Object.keys(provinces).length}`);

// Najwięcej miast w województwie
let maxCitiesProvince = '';
let maxCitiesCount = 0;
for (const province in provinces) {
    if (provinces[province].count > maxCitiesCount) {
        maxCitiesCount = provinces[province].count;
        maxCitiesProvince = province;
    }
}
console.log(`Najwięcej miast ma województwo ${maxCitiesProvince}: ${maxCitiesCount} miast`);