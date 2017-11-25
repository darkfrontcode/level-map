import { Path } from './path.class'
import { Level } from './level.class'
import { IPath } from './path.interface';

export class Scenario
{
	public levels:Array<Level>
	
	constructor(levels:Array<Level>)
	{
		this.levels = levels
	}

	unVisitAll()
	{
		this.levels.map(l => {
			l.visited = false
			if(l.hasChildren)
			{
				l.children.map(c => {
					c.visited = false
				})
			}
			return l
		})
	}

	public search(target:number, pos:number)
	{

		console.log(target, pos)
		this.unVisitAll()
		const visited = new Array<Level>()
		let current = this.levels[pos]
		let loop = 0
	
		const visit = (level:Level) => {
			if(!level.visited)
			{
				visited.push(level)
				level.visited = true
			}
		}
	
		while(true)
		{
			if(current.value == target)
			{
				visit(current)
				break
			}
			else
			{
				visit(current)

				if(current.hasChildren)
				{
					if(current.singleChild)
					{
						const child = current.children[0]
						current = !child.visited ? child : current.parent
					}
					else
					{
						if(current.children.every(c => c.visited))
						{
							current = current.parent
						}
						else
						{
							for(let child of current.children)
							{	
								if(!child.visited)
								{
									current = child
									break
								}
							}
						}
					}
				}
				else
				{
					current = current.parent
				}
			}

			// safety
			loop++
			if(loop == this.levels.length * 2) break
		}

		console.log('visited', visited)
		console.log('track target', this.trackParent(target))
		console.log('track result', this.trackParent(visited[0].value))

		const trackTarget = this.trackParent(target)
		const trackVisited = this.trackParent(visited[0].value)

		let small:Array<Level>
		let big:Array<Level>

		if(trackTarget.length > trackVisited.length)
		{
			big = trackTarget
			small = trackVisited
		}
		else
		{
			big = trackVisited
			small = trackTarget
		}

		for(let [key, level] of small.entries())
		{
			if(level.value != big[key].value || big[key].value == undefined)
			{
				// TODO:
				big[key - 1].value
				break
			}
		}

		return [ visited, loop ]
	}

	public trackParent(target:number) : Array<Level>
	{
		const levels = new Array<Level>()
		let level = this.levels[target]
		
		while(true)
		{
			if(level.value == 0)
			{
				levels.unshift(level)
				break
			}
			else
			{
				levels.unshift(level)
				level = level.parent
			}
		}

		return levels
	}

	public findPath(target:number, current:number) : Array<Array<IPath>>
	{
		const levels = new Array<Level>()
		let level:Level
		let stop:number

		if(target > current)
		{
			level = this.levels[target]
			stop = current
		}
		else
		{
			level = this.levels[current]
			stop = target
		}

		while(true)
		{
			if(level.value == stop)
			{
				levels.unshift(level)
				break
			}
			else
			{
				levels.unshift(level)
				level = level.parent
			}
		}

		const paths = levels.map(level => {
			const list = new Array<Path>()
			level.path.forEach(p => {
				list.push(new Path(p.x, p.y))
			})
			return list
		})

		return [ ...paths ]

	}

}