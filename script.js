function addItemToStorage(key, value) {
    localStorage.setItem(key, value);
    console.log(`Item toegevoegd aan localStorage: ${key}`);
}

function removeAllItemsFromStorage() {
    localStorage.clear();
}

removeAllItemsFromStorage();

document.getElementById('calculator-form').addEventListener('submit', function(event) {
    event.preventDefault();

    const voornaam = document.getElementById('voornaam').value;
    const achternaam = document.getElementById('achternaam').value;
    const bedrijf = document.getElementById('bedrijf').value;
    const functie = document.getElementById('functie').value;

    const gegevens = { voornaam, achternaam, bedrijf, functie};
    addItemToStorage('formulierGegevens', JSON.stringify(gegevens));

    document.getElementById('resultaat').textContent = 'opgeslagen';
});

const forms = document.querySelectorAll('form');

forms.forEach(form => {

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
                    addItemToStorage(input.id, input.checked ? 'true' : 'false');
                } else {
                    addItemToStorage(input.id, input.value);
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
});