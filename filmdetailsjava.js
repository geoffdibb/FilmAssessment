function savedfilm(){
        const x = sessionStorage.getItem('filmsearchedfor');
        return x;
}



function onloadevent(){
buttonClick('GET', 'http://www.omdbapi.com/?apikey=a0829fbd&t=' + savedfilm())
}

function details(){
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
            node.setAttribute("id", "resInner");
            document.getElementById("results").appendChild(node);
            node.appendChild(textnode);
        }
    }

}


function rejected(reason) {
    console.log(reason);
}

onloadevent();