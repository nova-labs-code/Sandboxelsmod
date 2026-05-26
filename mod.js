// ======================================================
// OMEGA FREEZE CORE
// Alternates between freezing and heating every tick
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

        pixel.freezeMode = !pixel.freezeMode;

        for (let dx = -3; dx <= 3; dx++) {
            for (let dy = -3; dy <= 3; dy++) {

                let x = pixel.x + dx;
                let y = pixel.y + dy;

                if (outOfBounds(x, y)) continue;

                let target = pixelMap[x][y];
                if (!target) continue;

                // FREEZE FRAME
                if (pixel.freezeMode) {

                    target.temp -= 1000;

                    if (Math.random() < 0.08 && isEmpty(x, y, false)) {
                        createPixel("snow", x, y);
                    }
                }

                // HEAT FRAME
                else {

                    target.temp += 1000;

                    if (Math.random() < 0.04 && target.element === "ice") {
                        changePixel(target, "water");
                    }
                }
            }
        }
    },

    reactions: {
        "water": { elem2: "ice", chance: 0.3 },
        "steam": { elem2: "water", chance: 0.3 }
    }
};


// ======================================================
// OMEGA HEAT CORE
// Opposite polarity of Freeze Core
// Alternates heating and cooling every tick
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

        pixel.heatMode = !pixel.heatMode;

        for (let dx = -3; dx <= 3; dx++) {
            for (let dy = -3; dy <= 3; dy++) {

                let x = pixel.x + dx;
                let y = pixel.y + dy;

                if (outOfBounds(x, y)) continue;

                let target = pixelMap[x][y];
                if (!target) continue;

                // HEAT FRAME
                if (pixel.heatMode) {

                    target.temp += 1000;

                    if (Math.random() < 0.08 && target.element === "ice") {
                        changePixel(target, "water");
                    }

                    if (Math.random() < 0.03 && isEmpty(x, y, false)) {
                        createPixel("steam", x, y);
                    }
                }

                // COOL FRAME
                else {

                    target.temp -= 1000;

                    if (Math.random() < 0.05 && target.element === "water") {
                        changePixel(target, "ice");
                    }

                    if (Math.random() < 0.02 && isEmpty(x, y, false)) {
                        createPixel("snow", x, y);
                    }
                }
            }
        }
    },

    reactions: {
        "water": { elem2: "steam", chance: 0.3 },
        "steam": { elem2: "water", chance: 0.15 }
    }
};