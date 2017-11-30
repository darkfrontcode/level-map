import { Scenario, PreLevel, PreLevels, Path } from './scenario/scenario.namespace'
import { TimelineLite } from 'gsap'

window.onload = () => {
	
	const baseScenario = new Scenario(new PreLevels(new Array<PreLevel>(
		new PreLevel(0, [1]),
		new PreLevel(1, [0, 2]),
		new PreLevel(2, [1, 3, 5, 6]),
		new PreLevel(3, [2, 4, 7]),
		new PreLevel(4, [3]),
		new PreLevel(5, [2]),
		new PreLevel(6, [2, 7, 8]),
		new PreLevel(7, [3, 6, 9, 10]),
		new PreLevel(8, [6]),
		new PreLevel(9, [7]),
		new PreLevel(10, [7]),
	)).levels)

	const lines = document.getElementById("lines").querySelectorAll("line")
	const pins = document.getElementById("pins").querySelectorAll("circle")
	const avatar = document.getElementById("avatar")
	const tl = new TimelineLite()

	let target = 0
	let current = 0

	lines.forEach((line, key) => {
		const forward = window["MorphSVGPlugin"].pathDataToBezier(line, { align: avatar })
		const backward = [ ...forward ].reverse()
		baseScenario.levels[key].addPath(new Path(forward, backward))
	})

	pins.forEach((pin, key) => {

		tl.set(pins[key], {

			// TODO: refactory this
			x: baseScenario.levels[key].path.forward[baseScenario.levels[key].path.forward.length - 1].x,
			y: baseScenario.levels[key].path.forward[baseScenario.levels[key].path.forward.length - 1].y,
			xPercent: -50,
			yPercent: -50

		})
		
		pins[key].onclick = (event:any) => {

			current = target
			target = +event.target.getAttribute("data-id")

			tl.kill()
			
			if(current != target)
			{
				baseScenario.A_STAR_SEARCH(target, current)

				// baseScenario
				// 	.search(target, current)
				// 	.forEach(path => tl.to(avatar, .5, { bezier: { values: path, type:"soft" }, ease: Power0.easeNone }))

			}

		}

	})

	tl.set(avatar, {
		x: 400,
		y: 0,
		xPercent: -50,
		yPercent: -50
	})

}