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

function addChartsToPdf(doc) {
    // Demografie grafiek
    const demografieChartCanvas = document.getElementById('demografie-chart');
    if (demografieChartCanvas) {
        const imgDataDemografie = demografieChartCanvas.toDataURL('image/png');
        let width = demografieChartCanvas.width / 8;
        let height = demografieChartCanvas.height / 8;
        doc.addImage(imgDataDemografie, 'PNG', 90, 25, width, height);
    }

    // Taken uren grafiek
    const takenUrenChartCanvas = document.getElementById('taken-uren-chart');
    if (takenUrenChartCanvas) {
        const imgDataTakenUren = takenUrenChartCanvas.toDataURL('image/png');
        let width = takenUrenChartCanvas.width / 8;
        let height = takenUrenChartCanvas.height / 8;
        doc.addImage(imgDataTakenUren, 'PNG', 30, 130, width, height);
    }
}

// genereer pdf
const doc = new jsPDF();
const createPdfBtn = document.getElementById('create-pdf-btn');

// Haal gegevens op uit localStorage
const bedrijfsNaam = getItemFromStorage('bedrijf');
const voornaam = getItemFromStorage('voornaam');
const achternaam = getItemFromStorage('achternaam');
const functie = getItemFromStorage('functie');

const dertigMin = parseInt(getItemFromStorage('aantalJongerDan30'));
const tussenDertigVijfEnVeertig = parseInt(getItemFromStorage('aantalTussen30-45'));
const tussenVijfEnVeertigZestig = parseInt(getItemFromStorage('aantalTussen45-60'));
const zestigPlus = parseInt(getItemFromStorage('aantalOuderDan60'));
const totaalDemografie = sumFromStorage(['aantalJongerDan30', 'aantalTussen30-45', 'aantalTussen45-60', 'aantalOuderDan60']);

const contractBeheerTotaal = sumFromStorage(['implementatieNieuweContracten', 'beheerEnOnderhoudContractenLeveranciers', 'contractdataAnalyseEnInformatiemanagement']);
const inkoopTotaal = sumFromStorage(['inkoopadministratieBestellingenEnInkoopordersControleren', 'kleineInkooptrajectenVerwervingOnderhandseGunningEnMarktbenadering', 'kleineInkooptrajectenVerwervingOnderhandseGunningEnMarktbenadering']);
const leveranciersmanagementTotaal = sumFromStorage(['onderhoudenVanRelatiesMetLeveranciers', 'evaluatieSelectieNieuweLeveranciers', 'monitorenVanPrestatiesVanLeveranciers']);
const facturatieBoekhoudingTotaal = sumFromStorage(['verwerkenVanInkomendeEnUitgaandeFacturen', 'boekenVanBetalingenEnHetMonitorenVanCashflow', 'verwerkenVanCrediturenEnDebiteurenadministratie']);
const voorraadbeheerLogistiekTotaal = sumFromStorage(['monitorenVanVoorraadniveausEnBestellemVanNieuweVoorraad', 'LogistiekePlanningEnBeheerVanLeveringen', 'optimaliserenVanVoorraadprocessen']);
const overigUren = getItemFromStorage('overig-uren');


// PDF inhoud v
// Titel en bedrijfsgegevens
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

const dertigMinPercentage = dertigMin / totaalDemografie * 100;
doc.text(`- Jonger dan 30: ${dertigMin} (${dertigMinPercentage.toFixed(1)}%)`, 10, 57);

const tussenDertigVijfEnVeertigPercentage = tussenDertigVijfEnVeertig / totaalDemografie * 100;
doc.text(`- 30-45: ${tussenDertigVijfEnVeertig} (${tussenDertigVijfEnVeertigPercentage.toFixed(1)}%)`, 10, 63);

const tussenVijfEnVeertigZestigPercentage = tussenVijfEnVeertigZestig / totaalDemografie * 100;
doc.text(`- 45-60: ${tussenVijfEnVeertigZestig} (${tussenVijfEnVeertigZestigPercentage.toFixed(1)}%)`, 10, 69);

const zestigPlusPercentage = zestigPlus / totaalDemografie * 100;
doc.text(`- 60+: ${zestigPlus} (${zestigPlusPercentage.toFixed(1)}%)`, 10, 75);

// Taken uren uitleg
doc.setFontSize(12);
doc.text('Taken op afdeling (in uren per week)', 10, 90);
doc.setFontSize(10);
doc.text(`Contractbeheer: ${contractBeheerTotaal} uur`, 10, 96);
doc.text(`Inkoop: ${inkoopTotaal} uur`, 10, 102);
doc.text(`Leveranciersmanagement: ${leveranciersmanagementTotaal} uur`, 10, 108);
doc.text(`Facturatie / Boekhouding: ${facturatieBoekhoudingTotaal} uur`, 10, 114);
doc.text(`Voorraadbeheer / Logistiek: ${voorraadbeheerLogistiekTotaal} uur`, 10, 120);
if (overigUren) {
    doc.text(`Overig: ${overigUren} uur`, 10, 126);
}

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

createPdfBtn.addEventListener('click', () => {
    addChartsToPdf(doc);

    // Open PDF in nieuw tabblad als blob-url
    const pdfUrl = doc.output('bloburl');
    window.open(pdfUrl, '_blank');
});

// sla pdf op
const savePdfBtn = document.getElementById('save-pdf-btn');
savePdfBtn.addEventListener('click', () => {
    addChartsToPdf(doc);

    const bedrijfsNaamArray = bedrijfsNaam.split(' ');
    const joinedBedrijfsNaam = bedrijfsNaamArray.join('-');
    const fileName = `${joinedBedrijfsNaam.toLowerCase()}-sprout9-resultaat.pdf`;
    doc.save(fileName);
});
