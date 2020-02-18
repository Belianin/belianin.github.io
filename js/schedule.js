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

const timeMapping = [ "9:00", '10:40', "12:50", "14:30", "16:10", "17:50"];

function convertDayToHtml(day) {
    const result = [`<tr><th colspan="3">${day.title}</th></tr>`];
    let counter = 0;
    for (const lecture of day.lectures) {
        if (lecture === null) {
            //result.push(`<tr><td>${timeMapping[counter]}</td><td></td><td></td></tr>`)
        } else {
            const lectureTime = lecture.time || timeMapping[counter];
            const className = lecture.type === "lecture" ? "lecture-lesson" : "practical-lesson";
            result.push(`<tr><td class=${className}>${lectureTime}</td><td class="lecture-name ${className}">${lecture.title}</td><td class=${className}>${lecture.classRoom}</td></tr>`)
        }
        counter++;
    }

    return result.join("");
}

function loadSchedule() {
    const result = [];
    const schedule = JSON.parse(loadFile("src/schedule-6.json"))
    for (const day of schedule) {
        result.push(convertDayToHtml(day))
    }

    const doc = document.getElementById("schedule");
    doc.innerHTML = `<table class="schedule-table">${result.join("")}</table>`
}

window.onload = loadSchedule;
