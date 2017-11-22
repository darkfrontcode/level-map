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
	new Level(1, null, [2]),
	new Level(2, 1, [3]),
	new Level(3, 2, [4,5]),
	new Level(4, 3, null),
	new Level(5, 3, null)
)

const search = (target:number) => {

	let current = list[0]
	let visited = new Array<number>()

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
					current = list.filter(l => l.value == current.children[0])[0]
				}
				else
				{
					visit(current)
					for(let child of current.children)
					{	
						if(!visited.find(v => v == child))
						{
							visited.push(child)
							current = list.filter(l => l.value == child)[0]
							break
						}
					}
				}
			}
			else
			{
				visit(current)
				current = list.filter(l => l.value == current.parent)[0]
			}
		}
		
	}

	return visited

}

console.log(
	search(1),
	search(2),
	search(3),
	search(4),
	search(5)
)