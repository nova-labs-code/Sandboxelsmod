elements.human = {
    color: "#cfa27a",
    behavior: behaviors.POWDER,
    category: "life",
    state: "solid",
    density: 1050,

    tick: function(pixel) {
        let x = pixel.x;
        let y = pixel.y;

        // -----------------------
        // AGE SYSTEM (years)
        // -----------------------
        if (!pixel.age) {
            pixel.age = 0;
            pixel.lifespan = Math.floor(65 + Math.random() * 35); // 65–100
        }

        // convert ticks to "years"
        pixel.age += 0.01;

        // death by old age
        if (pixel.age >= pixel.lifespan) {
            changePixel(pixel, "dead_body");
            return;
        }

        let adult = pixel.age >= 18;

        // -----------------------
        // SIMPLE "SMART" BEHAVIOR
        // -----------------------

        // priority 1: seek wood/stone to build (placeholder logic)
        let dirs = [
            [1,0],[-1,0],[0,1],[0,-1],
            [1,1],[-1,1],[1,-1],[-1,-1]
        ];

        for (let d of dirs) {
            let nx = x + d[0];
            let ny = y + d[1];

            if (!isEmpty(nx, ny)) {
                let target = pixelMap[nx][ny];

                if (target) {

                    // BASIC RESOURCE SEEKING (hooks for future crafting system)
                    if (target.element === "wood" || target.element === "stone") {
                        tryMove(pixel, nx, ny);
                        return;
                    }

                    // -----------------------
                    // REPRODUCTION (adult only)
                    // -----------------------
                    if (adult && target.element === "human") {
                        if (target.age >= 18 && Math.random() < 0.01) {

                            for (let d2 of dirs) {
                                let bx = x + d2[0];
                                let by = y + d2[1];

                                if (isEmpty(bx, by)) {
                                    createPixel("baby_human", bx, by);
                                    return;
                                }
                            }
                        }
                    }
                }
            }
        }

        // -----------------------
        // RANDOM WALK (exploration)
        // -----------------------
        if (Math.random() < 0.35) {
            tryMove(pixel, x + (Math.random() < 0.5 ? -1 : 1), y);
        }
    }
};


// -----------------------
// BABY HUMAN
// -----------------------
elements.baby_human = {
    color: "#f2d2b6",
    behavior: behaviors.WALL,
    category: "life",
    state: "solid",
    density: 900,

    tick: function(pixel) {
        if (!pixel.age) pixel.age = 0;

        pixel.age += 0.02;

        // grow into adult
        if (pixel.age >= 16) {
            changePixel(pixel, "human");
        }
    }
};


// -----------------------
// DEAD BODY (aging result)
// -----------------------
elements.dead_body = {
    color: "#5a3d2b",
    behavior: behaviors.POWDER,
    category: "life",
    state: "solid",
    density: 1100
};