```javascript
// Get the level name from the URL
const params = new URLSearchParams(window.location.search);
const levelFile = params.get("level");

// If no level is provided, go back to the homepage
if (!levelFile) {
    window.location.href = "index.html";
}

// Returns the CSS class for the difficulty badge
function difficultyClass(diff) {

    switch (diff.toLowerCase()) {

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

async function loadLevel() {

    try {

        // Load the JSON file
        const level = await fetch(`data/levels/${levelFile}.json`)
            .then(r => {

                if (!r.ok)
                    throw new Error("Level not found");

                return r.json();

            });

        // Browser tab title
        document.title = level.name + " - Demon List";

        // Header title
        document.getElementById("pageTitle").textContent = level.name;

        // Main info
        document.getElementById("thumbnail").src = level.thumbnail;
        document.getElementById("thumbnail").alt = level.name;

        document.getElementById("levelName").textContent = level.name;

        document.getElementById("position").textContent =
            "#" + level.position;

        const diff = document.getElementById("difficulty");
        diff.textContent = level.difficulty;
        diff.classList.add(difficultyClass(level.difficulty));

        document.getElementById("creator").textContent = level.creator;
        document.getElementById("verifier").textContent = level.verifier;
        document.getElementById("levelID").textContent = level.id;
        document.getElementById("rating").textContent = level.rating;

        document.getElementById("description").textContent =
            level.description || "No description.";

        document.getElementById("video").href = level.video;

    }
    catch (error) {

        document.body.innerHTML = `
        <div style="text-align:center;padding:80px;color:white;">
            <h1>404</h1>
            <h2>Level not found.</h2>
            <br>
            <a href="index.html" class="watch">
                Return to Demon List
            </a>
        </div>
        `;

        console.error(error);

    }

}

loadLevel();
```
