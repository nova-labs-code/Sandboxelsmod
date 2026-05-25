const MAX_HP = 5;
const DAMAGE = 1;

// check adjacent touch
function isTouching(pixel, type) {
    const dirs = [
        [1,0],[-1,0],[0,1],[0,-1],
        [1,1],[-1,1],[1,-1],[-1,-1]
    ];

    for (let i = 0; i < dirs.length; i++) {
        let nx = pixel.x + dirs[i][0];
        let ny = pixel.y + dirs[i][1];

        let other = pixelMap[ny]?.[nx];
        if (other && other.element === type) return other;
    }

    return null;
}

function fight(attacker, target) {
    target.health = (target.health ?? MAX_HP) - DAMAGE;

    if (target.health <= 0) {
        changePixel(target, "blood");
    }
}

// 🪖 HUMAN
elements.human = {
    color: "#f2c9a0",
    behavior: behaviors.POWDER,
    category: "war",

    tick(pixel) {
        pixel.alive = true;

        let enemy = isTouching(pixel, "enemy");

        if (enemy) {
            fight(pixel, enemy);
        } else {
            // small random movement so they collide naturally
            let d = [[1,0],[-1,0],[0,1],[0,-1]][Math.floor(Math.random()*4)];
            tryMove(pixel, pixel.x + d[0], pixel.y + d[1]);
        }
    }
};

// 👾 ENEMY
elements.enemy = {
    color: "#2b2b2b",
    behavior: behaviors.POWDER,
    category: "war",

    tick(pixel) {
        pixel.alive = true;

        let enemy = isTouching(pixel, "human");

        if (enemy) {
            fight(pixel, enemy);
        } else {
            let d = [[1,0],[-1,0],[0,1],[0,-1]][Math.floor(Math.random()*4)];
            tryMove(pixel, pixel.x + d[0], pixel.y + d[1]);
        }
    }
};