// OMEGA ANNIHILATOR
// One weapon to end absolutely everything 🌌

// Creates:
// - Fire
// - Plasma
// - Lightning
// - Ice
// - Lava
// - Explosions
// - Radiation
// - Deletion fields
// - Extreme heat + cold at once

elements.omega_annihilator = {
    color: [
        "#000000",
        "#ff0000",
        "#00ffff",
        "#ffffff",
        "#ff00ff"
    ],

    behavior: [
        "HT:9999 AND CO:9999 AND CR:plasma%20 AND CR:lightning%10|DL%8|HT:9999 AND CR:fire%25",
        "DL%8 AND EX:35>plasma,fire,lava,electric,radiation,smoke|XX|DL%8 AND EX:35>plasma,fire,lava,electric,radiation,smoke",
        "CO:9999 AND CR:snow%20 AND CR:ice%20|DL%8|HT:9999 AND CO:9999"
    ],

    category: "weapons",
    state: "solid",

    density: 999999,
    conduct: 1,

    temp: 50000,

    glow: true,

    reactions: {
        "water": {
            elem2: "plasma",
            chance: 1
        },
        "lava": {
            elem2: "obsidian",
            chance: 0.5
        },
        "human": {
            elem2: "ash",
            chance: 1
        },
        "plant": {
            elem2: "fire",
            chance: 1
        },
        "ice": {
            elem2: "steam",
            chance: 1
        }
    }
};