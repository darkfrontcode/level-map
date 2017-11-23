export class PreLevel
{
	public value:number
	public parent:number
	public children: Array<number>

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