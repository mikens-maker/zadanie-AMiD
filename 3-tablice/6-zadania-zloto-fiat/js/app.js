// Rozwiązanie zadań - Złoto vs Fiat (z rzeczywistymi danymi)

console.log("=== ANALIZA OSZCZĘDZANIA: ZŁOTO vs FIAT ===");
console.log("Okres: czerwiec 2013 - czerwiec 2023 (10 lat)\n");

// Sprawdzenie czy mamy wszystkie potrzebne dane
console.log(`Ilość danych o złocie: ${gold.length} miesięcy`);
console.log(`Ilość danych o pensjach: ${payments.length} miesięcy\n`);

// ZADANIE 1: Obliczanie oszczędności odkładając 1/3 pensji do skarpety
console.log("ZADANIE 1: Oszczędności odkładając 1/3 średniej krajowej");

let totalSaved = 0;
let totalMonths = Math.min(gold.length, payments.length);
let monthlySavings = [];

for (let i = 0; i < totalMonths; i++) {
    const monthlySalary = payments[i].salary;
    const savings = monthlySalary / 3;
    totalSaved += savings;
    monthlySavings.push({
        month: payments[i].date,
        salary: monthlySalary,
        savings: savings,
        accumulated: totalSaved
    });
}

// Obliczenie statystyk
const avgSalary = payments.slice(0, totalMonths).reduce((sum, p) => sum + p.salary, 0) / totalMonths;
const avgSavings = totalSaved / totalMonths;
const firstSalary = payments[0].salary;
const lastSalary = payments[totalMonths - 1].salary;
const salaryGrowth = ((lastSalary - firstSalary) / firstSalary * 100).toFixed(1);

console.log(`Okres oszczędzania: ${totalMonths} miesięcy (10 lat)`);
console.log(`Pensja początkowa: ${firstSalary} PLN`);
console.log(`Pensja końcowa: ${lastSalary} PLN`);
console.log(`Wzrost pensji: ${salaryGrowth}%`);
console.log(`Średnia pensja w okresie: ${avgSalary.toFixed(0)} PLN`);
console.log(`Łącznie zaoszczędzone w skarpce: ${totalSaved.toFixed(2)} PLN`);
console.log(`Średnio miesięcznie odkładano: ${avgSavings.toFixed(2)} PLN\n`);

// ZADANIE 2: Obliczanie ile złotych monet można było kupić
console.log("ZADANIE 2: Inwestycja w złote monety");

let totalGoldCoins = 0;
let availableMoney = 0;
let purchaseHistory = [];
let coinsBoughtPerMonth = [];

// Symulacja miesięcznego odkładania i kupowania złota
for (let i = 0; i < totalMonths; i++) {
    const monthlySalary = payments[i].salary;
    const monthlyBudget = monthlySalary / 3;
    availableMoney += monthlyBudget;
    
    const goldPrice = gold[i].close;
    let coinsBoughtThisMonth = 0;
    
    // Kupowanie monet gdy starczy pieniędzy
    while (availableMoney >= goldPrice) {
        availableMoney -= goldPrice;
        totalGoldCoins++;
        coinsBoughtThisMonth++;
    }
    
    coinsBoughtPerMonth.push(coinsBoughtThisMonth);
    
    purchaseHistory.push({
        month: gold[i].endDateTime,
        goldPrice: goldPrice,
        monthlyBudget: monthlyBudget,
        coinsBought: coinsBoughtThisMonth,
        availableMoneyAfter: availableMoney,
        totalCoins: totalGoldCoins
    });
}

// Obliczenie aktualnej wartości zakupionych monet
const currentGoldPrice = gold[totalMonths - 1].close;
const currentGoldValue = totalGoldCoins * currentGoldPrice;
const totalInvested = totalSaved - availableMoney;

// Statystyki dotyczące złota
const minGoldPrice = Math.min(...gold.slice(0, totalMonths).map(g => g.close));
const maxGoldPrice = Math.max(...gold.slice(0, totalMonths).map(g => g.close));
const avgGoldPrice = gold.slice(0, totalMonths).reduce((sum, g) => sum + g.close, 0) / totalMonths;

console.log(`Zakupiono złotych monet: ${totalGoldCoins}`);
console.log(`Wydano na złoto: ${totalInvested.toFixed(2)} PLN`);
console.log(`Pozostało niewykorzystanych środków: ${availableMoney.toFixed(2)} PLN`);
console.log(`Średnia cena złota w okresie: ${avgGoldPrice.toFixed(2)} PLN`);
console.log(`Minimalna cena złota: ${minGoldPrice.toFixed(2)} PLN (${gold.find(g => g.close === minGoldPrice)?.endDateTime})`);
console.log(`Maksymalna cena złota: ${maxGoldPrice.toFixed(2)} PLN (${gold.find(g => g.close === maxGoldPrice)?.endDateTime})`);
console.log(`Aktualna cena uncji złota: ${currentGoldPrice.toFixed(2)} PLN`);
console.log(`Aktualna wartość zakupionych monet: ${currentGoldValue.toFixed(2)} PLN\n`);

// PORÓWNANIE STRATEGII
console.log("=== PORÓWNANIE STRATEGII ===");
console.log(`1. Oszczędzanie w skarpce: ${totalSaved.toFixed(2)} PLN`);
console.log(`2. Inwestycja w złoto:`);
console.log(`   - Wartość monet: ${currentGoldValue.toFixed(2)} PLN`);
console.log(`   + Niewykorzystane środki: ${availableMoney.toFixed(2)} PLN`);
console.log(`   = Łącznie: ${(currentGoldValue + availableMoney).toFixed(2)} PLN\n`);

const totalGoldStrategyValue = currentGoldValue + availableMoney;
const difference = totalGoldStrategyValue - totalSaved;
const percentDifference = (difference / totalSaved) * 100;

console.log(`RÓŻNICA: ${difference.toFixed(2)} PLN (${percentDifference.toFixed(2)}%)`);

if (difference > 0) {
    console.log(`✅ Strategia ZŁOTO była korzystniejsza o ${difference.toFixed(2)} PLN`);
} else {
    console.log(`💰 Strategia SKARPKA była korzystniejsza o ${Math.abs(difference).toFixed(2)} PLN`);
}

// DODATKOWA ANALIZA
console.log("\n=== DODATKOWA ANALIZA ===");

// Miesiące z największą liczbą zakupionych monet
const maxCoinsMonth = Math.max(...coinsBoughtPerMonth);
const monthsWithMaxCoins = coinsBoughtPerMonth
    .map((coins, index) => ({ coins, month: gold[index].endDateTime }))
    .filter(item => item.coins === maxCoinsMonth);

// Kiedy kupowano najwięcej monet
console.log(`Najwięcej monet zakupiono w miesiącu: ${maxCoinsMonth}`);
monthsWithMaxCoins.forEach(item => {
    const goldPriceForMonth = gold.find(g => g.endDateTime === item.month)?.close;
    console.log(`  - ${item.month} (cena: ${goldPriceForMonth?.toFixed(2)} PLN)`);
});

// Obliczenie efektywności inwestycji
const roiGold = ((currentGoldValue - totalInvested) / totalInvested * 100).toFixed(2);
const roiSavings = 0; // W skarpce nie ma zysku

console.log(`\nStopa zwrotu (ROI):`);
console.log(`- Złoto: ${roiGold}%`);
console.log(`- Skarpka: ${roiSavings}%`);

// Wartość w czasie - analiza co 2 lata
console.log("\n--- Wartość w czasie (co 2 lata) ---");
const years = [2, 4, 6, 8, 10];
years.forEach(yearsCount => {
    const monthsCount = yearsCount * 12;
    if (monthsCount <= totalMonths) {
        const savedByYear = monthlySavings[monthsCount - 1].accumulated;
        
        // Symulacja wartości złota po danym czasie
        let coinsByYear = 0;
        let cashByYear = 0;
        for (let i = 0; i < monthsCount; i++) {
            const monthlyBudget = payments[i].salary / 3;
            cashByYear += monthlyBudget;
            const goldPrice = gold[i].close;
            
            while (cashByYear >= goldPrice) {
                cashByYear -= goldPrice;
                coinsByYear++;
            }
        }
        
        const goldPriceAtYear = gold[monthsCount - 1].close;
        const goldValueByYear = coinsByYear * goldPriceAtYear + cashByYear;
        const differenceByYear = goldValueByYear - savedByYear;
        
        console.log(`Po ${yearsCount} latach:`);
        console.log(`  Skarpka: ${savedByYear.toFixed(0)} PLN`);
        console.log(`  Złoto: ${goldValueByYear.toFixed(0)} PLN (${differenceByYear > 0 ? '+' : ''}${differenceByYear.toFixed(0)} PLN)`);
    }
});

// PODSUMOWANIE
console.log("\n=== PODSUMOWANIE ===");
console.log(`Przez 10 lat (120 miesięcy) pracując za średnią krajową:`);
console.log(`1. Odkładając 1/3 pensji do skarpety zgromadziłbyś: ${Math.round(totalSaved)} PLN`);
console.log(`2. Inwestując w złoto (kupując monety gdy starczy):`);
console.log(`   - Kupiłbyś ${totalGoldCoins} złotych monet`);
console.log(`   - Dziś byłyby warte ${Math.round(currentGoldValue)} PLN`);
console.log(`   - Plus ${Math.round(availableMoney)} PLN w gotówce`);
console.log(`   - Łącznie: ${Math.round(totalGoldStrategyValue)} PLN`);
console.log(`\n${difference > 0 ? 'Inwestycja w złoto okazała się lepszą strategią.' : 'Oszczędzanie w skarpcie okazało się lepszą strategią.'}`);