export class Level
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