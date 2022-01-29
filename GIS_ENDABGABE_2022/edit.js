"use strict";
async function loadEditSelectItemsFromDB() {
    let response = await fetch("https://tabea-ketterer.herokuapp.com/getItems");
    if (!response.ok) {
        console.error("Die Inhalte des Kühlschranks konnten nicht geladen werden.", response);
    }
    let allItems = await response.json();
    console.log(allItems);
    for (let i = 0; i < allItems.length; i++) {
        if (allItems[i]._id == new URLSearchParams(window.location.search).get("id")) {
            document.getElementById("itemName").value = allItems[i].name;
            let date = allItems[i].ablaufDatum;
            document.getElementById("ablaufDatum").value = date.replace(/\./g, "\/");
            document.getElementById("notiz").value = allItems[i].note;
            document.getElementById("katkat").value = allItems[i].kategorie;
        }
    }
}
window.addEventListener("load", function () {
    loadEditSelectItemsFromDB();
    document.getElementById("itemID").value = new URLSearchParams(window.location.search).get("id");
    if (document.getElementById("itemID").value != "") {
        document.getElementById("itemSubmit").value = "Ändern";
    }
    document.querySelector("form").addEventListener("submit", (e) => {
        e.preventDefault();
        let id = document.getElementById("itemID").value;
        let nameString = document.getElementById("itemName").value;
        let ablaufDatum = new Date(document.getElementById("ablaufDatum").value).toLocaleDateString("de-DE", { year: "numeric", month: "2-digit", day: "2-digit" });
        let notiz = document.getElementById("notiz").value;
        let kategorie = document.getElementById("katkat").value;
        if (id != "") {
            fetch("https://tabea-ketterer.herokuapp.com/addItem?name=" + nameString + "&ablaufDatum=" + ablaufDatum + "&note=" + notiz + "&kategorie=" + kategorie + "&id=" + id); //https://stackoverflow.com/questions/53071851/getting-the-value-from-input-element-in-typescript/53072115
        }
        else {
            fetch("https://tabea-ketterer.herokuapp.com/addItem?name=" + nameString + "&ablaufDatum=" + ablaufDatum + "&note=" + notiz + "&kategorie=" + kategorie); //https://stackoverflow.com/questions/53071851/getting-the-value-from-input-element-in-typescript/53072115
        }
        setTimeout(() => { window.location.href = "start.html"; });
    });
});
//# sourceMappingURL=edit.js.map