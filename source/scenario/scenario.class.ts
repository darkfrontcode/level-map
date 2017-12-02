import { Level } from './level.class'
import { Point } from './point.class'

// TODO:change name to LevelMap
export class Scenario
{
	public levels:Array<Level>
	
	constructor(levels:Array<Level>)
	{
		this.levels = levels
	}

	public search(target:number, current:number) : Array<Array<Point>>
	{
		this.unVisitAll()
		
		let visited = new Array<Level>()
		let stage = new Array<Level>()
		let stack = new Array<Level>()
		let found = false

		stage.push(this.levels[current])

		while(!found)
		{
			for(let level of stage)
			{
				if(level.value == target)
				{
					level.visited = true
					visited.push(level)
					found = true
					break
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

		const lineToParent = this.trackParent(visited)
		const path = this.removeEdges(lineToParent)

		return this.buildTimelinePath(path)

	}

	public removeEdges(levels:Array<Level>) : Array<Level>
	{
		console.log(levels)

		let path = new Array<Level>()

		let next:Level
		let prev:Level

		const last = levels.length - 1

		if(levels.length > 2)
		{
			for(let [key, level] of levels.entries())
			{
				if(key != 0 && key != last)
				{
					next = levels[key + 1]
					prev = levels[key - 1]

					if(prev.parent != next.parent)
					{
						path.push(level)
					}
				}
				else
				{
					path.push(level)
				}
			}
		}
		else
		{
			path = levels
		}

		return path
	}

	public buildTimelinePath(levels:Array<Level>) : Array<Array<Point>>
	{
		const path = new Array<Array<Point>>()
		const last = levels.length - 1

		let next:Level
		let prev:Level

		for(let [key, level] of levels.entries())
		{
			if(level.value != 0)
			{
				if(key == last)
				{
					prev = levels[key - 1]
					prev.pin.y > level.pin.y ? path.push(level.path.backward) : path.push(level.path.forward)
				}
				else
				{
					prev = levels[key - 1]
					next = levels[key + 1]
					
					next.pin.y > level.pin.y ? path.push(level.path.forward) : path.push(level.path.backward)
				}
			}
		}

		return path
	}

	public trackParent(visited:Array<Level>) : Array<Level>
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

	private unVisitAll() : void
	{
		for(let level of this.levels)
		{
			level.visited = false
			level.parent = null
		}
	}

}