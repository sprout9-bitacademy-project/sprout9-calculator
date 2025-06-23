function addItemToStorage(key, value) {
    localStorage.setItem(key, value);
    console.log(`Item toegevoegd aan localStorage: ${key}`);
}

function removeItemFromStorage(key) {
    localStorage.removeItem(key);
    console.log(`Item verwijdert van localStorage: ${key}`);
}

function removeAllItemsFromStorage() {
    localStorage.clear();
}

// input element id's
const form = document.getElementById('impactCalculatorForm');
const voornaam = document.getElementById('voornaam');
const achternaam = document.getElementById('achternaam');
const bedrijf = document.getElementById('bedrijf');
const functie = document.getElementById('functie');

form.addEventListener('submit', function (e) {
    e.preventDefault();
    Array.from(form.elements).forEach((input) => {
        if (input.type !== "submit") {
            addItemToStorage(input.id, input.value);
            console.log(input.id);
        }
    });
});
