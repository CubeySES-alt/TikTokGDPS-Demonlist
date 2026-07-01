```javascript
const levelContainer = document.getElementById("levelContainer");
const searchBox = document.getElementById("search");

let levels = [];

async function loadLevels() {

    // Load list of JSON files
    const list = await fetch("data/list.json").then(r => r.json());

    levels = [];

    // Load each level
    for (const file of list) {

        const level = await fetch(`data/levels/${file}.json`)
            .then(r => r.json());

        levels.push(level);

    }

    // Sort by position
    levels.sort((a, b) => a.position - b.position);

    updateStats();
    displayLevels(levels);
}

function updateStats() {

    document.getElementById("levelCount").textContent = levels.length;

    const creators = [...new Set(levels.map(l => l.creator))];
    const verifiers = [...new Set(levels.map(l => l.verifier))];

    document.getElementById("creatorCount").textContent = creators.length;
    document.getElementById("verifierCount").textContent = verifiers.length;

}

function difficultyClass(diff) {

    switch(diff.toLowerCase()) {

        case "extreme demon":
            return "extreme";

        case "insane demon":
            return "insane";

        case "hard demon":
            return "hard";

        case "medium demon":
            return "medium";

        case "easy demon":
            return "easy";

        default:
            return "easy";
    }

}

function displayLevels(levelArray) {

    levelContainer.innerHTML = "";

    for (const level of levelArray) {

        const card = document.createElement("div");
        card.className = "levelCard";

const yellow = level.position >= 75 && level.position <= 150;

card.innerHTML = `

<img
class="thumbnail"
src="${level.thumbnail}"
>

<div class="info">

<div class="rank ${yellow ? "rankYellow" : ""}">
[${level.position}] - <span class="levelName">${level.name}</span>
</div>

<div class="creator">
Creator: ${level.creator}
</div>

<div class="verifier">
Verifier: ${level.verifier}
</div>

</div>

`;
        // Open level page when clicking the card
        card.onclick = () => {

            window.location.href =
                `level.html?level=${encodeURIComponent(level.file)}`;

        };

        levelContainer.appendChild(card);

    }

}

// Live search
searchBox.addEventListener("input", () => {

    const text = searchBox.value.toLowerCase();

    const filtered = levels.filter(level =>

        level.name.toLowerCase().includes(text) ||

        level.creator.toLowerCase().includes(text) ||

        level.verifier.toLowerCase().includes(text)

    );

    displayLevels(filtered);

});

// Start
loadLevels().catch(err => {

    console.error(err);

    levelContainer.innerHTML = `
        <h2 style="text-align:center;color:red;">
            Failed to load demon list.
        </h2>
    `;

});
```
