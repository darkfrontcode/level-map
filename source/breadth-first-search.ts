// Breadth First Search

class Level
{
	public value:number
	public parent:number
	public children:Array<number>
	
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
}

const list = new Array<Level>(
	new Level(0, null, [1]),
	new Level(1, 0, [2]),
	new Level(2, 1, [3, 4]),
	new Level(3, 2, null),
	new Level(4, 2, [5]),
	new Level(5, 4, null),
)

const search = (target:number) => {

	let current = list[0]
	let visited = new Array<number>()
	let loop = 0

	const visit = (level:Level) => {
		if(!visited.find(v => v == level.value)) visited.push(level.value)
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
			if(current.children)
			{
				if(current.children.length == 1)
				{
					visit(current)
					current = list[current.children[0]]
				}
				else
				{
					visit(current)
					for(let child of current.children)
					{	
						if(!visited.find(v => v == child))
						{
							visited.push(child)
							current = list[child]
							break
						}
					}
				}
			}
			else
			{
				visit(current)
				current = list[current.parent]
			}
		}

		loop++
		if(loop == list.length) break
	}

	const path = new Array<number>()
	let p = visited[visited.length - 1]

	while(p != 0)
	{
		const parent = list[p].parent
		path.unshift(parent)
		p = parent
	}

	console.log(path)

	return visited

}

console.log(search(5))