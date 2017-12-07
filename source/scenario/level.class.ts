import { Path } from "./path.class"
import { Point } from "./point.class"

export class Level
{
	public value:number
	public parent:Level
	public children:Array<Level>
	public visited:boolean = false
	public path:Path
	public pin:Point
	
	constructor(value:number, children:Array<Level> = new Array<Level>())
	{
		this.value = value
		this.children = children
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

	public createPath(forward:Array<Point>) : void
	{
		const backward = [ ...forward ].reverse()
		this.addPath(new Path(forward, backward))
	}

	public addPath(path:Path) : void
	{
		this.path = path
	}

	public createPin() : void
	{
		this.addPin(this.path.backward[0])
	}

	public addPin(pin:Point) : void
	{
		this.pin = pin
	}

	private clone(children:Array<Level>) : Array<Level>
	{
		return [ ...children ]
	}
	
}