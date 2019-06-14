function getfilmname() {
        let text = document.getElementById("filmname").value;

sessionStorage.setItem('filmsearchedfor', text);

    return text;

}
const clickActions = {

    search: () => buttonClick('GET', 'http://www.omdbapi.com/?apikey=a0829fbd&s=' + getfilmname()),

}
function details() {
    window.location = 'filmdetails.html';

}

function buttonClick(reqType, url, body) {

    let req = new XMLHttpRequest()
    req.onload = function () {
        const el = document.getElementById("results");
        while (el.firstChild) {
            el.removeChild(el.firstChild);
        }
        promises(req);
    }
    req.open(reqType, url);
    req.send(body);

}
function promises(req) {
    const createPromise = new Promise(
        function (res, rej) {
            if (req.status === 200) {
                let result = JSON.parse(req.responseText);
                res(result);

            } else {
                const reason = new Error("Invalid entry field")
                rej(reason);
            }
        }


    )
    createPromise
        .then((result) => resolved(result))
        .catch(error => rejected(error))

}
function resolved(result) {
    if (result.accountNumber === undefined) {
        for (let c in result) {
            let output = JSON.stringify(result[c]);
            let textnode = document.createTextNode(output);
            let node = document.createElement("div");
            node.setAttribute("title", "resInner");
            document.getElementById("results").appendChild(node);
            node.appendChild(textnode);

            let tr = "<tr>";
            tr += "<td>|-- Title --|</td>";
            if (result[0] !== undefined) {
                for (let i = 0; i < result.length; i++) {
                    //output to table
                    let filmstring = "";
                    for (let j = 0; j < result[i].pets.length; j++) {
                        filmstring += result[i].pets[j].title + ", ";
                    }
                    tr += "<td>" + result[i].id + "</td><td>";
                }
                results.innerHTML += tr;
            } else {
                let filmstring = "";
                for (let j = 0; j < result.pets.length; j++) {
                    filmstring += result.pets[j].title + ", ";
                }
                tr += "<td>" + result[i].id + "</td><td>$";
            }
        }
    }

}


function rejected(reason) {
    console.log(reason);
}



