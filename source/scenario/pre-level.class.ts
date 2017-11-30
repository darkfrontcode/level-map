export class PreLevel
{
	public value:number
	public children: Array<number>

	constructor(value:number, children:Array<number>) 
	{
		this.value = value
		this.children = children
	}
}