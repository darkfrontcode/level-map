// Breadth First Search

class Level
{
	public value:number
	public parent:Level
	private _children:Array<Level>
	public singleChild:boolean = false
	public hasChildren:boolean = false
	public visited:boolean = false
	
	constructor(
		value:number, 
		parent:Level = null, 
		children:Array<Level> = new Array<Level>()
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

	set children(children:Array<Level>)
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

	public addParent(parent:Level) : void
	{
		this.parent = parent
	}

	public addChild(child:Level) : void
	{
		const children = this.clone(this.children)
		children.push(child)
		this.children = children
	}

	public clone(children:Array<Level>) : Array<Level>
	{
		return [ ...children ]
	}
}

const zero = new Level(0)
const one = new Level(1)
const two = new Level(2)
const tree = new Level(3)
const four = new Level(4)
const five = new Level(5)
const six = new Level(6)
const seven = new Level(7)
const eighth = new Level(8)


zero.addChild(two)

one.addParent(zero)
one.addChild(two)

two.addParent(one)
two.addChild(tree)
two.addChild(five)
two.addChild(six)

tree.addParent(two)
tree.addChild(four)

four.addParent(tree)

five.addParent(two)

six.addParent(two)
six.addChild(seven)
six.addChild(eighth)

seven.addParent(six)

eighth.addParent(six)

// console.log(
// 	zero,
// 	one,
// 	two,
// 	tree,
// 	four,
// 	five,
// 	six,
// 	seven,
// 	eighth,
// )


class Scenario
{
	/*
		public static levels = new Array<Level>(
			new Level(0, null, [1]), => OK
				new Level(1, 0, [2]),
					new Level(2, 1, [3, 5, 6]),
						new Level(3, 2, [4]),
							new Level(4, 3),
						new Level(5, 2),
						new Level(6, 2, [7, 8]),
							new Level(7, 6),
							new Level(8, 6),
		)
	*/

	public static levels = new Array<Level>(
		one,
		two,
		tree,
		four,
		five,
		six,
		seven,
		eighth
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
				visit(current)

				if(current.hasChildren)
				{
					if(current.singleChild)
					{
						current = current.children[0]
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

console.log(Scenario.search(8))