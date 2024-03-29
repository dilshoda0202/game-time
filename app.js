// Get the canvas element and its context
const canvas = document.querySelector('canvas');
const c = canvas.getContext("2d");

const scoreEl = document.querySelector('#scoreEl');

canvas.width = innerWidth;
canvas.height = innerHeight

class Boundary {
    static width = 40
    static height = 40
    constructor({ position, image }) {
        this.position = position
        this.width = 40
        this.height = 40
        this.image = image
    }
    draw() {
        // c.fillStyle = 'blue'
        // c.fillRect(this.position.x, this.position.y, this.width, this.height)

        c.drawImage(this.image, this.position.x, this.position.y)
    }
}

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

// class Ghost {
//     constructor({
//         position,
//         velocity,
//         color = 'red'
//     }) {
//         this.position = position
//         this.velocity = velocity
//         this.radius = 15
//         this.color = color
//         this.prevCollisions = []
//     }
//     draw() {
//         c.beginPath()
//         c.arc(this.position.x, this.position.y, this.radius, 0, Math.PI * 2)
//         c.fillStyle = this.color
//         c.fill()
//         c.closePath()
//     }

//     update() {
//         this.draw()
//         this.position.x += this.velocity.x
//         this.position.y += this.velocity.y
//     }
// }

class Pellet {
    constructor({
        position
    }) {
        this.position = position
        this.radius = 3
    }
    draw() {
        c.beginPath()
        c.arc(this.position.x, this.position.y, this.radius, 0, Math.PI * 2)
        c.fillStyle = 'white'
        c.fill()
        c.closePath()
    }
}

const pellets = []
const boundaries = []
// const ghosts = [
//     new Ghost({
//         position: {
//             x: Boundary.width * 6 + Boundary.width / 2,
//             y: Boundary.height + Boundary.height / 2
//         },
//         velocity: {
//             x: 5,
//             y: 0
//         }
//     })
// ]
const player = new Player({
    position: {
        x: Boundary.width + Boundary.width / 2,
        y: Boundary.height + Boundary.height / 2
    },
    velocity: {
        x: 0,
        y: 0
    }
})

const keys = {
    w: {
        pressed: false
    },
    a: {
        pressed: false
    },
    s: {
        pressed: false
    },
    d: {
        pressed: false
    }
}

let lastKey = ''
let score = 0

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
            case '1':
                boundaries.push(
                    new Boundary({
                        position: {
                            x: Boundary.width * j,
                            y: Boundary.height * i
                        },
                        image: createImage('./pacman-images/pipeCorner1.png')
                    })
                )
                break
            case '2':
                boundaries.push(
                    new Boundary({
                        position: {
                            x: Boundary.width * j,
                            y: Boundary.height * i
                        },
                        image: createImage('./pacman-images/pipeCorner2.png')
                    })
                )
                break
            case '3':
                boundaries.push(
                    new Boundary({
                        position: {
                            x: Boundary.width * j,
                            y: Boundary.height * i
                        },
                        image: createImage('./pacman-images/pipeCorner3.png')
                    })
                )
                break
            case '4':
                boundaries.push(
                    new Boundary({
                        position: {
                            x: Boundary.width * j,
                            y: Boundary.height * i
                        },
                        image: createImage('./pacman-images/pipeCorner4.png')
                    })
                )
                break
            case 'b':
                boundaries.push(
                    new Boundary({
                        position: {
                            x: Boundary.width * j,
                            y: Boundary.height * i
                        },
                        image: createImage('./pacman-images/block.png')
                    })
                )
                break
            case '[':
                boundaries.push(
                    new Boundary({
                        position: {
                            x: j * Boundary.width,
                            y: i * Boundary.height
                        },
                        image: createImage('./pacman-images/capLeft.png')
                    })
                )
                break
            case ']':
                boundaries.push(
                    new Boundary({
                        position: {
                            x: j * Boundary.width,
                            y: i * Boundary.height
                        },
                        image: createImage('./pacman-images/capRight.png')
                    })
                )
                break
            case '_':
                boundaries.push(
                    new Boundary({
                        position: {
                            x: j * Boundary.width,
                            y: i * Boundary.height
                        },
                        image: createImage('./pacman-images/capBottom.png')
                    })
                )
                break
            case '^':
                boundaries.push(
                    new Boundary({
                        position: {
                            x: j * Boundary.width,
                            y: i * Boundary.height
                        },
                        image: createImage('./pacman-images/capTop.png')
                    })
                )
                break
            case '+':
                boundaries.push(
                    new Boundary({
                        position: {
                            x: j * Boundary.width,
                            y: i * Boundary.height
                        },
                        image: createImage('./pacman-images/pipeCross.png')
                    })
                )
                break
            case '5':
                boundaries.push(
                    new Boundary({
                        position: {
                            x: j * Boundary.width,
                            y: i * Boundary.height
                        },
                        color: 'blue',
                        image: createImage('./pacman-images/pipeConnectorTop.png')
                    })
                )
                break
            case '6':
                boundaries.push(
                    new Boundary({
                        position: {
                            x: j * Boundary.width,
                            y: i * Boundary.height
                        },
                        color: 'blue',
                        image: createImage('./pacman-images/pipeConnectorRight.png')
                    })
                )
                break
            case '7':
                boundaries.push(
                    new Boundary({
                        position: {
                            x: j * Boundary.width,
                            y: i * Boundary.height
                        },
                        color: 'blue',
                        image: createImage('./pacman-images/pipeConnectorBottom.png')
                    })
                )
                break
            case '8':
                boundaries.push(
                    new Boundary({
                        position: {
                            x: j * Boundary.width,
                            y: i * Boundary.height
                        },
                        image: createImage('./pacman-images/pipeConnectorLeft.png')
                    })
                )
                break
            case '.':
                pellets.push(
                    new Pellet({
                        position: {
                            x: j * Boundary.width + Boundary.width / 2,
                            y: i * Boundary.height + Boundary.height / 2
                        },
                    })
                )
                break
        }
    })
})

function circleCollidesWithRectangle({
    circle,
    rectangle
}) {
    return (circle.position.y - circle.radius + circle.velocity.y <= rectangle.position.y + rectangle.height
        && circle.position.x + circle.radius + circle.velocity.x >= rectangle.position.x
        && circle.position.y + circle.radius + circle.velocity.y >= rectangle.position.y
        && circle.position.x - circle.radius + circle.velocity.x <= rectangle.position.x + rectangle.width)
}

function animate() {
    requestAnimationFrame(animate)
    c.clearRect(0, 0, canvas.width, canvas.height)

    console.log(score)

    if (keys.w.pressed && lastKey === 'w') {
        for (let i = 0; i < boundaries.length; i++) {
            const boundary = boundaries[i]

            if (circleCollidesWithRectangle({
                circle: {
                    ...player, velocity: {
                        x: 0,
                        y: -3
                    }
                },
                rectangle: boundary
            })
            ) {
                player.velocity.y = 0
                break
            } else {
                player.velocity.y = -3
            }
        }

    } else if (keys.a.pressed && lastKey === 'a') {
        for (let i = 0; i < boundaries.length; i++) {
            const boundary = boundaries[i]

            if (circleCollidesWithRectangle({
                circle: {
                    ...player, velocity: {
                        x: -3,
                        y: 0
                    }
                },
                rectangle: boundary
            })
            ) {
                player.velocity.x = 0
                break
            } else {
                player.velocity.x = -3
            }
        }
    } else if (keys.s.pressed && lastKey === 's') {
        for (let i = 0; i < boundaries.length; i++) {
            const boundary = boundaries[i]

            if (circleCollidesWithRectangle({
                circle: {
                    ...player, velocity: {
                        x: 0,
                        y: 3
                    }
                },
                rectangle: boundary
            })
            ) {
                player.velocity.y = 0
                break
            } else {
                player.velocity.y = 3
            }
        }
    } else if (keys.d.pressed && lastKey === 'd') {
        for (let i = 0; i < boundaries.length; i++) {
            const boundary = boundaries[i]

            if (circleCollidesWithRectangle({
                circle: {
                    ...player, velocity: {
                        x: 3,
                        y: 0
                    }
                },
                rectangle: boundary
            })
            ) {
                player.velocity.x = 0
                break
            } else {
                player.velocity.x = 3
            }
        }
    }

    // touch pellets here
    for (let i = pellets.length - 1; 0 < i; i--) {
        const pellet = pellets[i]
        pellet.draw()

        if (Math.hypot(pellet.position.x - player.position.x, pellet.position.y - player.position.y) < pellet.radius + player.radius) {
            // console.log('touching')
            pellets.splice(i, 1)
            score += 10
            scoreEl.innerHTML = score
        }
        if (score === 700) {
            // alert('You Win!')
            const winEl = document.createElement('h1')
            winEl.textContent = 'You Win!'
            winEl.style.position = 'fixed'
            winEl.style.top = '50%'
            winEl.style.left = '50%'
            winEl.style.color = 'white'
            document.body.appendChild(winEl)
            const reset = document.createElement('button')
            reset.textContent = 'Restart Game'
            reset.style.position = 'fixed'
            reset.style.top = '60%'
            reset.style.left = '50%'
            // reset.style.color = 'white'
            reset.addEventListener('click', function () {
                window.location.reload()
            })
            document.body.appendChild(reset)

            // console.log('You Win')
            cancelAnimationFrame(animationID)
        }
    }


    boundaries.forEach(boundary => {
        boundary.draw()

        if (circleCollidesWithRectangle({
            circle: player,
            rectangle: boundary
        })
        ) {
            console.log('we are colliding')
            player.velocity.x = 0
            player.velocity.y = 0
        }
    })
    player.update()
    // player.velocity.y = 0
    // player.velocity.x = 0
    // ghosts.forEach(ghost => {
    //     ghost.update()

    //     const collisions = []
    //     boundaries.forEach(boundary => {
    //         if (
    //             !collisions.includes('right') &&
    //             circleCollidesWithRectangle({
    //                 circle: {
    //                     ...ghost, velocity: {
    //                         x: 5,
    //                         y: 0
    //                     }
    //                 },
    //                 rectangle: boundary
    //             })
    //         ) {
    //             collisions.push('right')
    //         }
    //         if (
    //             !collisions.includes('right') &&
    //             circleCollidesWithRectangle({
    //                 circle: {
    //                     ...ghost, velocity: {
    //                         x: -5,
    //                         y: 0
    //                     }
    //                 },
    //                 rectangle: boundary
    //             })
    //         ) {
    //             collisions.push('left')
    //         }
    //         if (
    //             !collisions.includes('right') &&
    //             circleCollidesWithRectangle({
    //                 circle: {
    //                     ...ghost, velocity: {
    //                         x: 0,
    //                         y: -5
    //                     }
    //                 },
    //                 rectangle: boundary
    //             })
    //         ) {
    //             collisions.push('up')
    //         }
    //         if (
    //             !collisions.includes('right') &&
    //             circleCollidesWithRectangle({
    //                 circle: {
    //                     ...ghost, velocity: {
    //                         x: 0,
    //                         y: 5
    //                     }
    //                 },
    //                 rectangle: boundary
    //             })
    //         ) {
    //             collisions.push('down')
    //         }
    //         if (collisions.length > ghost.prevCollisions.length)
    //             ghost.prevCollisions = collisions
    //         if (JSON.stringify(collisions) !== JSON.stringify(ghost.prevCollisions)) {
    //             console.log('go')

    //             if (ghost.velocity.x > 0) ghost.prevCollisions.push('right')
    //             else if (ghost.velocity.x < 0) ghost.prevCollisions.push('left')
    //             else if (ghost.velocity.y < 0) ghost.prevCollisions.push('up')
    //             else if (ghost.velocity.y > 0) ghost.prevCollisions.push('down')


    //             console.log(collisions)
    //             console.log(ghost.prevCollisions)

    //             const pathways = ghost.prevCollisions.filter(collision => {
    //                 return collisions.includes(collision)
    //             })
    //             console.log({ pathways })

    //             const direction = pathways[Math.floor(Math.random() * pathways.length)]

    //             console.log({ direction })

    //             switch (direction) {
    //                 case 'down':
    //                     ghost.velocity.y = 5
    //                     ghost.velocity.x = 0
    //                     break
    //                 case 'up':
    //                     ghost.velocity.y = -5
    //                     ghost.velocity.x = 0
    //                     break
    //                 case 'right':
    //                     ghost.velocity.y = 0
    //                     ghost.velocity.x = 5
    //                     break
    //                 case 'left':
    //                     ghost.velocity.y = 0
    //                     ghost.velocity.x = -5
    //                     break

    //             }
    //             ghost.prevCollisions = []
    //         }
    //         // console.log(collisions)
    //     })
    // })

}

animate()



window.addEventListener('keydown', ({ key }) => {
    switch (key) {
        case 'w':
            keys.w.pressed = true
            lastKey = 'w'
            break
        case 'a':
            keys.a.pressed = true
            lastKey = 'a'
            break
        case 's':
            keys.s.pressed = true
            lastKey = 's'
            break
        case 'd':
            keys.d.pressed = true
            lastKey = 'd'
            break
    }
    // console.log(keys.d.pressed)
    // console.log(keys.s.pressed)
})

window.addEventListener('keyup', ({ key }) => {
    switch (key) {
        case 'w':
            keys.w.pressed = false
            break
        case 'a':
            keys.a.pressed = false
            break
        case 's':
            keys.s.pressed = false
            break
        case 'd':
            keys.d.pressed = false
            break
    }
    // console.log(keys.d.pressed)
    // console.log(keys.s.pressed)
})