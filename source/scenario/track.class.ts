import { Level } from './level.class'
import { Point } from './point.class'
import { Tracker } from './tracker.class'

export class Track
{
	public levels:Array<Level>
	
	constructor(levels:Array<Level>)
	{
		this.levels = levels
	}

	public search(target:number, current:number) : Tracker
	{	
		let visited = new Array<Level>()
		let stage = new Array<Level>()
		let stack = new Array<Level>()

		stage.push(this.levels[current])

		loop:
		while(true)
		{
			for(let level of stage)
			{
				if(level.value == target)
				{
					visited.push(level)
					break loop
				}
				else
				{
					level.visited = true
					visited.push(level)
					
					for(let child of level.children)
					{
						if(!child.visited)
						{
							child.addParent(level)
							stack.push(child)
						}
					}
				}
			}

			stage = [ ...stack ]
			stack = new Array<Level>()

		}

		const path = this.trackParent(visited)
		const points = this.buildTimelinePath(path)
		path.shift()
		const tracker = new Tracker(points, path)

		this.resetAll()

		return tracker
		
	}

	// TODO: refactory this
	private buildTimelinePath(levels:Array<Level>) : Array<Array<Point>>
	{
		const path = new Array<Array<Point>>()
		const last = levels.length - 1

		let next:Level
		let prev:Level
		let current:Level

		if(levels.length == 2)
		{
			current = levels[0]
			next = levels[1]

			if(current.pin.y > next.pin.y)
				current.pin.y > next.pin.y ? path.push(current.path.backward) : path.push(current.path.forward)
			else
				current.pin.y > next.pin.y ? path.push(next.path.backward) : path.push(next.path.forward)
		}
		else
		{
			for(let [key, level] of levels.entries())
			{
				if(level.value != 0)
				{
					if(key == 0)
					{
						next = levels[key + 1]
						if(level.pin.y > next.pin.y) path.push(level.path.backward)
					}
					else if(key == last)
					{
						prev = levels[key - 1]
						if(level.pin.y > prev.pin.y) path.push(level.path.forward)
					}
					else
					{
						prev = levels[key - 1]
						next = levels[key + 1]

						if(next && prev)
						{
							if(next.pin.y != prev.pin.y)
							{
								next.pin.y > level.pin.y ? path.push(level.path.forward) : path.push(level.path.backward)
							}
						}
						else
						{
							next.pin.y > level.pin.y ? path.push(level.path.forward) : path.push(level.path.backward)
						}
					}
				}
			}
		}

		return path
	}

	private trackParent(visited:Array<Level>) : Array<Level>
	{
		const track = new Array<Level>()
		let current = visited[visited.length -1]

		while(true)
		{
			if(current.parent == null)
			{
				track.push(current)
				break
			}
			else
			{
				track.push(current)
				current = current.parent
			}
		}

		return track.reverse()
	}

	private resetAll() : void
	{
		for(let level of this.levels)
		{
			level.visited = false
			level.parent = null
		}
	}

}