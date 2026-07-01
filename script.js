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

        card.innerHTML = `
            <img class="thumbnail" src="${level.thumbnail}" alt="${level.name}">

            <div class="info">

                <div class="position">#${level.position}</div>

                <div class="levelName">${level.name}</div>

                <div class="creator">
                    Creator: ${level.creator}
                </div>

                <div class="verifier">
                    Verifier: ${level.verifier}
                </div>

                <div class="levelID">
                    ID: ${level.id}
                </div>

                <div class="difficulty ${difficultyClass(level.difficulty)}">
                    ${level.difficulty}
                </div>

                <div class="rating">
                    ⭐ ${level.rating}/10
                </div>

                <br>

                <a class="watch"
                   href="${level.video}"
                   target="_blank">
                    Watch Verification
                </a>

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
