import { Scenario } from './scenario.class'
import { PreLevel } from './pre-level.class'
import { PreLevels } from './pre-levels.class'
import { TimelineMax, Power0 } from 'gsap'

export class World
{
	public scenario:Scenario
	public target:number
	public current:number
	public lines:NodeListOf<SVGLineElement>
	public pins:NodeListOf<SVGCircleElement>
	public avatar:HTMLElement
	public tl:TimelineMax

	constructor(preLevelList:Array<PreLevel>, lines:NodeListOf<SVGLineElement>, pins:NodeListOf<SVGCircleElement>, avatar:HTMLElement)
	{
		this.scenario = new Scenario(new PreLevels(preLevelList).levels)
		this.target = 0
		this.current = 0
		this.lines = lines
		this.pins = pins
		this.avatar = avatar
		this.tl = new TimelineMax()
		this.load()
	}

	public load() : void 
	{
		this.createPath()
		this.createPinsAndListeners()
		this.createAvatar()
		// TODO: remove loader
	}

	public createPath() : void
	{
		for(let [key, line] of this.lines.entries())
		{
			const level = this.scenario.levels[key]
			level.createPath(window["MorphSVGPlugin"].pathDataToBezier(line, { align: this.avatar }))
			level.createPin()
		}
	}

	public createPinsAndListeners() : void
	{
		for(let [key, pin] of this.pins.entries())
		{
			const level = this.scenario.levels[key]
	
			this.tl.set(this.pins[key], {
				x: level.pin.x,
				y: level.pin.y,
				xPercent: -50,
				yPercent: -50
			})
	
			// TODO: type this
			pin.onclick = (event:any) => {
				
				this.current = this.target
				this.target = +event.target.getAttribute("data-id")
	
				this.tl.kill()
				
				if(this.current != this.target)
				{
					const points = this.scenario.search(this.target, this.current)
					for(let point of points)
					{
						this.tl.to(this.avatar, .5, { bezier: { values: point, type:"soft" }, ease: Power0.easeNone })
					}
	
				}
	
			}
	
		}
	}

	public createAvatar() : void
	{
		const pin = this.scenario.levels[0].pin
		
		this.tl.set(this.avatar, {
			x: pin.x,
			y: pin.y,
			xPercent: -50,
			yPercent: -50
		})
	}
}