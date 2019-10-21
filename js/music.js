const songs = [
    {
        title: "Моя религия",
        text: "Текст песни",
        chords: `
G      C
Мне было все равно, что ты была за сквер
И отказалась крестить наших детей
Но смирение и прощение для меня пустой звук
Когда идёт речь об оскорблении моих чувств`
    },
    {
        title: "ПМС (Только тощих)",
        text: "Текст песни",
        chords: "G      C\nТекст песни"
    },
    {
        title: "Эдвард Нортон",
        text: "Текст песни",
        chords: "G      C\nТекст песни"
    },
    {
        title: "Спасибо",
        text: "Текст песни",
        chords: "G      C\nТекст песни"
    },
    {
        title: "Фотопамять",
        text: "Текст песни",
        chords: "G      C\nТекст песни"
    },
    {
        title: "Я не",
        text: "Текст песни",
        chords: "G      C\nТекст песни"
    },
    {
        title: "Ты слушаешь",
        text: "Текст песни",
        chords: "G      C\nТекст песни"
    },
    {
        title: "Ненавижу",
        text: "Текст песни",
        chords: "G      C\nТекст песни"
    }
];

let curSong = 0;

function playSong(songNumber) {
    let audio = document.getElementById(`mainPlayer`);
    if (audio.paused)
        audio.play();
    else
        audio.pause();

    if (curSong !== songNumber) {
        audio.src = `src/music/tanyasuffering/${songNumber}.mp3`;
        curSong = songNumber;
        audio.play();
    }
}

function clearSongText(songNumber) {
    let text = document.getElementById(`text${songNumber}`);
    text.innerHTML = '';
}

function setSongText(songNumber, withChords = false) {
    let text = document.getElementById(`text${songNumber}`);
    if (withChords)
        text.innerHTML = `<pre>${songs[songNumber - 1].chords}</pre><div class="clickable" onclick="clearSongText(${songNumber})">x</div>`;
    else
        text.innerHTML = `<p>${songs[songNumber - 1].text}</p><div class="clickable" onclick="clearSongText(${songNumber})">x</div>`;
}

function loadSongs() {
    const e = document.getElementById('songList');
    const content = [];
    for (let i = 0; i < songs.length; i++) {
        const song = songs[i];
        content.push(`
<section class="song active" style="width: 400px">
    <div class="content">
        <span class="clickable" onclick="playSong(${i + 1})">${i + 1}.   ${song.title}</span>       
        <div id="text${i + 1}"></div>
    </div>       
 </section>
`);
    }

    e.innerHTML = content.join('\n');
    setInterval(drawProgressBar, 100);
}

function drawProgressBar() {
    const maxWidth = 600;
    let player = document.getElementById("player");
    let curAudio = document.getElementById("mainPlayer");

    if (player.paused)
        return;


    let ctx = player.getContext('2d');
    ctx.fillStyle = "lightgray";
    ctx.fillRect(0, 0, maxWidth, 64); //24
    ctx.fillStyle = "orange";//"#1E90FF";
    ctx.fillRect(0, 0, (curAudio.currentTime / curAudio.duration) * maxWidth, 64);
}

window.onload = loadSongs;

let a = `
        <table>
            <tr>
                <td>                
                    <h4 onclick="playSong(${i + 1})">${i + 1}.${song.title}</h4>
                </td>
                <td style="width: 60px">
                    <div class="clickable" style="display: inline-block" onclick="setSongText(${i + 1})">т</div>         
                </td>
                <td>
                    <div class="clickable" style="display: inline-block" onclick="setSongText(${i + 1}, true)">а</div> 
                </td>
            </tr>
        </table>  `;