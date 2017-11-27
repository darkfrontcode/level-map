import { Scenario, PreLevel, PreLevels, Path } from './scenario/scenario.namespace'
import { TimelineLite, Power0 } from 'gsap'
import { Level } from './scenario/level.class';
// import { PathPoint } from './scenario/path-point.class'

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

	let target = 0
	let current = 0

	lines.forEach((line, key) => {
		const forward = window["MorphSVGPlugin"].pathDataToBezier(line, { align: avatar })
		const backward = [ ...forward ].reverse()
		baseScenario.levels[key].addPath(new Path(forward, backward))
	})

	// baseScenario.levels[0].addPath(new Path(new Array<PathPoint>({x:400, y:0}, {x:400, y:0}), new Array<PathPoint>({x:400, y:0}, {x:400, y:0})))
	// baseScenario.levels[1].addPath(new Path(new Array<PathPoint>({x:400, y:0}, {x:400, y:100}), new Array<PathPoint>({x:400, y:100}, {x:400, y:0})))
	// baseScenario.levels[2].addPath(new Path(new Array<PathPoint>({x:400, y:100}, {x:400, y:200}), new Array<PathPoint>({x:400, y:200}, {x:400, y:100})))
	// baseScenario.levels[3].addPath(new Path(new Array<PathPoint>({x:400, y:200}, {x:300, y:300}), new Array<PathPoint>({x:300, y:300}, {x:400, y:200})))
	// baseScenario.levels[4].addPath(new Path(new Array<PathPoint>({x:300, y:300}, {x:200, y:400}), new Array<PathPoint>({x:200, y:400}, {x:300, y:300})))
	// baseScenario.levels[5].addPath(new Path(new Array<PathPoint>({x:400, y:200}, {x:500, y:300}), new Array<PathPoint>({x:500, y:300}, {x:400, y:200})))
	// baseScenario.levels[6].addPath(new Path(new Array<PathPoint>({x:400, y:200}, {x:400, y:300}), new Array<PathPoint>({x:400, y:300}, {x:400, y:200})))
	// baseScenario.levels[7].addPath(new Path(new Array<PathPoint>({x:400, y:300}, {x:300, y:400}), new Array<PathPoint>({x:300, y:400}, {x:400, y:300})))
	// baseScenario.levels[8].addPath(new Path(new Array<PathPoint>({x:400, y:300}, {x:500, y:400}), new Array<PathPoint>({x:500, y:400}, {x:400, y:300})))

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
				const list = baseScenario.search(target, current)
				console.log(list)
				const size = list.length - 1

				list.forEach((level, key) => {

					const next = list[key+1]

					if(size != key)
					{
						// const isChild = level.children.find(r => r.value == next.value)

						if(next.parent.value == level.value)
						{
							tl.to(avatar, .5, { bezier: { values: level.path.forward, type:"cubic" }, ease: Power0.easeNone })
						}
						else if(level.parent.value == next.value)
						{
							tl.to(avatar, .5, { bezier: { values: level.path.backward, type:"cubic" }, ease: Power0.easeNone })
						}
					}
					else
					{
						tl.to(avatar, .5, { bezier: { values: level.path.forward, type:"cubic" }, ease: Power0.easeNone })
					}

				})
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