define(function () {
    return {
        columns: {
            name: 0,
            ageGender: 1,
            cause: 2,
            location: 3,
            date: 4
        },
        arabic: {
            ageGender: ["\u0630\u0643\u0631 - \u0628\u0627\u0644\u063a", "\u0623\u0646\u062b\u0649 - \u0628\u0627\u0644\u063a\u0629", "\u0630\u0643\u0631 - \u0637\u0641\u0644", "\u0623\u0646\u062b\u0649 - \u0637\u0641\u0644\u0629"],
            causes: ["\u0642\u0635\u0641", "\u0627\u0637\u0644\u0627\u0642 \u0646\u0627\u0631", "\u0642\u0635\u0641 \u0627\u0644\u062c\u0648\u064a", "\u062e\u0637\u0641 - \u0627\u0639\u062f\u0627\u0645", "\u0627\u0639\u062a\u0642\u0627\u0644 - \u062a\u0639\u0630\u064a\u0628", "\u062a\u0641\u062c\u064a\u0631", "\u063a\u064a\u0631 \u0630\u0644\u0643", "\u062e\u0637\u0641 - \u062a\u0639\u0630\u064a\u0628", "\u0627\u0639\u062a\u0642\u0627\u0644 - \u0627\u0639\u062f\u0627\u0645", "\u0627\u0639\u062f\u0627\u0645 \u0645\u064a\u062f\u0627\u0646\u064a", "\u062d\u0631\u0645\u0627\u0646 \u0645\u0646 \u0627\u0644\u0637\u0628\u0627\u0628\u0629", "\u062e\u0637\u0641 - \u062a\u0639\u0630\u064a\u0628 - \u0627\u0639\u062f\u0627\u0645", "\u063a\u0627\u0632\u0627\u062a \u0643\u064a\u0645\u0627\u0648\u064a\u0629 \u0648\u0633\u0627\u0645\u0629", "\u0627\u0639\u062a\u0642\u0627\u0644 - \u062a\u0639\u0630\u064a\u0628 - \u0627\u0639\u062f\u0627\u0645"],
            locations: ["\u062d\u0645\u0635", "\u0627\u062f\u0644\u0628", "\u062d\u0644\u0628", "\u0631\u064a\u0641 \u062f\u0645\u0634\u0642", "\u062f\u064a\u0631 \u0627\u0644\u0632\u0648\u0631", "\u062f\u0631\u0639\u0627", "\u062f\u0645\u0634\u0642", "\u0627\u0644\u0644\u0627\u0630\u0642\u064a\u0629", "\u0627\u0644\u0631\u0642\u0629", "\u062d\u0645\u0627\u0647", "\u0627\u0644\u062d\u0633\u0643\u0629", "\u0627\u0644\u0633\u0648\u064a\u062f\u0627\u0621", "\u063a\u064a\u0631 \u0630\u0644\u0643", "\u0627\u0644\u0642\u0646\u064a\u0637\u0631\u0629", "\u0637\u0631\u0637\u0648\u0633", "\u062f\u0648\u0645\u0627", "\u0627\u0644\u0639\u0631\u0627\u0642", "\u0627\u0644\u0623\u0631\u062f\u0646", "\u0644\u0628\u0646\u0627\u0646", "\u0645\u0635\u0631", "\u0627\u0644\u0633\u0648\u062f\u0627\u0646"]
        },
        english: {
            ageGender: ["woman", "man", "boy", "girl"],
            causes: ["was kidnapped and executed", "was killed in a mortar shell attack", "was shot and killed", "was killed in an airstrike", "was detained and tortured", "was killed in an explosion", "was killed", "was kidnapped, tortured and killed", "was detained and executed", "was executed", "died after being prevented from seeking medical help", "was kidnapped, tortured and executed", "died in a chemical weapons attack", "was detained, tortured and executed"],
            locations: ["Raqqa", "Homs", "Idlib", "Aleppo", "Damascus countryside", "Deir al-Zour", "Deraa", "Damascus", "Latakia", "Hama", "Hassakeh", "Suweida", "Other", "Quneitra", "Tartous", "Douma", "Iraq", "Jordan", "Iraq", "Lebanon", "Egypt", "Sudan"]
        }
    };
});