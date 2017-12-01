import { Level } from './level.class'

// TODO:change name to LevelMap
export class Scenario
{
	public levels:Array<Level>
	
	constructor(levels:Array<Level>)
	{
		this.levels = levels
	}

	public A_STAR_SEARCH(target:number, current:number) : void
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

		const path = this.trackParent(visited)
		this.buildTimelinePath(path)

	}

	public buildTimelinePath(path:Array<Level>) : any
	{
		let current, next, prev
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

	/*
	public A_STAR_SEARCH(target:number, current:number) : void
	{
		// 6 => 4

		this.path.length = 0
		this.stage.length = 0
		this.stack.length = 0
		this.found = false

		this.path.push(this.levels[current])
		this.stage.push(this.levels[current])

		let count = 0

		// [ 6:[2, 7, 8] ] => Array<Level>
		// [ 2:[1,3,5,6], 7:[6,9,10], 8:[6] ] => Array<Level>
		// [ 1: [0, 2], 3: [2, 4], 5: [2], 6: [2, 7, 8] ] => Array<Level>

		while(!this.found)
		{
			for(let level of this.stage)
			{
				const found = level.children.find(child => child.value == target)

				console.log(found)
				
				if(found)
				{
					this.path.push(found) // yep
					this.found = true
					break
				}					
				else
				{
					this.stack = [ ...level.children ] // nop
				}

			}
	
			// reset
			this.stage.length = 0
			this.stage = [ ...this.stack ]
			this.stack.length = 0
			count++

			if(count == 20) break
		}

		console.log(this.path)

	}

	*/

	/*
	public A_STAR_SEARCH(target:number, current:number) : void
	{
		// 6 => 4

		const path = new Array<Level>()
		path.push(this.levels[current]) // 6

		const sixChildren = this.levels[current].children.map(child => child) // [ 2, 7 ,8 ]
		sixChildren.filter(child => child.value == current)
		
		if(sixChildren.length == 0) // check if it is a current match
		{

			const arr = new Array<Array<Level>>()

			sixChildren.map(child => {
				
				// 2, 7, 8
				this.levels[child.value].children.map(c => {

					const arrB = new Array<Level>()

					// 2 => children
					c.children.map(e => arrB.push(e))

					arr.push(arrB)

				})

			})

			// 2:[1, 3, 5, 6] 7:[6, 9, 10] 8:[6]
			arr.map(f => {

				// 2: [1,3,5,6]
				f.map(d => {
					
					const t = d.children.every(h => h.visited)

					if(t)
					{
						delete arr[t]
					}

					const c = d.children.filter(g => g.value == current)

					if(c.length != 0)
					{
						path.push(this.levels[c[0].value])
					}

				})
			})



		}
		else
		{
			path.push(this.levels[current])
		}

	}
	*/

	// public search(target:number, current:number) : Array<Array<Point>>
	// {
	// 	const breadthFirstSearch = this.breadthFirstSearch(target, current)

	// 	const trackTargetParent = this.trackParent(target)
	// 	const trackBreadthFirstSearchParent = this.trackParent(breadthFirstSearch[0].value)

	// 	const pathSize = this.defineBigAndSmall(trackTargetParent, trackBreadthFirstSearchParent)
	// 	const lastCommonLevel = this.lastCommonLevel(pathSize.big, pathSize.small)
	// 	const finalPath = this.mergePath(lastCommonLevel, trackTargetParent, trackBreadthFirstSearchParent)

	// 	return this.buildTimelinePath(finalPath)
	// }


	// private breadthFirstSearch(target:number, current:number) : Array<Level>
	// {
	// 	this.unVisitAll()

	// 	const visited = new Array<Level>()
	// 	let level = this.levels[current]
	
	// 	const visit = (level:Level) => {
	// 		if(!level.visited)
	// 		{
	// 			visited.push(level)
	// 			level.visited = true
	// 		}
	// 	}
	
	// 	while(true)
	// 	{
	// 		if(level.value == target)
	// 		{
	// 			visit(level)
	// 			break
	// 		}
	// 		else
	// 		{
	// 			visit(level)

	// 			if(level.hasChildren)
	// 			{
	// 				if(level.singleChild)
	// 				{
	// 					const child = level.children[0]
	// 					level = !child.visited ? child : level.parent
	// 				}
	// 				else
	// 				{
	// 					if(level.children.every(c => c.visited))
	// 					{
	// 						level = level.parent
	// 					}
	// 					else
	// 					{
	// 						for(let child of level.children)
	// 						{	
	// 							if(!child.visited)
	// 							{
	// 								level = child
	// 								break
	// 							}
	// 						}
	// 					}
	// 				}
	// 			}
	// 			else
	// 			{
	// 				level = level.parent
	// 			}
	// 		}
	// 	}
		
	// 	return visited
	// }


	// private unVisitAll() : void
	// {
	// 	for(let level of this.levels)
	// 	{
	// 		level.visited = false

	// 		if(level.hasChildren)
	// 		{
	// 			for(let child of level.children)
	// 			{
	// 				child.visited = false
	// 			}
	// 		}
	// 	}
	// }

	// public buildTimelinePath(levels:Array<Level>) : Array<Array<Point>> 
	// {	
	// 	let current, next, prev, parent, size

	// 	const paths = new Array<Array<Point>>()

	// 	const setDirection = (level:Level, next:Level) => {

	// 		if(level.parent.value == next.value)
	// 			paths.push(level.path.backward)
	// 		else
	// 			paths.push(level.path.forward)
	// 	}

	// 	/** Two elements only **/
	// 	if(levels.length == 2)
	// 	{
	// 		current = levels[0]
	// 		next = levels[1]

	// 		if(levels[0].value == 0)
	// 		{
	// 			paths.push(next.path.forward)
	// 		}
	// 		else
	// 		{
	// 			if(current.parent.value == next.value)
	// 				paths.push(current.path.backward)
	// 			else 
	// 				paths.push(next.path.forward)
	// 		}
	// 	}
	// 	else
	// 	{
	// 		size = levels.length - 1

	// 		for(let [key, level] of levels.entries())
	// 		{
	// 			// remove first and last
	// 			if(key != size && key !== 0)
	// 			{
	// 				prev = levels[key - 1]
	// 				next = levels[key + 1]
	// 				parent = prev.parent && next.parent
	
	// 				if(parent)
	// 				{
	// 					if(prev.parent.value != next.parent.value)
	// 					{
	// 						setDirection(level, next)
	// 					}
	// 				}
	// 				else
	// 				{
	// 					setDirection(level, next)
	// 				}
	
	// 			}
	// 			else if(key == 0)
	// 			{
	// 				/** first level case **/

	// 				if(level.parent == undefined)
	// 				{
	// 					paths.push(level.path.forward)
	// 				}
	// 				else if(level.parent.value != 0)
	// 				{
	// 					next = levels[key + 1]
	// 					setDirection(level, next)
	// 				}
	// 			}
	// 			else
	// 			{
	// 				/** Last level case **/

	// 				if(levels[levels.length - 1].value == 0)
	// 				{
	// 					paths.push(level.path.backward)
	// 				}
	// 				else if(level.parent.value != 0)
	// 				{
	// 					prev = levels[size - 1]
						
	// 					if(level.value > prev.value)
	// 						paths.push(level.path.forward)
	// 					else
	// 						paths.push(level.path.backward)
	// 				}

	// 			}
	
	// 		}
	// 	}

	// 	return paths
	// }

	// public defineBigAndSmall(arrA:Array<Level>, arrb:Array<Level>) : ArrayCompare
	// {
	// 	let small:Array<Level>
	// 	let big:Array<Level>

	// 	if(arrA.length > arrb.length)
	// 	{
	// 		big = arrA
	// 		small = arrb
	// 	}
	// 	else
	// 	{
	// 		big = arrb
	// 		small = arrA
	// 	}

	// 	return new ArrayCompare(big, small)
	// }

	// public lastCommonLevel(small:Array<Level>, big:Array<Level>) : number
	// {
	// 	for(let [key, level] of small.entries())
	// 	{
	// 		try
	// 		{
	// 			if(level.value != big[key].value)
	// 			{
	// 				return big[key - 1].value
	// 			}
	// 		}
	// 		catch(err)
	// 		{
	// 			return big[key - 1].value
	// 		}
	// 	}
	// }

	// public trackParent(target:number) : Array<Level>
	// {
	// 	const levels = new Array<Level>()
	// 	let level = this.levels[target]
		
	// 	while(true)
	// 	{
	// 		if(level.value == 0)
	// 		{
	// 			levels.unshift(level)
	// 			break
	// 		}
	// 		else
	// 		{
	// 			levels.unshift(level)
	// 			level = level.parent
	// 		}
	// 	}

	// 	return levels
	// }

	// public removeSimilarLevels(lastCommonLevel:number, arr:Array<Level>) : Array<Level>
	// {
	// 	while(true)
	// 	{
	// 		if(arr[0].value == lastCommonLevel)
	// 		{
	// 			arr.shift()
	// 			break
	// 		}
	// 		else
	// 		{
	// 			arr.shift()
	// 		}
	// 	}

	// 	return arr
	// }

	// public mergePath(lastCommonLevel:number, targetPath:Array<Level>, visitedPath:Array<Level>) : Array<Level>
	// {
	// 	const a = this.removeSimilarLevels(lastCommonLevel, targetPath).reverse()
	// 	const b = this.removeSimilarLevels(lastCommonLevel, visitedPath)
	// 	const c = new Array<Level>(this.levels[lastCommonLevel])

	// 	return [...new Set([...a, ...c, ...b])].reverse()
	// }

}