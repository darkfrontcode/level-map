import { Level } from './level.class'
import { PathSize } from './array-size.class'
import { PathPoint } from './path-point.class'

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
			if(level.hasChildren)
			{
				level.children.map(c => {
					c.visited = false
				})
			}
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
		const finalPath = this.mountPath(lastCommonLevel, trackTargetParent, trackBreadthFirstSearchParent)

		const prepareToTimeLine = this.prepareToTimeLine(finalPath)
		return prepareToTimeLine
	}

	public prepareToTimeLine(levels:Array<Level>) : Array<Array<PathPoint>> 
	{
		/*
			level.parent.value == next.parent.value => skip parent timeline
			level.parent.value == next.value => backwards
			prev.parent.value == next.parent.value => skip level from time line
		*/

		const paths = new Array<Array<PathPoint>>()
		const size = levels.length - 1

		for(let [key, level] of levels.entries())
		{
			// remove first and last
			if(key != size && key !== 0)
			{
				const prev = levels[key - 1] || undefined
				const next = levels[key + 1] || undefined
				const parent = prev.parent != undefined && next.parent != undefined

				if(parent)
				{
					if(prev.parent.value == next.parent.value)
					{
						console.log('skep:', level.value)
						// TODO: skip
					}
					else
					{
						if(level.parent.value == next.value)
						{
							// backwards
							paths.push(level.path.backward)
						}
						else
						{
							// forward
							paths.push(level.path.forward)
						}
					}
				}
				else
				{
					if(level.parent.value == next.value)
					{
						// backwards
						paths.push(level.path.backward)
					}
					else
					{
						// forward
						paths.push(level.path.forward)
					}
				}

			}
			else if(key == 0)
			{
				if(level.parent == undefined)
				{
					// forward
					paths.push(level.path.forward)
				}
				else
				{
					const next = levels[key + 1]

					if(level.parent.value == next.value)
					{
						// backwards
						paths.push(level.path.backward)
					}
					else
					{
						// forward
						paths.push(level.path.forward)
					}
				}
			}
			else
			{
				// last
				if(level.value > level.parent.value)
				{
					paths.push(level.path.forward)
				}
				else
				{
					paths.push(level.path.backward)
				}
			}

		}

		return paths
	}

	public straightLines(levels: Array<Level>)
	{
		return levels.length == 1 && levels[0].value == 0
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

	public mountPath(lastCommonLevel:number, targetPath:Array<Level>, visitedPath:Array<Level>) : Array<Level>
	{
		const a = this.removeSimilarLevels(lastCommonLevel, targetPath).reverse()
		const b = this.removeSimilarLevels(lastCommonLevel, visitedPath)
		const c = new Array<Level>(this.levels[lastCommonLevel])

		return [...new Set([...a, ...c, ...b])].reverse()
	}

}