// ~

function buildFirehose(id) {
    let item = document.createElement("li");
    item.innerText = "Hello world";

    let list = document.getElementById(id);
    list.appendChild(item);
}
