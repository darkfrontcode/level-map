
console.clear()

const button = document.getElementById("button-action") 
const line = document.getElementById("line")
const balloon = document.getElementById("balloon")
const path = MorphSVGPlugin.pathDataToBezier(line, { align: balloon })
const update = () => {
	// console.log(this.progress())
}
const tl = new TimelineLite({ onUpdate: update, reversed: true })

button.onclick = () => {
	tl
	.set(balloon, { xPercent:-50, yPercent:-50, transformOrigin:"50% 50%" })
	.add[
		TweenLite.to(balloon, 2, { bezier: { values:path, type:"cubic", autoRotate: true }}),
		TweenMax.fromTo(line, 2, { drawSVG: '0% 0%' }, { drawSVG: '0% 100%' })
	]
}

// https://codepen.io/joemidi/pen/zqyrPN?editors=0010