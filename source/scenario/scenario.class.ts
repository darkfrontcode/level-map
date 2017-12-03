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
		return this.dispatcher(lineToParent)
		
	}

	public dispatcher(levels:Array<Level>) : Array<Array<Point>>
	{
		return levels.length == 2 ? this.removeSingleEdge(levels) : this.removeMultipleEdges(levels)
	}

	public removeSingleEdge(levels:Array<Level>) : Array<Array<Point>>
	{
		let path = new Array<Array<Point>>()

		let current = levels[0]
		let next = levels[1]
		// let prev:Level

		next = levels[1]
		const found = next.children.find(child => child.value == levels[0].value)

		if(found)
		{
			next.pin.y > current.pin.y ? path.push(current.path.forward) : path.push(current.path.backward)
		}
		else
		{
			path = this.buildTimelinePath(levels)
		}

		return path
	}

	public removeMultipleEdges(levels:Array<Level>) : Array<Array<Point>>
	{
		let path = new Array<Level>()

		let next:Level
		let prev:Level

		const last = levels.length - 1

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

		return this.buildTimelinePath(path)
	}

	public buildTimelinePath(levels:Array<Level>) : Array<Array<Point>>
	{
		const path = new Array<Array<Point>>()
		const last = levels.length - 1

		let next:Level
		let prev:Level

		// TODO: remove logic from here.
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