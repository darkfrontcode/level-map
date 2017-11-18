
console.clear()

const circle = document.getElementById("circle")

class level
{
	constructor(element, pos)
	{
		this.element = document.getElementById(element)
		this.pos = pos
		this.path = this.transform(this.element)
		this.circle = circle
	}

	transform(target)
	{
		return MorphSVGPlugin.pathDataToBezier(target, { align: this.circle }) 
	}
}

class levels
{
	constructor()
	{
		this.list = new Array(
			new level("line", 1),
			new level("line-two", 2),
			new level("line-three", 3)
		)
	}
}

class levelLogic
{
	constructor()
	{
		this.current = 0

		this.tl = new TimelineLite()
		this.tl.set(circle, { xPercent:-50, yPercent:-50, transformOrigin:"50% 50%" })

		const Levels = new levels()

		// TODO: do better
		Levels.list.forEach(l => {
			const last = l.path.length - 1
			
			this.tl.set(`#level-${l.pos}-pin`, {
				x: l.path[last].x,
				y: l.path[last].y,
				xPercent: -50,
				yPercent: -50
			});
		})
		
		// TODO: add labels
		Levels.list.forEach(l => {
			this.tl.to(
				circle,
				1, 
				{ 
					bezier: { values: l.path, type:"soft" }, 
					ease: Power0.easeNone,
					onComplete: () => this.shouldStop(l.pos),
					onReverseComplete: () => this.shouldStop(l.pos - 1) 
				}
			)
		})

		this.tl.paused(true)
		this.action = this.action.bind(this)
		
	}

	action(event)
	{
		this.tl.stop()
		const pos = +event.target.getAttribute("data-pos")
	
		if(pos == this.current) this.tl.stop()
		else if(pos > this.current) this.tl.play()
		else this.tl.reverse()
	
		this.current = pos
	}

	shouldStop(pos)
	{
		if(pos == this.current) this.tl.stop()
	}
}

const Levels = new levels()
const LevelLogic = new levelLogic()

let html = ""

Levels.list.map(l => html += `<button id="level-${l.pos}" data-pos="${l.pos}">level-${l.pos}</button>`)

const nav = document.getElementById("nav")
nav.innerHTML = html
nav.querySelectorAll("button").forEach(button => button.onclick = LevelLogic.action)