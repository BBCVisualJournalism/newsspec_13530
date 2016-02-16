define(function () {
    return {
        columns: {
            name: 0,
            ageGender: 1,
            cause: 2,
            location: 3,
            date: 4
        },
        ageGender: ["man", "woman", "boy", "girl"],
        causes: [
            "was shot and killed", 
            "was kidnapped, tortured and executed", 
            "was detained, tortured and executed", 
            "was detained and tortured", 
            "was killed", 
            "was executed", 
            "was detained and executed", 
            "was killed in an explosion", 
            "was killed in a mortar shell attack", 
            "died after being prevented from seeking medical help", 
            "was kidnapped, tortured and killed", 
            "was kidnapped and executed", 
            "was killed in an airstrike", 
            "died in a chemical weapons attack"
        ],
        locations: ["Raqqa", "Aleppo", "the suburbs of Damascus", "Daraa", "Deir Ezzor", "Damascus", "Homs", "Lattakia", "Idlib", "Hama"],
        months: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
    };
});