function addItemToStorage(key, value) {
    localStorage.setItem(key, value);
}

function getItemFromStorage(itemName) {
    return localStorage.getItem(itemName);
}

// Reset de formuliergegevens
document.getElementById('reset-button').addEventListener('click', () => {
    localStorage.clear();
    form.reset();
});

const form = document.getElementById('calculator-form');
form.addEventListener('submit', function (e) {
    e.preventDefault();
    Array.from(form.elements).forEach((input) => {
        if (input.type !== "submit") {
            if (input.type === 'checkbox') {
                localStorage.setItem(input.id, input.checked ? 'true' : 'false');
            } else if (input.value === '') {
                localStorage.removeItem(input.id);
            } else {
                localStorage.setItem(input.id, input.value);
            }
        }
    });

    // Stuur de gebruiker alleen naar de resultaat pagina als personeelsgegevens overeen komen
    const fteInLoonDienst = parseInt(getItemFromStorage('fteInLoonDienst'));
    const fteFlexibeleSchil = parseInt(getItemFromStorage('fteInFlexibeleSchil'));
    const dertigMin = parseInt(getItemFromStorage('aantalJongerDan30'));
    const tussenDertigVijfEnVeertig = parseInt(getItemFromStorage('aantalTussen30-45'));
    const tussenVijfEnVeertigZestig = parseInt(getItemFromStorage('aantalTussen45-60'));
    const zestigPlus = parseInt(getItemFromStorage('aantalOuderDan60'));
    const totaalDemografie = dertigMin + tussenDertigVijfEnVeertig + tussenVijfEnVeertigZestig + zestigPlus;

    document.getElementById('submit-form').onclick = () => {
        if ((fteInLoonDienst + fteFlexibeleSchil) !== totaalDemografie) {
            const alertMsg = `Je aantal personeel onder het kopje 'personeelssituatie' en 'demografie' komen niet overeen. Zorg dat het aantal personeel gelijk is.
Totaal 'personeelssituatie': ${fteInLoonDienst + fteFlexibeleSchil}
Totaal 'demografie': ${totaalDemografie}`;
            alert(alertMsg);
            console.log(fteInLoonDienst + fteFlexibeleSchil);
            console.log(totaalDemografie);
            location.reload();
        } else {
            if (getItemFromStorage('overig-namelijk') !== undefined || getItemFromStorage('overig-uren') == 0) {
                window.location = 'resultPage.html';
            } else {
                localStorage.removeItem('overig-uren');
                window.location = 'resultPage.html';
            }
        }
    };
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