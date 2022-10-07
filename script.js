const sounds = ["bass-drum", "crash", "floor-tom", "hi-hat", "high-tom", "medium-tom", "ride", "snare"]
const keyMap = {
    "bass-drum": "b",
    "crash": "t",
    "floor-tom": "f",
    "hi-hat": "u",
    "high-tom": "g",
    "medium-tom": "h",
    "ride": "y",
    "snare": "j"
}

const animationTimeouts = {}
const animations = {}
function createAnimation(name, animation) {
    animations[name] = async () => {
        let group = document.getElementById(name + "-group")
        let element = SVG(group)

        if (!animationTimeouts[name]) {
            animationTimeouts[name] = []
        }
        for (let id of animationTimeouts[name]) {
            clearTimeout(id)
        }

        if (animationTimeouts[name].length == 0) {
            animation(element, (time, func) => {
                animationTimeouts[name].push(setTimeout(func, time))
            })
        }

        animationTimeouts[name] = []
    }
}

// Create animations for all different cymbols and drums
{
    createAnimation("crash", (element, timeout) => {
        element.animate(50, 0, 'now').rotate(20)

        timeout(50, () => {
            element.animate(600, 0, 'now').rotate(-20)
        })
    })
    createAnimation("ride", (element, timeout) => {
        element.animate(50, 0, 'now').rotate(-15)

        timeout(50, () => {
            element.animate(1500, 0, 'now').rotate(15)
        })
    })
    createAnimation("medium-tom", (element, timeout) => {
        element.animate(50, 0, 'now').rotate(15, 329, 251)

        timeout(50, () => {
            element.animate(300, 0, 'now').rotate(-15, 329, 251)
        })
    })
    createAnimation("high-tom", (element, timeout) => {
        element.animate(50, 0, 'now').rotate(-15, 260, 251)

        timeout(50, () => {
            element.animate(300, 0, 'now').rotate(15, 260, 251)
        })
    })
    createAnimation("snare", (element, timeout) => {
        element.animate(50, 0, 'now').scale(1.1, 0.9)

        timeout(50, () => {
            element.animate(200, 0, 'now').scale(1 / 1.1, 1 / 0.9)
        })
    })
    createAnimation("floor-tom", (element, timeout) => {
        element.animate(50, 0, 'now').scale(1.02, 0.95, 177, 378)

        timeout(50, () => {
            element.animate(200, 0, 'now').scale(1 / 1.02, 1 / 0.95, 177, 378)
        })
    })
    createAnimation("bass-drum", (element, timeout) => {
        element.animate(50, 0, 'now').scale(1.03, 1.03)

        timeout(50, () => {
            element.animate(100, 0, 'now').scale(1 / 1.03, 1 / 1.03)
        })
    })
    createAnimation("hi-hat", (element, timeout) => {
        element.animate(50, 0, 'now').scale(1, 0.4, 518, 207)

        timeout(50, () => {
            element.animate(100, 0, 'now').scale(1, 1 / 0.4, 518, 207)
        })
    })
}

if ('ontouchstart' in document.documentElement) {
    let controls = document.getElementById("controls")
    controls.style.display = "none"
}

// Add event listeners for all different buttons
for (let sound of sounds) {
    let button = document.getElementById(sound)

    let play = () => {
        let audio = new Audio(`./assets/${sound}.wav`)
        let animation = animations[sound]

        audio.play()
        if (animation) {
            animation()
        }
    }

    button.addEventListener("click", play)
    document.addEventListener("keydown", event => {
        if (event.key == keyMap[sound]) {
            play()
        }
    })
}