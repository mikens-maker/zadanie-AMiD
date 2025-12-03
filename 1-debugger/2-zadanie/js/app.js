// js/app.js
document.querySelector('.form').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const nr1 = document.getElementById('nr1').value;
    const nr2 = document.getElementById('nr2').value;
    
    // POPRAWNE DODAWANIE - konwersja na liczby
    const result = Number(nr1) + Number(nr2);
    
    console.log('Wynik dodawania:', result);
    alert('Wynik dodawania: ' + result);
});