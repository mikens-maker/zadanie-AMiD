// ==========================
// Zadanie 1
// ==========================
const totalCities = cities.length;
console.log(totalCities);

// ==========================
// Zadanie 2
// ==========================
const totalPeople = cities.reduce((sum, city) => sum + city.people, 0);
console.log(totalPeople);

// ==========================
// Zadanie 3
// ==========================
const firstCityOver10k = cities.find(city => city.people > 10000);
console.log(firstCityOver10k);

// ==========================
// Zadanie 4
// ==========================
const averagePeople = totalPeople / totalCities;
const citiesAboveAverage = cities.filter(city => city.people > averagePeople);
console.log(citiesAboveAverage);

// ==========================
// Zadanie 5
// ==========================
const namesOver10k = cities
    .filter(city => city.people > 10000)
    .map(city => city.name);
console.log(namesOver10k);

// ==========================
// Zadanie 6
// ==========================
const countOver10k = cities.filter(city => city.people > 10000).length;
const countUnder10k = totalCities - countOver10k;

let comparisonResult = '';
if (countOver10k > countUnder10k) {
    comparisonResult = "więcej jest miast z > 10000 ludzi";
} else if (countUnder10k > countOver10k) {
    comparisonResult = "więcej jest miast z <= 10000 ludzi";
} else {
    comparisonResult = "jest remis";
}
console.log(comparisonResult);