
console.clear()

const button = document.getElementById("button-action") 

const line = document.getElementById("line")
const lineTwo = document.getElementById("line-two")

const balloon = document.getElementById("balloon")

const path = MorphSVGPlugin.pathDataToBezier(line, { align: balloon })
const pathTwo = MorphSVGPlugin.pathDataToBezier(lineTwo, { align: balloon })

const merge = (...args) => {

	let result = new Array()
	const last = args.length - 1

	for(let [key, arr] of args.entries())
	{
		if(key != last) arr.pop()
		result = result.concat(arr)
	}

	return result

}

const pathJoin = merge(path, pathTwo)

const update = () => {
	// console.log(this.progress())
}
const tl = new TimelineLite({ onUpdate: update, reversed: true })

button.onclick = () => {
	tl
	.set(balloon, { xPercent:-50, yPercent:-50, transformOrigin:"50% 50%" })
	.add[
		// TweenLite.to(balloon, 2, { bezier: { values:path, type:"cubic", autoRotate: true }}),
		TweenLite.to(balloon, 2, { bezier: { values:pathJoin, type:"cubic", autoRotate: true }})
		// TweenLite.to(balloon, 2, { bezier: { values:pathJoin, type:"cubic", autoRotate: true }, delay: 2})
		// TweenMax.fromTo(line, 2, { drawSVG: '0% 0%' }, { drawSVG: '0% 100%' })
	]
}