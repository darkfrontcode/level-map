
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
			new level("line-two", 2)
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

		// TODO: add labels
		Levels.list.forEach(l => {
			this.tl.to(
				circle, 
				.5, 
				{ 
					bezier: { values: l.path, type:"soft" }, 
					ease: Power0.easeNone,
					onComplete: () => this.logic(l.pos),
					onReverseComplete: () => this.logic(l.pos - 1) 
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

	logic(pos)
	{
		if(pos == this.current) this.tl.stop()
	}
}

const LevelLogic = new levelLogic()

document
	.getElementById("nav")
	.querySelectorAll("button")
	.forEach(button => button.onclick = LevelLogic.action)