

function makeLabel(classname, text) {
    let label = document.createElement("div");
    label.innerHTML = text;
    label.className = (classname+"label");
    labels.appendChild(label);
}



var entry = document.getElementById("starter")
var labels = entry.querySelector(".labelrow")
makeLabel("good", "$0.44/day")
makeLabel("good", "Decompiler")
makeLabel("good", "100% UNC")
makeLabel("good", "100% sUNC")