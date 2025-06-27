import ResultPageChart from './ResultPageChart.js';
const { jsPDF } = window.jspdf;

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
const demografieChartCanvas = document.getElementById('demografie-chart');
let config = {
    type: 'pie',
    data: {
        labels: ['60+', '45-60', '30-45', '30-'],
        datasets: [{
            label: `Aantal van ${totaalDemografie} mensen`,
            data: [zestigPlus, tussenVijfEnVeertigZestig, tussenDertigVijfEnVeertig, dertigMin],
            borderWidth: 1
        }]
    },
    options: {
        animation: {
            duration: 550
        }
    }
};

const demografieChart = new ResultPageChart(demografieChartCanvas, config);
demografieChart.plotChart();

// Taken uren diagram
const contractBeheerTotaal = sumFromStorage(['implementatieNieuweContracten', 'beheerEnOnderhoudContractenLeveranciers', 'contractdataAnalyseEnInformatiemanagement']);
const inkoopTotaal = sumFromStorage(['inkoopadministratieBestellingenEnInkoopordersControleren', 'kleineInkooptrajectenVerwervingOnderhandseGunningEnMarktbenadering', 'kleineInkooptrajectenVerwervingOnderhandseGunningEnMarktbenadering']);
const leveranciersmanagementTotaal = sumFromStorage(['onderhoudenVanRelatiesMetLeveranciers', 'evaluatieSelectieNieuweLeveranciers', 'monitorenVanPrestatiesVanLeveranciers']);
const facturatieBoekhoudingTotaal = sumFromStorage(['verwerkenVanInkomendeEnUitgaandeFacturen', 'boekenVanBetalingenEnHetMonitorenVanCashflow', 'verwerkenVanCrediturenEnDebiteurenadministratie']);
const voorraadbeheerLogistiekTotaal = sumFromStorage(['monitorenVanVoorraadniveausEnBestellemVanNieuweVoorraad', 'LogistiekePlanningEnBeheerVanLeveringen', 'optimaliserenVanVoorraadprocessen']);

// Chart variabelen
const takenUrenChartCanvas = document.getElementById('taken-uren-chart');

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
        },
        options: {
            animation: {
                duration: 550
            }
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

const takenUrenChart = new ResultPageChart(takenUrenChartCanvas, config);
takenUrenChart.plotChart();


// formulier opnieuw invullen button
const returnButton = document.getElementById('return-btn');
returnButton.addEventListener(('click'), () => {
    localStorage.clear();
    window.location = 'index.html';
});


// genereer pdf
const doc = new jsPDF();
const createPdfBtn = document.getElementById('create-pdf-btn');

// Haal extra gegevens op uit localStorage
const voornaam = getItemFromStorage('voornaam');
const achternaam = getItemFromStorage('achternaam');
const functie = getItemFromStorage('functie');

// PDF inhoud v
// Titel en bedrijfsgegevens
setTimeout(() => {
    doc.setFontSize(16);
    doc.text(`Resultaten - ${bedrijfsNaam}`, 10, 10);
    doc.setFontSize(10);
    doc.text(`Naam: ${voornaam} ${achternaam}`, 10, 18);
    doc.text(`Bedrijf: ${bedrijfsNaam}`, 10, 24);
    doc.text(`Functie: ${functie}`, 10, 30);

    // Demografie uitleg
    doc.setFontSize(12);
    doc.text('Demografie', 10, 45);
    doc.setFontSize(10);
    doc.text(`Totaal personeel: ${totaalDemografie}`, 10, 51);
    doc.text(`- Jonger dan 30: ${dertigMin || 0}`, 10, 57);
    doc.text(`- 30-45: ${tussenDertigVijfEnVeertig}`, 10, 63);
    doc.text(`- 45-60: ${tussenVijfEnVeertigZestig}`, 10, 69);
    doc.text(`- 60+: ${zestigPlus}`, 10, 75);

    // Demografie grafiek
    const imgDataDemografie = demografieChartCanvas.toDataURL('image/png');
    let width = demografieChartCanvas.width / 8;
    let height = demografieChartCanvas.height / 8;
    doc.addImage(imgDataDemografie, 'PNG', 90, 25, width, height);

    // Taken uren uitleg
    doc.setFontSize(12);
    doc.text('Taken uren', 10, 90);
    doc.setFontSize(10);
    doc.text(`Contractbeheer: ${contractBeheerTotaal} uur`, 10, 96);
    doc.text(`Inkoop: ${inkoopTotaal} uur`, 10, 102);
    doc.text(`Leveranciersmanagement: ${leveranciersmanagementTotaal} uur`, 10, 108);
    doc.text(`Facturatie / Boekhouding: ${facturatieBoekhoudingTotaal} uur`, 10, 114);
    doc.text(`Voorraadbeheer / Logistiek: ${voorraadbeheerLogistiekTotaal} uur`, 10, 120);
    if (overigUren) {
        doc.text(`Overig: ${overigUren} uur`, 10, 126);
    }

    // Taken uren grafiek
    const imgDataTakenUren = takenUrenChartCanvas.toDataURL('image/png');
    width = takenUrenChartCanvas.width / 8;
    height = takenUrenChartCanvas.height / 8;
    doc.addImage(imgDataTakenUren, 'PNG', 30, 130, width, height);

    // Contact
    doc.text(`Neem contact met ons op als u behoefte heeft aan meer informatie:`, 10, 250);
    doc.text('Bezoek ', 10, 255);
    doc.setTextColor(0, 0, 255);
    doc.textWithLink('onze website', 23, 255, { url: "https://www.sprout9.nl/" });
    doc.setTextColor(0, 0, 0);
    doc.text('Mail ons: ', 10, 265);
    doc.setTextColor(0, 0, 255);
    doc.textWithLink('jelle.timmer@sprout9.nl', 25, 265, { url: 'mailto:jelle.timmer@sprout9.nl' });
    doc.setTextColor(0, 0, 0);
}, 600);

// bestand opslaan
createPdfBtn.addEventListener('click', () => {
    // Open PDF in nieuw tabblad als blob-url
    const pdfUrl = doc.output('bloburl');
    window.open(pdfUrl, '_blank');
});

// sla pdf op
const savePdfBtn = document.getElementById('save-pdf-btn');
savePdfBtn.addEventListener(('click'), () => {
    const bedrijfsNaamArray = bedrijfsNaam.split(' ');
    const joinedBedrijfsNaam = bedrijfsNaamArray.join('-');
    const fileName = `${joinedBedrijfsNaam}-sprout9-resultaat.pdf`;

    doc.save(fileName);
});