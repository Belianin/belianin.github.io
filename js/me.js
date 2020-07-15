function loadFile(filePath) {
    const xmlHttp = new XMLHttpRequest();
    xmlHttp.open("GET", filePath, false);
    xmlHttp.send();

    if (xmlHttp.status === 200)
        return xmlHttp.responseText;

    console.error(`Failed to get ${filePath}: ${xmlHttp.status}`);
    return null;
}

function convertAbout(about) {
    return `<section>
    <h2>Информация</h2>
    <section>
        <img src="src/me.jpg" class="photo">
        <div class="about">
            <h3>${about.lastName} ${about.firstName} ${about.patronymic} <span class="secondary">— ${about.status}</span></h3>
            <div>${about.birthDate}</div>
            <div>${about.location.country} г. ${about.location.city}</div>
            <br>
            <div><b>Контакты:</b></div>
            <div>Почта: <a href="mailto:${about.contacts.email}">${about.contacts.email}</a></div>
            <div>Telemgram: <a href="https://t.me/${about.contacts.telegram}">@${about.contacts.telegram}</a></div>
            <div>GitHub: <a href="https://github.com/${about.contacts.github}">${about.contacts.github}</a></div>
            <br>
            <div>Английский ≈ ${about.languages["en"]}</div>
        </div>
    </section>
</section>`
}

function convertEducations(educations) {
    const result = [];

    for (let education of educations) {
        const elements = [];

        elements.push(`<div><b>${education.grade}</b> <i class="secondary">${education.period.from}-${education.period.to}</i></div>`);
        elements.push(`<div>${education.university}${education.institution ? "<br>" + education.institution : ""}</div>`);
        elements.push(`<div>${education.specialty}</div>`);
        elements.push(`<div class="secondary">${education.description}</div>`);

        result.push(`<section>${elements.join("\n")}</section>`)
    }

    return `<section>
    <h2>Образование</h2>
    <section>${result.join("<hr>")}</section>
</section>`
}

function convertJobPosition(position) {
    return `<section>
    <p><b>${position.position}</b> <i class="secondary">${position.period}</i></p>
</section>`
}

function convertJob(job) {
    return `<section>
    <div><b>${job.company.title}</b> — ${job.company.description}</div>
    <ul>
        ${job.positions.map(p => `<li>${convertJobPosition(p)}</li>`).join("\n")}
    </ul>
    <div>${job.description}</div>
</section>`
}

function convertJobs(jobs) {
    return `<section>
    <h2>Работа</h2>
    <section>${jobs.map(j => convertJob(j)).join("<hr>")}</section>
</section>`
}

function convertProject(project) {
    return `<div>
    <div><b>${project.title}</b> — ${project.description}</div>
    <div class="secondary">${project.urls.map(u => `<a href="u.url">${u.name}</a>`).join("\n")}</div>
</div>`
}

function convertCategory(category) {
    return `<section>
    <h3>${category.title}</h3>
    <hr>
    <section>${category.projects.map(p => convertProject(p)).join("\n")}</section>
</section>`
}

function convertProjectCategories(categories) {
    return `<section>
    <h2>Проекты</h2>
    <i class="secondary">Учебные проекты в расчет не беру.</i>
    <section>${categories.map(c => convertCategory(c)).join("\n")}</section>
</section>`
}

function convertTags(data) {
    return `<section>
    <h2>Тэги</h2>
    <i class="secondary">По моему тэги в реюзме это мусор их даже писать стыдно, но раз принятно, то ладно</i>
    <div>${data.tags.map(t => `<span class="tag">${t}</span>`).join("\n")}</div>
    <i class="secondary">То что я щупал, но не использовал нормально</i>
    <div>${data.uselessTags.map(t => `<span class="tag">${t}</span>`).join("\n")}</div>    
</section>`
}

function convertDataToHTML(data) {
    const result = [];

    result.push(convertAbout(data.about));
    result.push(convertEducations(data.educations));
    result.push(convertJobs(data.jobs));
    result.push(convertTags(data));
    result.push(convertProjectCategories(data.projectCategories));
    result.push(`<p><a href="${DATA_PATH}">JSON-резюме</a><p/>`);

    return result.join("\n");
}

const DATA_PATH = "src/me.json";

function onLoad() {
    const data = JSON.parse(loadFile(DATA_PATH));

    document.getElementById("content").innerHTML = data === null
        ? `<span>Неудалось подргрузить данные с <a href="${DATA_PATH}">${DATA_PATH}</a></span>`
        : convertDataToHTML(data);
}

window.onload = onLoad;