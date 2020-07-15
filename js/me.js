function loadFile(filePath) {
    const xmlHttp = new XMLHttpRequest();
    xmlHttp.open("GET", filePath, false);
    xmlHttp.send();

    if (xmlHttp.status === 200)
        return xmlHttp.responseText;

    console.error(`Failed to get ${filePath}: ${xmlHttp.status}`);
    return null;
}

function convertEducations(educations) {
    const result = [];

    for (let education of educations) {
        const elements = [];
        elements.push(`<div>Уровень: <b>${education.grade}</b></div>`)

        result.push(`<section>${elements.join("\n")}</section>`)
    }

    return `<section>
    <h2>Образование</h2>
    <section>${result.join("\n")}</section>
</section>`
}

function convertDataToHTML(data) {
    return convertEducations(data.educations)
}

const DATA_PATH = "src/me.json";

function onload() {
    const document = document.getElementById("content");
    const data = JSON.parse(loadFile(DATA_PATH));
    console.log(data);

    document.innerHTML = data === null
        ? `<span>Неудалось подргрузить данные с <a href="${DATA_PATH}">${DATA_PATH}</a></span>`
        : convertDataToHTML(data);
}

window.onload = onload;
