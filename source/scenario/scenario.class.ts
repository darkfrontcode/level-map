import { Level } from './level.class'
import { PathSize } from './path-size.class'
import { PathPoint } from './path-point.class'

// TODO:change name to LevelMap
export class Scenario
{
	public levels:Array<Level>
	
	constructor(levels:Array<Level>)
	{
		this.levels = levels
	}

	unVisitAll() : void
	{
		this.levels.map(level => {
			level.visited = false
			if(level.hasChildren) level.children.map(child => child.visited = false)
			return level
		})
	}

	public search(target:number, current:number) : Array<Array<PathPoint>>
	{
		const breadthFirstSearch = this.breadthFirstSearch(target, current)

		const trackTargetParent = this.trackParent(target)
		const trackBreadthFirstSearchParent = this.trackParent(breadthFirstSearch[0].value)

		const pathSize = this.defineBigAndSmall(trackTargetParent, trackBreadthFirstSearchParent)
		const lastCommonLevel = this.lastCommonLevel(pathSize.big, pathSize.small)
		const finalPath = this.mergePath(lastCommonLevel, trackTargetParent, trackBreadthFirstSearchParent)

		return this.buildTimelinePath(finalPath)
	}

	public buildTimelinePath(levels:Array<Level>) : Array<Array<PathPoint>> 
	{	
		let current, next, prev, parent, size

		const paths = new Array<Array<PathPoint>>()

		/** Two elements only **/
		if(levels.length == 2)
		{
			current = levels[0]
			next = levels[1]

			if(levels[0].value == 0)
			{
				paths.push(next.path.forward)
			}
			else
			{
				if(current.parent.value == next.value)
					paths.push(current.path.backward)
				else 
					paths.push(next.path.forward)
			}
		}
		else
		{
			size = levels.length - 1

			for(let [key, level] of levels.entries())
			{
				// remove first and last
				if(key != size && key !== 0)
				{
					prev = levels[key - 1] || undefined
					next = levels[key + 1] || undefined
					parent = prev.parent != undefined && next.parent != undefined
	
					if(parent)
					{
						if(prev.parent.value != next.parent.value)
						{
							if(level.parent.value == next.value)
								paths.push(level.path.backward)
							else
								paths.push(level.path.forward)
						}
					}
					else
					{
						if(level.parent.value == next.value)
							paths.push(level.path.backward)
						else
							paths.push(level.path.forward)
					}
	
				}
				else if(key == 0)
				{
					/** first level case **/

					if(level.parent == undefined)
					{
						paths.push(level.path.forward)
					}
					else if(level.parent.value != 0)
					{
						next = levels[key + 1]
						
						if(level.parent.value == next.value)
							paths.push(level.path.backward)
						else
							paths.push(level.path.forward)
					}
				}
				else
				{
					/** Last level case **/

					if(levels[levels.length - 1].value == 0)
					{
						paths.push(level.path.backward)
					}
					else if(level.parent.value != 0)
					{
						prev = levels[size - 1]
						
						if(level.value > prev.value)
							paths.push(level.path.forward)
						else
							paths.push(level.path.backward)
					}

				}
	
			}
		}

		return paths
	}

	public breadthFirstSearch(target:number, pos:number) : Array<Level>
	{
		this.unVisitAll()

		const visited = new Array<Level>()
		let current = this.levels[pos]
	
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
		}
		
		return visited
	}

	public defineBigAndSmall(arrA:Array<Level>, arrb:Array<Level>) : PathSize
	{
		let small:Array<Level>
		let big:Array<Level>

		if(arrA.length > arrb.length)
		{
			big = arrA
			small = arrb
		}
		else
		{
			big = arrb
			small = arrA
		}

		return new PathSize(big, small)
	}

	public lastCommonLevel(small:Array<Level>, big:Array<Level>) : number
	{
		for(let [key, level] of small.entries())
		{
			try
			{
				if(level.value != big[key].value)
				{
					return big[key - 1].value
				}
			}
			catch(err)
			{
				return big[key - 1].value
			}
		}
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

	public removeSimilarLevels(lastCommonLevel:number, arr:Array<Level>) : Array<Level>
	{
		while(true)
		{
			if(arr[0].value == lastCommonLevel)
			{
				arr.shift()
				break
			}
			else
			{
				arr.shift()
			}
		}

		return arr
	}

	public mergePath(lastCommonLevel:number, targetPath:Array<Level>, visitedPath:Array<Level>) : Array<Level>
	{
		const a = this.removeSimilarLevels(lastCommonLevel, targetPath).reverse()
		const b = this.removeSimilarLevels(lastCommonLevel, visitedPath)
		const c = new Array<Level>(this.levels[lastCommonLevel])

		return [...new Set([...a, ...c, ...b])].reverse()
	}

}