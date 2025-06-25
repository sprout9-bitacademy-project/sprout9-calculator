document.getElementById('calculator-form').addEventListener('submit', function(event) {
    event.preventDefault();

    const voornaam = document.getElementById('voornaam').value;
    const achternaam = document.getElementById('achternaam').value;
    const bedrijf = document.getElementById('bedrijf').value;
    const functie = document.getElementById('functie').value;

    const gegevens = { voornaam, achternaam, bedrijf, functie};
    localStorage.setItem('formulierGegevens', JSON.stringify(gegevens));

    document.getElementById('resultaat').textContent = 'opgeslagen';
});