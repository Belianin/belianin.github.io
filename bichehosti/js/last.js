import loadFile from "./base.js";

function convertQuestion(question) {
        return `
<tr>
    <td>${question.score}</td>
    <td>${question.question}</td>
    <td>${question.answer}</td>
    <td>${question.solved ? "<span style=\"color: green\"\>✔</span>" : "<span style=\"color: red\"\>❌</span>"}</td>
</tr>`
}

function convertTheme(theme) {
    return `
<tr>
    <td>${theme.title}</td>
    <td>${theme.description}</td>
</tr>
${theme.questions.map(q => convertQuestion(q)).join("")}`
}

function convertToHtml(sigame) {
    const result = ["<table>"];

    for (let i = 0; i < sigame.rounds.length; i++) {
        result.push(`<tr><th>Раунд ${i + 1}</th></tr>`);
        result.push(sigame.rounds[i].themes.map(t => convertTheme(t)).join(""))
    }

    result.push("</table>");
    return result.join("");
}

function onLoad() {
    const sigame = JSON.parse(loadFile("./data/sigame.json"));

    const result = convertToHtml(sigame);

    const content = document.getElementById("content");
    content.innerHTML = result
}

window.onload = onLoad;
