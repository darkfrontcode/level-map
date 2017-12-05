import { Track } from './track.class'
import { PreLevel } from './pre-level.class'
import { PreLevels } from './pre-levels.class'
import { TimelineMax, Power0 } from 'gsap'

export class Scenario
{
	private track:Track
	private target:number
	private current:number
	private lines:NodeListOf<SVGLineElement>
	private pins:NodeListOf<SVGCircleElement>
	private avatar:HTMLElement
	private loader:Element
	private tl:TimelineMax
	private tlStack:TimelineMax

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

		this.onComplete = this.onComplete.bind(this)
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

				if(!this.tl.isActive())
				{
					this.current = this.target
					this.target = +event.target.getAttribute("data-id")

					this.tl = new TimelineMax()

					// TODO: maybe remove this
					if(this.current != this.target)
					{
						const points = this.track.search(this.target, this.current)
						for(let point of points)
						{
							this.tl.to(
								this.avatar, 
								.5, 
								{ 
									bezier: { values: point, type:"soft" }, 
									ease: Power0.easeNone,
									onComplete: this.onComplete
								}
							)
						}
					}
				}
				else
				{
					this.tl.pause()

					this.current = this.target
					this.target = +event.target.getAttribute("data-id")

					this.pathToTimeline(this.tlStack)
				}
	
			}
	
		}
	}

	private onComplete() : void
	{
		console.log(
			`x: ${ this.avatar['_gsTransform'].x }`,
			`y: ${ this.avatar['_gsTransform'].y }`
		)
	}

	private pathToTimeline(tl:TimelineMax) : void
	{
		tl = new TimelineMax({ paused: true })
		
		this.track
			.search(this.target, this.current)
			.map(point => {
				tl.to(
					this.avatar, 
					.5, 
					{ 
						bezier: { values: point, type:"soft" }, 
						ease: Power0.easeNone,
						onComplete: this.onComplete
					}
				)
			})
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