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
	private timeline:TimelineMax
	private stop:boolean

	constructor(preLevelList:Array<PreLevel>, lines:NodeListOf<SVGLineElement>, pins:NodeListOf<SVGCircleElement>, avatar:HTMLElement, loader:Element)
	{
		this.track = new Track(new PreLevels(preLevelList).levels)
		this.target = 0
		this.current = 0
		this.lines = lines
		this.pins = pins
		this.avatar = avatar
		this.loader = loader
		this.timeline = new TimelineMax()
		this.stop = false
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

	// TODO: separate these two features
	private createPinsAndListeners() : void
	{
		for(let [key, pin] of this.pins.entries())
		{
			const level = this.track.levels[key]
	
			this.timeline.set(pin, {
				x: level.pin.x,
				y: level.pin.y,
				xPercent: -50,
				yPercent: -50
			})
	
			// TODO: type this
			pin.onclick = (event:any) => {

				this.levelTarget(+event.target.getAttribute("data-id"))
				
				if(this.timeline.isActive())
					this.stop = true
				else
					this.timeline = this.buildTimelineTrack(this.target, this.current)

				this.timeline.play()
			}
		}
	}

	private levelTarget(level:number) : void
	{
		this.current = this.target
		this.target = level
	}

	private buildTimelineTrack(target:number, current:number) : TimelineMax
	{
		const timeline = new TimelineMax({ paused: true })
		const { points, path } = this.track.search(target, current)

		for(let [key, point] of points.entries())
		{
			timeline.to(
				this.avatar,
				1, 
				{ 
					bezier: { values: point, type:"soft" }, 
					ease: Power0.easeNone,
					onComplete: this.onComplete,
					onCompleteParams: [ path[key].value ]
				}
			)
		}

		return timeline
	}

	private onComplete(level:number) : void
	{
		if(this.stop)
		{
			this.timeline.pause()
			this.timeline.kill()

			this.current = level
			this.timeline = this.buildTimelineTrack(this.target, this.current)

			this.timeline.play()
			this.stop = false
		}
	}

	private createAvatar() : void
	{
		const pin = this.track.levels[0].pin
		
		this.timeline.set(this.avatar, {
			x: pin.x,
			y: pin.y,
			xPercent: -50,
			yPercent: -50
		})
	}

	private removeLoader() : void
	{
		setTimeout(() => this.loader.remove(), 500)
	}
}