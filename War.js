// 🪖 SIMPLE WAR MOD: HUMANS vs ENEMIES

const dirs = [
    [1,0],[-1,0],[0,1],[0,-1],
    [1,1],[-1,1],[1,-1],[-1,-1]
];

// 🧠 shared helper
function getNearbyEnemy(pixel, type) {
    for (let i = 0; i < dirs.length; i++) {
        let nx = pixel.x + dirs[i][0];
        let ny = pixel.y + dirs[i][1];

        let other = pixelMap[ny]?.[nx];
        if (other && other.element === type) return other;
    }
    return null;
}

// 🪖 HUMAN SOLDIER
elements.human = {
    color: "#f2c9a0",
    behavior: behaviors.POWDER,
    tick(pixel) {
        let enemy = getNearbyEnemy(pixel, "enemy");

        // ⚔️ attack if close
        if (enemy) {
            enemy.health = (enemy.health ?? 5) - 1;

            if (enemy.health <= 0) {
                changePixel(enemy, "blood");
            }
            return;
        }

        // 🚶 patrol movement
        let d = dirs[Math.floor(Math.random() * dirs.length)];
        tryMove(pixel, pixel.x + d[0], pixel.y + d[1]);
    }
};

// 👾 ENEMY SOLDIER
elements.enemy = {
    color: "#2b2b2b",
    behavior: behaviors.POWDER,
    tick(pixel) {
        let human = getNearbyEnemy(pixel, "human");

        // ⚔️ attack humans
        if (human) {
            human.health = (human.health ?? 4) - 1;

            if (human.health <= 0) {
                changePixel(human, "blood");
            }
            return;
        }

        // 🚶 patrol movement
        let d = dirs[Math.floor(Math.random() * dirs.length)];
        tryMove(pixel, pixel.x + d[0], pixel.y + d[1]);
    }
};