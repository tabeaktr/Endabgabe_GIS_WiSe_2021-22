"use strict";
function suchen(_spalte, _id, isDate) {
    let filter = document.getElementById(_id).value.toUpperCase();
    if (filter == (("Kategorie suchen...").toUpperCase()) && _id == "searchKategory")
        return;
    if (filter == (("Läuft ab in...").toUpperCase()) && _id == "searchDate")
        return;
    let table = document.getElementById("itemsTable");
    let tr = table.getElementsByTagName("tr");
    let td1;
    let txtValue;
    if (isDate) {
        let currentDate = new Date();
        if (filter == (("Schon abgelaufen").toUpperCase()) && _id == "searchDate") {
            for (let i = 0; i < tr.length; i++) {
                td1 = tr[i].getElementsByTagName("td")[_spalte];
                if (td1) {
                    txtValue = td1.textContent || td1.innerText;
                    let ablaufDatum = new Date(tr[i].getElementsByTagName("td")[_spalte].innerText);
                    console.log("ablaufDatum: " + ablaufDatum + "," + "currentDate: " + currentDate);
                    if ((currentDate > ablaufDatum)) {
                        tr[i].style.display = tr[i].style.display;
                    }
                    else {
                        tr[i].style.display = "none";
                    }
                }
            }
        }
        else {
            let targetDate = new Date();
            targetDate.setDate(currentDate.getDate() + parseInt(filter));
            for (let i = 0; i < tr.length; i++) {
                td1 = tr[i].getElementsByTagName("td")[_spalte];
                if (td1) {
                    txtValue = td1.textContent || td1.innerText;
                    let dateAsString = tr[i].getElementsByTagName("td")[_spalte].innerText;
                    let ablaufDatum = new Date((dateAsString.split(".")[1] + "-" + dateAsString.split(".")[0] + "-" + dateAsString.split(".")[2]));
                    if ((targetDate >= ablaufDatum) && (currentDate <= ablaufDatum)) {
                        tr[i].style.display = tr[i].style.display;
                    }
                    else {
                        tr[i].style.display = "none";
                    }
                }
            }
        }
    }
    else {
        for (let i = 0; i < tr.length; i++) {
            td1 = tr[i].getElementsByTagName("td")[_spalte];
            if (td1) {
                txtValue = td1.textContent || td1.innerText;
                if (txtValue.toUpperCase().indexOf(filter) > -1) {
                    tr[i].style.display = tr[i].style.display;
                }
                else {
                    tr[i].style.display = "none";
                }
            }
        }
    }
}
function showAll() {
    let table = document.getElementById("itemsTable");
    let tr = table.getElementsByTagName("tr");
    for (let i = 0; i < tr.length; i++) {
        tr[i].style.display = "";
    }
}
//# sourceMappingURL=filter.js.map