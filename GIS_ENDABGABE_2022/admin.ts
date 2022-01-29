async function loadItemsFromDB(target: HTMLElement, attributes: string[]): Promise<void> {
    let response: Response = await fetch("https://tabea-ketterer.herokuapp.com/getItems");

    if (!response.ok) {
        console.error("Die Inhalte des Kühlschranks konnten nicht geladen werden.", response);
    }

    let allItems: any = await response.json();
   

    let table: HTMLTableElement = document.createElement("table");
    table.className = "itemTable";
    table.id = "itemsTable";
    let tableBody: HTMLTableSectionElement = document.createElement("tbody");
    table.appendChild(tableBody);

    let tableHead: HTMLTableSectionElement = document.createElement("thead");
    let tableHeadTr: HTMLTableRowElement = document.createElement("tr");
    tableHead.appendChild(tableHeadTr);

    attributes.forEach(element => {
        let header: HTMLTableCellElement = document.createElement("th");
        header.innerHTML = element;
        tableHeadTr.appendChild(header);
    });

    table.appendChild(tableHead);

    for (let zeile: number = 0; zeile < allItems.length; zeile++) {
        let tr: HTMLTableRowElement = document.createElement("tr");

        tableBody.appendChild(tr);
        let spalte: number = 1;

        attributes.forEach(element => {
            let td: HTMLTableDataCellElement = document.createElement("td");
            let dataDiv: HTMLElement = document.createElement("div");
            dataDiv.className = element.toLowerCase() + "Item";
            dataDiv.innerHTML = <(string)>Object.values(allItems[zeile])[spalte];
            td.addEventListener("click", function (): void { location.href = "detailansicht.html?id=" + allItems[zeile]._id; });
            spalte = spalte + 2;
            tr.appendChild(td);
            td.appendChild(dataDiv);
        });
    }
    target.appendChild(table);

    showAll();  //filtert mit dem localStorage Inhalt 
    suchen(0, "myInputName", false);
    suchen(2, "searchKategory", false);
    suchen(1, "searchDate", true);
}



window.addEventListener("load", function (): void {
    loadItemsFromDB(document.querySelector("#listenplatz"), ["Name", "Ablaufdatum", "Kategorie"]);
    (<HTMLInputElement>document.getElementById("myInputName")).value = this.localStorage.getItem("nameQuery");
    (<HTMLInputElement>document.getElementById("searchKategory")).value = this.localStorage.getItem("kategoryQuery");
    (<HTMLInputElement>document.getElementById("searchDate")).value = this.localStorage.getItem("dateQuery");
});

window.addEventListener("unload", function (): void {
    localStorage.setItem("nameQuery", (<HTMLInputElement>document.getElementById("myInputName")).value);
    localStorage.setItem("kategoryQuery", (<HTMLInputElement>document.getElementById("searchKategory")).value);
    localStorage.setItem("dateQuery", (<HTMLInputElement>document.getElementById("searchDate")).value);
});
