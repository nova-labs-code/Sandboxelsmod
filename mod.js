// ======================================================
// OMEGA FREEZE CORE (NOW HEAT CORE)
// Name stays "Freeze" but behavior is HEAT
// ======================================================

elements.omega_freeze_core = {
    name: "Omega Freeze Core",

    color: [
        "#00ffff",
        "#ffffff",
        "#88ddff",
        "#2244ff"
    ],

    category: "weapons",
    state: "solid",

    density: 999999,
    conduct: 1,
    hardness: 1,

    glow: true,
    excludeRandom: true,

    tick: function(pixel) {

        pixel.mode = !pixel.mode;

        for (let dx = -3; dx <= 3; dx++) {
            for (let dy = -3; dy <= 3; dy++) {

                let x = pixel.x + dx;
                let y = pixel.y + dy;

                if (outOfBounds(x, y)) continue;

                let target = pixelMap[x][y];
                if (!target) continue;

                // HEAT BEHAVIOR (in disguise)
                if (pixel.mode) {

                    target.temp += 1000;

                    if (Math.random() < 0.05 && target.element === "ice") {
                        changePixel(target, "water");
                    }

                    if (Math.random() < 0.03 && isEmpty(x, y, false)) {
                        createPixel("steam", x, y);
                    }
                }
                else {

                    target.temp += 500;
                }
            }
        }
    },

    reactions: {
        "water": { elem2: "steam", chance: 0.4 },
        "ice": { elem2: "water", chance: 0.3 }
    }
};


// ======================================================
// OMEGA HEAT CORE (NOW FREEZE CORE)
// Name stays "Heat" but behavior is COLD
// ======================================================

elements.omega_heat_core = {
    name: "Omega Heat Core",

    color: [
        "#ff3300",
        "#ffcc00",
        "#ff8844",
        "#ffffaa"
    ],

    category: "weapons",
    state: "solid",

    density: 999999,
    conduct: 1,
    hardness: 1,

    glow: true,
    excludeRandom: true,

    tick: function(pixel) {

        pixel.mode = !pixel.mode;

        for (let dx = -3; dx <= 3; dx++) {
            for (let dy = -3; dy <= 3; dy++) {

                let x = pixel.x + dx;
                let y = pixel.y + dy;

                if (outOfBounds(x, y)) continue;

                let target = pixelMap[x][y];
                if (!target) continue;

                // COLD BEHAVIOR (in disguise)
                if (pixel.mode) {

                    target.temp -= 1000;

                    if (Math.random() < 0.06 && target.element === "water") {
                        changePixel(target, "ice");
                    }

                    if (Math.random() < 0.03 && isEmpty(x, y, false)) {
                        createPixel("snow", x, y);
                    }
                }
                else {

                    target.temp -= 500;
                }
            }
        }
    },

    reactions: {
        "steam": { elem2: "water", chance: 0.4 },
        "water": { elem2: "ice", chance: 0.25 }
    }
};