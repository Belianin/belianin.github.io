function countRating(smile) {
    let sum = 0.0;
    for (const r of smile.ratings) {
        sum += r.mark;
    }

    return sum / smile.ratings.length;
}

function convertToHtml(smile) {
    return `
    <section class="term-section centered">
        <div>
            <b>${smile.title}</b> — ${smile.description}
        </div>
        <div style="width: ${50 * countRating(smile)}px; height: 16px; color: black; background-color: red"></div>
        <div class="history">
            <i>${smile.history}</i>
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

function onLoad() {
    const result = [];
    const smiles = JSON.parse(loadFile("bichehosti/data/smiles.json"));
    for (const smile of smiles) {
        result.push(convertToHtml(smile))
    }

    const content = document.getElementById("content");
    content.innerHTML = result.join("");
}

window.onload = onLoad;
