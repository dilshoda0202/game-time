# Steps to install game on local computer:
1. Step 1: Open repository https://github.com/dilshoda0202/game-time on GitHub
2. Step 2:Fork repository
3. Step 3: Clone repository to local machine
4. Step 4: Open game-time directory in local machine
5. Step 5: Open index.html in browser

### You can slso visit: https://my-pacman-game.netlify.app/ to play game

# How this works:

## How I created and drew player:
``` JavaScipt
class Player {
    constructor({
        position,
        velocity
    }) {
        this.position = position
        this.velocity = velocity
        this.radius = 15
    }
    draw() {
        c.beginPath()
        c.arc(this.position.x, this.position.y, this.radius, 0, Math.PI * 2)
        c.fillStyle = 'yellow'
        c.fill()
        c.closePath()
    }

    update() {
        this.draw()
        this.position.x += this.velocity.x
        this.position.y += this.velocity.y
    }
}
```

### How I created the mapping: 
```JavaScript
const map = [
    ['1', '-', '-', '-', '-', '-', '-', '-', '-', '-', '2'],
    ['|', '.', '.', '.', '.', '.', '.', '.', '.', '.', '|'],
    ['|', '.', 'b', '.', '[', '7', ']', '.', 'b', '.', '|'],
    ['|', '.', '.', '.', '.', '_', '.', '.', '.', '.', '|'],
    ['|', '.', '[', ']', '.', '.', '.', '[', ']', '.', '|'],
    ['|', '.', '.', '.', '.', '^', '.', '.', '.', '.', '|'],
    ['|', '.', 'b', '.', '[', '+', ']', '.', 'b', '.', '|'],
    ['|', '.', '.', '.', '.', '_', '.', '.', '.', '.', '|'],
    ['|', '.', '[', ']', '.', '.', '.', '[', ']', '.', '|'],
    ['|', '.', '.', '.', '.', '^', '.', '.', '.', '.', '|'],
    ['|', '.', 'b', '.', '[', '5', ']', '.', 'b', '.', '|'],
    ['|', '.', '.', '.', '.', '.', '.', '.', '.', 'p', '|'],
    ['4', '-', '-', '-', '-', '-', '-', '-', '-', '-', '3']
]
function createImage(src) {
    const image = new Image()
    image.src = src
    return image
}

map.forEach((row, i) => {
    row.forEach((symbol, j) => {
        switch (symbol) {
            case '-':
                boundaries.push(
                    new Boundary({
                        position: {
                            x: Boundary.width * j,
                            y: Boundary.height * i
                        },
                        image: createImage('./pacman-images/pipeHorizontal.png')
                    })
                )
                break
            case '|':
                boundaries.push(
                    new Boundary({
                        position: {
                            x: Boundary.width * j,
                            y: Boundary.height * i
                        },
                        image: createImage('./pacman-images/pipeVertical.png')
                    })
                )
                break
```

## Pellets and Score:
``` JavaScript
    for (let i = pellets.length - 1; 0 < i; i--) {
        const pellet = pellets[i]
        pellet.draw()

        if (Math.hypot(pellet.position.x - player.position.x, pellet.position.y - player.position.y) < pellet.radius + player.radius) {
            console.log('touching')
            pellets.splice(i, 1)
            score += 10
            scoreEl.innerHTML = score
        }
```
 Calling on pellets and having them dissapear once PacMan eats them. Score increases by 10 per pellet eaten. 



# Future Goals:
1. Turn PacMan into a unique character
2. Create ghosts
3. Create level up pellets
4. Create a chomping animation for player
5. Improving player's movements 
6. Create buttons for WASD so that the game can be played on a mobile browser

