import { TimelineLite, Power0 } from 'gsap'
import { Levels } from './levels.class'

export class LevelLogic
{
	public avatar:HTMLElement
	public current:number
	public tl: TimelineLite
	public levels: Levels

	constructor(avatar:HTMLElement)
	{
		this.avatar = avatar
		this.current = 0
		this.tl = new TimelineLite({paused: true})
		this.tl.set(this.avatar, { xPercent:-50, yPercent:-50, transformOrigin:"50% 50%" })
		this.levels = new Levels(this.avatar)
		this.action = this.action.bind(this)

		// TODO: do better
		this.levels.list.forEach(level => {

			const last = level.path.length - 1
			
			this.tl.set(`#level-${level.id}-pin`, {
				x: level.path[last].x,
				y: level.path[last].y,
				xPercent: -50,
				yPercent: -50
			});

		})
		
		// TODO: do better
		this.levels.list.forEach(level => {
			this.tl.to(
				this.avatar,
				1, 
				{ 
					bezier: { values: level.path, type:"soft" }, 
					ease: Power0.easeNone,
					onComplete: () => this.shouldStop(level.id),
					onReverseComplete: () => this.shouldStop(level.id - 1) 
				}
			)
		})

		this.build()
		
	}

	public build() : void
	{
		let html = ""
		
		this.levels.list.map(level => html += `<button id="level-${level.id}" data-pos="${level.id}">level-${level.id}</button>`)
		
		const nav = document.getElementById("nav")
		nav.innerHTML = html
		nav.querySelectorAll("button").forEach(button => button.onclick = this.action)
	}

	public action(event:any) : void
	{
		this.tl.pause()
		const id = +event.target.getAttribute("data-pos")
	
		if(id == this.current) this.tl.pause()
		else if(id > this.current) this.tl.play()
		else this.tl.reverse()
	
		this.current = id
	}

	public shouldStop(id:number) : void
	{
		if(id == this.current) this.tl.pause()
	}
}