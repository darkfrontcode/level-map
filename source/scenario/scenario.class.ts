import { Track } from './track.class'
import { PreLevel } from './pre-level.class'
import { PreLevels } from './pre-levels.class'
import { TimelineMax, Power0 } from 'gsap'

export class Scenario
{
	public track:Track
	public target:number
	public current:number
	public lines:NodeListOf<SVGLineElement>
	public pins:NodeListOf<SVGCircleElement>
	public avatar:HTMLElement
	public loader:Element
	public tl:TimelineMax

	private onMove:boolean

	constructor(preLevelList:Array<PreLevel>, lines:NodeListOf<SVGLineElement>, pins:NodeListOf<SVGCircleElement>, avatar:HTMLElement, loader:Element)
	{
		this.track = new Track(new PreLevels(preLevelList).levels)
		this.target = 0
		this.current = 0
		this.lines = lines
		this.pins = pins
		this.avatar = avatar
		this.loader = loader
		this.tl = new TimelineMax()
		this.load()
	}

	private load() : void 
	{
		this.createPath()
		this.createPinsAndListeners()
		this.createAvatar()
		this.removeLoader()
	}

	private createPath() : void
	{
		for(let [key, line] of this.lines.entries())
		{
			const level = this.track.levels[key]
			level.createPath(window["MorphSVGPlugin"].pathDataToBezier(line, { align: this.avatar }))
			level.createPin()
		}
	}

	private createPinsAndListeners() : void
	{
		for(let [key, pin] of this.pins.entries())
		{
			const level = this.track.levels[key]
	
			this.tl.set(pin, {
				x: level.pin.x,
				y: level.pin.y,
				xPercent: -50,
				yPercent: -50
			})
	
			// TODO: type this
			pin.onclick = (event:any) => {

				if(this.onMove)
				{
					// this.tl.pause()
					// console.log(event.target._gsTransform)
					// const pos = event.target._gsTransform
					// this.tl.clear()
					// this.tl = new TimelineMax()
					// this.tl.to(this.avatar, .5, { bezier: { values: [{x:pos.x, y:pos.y}, {x:400, y:0}], type:"soft" }})
					// this.tl.reverse()

					this.tl.pause()
					console.log(event.target._gsTransform)
					this.onMove = false
				}
				else
				{
					this.onMove = true

					this.current = this.target
					this.target = +event.target.getAttribute("data-id")
	
					this.tl = new TimelineMax()
					
					if(this.current != this.target)
					{
						const points = this.track.search(this.target, this.current)
						for(let point of points)
						{
							this.tl.to(this.avatar, 1, { bezier: { values: point, type:"soft" }, ease: Power0.easeNone })
						}
		
					}
				}
	
			}
	
		}
	}

	private createAvatar() : void
	{
		const pin = this.track.levels[0].pin
		
		this.tl.set(this.avatar, {
			x: pin.x,
			y: pin.y,
			xPercent: -50,
			yPercent: -50
		})
	}

	private removeLoader() : void
	{
		setTimeout(() => {
			this.loader.remove()
		}, 500)
	}
}