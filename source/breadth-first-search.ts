// Breadth First Search

class Level
{
	public value:number
	public parent:Level
	public children:Array<Level>
	
	constructor(value:number, parent:Level = null, children:Array<Level> = null)
	{
		this.value = value
		this.parent = parent
		this.children = children
	}

	public addParent(parent:Level) : void
	{
		this.parent = parent
	}

	public addChild(child:Level) : void
	{
		if(this.children == null)
		{
			this.children = new Array<Level>()
		}
		
		this.children.push(child)
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


zero.addChild(one)

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

class Scenario
{

	public static levels = new Array<Level>(zero, one, two, tree, four, five, six, seven, eighth)

	public static clone(levels:Array<Level>) : Array<Level>
	{
		return [ ...levels ]
	}

	public static findPath(level:number) : Array<Level>
	{
		const levels = this.clone(this.levels)
		const path = new Array<Level>()
		let current = levels.find(c => c.value == level)

		while(true)
		{
			if(current.value == 0)
			{
				path.unshift(current)
				break
			}
			else
			{
				path.unshift(current)
				current = current.parent
			}
		}

		return path
	}

}

console.log(Scenario.findPath(8))

/*

	0
	----1
	--------2
	------------3
	----------------4
	------------5
	------------6
	----------------7
	----------------8

*/