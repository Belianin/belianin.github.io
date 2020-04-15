function convertToHtml(year) {
    const result = [];
    result.push(`<h2>${year.year}</h2>`);
    for (let month of year.months) {
        const days = [];
        for (let i = 0; i < 31; i++) {
            days.push(`|<br>`)
        }

        for (let e of month.events) {
            const className = e.type ? `class="${e.type}"` : ""
            days[e.day - 1] = `<p ${className}>${e.day}. ${e.event}</p>`
        }

        result.push(`<h3>${month.month}</h3>`);

        for (let day of days) {
            result.push(day)
        }
    }

    return result.join("");
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
    const years = JSON.parse(loadFile("./data/timeline.json"));
    for (const year of years) {
        result.push(convertToHtml(year))
    }

    const content = document.getElementById("content");
    content.innerHTML = result.join("");
}

window.onload = onLoad;