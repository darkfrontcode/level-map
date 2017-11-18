
console.clear()

const buttonOne = document.getElementById("one")
const buttonTwo = document.getElementById("two")

const line = document.getElementById("line")
const lineTwo = document.getElementById("line-two")

const balloon = document.getElementById("balloon")

const path = MorphSVGPlugin.pathDataToBezier(line, { align: balloon })
const pathTwo = MorphSVGPlugin.pathDataToBezier(lineTwo, { align: balloon })

const update = () => {
	// console.log(tl.progress())
}

const logic = (pos) => {
	if(current == pos) tl.stop()
}

let current = 0

const tl = new TimelineLite({ onUpdate: update })

tl.set(balloon, { xPercent:-50, yPercent:-50, transformOrigin:"50% 50%" })
tl.to(balloon, 2, { bezier: { values:path, type:"cubic", autoRotate: true }, onComplete: () => logic(1) })
tl.to(balloon, 2, { bezier: { values:pathTwo, type:"cubic", autoRotate: true }, onComplete: () => logic(2)})
tl.paused(true)

buttonOne.onclick = (event) =>
{
	tl.stop()
	const pos = event.target.getAttribute("data-pos")
	pos > current ? tl.play() : tl.reverse()
	current = 1
}

buttonTwo.onclick = (event) =>
{
	tl.stop()
	const pos = event.target.getAttribute("data-pos")
	pos > current ? tl.play() : tl.reverse()
	current = 2
}