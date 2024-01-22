export const createButton = (text, ...styles) => {
    let button = document.createElement("button");
    button.innerText = text;
    button.classList.add(...styles);

    return button;
}

export const createCounterButton = (text,...id) => {
    let countersButtons = document.createElement("button");
    countersButtons.innerText = text;
    countersButtons.classList.add("btn", "btn-outline-dark", "m-2");
    countersButtons.setAttribute(...id)

    return countersButtons;
}
