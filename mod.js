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

        // toggle state
        pixel.freezeMode = !pixel.freezeMode;

        for (let dx = -3; dx <= 3; dx++) {
            for (let dy = -3; dy <= 3; dy++) {

                let x = pixel.x + dx;
                let y = pixel.y + dy;

                if (outOfBounds(x,y)) continue;

                let target = pixelMap[x][y];

                if (!target) continue;

                // =====================================
                // FREEZE FRAME
                // =====================================
                if (pixel.freezeMode) {

                    target.temp -= 1000;

                    if (Math.random() < 0.08 && isEmpty(x,y,false)) {
                        createPixel("snow", x, y);
                    }

                }

                // =====================================
                // UNFREEZE / HEAT FRAME
                // =====================================
                else {

                    target.temp += 1000;

                    if (Math.random() < 0.04 && target.element === "ice") {
                        changePixel(target,"water");
                    }
                }
            }
        }
    },

    reactions: {

        "water": {
            elem2: "ice",
            chance: 0.3
        },

        "steam": {
            elem2: "water",
            chance: 0.3
        }
    }
};