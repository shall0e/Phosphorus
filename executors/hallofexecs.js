

function makeLabel(labels, classname, text) {
    let label = document.createElement("div");
    label.innerHTML = text;
    label.className = (classname+"label");
    labels.appendChild(label);
}

var execs;

async function main() {
    let response = await fetch("https://ankor.pages.dev/api/?sort=best&raw");
    let exec = await response.json();
    return exec;
}

(async () => {
var execs;
execs = await main();



for (var item in execs) {
    var executor = execs[item]
    var entry = document.getElementById("starter").cloneNode(true)

    var executorName = (entry.querySelector(".name").innerHTML).split(" - <")
    executorName[0] = executor.name
    entry.querySelector(".name").innerHTML = executorName.join(" - <")

    if (executor.rating > 0) {
        var ratingLevel = "reallybadtext";
        if (executor.rating > 3) {
            var ratingLevel = "badtext";
            if (executor.rating > 5.2) {
                var ratingLevel = "medtext";
                if (executor.rating > 7.5) {
                    var ratingLevel = "goodtext";
                };
            };
        };
    };

    let val = Math.round(executor.INFO.daily_pricing*100)/100
    if (typeof executor.INFO.daily_pricing !== "string") {
        switch (true) {
            case (val > 0.5):
                makeLabel(entry.querySelector(".labelrow"), "bad", ("$"+String(val)+"/day"))
                break;
            case (val > 1):
                makeLabel(entry.querySelector(".labelrow"), "med", ("$"+String(val)+"/day"))
                break;
            case (val > 1.5):
                makeLabel(entry.querySelector(".labelrow"), "bad", ("$"+String(val)+"/day"))
                break;
            default:
                if (val == 0) {
                    makeLabel(entry.querySelector(".labelrow"), "good", ("Free"))
                } else {
                    makeLabel(entry.querySelector(".labelrow"), "good", ("$"+String(val)+"/day"))
                }
                break;
        }
    } else {
        makeLabel(entry.querySelector(".labelrow"), "med", "$9.99/Life")
    }

    switch (executor.CORE.decompiler) {
        default:
            makeLabel(entry.querySelector(".labelrow"), "med", "Decompiler")
            break;
        case true:
            makeLabel(entry.querySelector(".labelrow"), "good", "Decompiler")
            break;
        case false:
            makeLabel(entry.querySelector(".labelrow"), "bad", "Decompiler")
            break;
    }

    val = executor.CORE.LIB.UNC
    switch (true) {
        case (val > 80):
            makeLabel(entry.querySelector(".labelrow"), "good", (val+"% UNC"))
            break;
        case (val > 65):
            makeLabel(entry.querySelector(".labelrow"), "med", (val+"% UNC"))
            break;
        default:
            makeLabel(entry.querySelector(".labelrow"), "bad", (val+"% UNC"))
            break;
    }

    val = Math.round(executor.CORE.LIB.UNCfract)
    sunc = executor.CORE.LIB.sUNC
    switch (true) {
        case (val > 80):
            makeLabel(entry.querySelector(".labelrow"), "good", (sunc+"% sUNC"))
            break;
        case (val > 65):
            makeLabel(entry.querySelector(".labelrow"), "med", (sunc+"% sUNC"))
            break;
        default:
            makeLabel(entry.querySelector(".labelrow"), "bad", (sunc+"% sUNC"))
            break;
    }


    var rating = entry.querySelector(".goodtext")
    rating.className = ratingLevel
    rating.innerHTML = (String(executor.rating)+"/10")
    document.querySelector(".display").appendChild(entry)


    var newLine = document.createElement("p")
    for (var i in executor.INFO.notes) {
        var newLine = document.createElement("p")
        if ((executor.INFO.notes[i]).substring(0,1) == "+") {
            newLine.innerHTML = ((executor.INFO.notes[i]).replace("+",'<b class="goodtext">+</b> '))
        } else if ((executor.INFO.notes[i]).substring(0,1) == "-") {
            newLine.innerHTML = ((executor.INFO.notes[i]).replace("-",'<b class="badtext">-</b> '))
        } else {
            newLine.innerHTML = ("<b class='note'>~</b> "+executor.INFO.notes[i])
        }
        entry.appendChild(newLine)
    }
    if ("_AUTOSRC" in executor) {
        var newLine = document.createElement("p")
        newLine.innerHTML = "<br> <a class='note' href='"+"https://ankor.pages.dev/api/?link"+"'>This entry is using dynamic link.<a>"
        entry.appendChild(newLine)
    }
}


document.getElementById("starter").remove()

})();

// please excuse the shit code ill fix it one day, but this works for now.