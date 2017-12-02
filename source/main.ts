import { Scenario, PreLevel, PreLevels } from './scenario/scenario.namespace'
import { TimelineLite, Power0 } from 'gsap'

window.onload = () => {
	
	const baseScenario = new Scenario(new PreLevels(new Array<PreLevel>(
		new PreLevel(0, [1]),
		new PreLevel(1, [0, 2]),
		new PreLevel(2, [1, 3, 5, 6]),
		new PreLevel(3, [2, 4]),
		new PreLevel(4, [3]),
		new PreLevel(5, [2]),
		new PreLevel(6, [2, 7, 8]),
		new PreLevel(7, [6]),
		new PreLevel(8, [6]),
	)).levels)

	const lines = document.getElementById("lines").querySelectorAll("line")
	const pins = document.getElementById("pins").querySelectorAll("circle")
	const avatar = document.getElementById("avatar")
	const tl = new TimelineLite()

	let target = 0
	let current = 0

	for(let [key, line] of lines.entries())
	{
		const level = baseScenario.levels[key]
		level.createPath(window["MorphSVGPlugin"].pathDataToBezier(line, { align: avatar }))
		level.createPin()
	}

	for(let [key, pin] of pins.entries())
	{
		const level = baseScenario.levels[key]

		tl.set(pins[key], {
			x: level.pin.x,
			y: level.pin.y,
			xPercent: -50,
			yPercent: -50
		})

		// TODO: type this
		pin.onclick = (event:any) => {
			
			current = target
			target = +event.target.getAttribute("data-id")

			tl.kill()
			
			if(current != target)
			{
				baseScenario
					.search(target, current)
					.forEach(path => tl.to(avatar, .5, { bezier: { values: path, type:"soft" }, ease: Power0.easeNone }))

			}

		}

	}

	const pin = baseScenario.levels[0].pin

	tl.set(avatar, {
		x: pin.x,
		y: pin.y,
		xPercent: -50,
		yPercent: -50
	})

}