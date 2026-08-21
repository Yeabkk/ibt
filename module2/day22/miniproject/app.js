const API = "https://open.er-api.com/v6/latest/ETB";

const state = {
    rates: {},
    watchlist: [],
    currency: "USD",
    amount: 100
};


// -------------------------
// RENDER
// -------------------------

function render() {

    const select = document.querySelector("#currency");

    select.innerHTML = Object.keys(state.rates)
        .map(currency =>
            `<option value="${currency}">${currency}</option>`
        )
        .join("");

    if (state.rates[state.currency]) {
        select.value = state.currency;
    }

    renderWatchlist();
}


// -------------------------
// LOAD RATES
// -------------------------

async function loadRates() {

    const status = document.querySelector("#status");

    status.textContent = "Loading exchange rates...";

    try {

        const res = await fetch(API);

        if (!res.ok) {
            throw new Error("Request failed");
        }

        const data = await res.json();

        state.rates = data.rates;

        status.textContent = "Exchange rates loaded.";

        render();

    } catch (error) {

        status.textContent =
            "Error: Could not load exchange rates.";
    }
}


// -------------------------
// CONVERT
// -------------------------

const form = document.querySelector("#convert-form");

form.addEventListener("submit", function(event) {

    event.preventDefault();

    const amountInput = document.querySelector("#amount");
    const result = document.querySelector("#result");

    const amount = Number(amountInput.value);

    if (!Number.isFinite(amount) || amount <= 0) {

        result.textContent =
            "Please enter a valid amount greater than zero.";

        return;
    }

    state.amount = amount;

    const rate = state.rates[state.currency];

    if (!rate) {

        result.textContent =
            "Exchange rate is not available.";

        return;
    }

    const converted = amount * rate;

    result.textContent =
        `${amount} ETB = ${converted.toFixed(2)} ${state.currency}`;
});


// -------------------------
// CURRENCY CHANGE
// -------------------------

const currencySelect = document.querySelector("#currency");

currencySelect.addEventListener("change", function() {

    state.currency = currencySelect.value;

    save();
});


// -------------------------
// WATCHLIST
// -------------------------

const addWatchButton = document.querySelector("#add-watch");

addWatchButton.addEventListener("click", function() {

    const currency = state.currency;

    if (state.watchlist.includes(currency)) {
        return;
    }

    state.watchlist.push(currency);

    save();

    renderWatchlist();
});


// -------------------------
// RENDER WATCHLIST
// -------------------------

function renderWatchlist() {

    const list = document.querySelector("#watchlist");

    if (state.watchlist.length === 0) {

        list.innerHTML =
            "<li>Your watchlist is empty.</li>";

        return;
    }

    list.innerHTML = state.watchlist
        .map(currency => `
            <li data-c="${currency}">
                ${currency}
                <button
                    type="button"
                    data-remove="${currency}">
                    Remove
                </button>
            </li>
        `)
        .join("");
}


// -------------------------
// REMOVE FROM WATCHLIST
// -------------------------

const watchlistElement =
    document.querySelector("#watchlist");

watchlistElement.addEventListener("click", function(event) {

    const currency = event.target.dataset.remove;

    if (!currency) {
        return;
    }

    state.watchlist = state.watchlist.filter(function(item) {
        return item !== currency;
    });

    save();

    renderWatchlist();
});


// -------------------------
// SAVE
// -------------------------

function save() {

    const data = {
        watchlist: state.watchlist,
        currency: state.currency
    };

    localStorage.setItem(
        "birr-watch",
        JSON.stringify(data)
    );
}


// -------------------------
// LOAD
// -------------------------

function load() {

    const saved = localStorage.getItem("birr-watch");

    if (!saved) {
        return;
    }

    try {

        const data = JSON.parse(saved);

        if (Array.isArray(data.watchlist)) {
            state.watchlist = data.watchlist;
        }

        if (
            typeof data.currency === "string" &&
            data.currency
        ) {
            state.currency = data.currency;
        }

    } catch (error) {

        state.watchlist = [];
        state.currency = "USD";
    }
}


// -------------------------
// START APPLICATION
// -------------------------

function init() {

    load();

    loadRates();
}

init();