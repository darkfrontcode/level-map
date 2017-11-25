import { Scenario, PreLevel, PreLevels } from './scenario/scenario.namespace'
import { TimelineLite, Power0 } from 'gsap'

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

	const lines = document.getElementById("lines").querySelectorAll("line")
	const pins = document.getElementById("pins").querySelectorAll("circle")
	const avatar = document.getElementById("avatar")
	const tl = new TimelineLite()

	lines.forEach((line, key) => {
		baseScenario.levels[key].addPath(window["MorphSVGPlugin"].pathDataToBezier(line, { align: avatar }))
	})

	pins.forEach((pin, key) => {

		tl.set(pins[key], {
			x: baseScenario.levels[key].path[baseScenario.levels[key].path.length - 1].x,
			y: baseScenario.levels[key].path[baseScenario.levels[key].path.length - 1].y,
			xPercent: -50,
			yPercent: -50
		})
		
		pins[key].onclick = (event:any) => {

			const target = +event.target.getAttribute("data-id")
			const paths = baseScenario.findPath(target)
			paths.forEach(p => tl.to(avatar, 1, { bezier: { values: p.path, type:"soft" }, ease: Power0.easeNone }))
		}

	})

	tl.set(avatar, {
		x: 400,
		y: 0,
		xPercent: -50,
		yPercent: -50
	})

}