import { TimelineLite, Power0 } from 'gsap'
const MorphSVGPlugin = window["MorphSVGPlugin"]

console.clear()

const circle = document.getElementById("circle")

interface IPath
{
	x: number
	y: number
}

class level
{
	public element:HTMLElement
	public pos:number
	public path:Array<IPath>
	public circle:HTMLElement

	constructor(element:HTMLElement, pos:number)
	{
		this.element = element
		this.pos = pos
		this.path = this.transform(this.element)
		this.circle = circle
	}

	transform(target:HTMLElement) : Array<IPath>
	{
		return MorphSVGPlugin.pathDataToBezier(target, { align: this.circle }) 
	}
}

class levels
{
	// TODO: loop this
	public static list = new Array(
		new level(document.getElementById("line"), 1),
		new level(document.getElementById("line-two"), 2),
		new level(document.getElementById("line-three"), 3)
	)
}

class levelLogic
{

	public current:number
	public tl: TimelineLite

	constructor()
	{
		this.current = 0

		this.tl = new TimelineLite({paused: true})
		this.tl.set(circle, { xPercent:-50, yPercent:-50, transformOrigin:"50% 50%" })

		// TODO: do better
		levels.list.forEach(l => {
			const last = l.path.length - 1
			
			this.tl.set(`#level-${l.pos}-pin`, {
				x: l.path[last].x,
				y: l.path[last].y,
				xPercent: -50,
				yPercent: -50
			});
		})
		
		levels.list.forEach(l => {
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

		this.action = this.action.bind(this)
		
	}

	action(event:any)
	{
		this.tl.pause()
		const pos = +event.target.getAttribute("data-pos")
	
		if(pos == this.current) this.tl.pause()
		else if(pos > this.current) this.tl.play()
		else this.tl.reverse()
	
		this.current = pos
	}

	shouldStop(pos:number)
	{
		if(pos == this.current) this.tl.pause()
	}
}

const LevelLogic = new levelLogic()

let html = ""

levels.list.map(l => html += `<button id="level-${l.pos}" data-pos="${l.pos}">level-${l.pos}</button>`)

const nav = document.getElementById("nav")
nav.innerHTML = html
nav.querySelectorAll("button").forEach(button => button.onclick = LevelLogic.action)