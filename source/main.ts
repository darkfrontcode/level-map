import { Scenario, PreLevel, PreLevels } from './scenario/scenario.namespace'
import { TimelineLite } from 'gsap'

window.onload = () => {
	
	const baseScenario = new Scenario(new PreLevels(new Array<PreLevel>(
		new PreLevel(0, null, [1]),
		new PreLevel(1, 0, [2]),
		new PreLevel(2, 1, [3,5,6]),
		new PreLevel(3, 2, [4]),
		new PreLevel(4, 3),
		new PreLevel(5, 2),
		new PreLevel(6, 2, [7, 8]),
		new PreLevel(7, 6),
		new PreLevel(8, 6),
	)).list)
	
	// console.log(baseScenario.findPath(8))

	const svgs = document.getElementById("lines").querySelectorAll("line")
	const pins = document.getElementById("pins").querySelectorAll("circle")
	const avatar = document.getElementById("avatar")
	const tl = new TimelineLite()

	svgs.forEach((svg, key) => {
		baseScenario.levels[key + 1].addPath(
			window["MorphSVGPlugin"].pathDataToBezier(svg, { align:  avatar })
		)
		tl.set(pins[key], {
			x: baseScenario.levels[key + 1].path[baseScenario.levels[key + 1].path.length - 1].x,
			y: baseScenario.levels[key + 1].path[baseScenario.levels[key + 1].path.length - 1].y,
			xPercent: -50,
			yPercent: -50
		});
	})

	console.log(baseScenario.levels)

}