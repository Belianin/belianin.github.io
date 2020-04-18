import loadFile from './base.js'

function convertToHtml(section) {
    const result = [];

    result.push(`<h2>${section.title}</h2>`);

    for (let thimble of section.thimbles) {
        result.push(
    `<section class="term-section centered">
        ${thimble.text}
        <div class="history">
            <i>${thimble.description}</i>
        </div>
    </section>`);
    }

    return result.join("")
}

function onLoad() {
    const data = JSON.parse(loadFile("./data/thimbles.json"));

    const result = [];
    for (let section of data) {
        result.push(convertToHtml(section))
    }

    document.getElementById("content").innerHTML = result.join("")
}

window.onload = onLoad;
