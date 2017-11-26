import { Path } from './path.class'
import { Level } from './level.class'
import { IPath } from './path.interface';
import { PathSize } from './array-size.class'

export class Scenario
{
	public levels:Array<Level>
	
	constructor(levels:Array<Level>)
	{
		this.levels = levels
	}

	unVisitAll() : void
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

	public search(target:number, current:number) : Array<Level>
	{
		const breadthFirstSearch = this.breadthFirstSearch(target, current)

		const trackTargetParent = this.trackParent(target)
		const trackBreadthFirstSearchParent = this.trackParent(breadthFirstSearch[0].value)

		// console.log(trackTargetParent, trackBreadthFirstSearchParent)

		let finalPath

		if(trackTargetParent.length != 0 && trackBreadthFirstSearchParent.length != 0)
		{
			// console.log('in')
			const pathSize = this.defineBigAndSmall(trackTargetParent, trackBreadthFirstSearchParent)
			const lastCommonLevel = this.lastCommonLevel(pathSize.big, pathSize.small)
			finalPath = this.mountPath(lastCommonLevel, trackTargetParent, trackBreadthFirstSearchParent)
		}
		else
		{
			// console.log('out')
			finalPath = breadthFirstSearch
		}

		return finalPath
	}

	public breadthFirstSearch(target:number, pos:number) : Array<Level>
	{
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

			// TODO: Safety remove on the last release
			loop++
			if(loop == this.levels.length * 2) break
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
				levels.push(level)
				break
			}
			else
			{
				levels.push(level)
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

	public mountPath(lastCommonLevel:number, targetPath:Array<Level>, visitedPath:Array<Level>) : Array<Level>
	{
		const a = this.removeSimilarLevels(lastCommonLevel, targetPath)
		const b = this.removeSimilarLevels(lastCommonLevel, visitedPath)
		const c = new Array<Level>(this.levels[lastCommonLevel])

		return [...new Set([...a, ...c, ...b])]
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