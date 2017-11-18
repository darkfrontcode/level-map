
console.clear()

const line = document.getElementById("line")
const lineTwo = document.getElementById("line-two")
const circle = document.getElementById("circle")

const transformPath = (target, align) => 
{
	return MorphSVGPlugin.pathDataToBezier(target, { align }) 
}

const config = new Array(
	{ 
		pos: 1, 
		path: transformPath(line, circle) 
	},
	{ 
		pos: 2, 
		path: transformPath(lineTwo, circle) 
	}
)


const path = MorphSVGPlugin.pathDataToBezier(line, { align: circle })
const pathTwo = MorphSVGPlugin.pathDataToBezier(lineTwo, { align: circle })

const logic = (pos) => {
	if(pos == current) tl.stop()
}

let current = 0

const tl = new TimelineLite()

tl.set(circle, { xPercent:-50, yPercent:-50, transformOrigin:"50% 50%" })
tl.to(
	circle, 2, 
	{ 
		bezier: { values:path, type:"cubic", autoRotate: true }, 
		onComplete: () => logic(1),
		onReverseComplete: () => logic(1)  
	}
)
tl.to(
	circle, 2, 
	{ 
		bezier: { values:pathTwo, type:"cubic", autoRotate: true }, 
		onComplete: () => logic(2),
		onReverseComplete: () => logic(1) 
	}
)
tl.paused(true)

const action = (event) =>
{
	tl.stop()
	const pos = +event.target.getAttribute("data-pos")

	if(pos == current) tl.stop()
	else if(pos > current) tl.play()
	else tl.reverse()

	current = pos
}

document
	.getElementById("nav")
	.querySelectorAll("button")
	.forEach(button => button.onclick = action)