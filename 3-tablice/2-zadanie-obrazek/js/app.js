// Tablica z indeksami kolorów (przykładowe dane - możesz je zmienić)
const tab = [
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 1, 1, 1, 1, 1, 1, 0],
    [0, 1, 2, 2, 2, 2, 1, 0],
    [0, 1, 2, 3, 3, 2, 1, 0],
    [0, 1, 2, 3, 3, 2, 1, 0],
    [0, 1, 2, 2, 2, 2, 1, 0],
    [0, 1, 1, 1, 1, 1, 1, 0],
    [0, 0, 0, 0, 0, 0, 0, 0]
];

// Tablica z kodami kolorów
const colors = [
    "#000000", // 0 - czarny
    "#FF0000", // 1 - czerwony
    "#00FF00", // 2 - zielony
    "#0000FF", // 3 - niebieski
    "#FFFF00", // 4 - żółty
    "#FF00FF"  // 5 - magenta
];

// Główna funkcja tworząca rysunek
function createDrawing() {
    let text = '';
    
    // Pętla po tablicy 2D
    for (let i = 0; i < tab.length; i++) {
        for (let j = 0; j < tab[i].length; j++) {
            const colorIndex = tab[i][j];
            const pobranyKolor = colors[colorIndex];
            
            text += '<div style="background:' + pobranyKolor + '"></div>';
        }
        // Dodaj <br> po każdej linii
        text += '<br>';
    }
    
    // Wstaw wygenerowany HTML do elementu .canvas
    const canvas = document.querySelector('.canvas');
    canvas.innerHTML = text;
}

// Uruchom funkcję po załadowaniu strony
document.addEventListener('DOMContentLoaded', createDrawing);