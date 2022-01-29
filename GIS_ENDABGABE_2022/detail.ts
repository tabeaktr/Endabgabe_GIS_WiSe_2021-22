async function loadSelectItemsFromDB(target: HTMLElement, items: string[], generateEventListener: boolean): Promise<void> {
    let response: Response = await fetch("https://tabea-ketterer.herokuapp.com/getItems");

    if (!response.ok) {
        console.error("Die Inhalte des Kühlschranks konnten nicht geladen werden.", response);
    }

    let allItems: any = await response.json();

    console.log(allItems);


    let table: HTMLTableElement = document.createElement("table");
    table.className = "itemTable";
    table.id = "itemsTable";
    let tableBody: HTMLTableSectionElement = document.createElement("tbody");
    table.appendChild(tableBody);

    let tableHead: HTMLTableSectionElement = document.createElement("thead");
    let tableHeadTr: HTMLTableRowElement = document.createElement("tr");
    tableHead.appendChild(tableHeadTr);

    items.forEach(element => {
        let header: HTMLTableCellElement = document.createElement("th");
        header.innerHTML = element;
        tableHeadTr.appendChild(header);
    });

    table.appendChild(tableHead);

    for (let zeile: number = 0; zeile < allItems.length; zeile++) {

        //https://www.geeksforgeeks.org/how-to-retrieve-get-parameters-from-javascript/
        if (allItems[zeile]._id == new URLSearchParams(window.location.search).get("id")) {
            let tr: HTMLTableRowElement = document.createElement("tr");
            tableBody.appendChild(tr);
            let spalte: number = 1;

            items.forEach(element => {
                let td: HTMLTableDataCellElement = document.createElement("td");  //name
                let nameDiv: HTMLElement = document.createElement("div");
                nameDiv.className = "." + element.toLowerCase() + "Item";
                nameDiv.innerHTML = <(string)>Object.values(allItems[zeile])[spalte];
                spalte++;

                if (generateEventListener)
                    nameDiv.addEventListener("click", function (): void { removeItem(allItems[zeile].name); });

                tr.appendChild(td);
                td.appendChild(nameDiv);
            });
        }
    }
    target.appendChild(table);
}

function removeItem(_id: string): void {
    if (window.confirm("Diesen Eintrag löschen?")) {
        fetch("https://tabea-ketterer.herokuapp.com/removeItem?id=" + _id);
        setTimeout(() => { window.location.href = "start.html"; });
    } else {
        console.error("Yeah its ducked");
    }
}

window.addEventListener("load", function (): void {
    loadSelectItemsFromDB(document.querySelector("#listenplatz"), ["Name", "Notiz", "Ablaufdatum", "Anlegedatum", "Kategorie"], false);
    (<HTMLInputElement>document.getElementById("itemID")).value = new URLSearchParams(window.location.search).get("id");

    //deleteButton
    document.getElementById("deleteButton").addEventListener("click", (e) => {
        e.preventDefault();
        let id: string = (<HTMLInputElement>document.getElementById("itemID")).value;
        removeItem(id);
    });
});