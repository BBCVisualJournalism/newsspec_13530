define(function () {
    return {
        columns: {
            name: 0,
            ageGender: 1,
            cause: 2,
            location: 3,
            date: 4
        },
        ageGender: ["woman", "man", "boy", "girl"],
        causes: [
            "was kidnapped and executed",
            "was killed in a mortar shell attack",
            "was shot and killed",
            "was killed in an airstrike",
            "was detained and tortured",
            "was killed in an explosion",
            "was killed",
            "was kidnapped, tortured and killed",
            "was detained and executed",
            "was executed",
            "died after being prevented from seeking medical help",
            "was kidnapped, tortured and executed",
            "died in a chemical weapons attack",
            "was detained, tortured and executed"
        ],
        locations: [
            "Raqqa",
            "Homs",
            "Idlib",
            "Aleppo",
            "Damascus countryside",
            "Deir al-Zour",
            "Deraa",
            "Damascus",
            "Latakia",
            "Hama",
            "Hassakeh",
            "Suweida",
            "Other",
            "Quneitra",
            "Tartous", 
            "Douma", 
            "Iraq", 
            "Jordan", 
            "Iraq", 
            "Lebanon", 
            "Egypt", 
            "Sudan"
        ],
        months: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
    };
});