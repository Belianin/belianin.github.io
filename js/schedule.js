const schedule = [
    {
        title: "Понедельник",
        lectures: [
            null,
            null,
            {
                title: "Физра"
            },
            {
                title: "ЛОИ",
                classRoom: "632",
                type: "lecture"
            }
        ]
    },
    {
        title: "Вторник",
        lectures: [
            null,
            {
                title: "КГГ",
                classRoom: "622",
                type: "lecture"
            }
        ]
    },
    {
        title: "Среда",
        lectures: [
            null,
            null,
            {
                title: "КГГ",
                classRoom: "517",
                type: "practical"
            }
        ]
    },
    {
        title: "Четверг",
        lectures: [
            {
                title: "Физика",
                classRoom: "611",
                type: "practical"
            },
            {
                title: "Физика",
                classRoom: "632",
                type: "lecture"
            },
            {
                title: "ЛОИ",
                classRoom: "632",
                type: "lecture"
            }
        ]
    },
    {
        title: "Пятница",
        lectures: [
            null,
            {
                title: "Тервер",
                classRoom: "621",
                type: "practical"
            },
            {
                title: "Тервер",
                classRoom: "509",
                type: "lecture"
            }
        ]
    }
];

const timeMapping = [ "9:00", '10:40', "12:50", "14:30", "16:10", "17:50"]

function convertDayToHtml(day) {
    const result = [`<tr><th colspan="3">${day.title}</th></tr>`];
    let counter = 0;
    for (const lecture of day.lectures) {
        if (lecture === null) {
            result.push(`<tr><td>${timeMapping[counter]}</td><td></td><td></td></tr>`)
        } else {
            const className = lecture.type === "lecture" ? "lecture-lesson" : "practical-lesson";
            result.push(`<tr><td class=${className}>${timeMapping[counter]}</td><td class="lecture-name ${className}">${lecture.title}</td><td class=${className}>${lecture.classRoom}</td></tr>`)
        }
        counter++;
    }

    return result.join("");
}

function loadSchedule() {
    const result = [];
    for (const day of schedule) {
        result.push(convertDayToHtml(day))
    }

    const doc = document.getElementById("schedule")
    doc.innerHTML = `<table class="schedule-table">${result.join("")}</table>`
}

window.onload = loadSchedule;
