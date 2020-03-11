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
            <img src="./data/smiles/${smile.title}.png" style="height: 2em; width: auto"></ig><b> ${smile.title}</b> — ${smile.description}
        </div>
        <div style="width: ${50 * countRating(smile)}px; height: 16px; background-color: gold; display: inline-block"></div><span style="color: gold"> ${countRating(smile)}</span>
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
    const smiles = JSON.parse(loadFile("./data/smiles.json"));
    smiles.sort((a, b) => countRating(b) - countRating(a));
    for (const smile of smiles) {
        result.push(convertToHtml(smile))
    }

    const content = document.getElementById("content");
    content.innerHTML = result.join("");
}

window.onload = onLoad;
