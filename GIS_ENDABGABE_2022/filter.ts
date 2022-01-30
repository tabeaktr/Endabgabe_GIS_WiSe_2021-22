function suchen(_spalte: number, _id: string, isDate: boolean): void {
    let filter: string = (<HTMLInputElement>document.getElementById(_id)).value.toUpperCase();

    if (filter == (("Kategorie suchen...").toUpperCase()) && _id == "searchKategory")
        return;

    if (filter == (("Läuft ab in...").toUpperCase()) && _id == "searchDate")
        return;

    let table: HTMLElement = document.getElementById("itemsTable");
    let tr: HTMLCollectionOf<HTMLTableRowElement> = table.getElementsByTagName("tr");
    let td1: any;
    let txtValue: string;

    if (isDate) {
        let currentDate: Date = new Date();
       

        if (filter == (("Schon abgelaufen").toUpperCase()) && _id == "searchDate") {
            currentDate.setDate(currentDate.getDate() - 1); //currentDate nimmt bei Initialisierung auch die Uhrzeit mit -> currentDate 1 Tag in die Vergangenheit verhindert, dass Inhalte vom heutigen Tag als "Schon abgelaufen gelten."
           
            for (let i: number = 0; i < tr.length; i++) {
                td1 = tr[i].getElementsByTagName("td")[_spalte];
                if (td1) {
                    let splitDate: string[] = tr[i].getElementsByTagName("td")[_spalte].innerText.split(".");
                    let ablaufDatum: Date = new Date(splitDate[2] + "-" + splitDate[1] + "-" + splitDate[0]);
                    
                    if ((currentDate > ablaufDatum)) {
                        tr[i].style.display = tr[i].style.display;
                    } else {
                        tr[i].style.display = "none";
                    }
                }
            }
        } else {

            let targetDate: Date = new Date();
            targetDate.setDate(currentDate.getDate() + parseInt(filter));
            for (let i: number = 0; i < tr.length; i++) {
                td1 = tr[i].getElementsByTagName("td")[_spalte];

                if (td1) {
                    
                    let splitDate: string[] = tr[i].getElementsByTagName("td")[_spalte].innerText.split(".");
                    let ablaufDatum: Date = new Date(splitDate[2] + "-" + splitDate[1] + "-" + splitDate[0]);

                    if ((targetDate >= ablaufDatum) && (currentDate <= ablaufDatum)) {
                        tr[i].style.display = tr[i].style.display;
                    } else {
                        tr[i].style.display = "none";
                    }
                }
            }
        }

    } else {
        for (let i: number = 0; i < tr.length; i++) {
            td1 = tr[i].getElementsByTagName("td")[_spalte];
            if (td1) {
                txtValue = td1.textContent || td1.innerText;
                if (txtValue.toUpperCase().indexOf(filter) > -1) {
                    tr[i].style.display = tr[i].style.display;
                } else {
                    tr[i].style.display = "none";
                }
            }
        }
    }
}

function showAll(): void {
    let table: HTMLElement = document.getElementById("itemsTable");
    let tr: HTMLCollectionOf<HTMLTableRowElement> = table.getElementsByTagName("tr");

    for (let i: number = 0; i < tr.length; i++) {
        tr[i].style.display = "";
    }
}