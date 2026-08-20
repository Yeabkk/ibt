
const state = {
    routes: [],
    favourites: [],
    search: ""
};

const routesEl = document.querySelector("#routes");
const searchEl = document.querySelector("#search");
const favouritesEl = document.querySelector("#fav-list");


async function loadRoutes() {
    routesEl.innerHTML = "<p>Loading routes...</p>";

    try {
        const response = await fetch("routes.json");

        if (!response.ok) {
            throw new Error("Did not load");
        }

        state.routes = await response.json();
        render();
    } catch (error) {
        routesEl.innerHTML = "<p>Could not load bus routes.</p>";
    }
}

function render() {
    const term = state.search.toLowerCase();
    const shown = state.routes.filter(route =>
        route.route.toLowerCase().includes(term) ||
        route.start.toLowerCase().includes(term) ||
        route.destination.toLowerCase().includes(term)
    );

    routesEl.innerHTML = shown.length ? shown.map(route => `
        <article class="route-card" data-id="${route.id}">
            <h3>${route.route}</h3>
            <p>From: ${route.start}</p>
            <p>To: ${route.destination}</p>
            <p>Bus: ${route.bus}</p>
            <p>Fare: ${route.fare} ETB</p>
            <button class="save" type="button">
                ${state.favourites.includes(route.id) ? "Saved" : "Save"}
            </button>
        </article>
    `).join("") : "<p>No routes found.</p>";

    const favourites = state.routes.filter(route =>
        state.favourites.includes(route.id)
    );

    favouritesEl.innerHTML = favourites.length ? favourites.map(route => `
        <li data-id="${route.id}">
            ${route.route}
            <button class="remove" type="button">Remove</button>
        </li>
    `).join("") : "<li>No saved routes.</li>";
}

function saveFavourites() {
    localStorage.setItem("sheger-favourites", JSON.stringify(state.favourites));
}

function loadFavourites() {
    const saved = localStorage.getItem("sheger-favourites");

    if (saved) {
        try {
            state.favourites = JSON.parse(saved);
        } catch (error) {
            state.favourites = [];
        }
    }
}

searchEl.addEventListener("input", event => {
    state.search = event.target.value.trim();
    render();
});

routesEl.addEventListener("click", event => {
    if (!event.target.classList.contains("save")) {
        return;
    }

    const routeId = Number(event.target.closest(".route-card").dataset.id);
    if (!state.favourites.includes(routeId)) {
        state.favourites.push(routeId);
    }

    saveFavourites();
    render();
});

favouritesEl.addEventListener("click", event => {
    if (!event.target.classList.contains("remove")) {
        return;
    }

    const routeId = Number(event.target.closest("li").dataset.id);
    state.favourites = state.favourites.filter(id => id !== routeId);

    saveFavourites();
    render();
});

async function init() {
    loadFavourites();
    await loadRoutes();
}

init();