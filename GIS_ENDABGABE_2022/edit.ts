async function loadEditSelectItemsFromDB(): Promise<void> {
    let response: Response = await fetch("https://tabea-ketterer.herokuapp.com/getItems");

    if (!response.ok) {
        console.error("Die Inhalte des Kühlschranks konnten nicht geladen werden.", response);
    }

    let allItems: any = await response.json();
    console.log(allItems);

    for (let i: number = 0; i < allItems.length; i++) {
        if (allItems[i]._id == new URLSearchParams(window.location.search).get("id")) {
            (<HTMLInputElement>document.getElementById("itemName")).value = allItems[i].name;
            let date: string = allItems[i].ablaufDatum;
            
            (<HTMLInputElement>document.getElementById("ablaufDatum")).value = date.replace(/\./g, "\/");
            (<HTMLInputElement>document.getElementById("notiz")).value = allItems[i].note;
            (<HTMLInputElement>document.getElementById("katkat")).value = allItems[i].kategorie;
        }
    }
}



window.addEventListener("load", function (): void {
    loadEditSelectItemsFromDB();
    (<HTMLInputElement>document.getElementById("itemID")).value = new URLSearchParams(window.location.search).get("id");
    if ((<HTMLInputElement>document.getElementById("itemID")).value != "") {
        (<HTMLInputElement>document.getElementById("itemSubmit")).value = "Ändern";
    }
    document.querySelector("form").addEventListener("submit", (e) => {
        e.preventDefault();
        let id: String = (<HTMLInputElement>document.getElementById("itemID")).value;
        let nameString: String = (<HTMLInputElement>document.getElementById("itemName")).value;
        let ablaufDatum: String = new Date((<HTMLInputElement>document.getElementById("ablaufDatum")).value).toLocaleDateString("de-DE", { year: "numeric", month: "2-digit", day: "2-digit" }); 
        let notiz: String = (<HTMLInputElement>document.getElementById("notiz")).value;
        let kategorie: String = (<HTMLInputElement>document.getElementById("katkat")).value;
        if (id != "") {
            fetch("https://tabea-ketterer.herokuapp.com/addItem?name=" + nameString + "&ablaufDatum=" + ablaufDatum + "&note=" + notiz + "&kategorie=" + kategorie + "&id=" + id); //https://stackoverflow.com/questions/53071851/getting-the-value-from-input-element-in-typescript/53072115
        } else {
            fetch("https://tabea-ketterer.herokuapp.com/addItem?name=" + nameString + "&ablaufDatum=" + ablaufDatum + "&note=" + notiz + "&kategorie=" + kategorie); //https://stackoverflow.com/questions/53071851/getting-the-value-from-input-element-in-typescript/53072115
        }


        setTimeout(() => { window.location.href = "start.html"; });
    });
});

