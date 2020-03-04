const tempTerms = [
    {
        "title": "НИВГ",
        "definition": "Документ \"Специальная форма №1 НЕ ХОЧУ ИГРАТЬ В ГОВНО\"",
        "history": "Термино появлися после того, как Витяныч отказался играть с нами в FONLINE и скинул свою фотограю с женищной"
    },
    {
        "title": "Г-9",
        "definition": "Мероприятие БИЧЕХОСТОВ по посещению ресторанов в центре города",
        "history": "Как-то раз Квир приехал в Гринвич, а Хост нет"
    }
]

function convertToHtml(term) {
    return `
    <section class="term-section">
        <div>
            <b>${term.title}</b> — ${term.definition}
        </div>
        <div class="history">
            <i>${term.history}</i>
        </div>
    </section>`
}

function loadFile(filePath) {
    let result = null;
    const xmlHttp = new XMLHttpRequest();
    xmlHttp.open("GET", filePath, false);
    xmlHttp.send();

    if (xmlHttp.status === 200) {
        result = xmlHttp.responseText;
    }

    return result;
}

function loadSchedule() {
    const result = [];
    const terms = tempTerms //JSON.parse(loadFile("glossary.json"));
    for (const term of terms) {
        result.push(convertToHtml(term))
    }

    const doc = document.getElementById("content");
    doc.innerHTML = result.join("")
}

window.onload = loadSchedule;