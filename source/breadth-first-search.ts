// Breadth First Search

class Level
{
	public value:number
	public parent:number
	private _children:Array<number>
	public singleChild:boolean
	public hasChildren:boolean
	public visited:boolean
	
	constructor(
		value:number, 
		parent:number = null, 
		children:Array<number> = new Array<number>()
	)
	{
		this.value = value
		this.parent = parent
		this.children = children
	}

	get children()
	{
		return this._children
	}

	set children(children:Array<number>)
	{
		if(children.length > 0)
		{
			this.hasChildren = true
			this.singleChild = children.length == 1
		}
		else
		{
			this.hasChildren = false
		}

		this._children = children
	}
}

class Scenario
{
	public static levels = new Array<Level>(
		new Level(0, null, [1]),
			new Level(1, 0, [2]),
				new Level(2, 1, [3, 5, 6]),
					new Level(3, 2, [4]),
						new Level(4, 3),
					new Level(5, 2),
					new Level(6, 2, [7, 8]),
						new Level(7, 6),
						new Level(8, 6),
	)

	public static clone(levels:Array<Level>) : Array<Level>
	{
		return { ...levels }
	}

	public static search(target:number)
	{
		const levels = this.clone(this.levels)
		const visited = new Array<number>()
		let current = levels[0]
		let loop = 0
	
		const visit = (level:Level) => {
			if(!level.visited)
			{
				visited.push(level.value)
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
				if(current.hasChildren)
				{
					if(current.singleChild)
					{
						visit(current)
						current = levels[current.children[0]]
					}
					else
					{
						visit(current)
						
						for(let child of current.children)
						{	
							if(!visited.find(v => v == child))
							{
								visited.push(child)
								current = levels[child]
								break
							}
						}
					}
				}
				else
				{
					visit(current)
					current = levels[current.parent]
				}
			}

			loop++
			if(loop == 15) break
		}
	
		// const path = new Array<number>()
		// let p = visited[visited.length - 1]
	
		// while(true)
		// {
		// 	if(p == 0)
		// 	{
		// 		// TODO:
		// 		break
		// 	}
		// 	else
		// 	{
		// 		const parent = this.levels[p].parent
		// 		path.unshift(parent)
		// 		p = parent
		// 	}
		// }

		return visited
	}

}

console.log(Scenario.search(5))