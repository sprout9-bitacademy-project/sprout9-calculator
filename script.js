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

// removeAllItemsFromStorage();

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
            if (input.type === 'checkbox') {
                addItemToStorage(input.id, input.checked ? 'true' : 'false');
            } else {
                addItemToStorage(input.id, input.value);
            }
            console.log(input.id);
        }
    });
});

// Sla direct wijzigingen in de inputvelden op in localStorage
Array.from(form.elements).forEach((input) => {
    if (input.type !== "submit") {
        const eventType = input.type === 'checkbox' ? 'change' : 'input';
        input.addEventListener(eventType, () => {
            if (input.type === 'checkbox') {
                localStorage.setItem(input.id, input.checked ? 'true' : 'false');
            } else {
                localStorage.setItem(input.id, input.value);
            }
        });
    }
});

window.addEventListener('DOMContentLoaded', () => {
    Array.from(form.elements).forEach((input) => {
        if (input.type !== "submit") {
            if (input.type === 'checkbox') {
                input.checked = localStorage.getItem(input.id) === 'true';
            } else if (localStorage.getItem(input.id) !== null) {
                input.value = localStorage.getItem(input.id);
            }
        }
    });
});