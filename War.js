// =========================
// ⚔️ WAR CORE (5 HP SYSTEM)
// =========================

const dirs = [
    [1,0],[-1,0],[0,1],[0,-1],
    [1,1],[-1,1],[1,-1],[-1,-1]
];

const MAX_HP = 5;
const DAMAGE = 1;

// =========================
// helpers
// =========================

function moveToward(pixel, target) {
    let dx = Math.sign(target.x - pixel.x);
    let dy = Math.sign(target.y - pixel.y);

    tryMove(pixel, pixel.x + dx, pixel.y + dy);
}

function wander(pixel) {
    let d = dirs[Math.floor(Math.random() * dirs.length)];
    tryMove(pixel, pixel.x + d[0], pixel.y + d[1]);
}

function attack(attacker, target) {
    target.health = (target.health ?? MAX_HP) - DAMAGE;

    if (target.health <= 0) {
        changePixel(target, "blood");
    }
}

// find nearest enemy in vision range
function findTarget(pixel, type, range = 10) {
    let best = null;
    let bestDist = range + 1;

    for (let y = -range; y <= range; y++) {
        for (let x = -range; x <= range; x++) {
            let nx = pixel.x + x;
            let ny = pixel.y + y;

            let other = pixelMap[ny]?.[nx];
            if (!other || other.element !== type) continue;

            let dist = Math.abs(x) + Math.abs(y);
            if (dist < bestDist) {
                best = other;
                bestDist = dist;
            }
        }
    }

    return best;
}

// =========================
// 🪖 HUMAN
// =========================

elements.human = {
    color: "#f2c9a0",
    behavior: behaviors.POWDER,
    category: "war",

    tick(pixel) {
        pixel.alive = true;

        let enemy = findTarget(pixel, "enemy", 10);

        if (enemy) {
            if (Math.abs(enemy.x - pixel.x) <= 1 &&
                Math.abs(enemy.y - pixel.y) <= 1) {
                attack(pixel, enemy);
            } else {
                moveToward(pixel, enemy);
            }
        } else {
            wander(pixel);
        }
    }
};

// =========================
// 👾 ENEMY
// =========================

elements.enemy = {
    color: "#2b2b2b",
    behavior: behaviors.POWDER,
    category: "war",

    tick(pixel) {
        pixel.alive = true;

        let enemy = findTarget(pixel, "human", 10);

        if (enemy) {
            if (Math.abs(enemy.x - pixel.x) <= 1 &&
                Math.abs(enemy.y - pixel.y) <= 1) {
                attack(pixel, enemy);
            } else {
                moveToward(pixel, enemy);
            }
        } else {
            wander(pixel);
        }
    }
};