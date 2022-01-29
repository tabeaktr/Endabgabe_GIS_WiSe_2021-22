"use strict";
async function loadItemsFromDB(target, attributes) {
    let response = await fetch("https://tabea-ketterer.herokuapp.com/getItems");
    if (!response.ok) {
        console.error("Die Inhalte des Kühlschranks konnten nicht geladen werden.", response);
    }
    let allItems = await response.json();
    let table = document.createElement("table");
    table.className = "itemTable";
    table.id = "itemsTable";
    let tableBody = document.createElement("tbody");
    table.appendChild(tableBody);
    let tableHead = document.createElement("thead");
    let tableHeadTr = document.createElement("tr");
    tableHead.appendChild(tableHeadTr);
    attributes.forEach(element => {
        let header = document.createElement("th");
        header.innerHTML = element;
        tableHeadTr.appendChild(header);
    });
    table.appendChild(tableHead);
    for (let zeile = 0; zeile < allItems.length; zeile++) {
        let tr = document.createElement("tr");
        tableBody.appendChild(tr);
        let spalte = 1;
        attributes.forEach(element => {
            let td = document.createElement("td");
            let dataDiv = document.createElement("div");
            dataDiv.className = element.toLowerCase() + "Item";
            dataDiv.innerHTML = Object.values(allItems[zeile])[spalte];
            td.addEventListener("click", function () { location.href = "detailansicht.html?id=" + allItems[zeile]._id; });
            spalte = spalte + 2;
            tr.appendChild(td);
            td.appendChild(dataDiv);
        });
    }
    target.appendChild(table);
    showAll(); //filtert mit dem localStorage Inhalt 
    suchen(0, "myInputName", false);
    suchen(2, "searchKategory", false);
    suchen(1, "searchDate", true);
}
window.addEventListener("load", function () {
    loadItemsFromDB(document.querySelector("#listenplatz"), ["Name", "Ablaufdatum", "Kategorie"]);
    document.getElementById("myInputName").value = this.localStorage.getItem("nameQuery");
    document.getElementById("searchKategory").value = this.localStorage.getItem("kategoryQuery");
    document.getElementById("searchDate").value = this.localStorage.getItem("dateQuery");
});
window.addEventListener("unload", function () {
    localStorage.setItem("nameQuery", document.getElementById("myInputName").value);
    localStorage.setItem("kategoryQuery", document.getElementById("searchKategory").value);
    localStorage.setItem("dateQuery", document.getElementById("searchDate").value);
});
//# sourceMappingURL=admin.js.map