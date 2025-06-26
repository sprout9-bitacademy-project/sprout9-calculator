import ResultPageChart from './ResultPageChart.js';

function getItemFromStorage(itemName) {
    return localStorage.getItem(itemName);
}

function sumFromStorage(array) {
    let sum = 0;
    array.forEach(element => {
        sum += parseInt(getItemFromStorage(element));
    });
    return sum;
}

// Header met de persoons/bedrijfsgegevens
const bedrijfsNaam = getItemFromStorage('bedrijf');
document.getElementById('resultaten-h1').innerHTML += ` - ${bedrijfsNaam}`

// Demografie diagram
// diagram variabelen
const dertigMin = parseInt(getItemFromStorage('aantalJongerDan30'));
const tussenDertigVijfEnVeertig = parseInt(getItemFromStorage('aantalTussen30-45'));
const tussenVijfEnVeertigZestig = parseInt(getItemFromStorage('aantalTussen45-60'));
const zestigPlus = parseInt(getItemFromStorage('aantalOuderDan60'));
const totaalDemografie = sumFromStorage(['aantalJongerDan30', 'aantalTussen30-45', 'aantalTussen45-60', 'aantalOuderDan60']);

// Chart variabelen
let ctx = document.getElementById('demografie-chart');
let config = {
    type: 'pie',
    data: {
        labels: ['60+', '45-60', '30-45', '30-'],
        datasets: [{
            label: `Aantal van ${totaalDemografie} mensen`,
            data: [zestigPlus, tussenVijfEnVeertigZestig, tussenDertigVijfEnVeertig, dertigMin],
            borderWidth: 1
        }]
    }
};

const demografieChart = new ResultPageChart(ctx, config);
demografieChart.plotChart();

// Taken uren diagram
const contractBeheerTotaal = sumFromStorage(['implementatieNieuweContracten', 'beheerEnOnderhoudContractenLeveranciers', 'contractdataAnalyseEnInformatiemanagement']);
const inkoopTotaal = sumFromStorage(['inkoopadministratieBestellingenEnInkoopordersControleren', 'kleineInkooptrajectenVerwervingOnderhandseGunningEnMarktbenadering', 'kleineInkooptrajectenVerwervingOnderhandseGunningEnMarktbenadering']);
const leveranciersmanagementTotaal = sumFromStorage(['onderhoudenVanRelatiesMetLeveranciers', 'evaluatieSelectieNieuweLeveranciers', 'monitorenVanPrestatiesVanLeveranciers']);
const facturatieBoekhoudingTotaal = sumFromStorage(['verwerkenVanInkomendeEnUitgaandeFacturen', 'boekenVanBetalingenEnHetMonitorenVanCashflow', 'verwerkenVanCrediturenEnDebiteurenadministratie']);
const voorraadbeheerLogistiekTotaal = sumFromStorage(['monitorenVanVoorraadniveausEnBestellemVanNieuweVoorraad', 'LogistiekePlanningEnBeheerVanLeveringen', 'optimaliserenVanVoorraadprocessen']);

// Chart variabelen
ctx = document.getElementById('taken-uren-chart');

const overigUren = getItemFromStorage('overig-uren');

if (overigUren) {
    config = {
        type: 'bar',
        data: {
            labels: ['Contractbeheer', 'Inkoop', 'Leveranciersmanagement', 'Facturatie / Boekhouding', 'Voorraadbeheer / Logistiek', 'Overig'],
            datasets: [{
                label: 'Totale uren per week',
                data: [contractBeheerTotaal, inkoopTotaal, leveranciersmanagementTotaal, facturatieBoekhoudingTotaal, voorraadbeheerLogistiekTotaal, overigUren],
                borderWidth: 1
            }]
        }
    };
} else {
    config = {
        type: 'bar',
        data: {
            labels: ['Contractbeheer', 'Inkoop', 'Leveranciersmanagement', 'Facturatie / Boekhouding', 'Voorraadbeheer / Logistiek',],
            datasets: [{
                label: 'Totale uren per week',
                data: [contractBeheerTotaal, inkoopTotaal, leveranciersmanagementTotaal, facturatieBoekhoudingTotaal, voorraadbeheerLogistiekTotaal],
                borderWidth: 1
            }]
        }
    };
}

const takenUrenChart = new ResultPageChart(ctx, config);
takenUrenChart.plotChart();


// formulier opnieuw invullen button
const returnButton = document.getElementById('return-btn');
returnButton.addEventListener(('click'), () => {
    localStorage.clear();
    window.location = 'index.html';
});


// genereer pdf


// // Pak alle gegevens uit de localStorage
// function allStorage() {

//     var archive = {}, // Notice change here
//         keys = Object.keys(localStorage),
//         i = keys.length;

//     while (i--) {
//         archive[keys[i]] = localStorage.getItem(keys[i]);
//     }

//     return archive;
// }

// const gegevens = allStorage();
// // console.log(gegevens);

// gegevens.forEach(item => {
// });