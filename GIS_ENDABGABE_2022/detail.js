"use strict";
async function loadSelectItemsFromDB(target, items, generateEventListener) {
    let response = await fetch("https://tabea-ketterer.herokuapp.com/getItems");
    if (!response.ok) {
        console.error("Die Inhalte des Kühlschranks konnten nicht geladen werden.", response);
    }
    let allItems = await response.json();
    console.log(allItems);
    let table = document.createElement("table");
    table.className = "itemTable";
    table.id = "itemsTable";
    let tableBody = document.createElement("tbody");
    table.appendChild(tableBody);
    let tableHead = document.createElement("thead");
    let tableHeadTr = document.createElement("tr");
    tableHead.appendChild(tableHeadTr);
    items.forEach(element => {
        let header = document.createElement("th");
        header.innerHTML = element;
        tableHeadTr.appendChild(header);
    });
    table.appendChild(tableHead);
    for (let zeile = 0; zeile < allItems.length; zeile++) {
        //https://www.geeksforgeeks.org/how-to-retrieve-get-parameters-from-javascript/
        if (allItems[zeile]._id == new URLSearchParams(window.location.search).get("id")) {
            let tr = document.createElement("tr");
            tableBody.appendChild(tr);
            let spalte = 1;
            items.forEach(element => {
                let td = document.createElement("td"); //name
                let nameDiv = document.createElement("div");
                nameDiv.className = "." + element.toLowerCase() + "Item";
                nameDiv.innerHTML = Object.values(allItems[zeile])[spalte];
                spalte++;
                if (generateEventListener)
                    nameDiv.addEventListener("click", function () { removeItem(allItems[zeile].name); });
                tr.appendChild(td);
                td.appendChild(nameDiv);
            });
        }
    }
    target.appendChild(table);
}
function removeItem(_id) {
    if (window.confirm("Diesen Eintrag löschen?")) {
        fetch("https://tabea-ketterer.herokuapp.com/removeItem?id=" + _id);
        setTimeout(() => { window.location.href = "start.html"; });
    }
    else {
        console.error("Yeah its ducked");
    }
}
window.addEventListener("load", function () {
    loadSelectItemsFromDB(document.querySelector("#listenplatz"), ["Name", "Notiz", "Ablaufdatum", "Anlegedatum", "Kategorie"], false);
    document.getElementById("itemID").value = new URLSearchParams(window.location.search).get("id");
    //deleteButton
    document.getElementById("deleteButton").addEventListener("click", (e) => {
        e.preventDefault();
        let id = document.getElementById("itemID").value;
        removeItem(id);
    });
});
//# sourceMappingURL=detail.js.map