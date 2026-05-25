// ===============================
// 🪖 WAR MOD — HUMANS vs ENEMIES
// ===============================

// movement directions
const dirs = [
    [1,0],[-1,0],[0,1],[0,-1],
    [1,1],[-1,1],[1,-1],[-1,-1]
];

// helper: find nearby target
function findNearby(pixel, type) {
    for (let i = 0; i < dirs.length; i++) {
        let nx = pixel.x + dirs[i][0];
        let ny = pixel.y + dirs[i][1];

        let other = pixelMap[ny]?.[nx];
        if (other && other.element === type) return other;
    }
    return null;
}

// shared soldier brain
function soldierBrain(pixel, enemyType) {
    pixel.alive = true;

    let enemy = findNearby(pixel, enemyType);

    // ⚔️ attack
    if (enemy) {
        enemy.health = (enemy.health ?? 5) - 1;

        if (enemy.health <= 0) {
            changePixel(enemy, "blood");
        }
        return;
    }

    // 🚶 wander
    let d = dirs[Math.floor(Math.random() * dirs.length)];
    tryMove(pixel, pixel.x + d[0], pixel.y + d[1]);
}

// ===============================
// 🪖 HUMAN
// ===============================
elements.human = {
    color: "#f2c9a0",
    behavior: behaviors.POWDER,

    category: "war",

    tick(pixel) {
        soldierBrain(pixel, "enemy");
    }
};

// ===============================
// 👾 ENEMY
// ===============================
elements.enemy = {
    color: "#2b2b2b",
    behavior: behaviors.POWDER,

    category: "war",

    tick(pixel) {
        soldierBrain(pixel, "human");
    }
};