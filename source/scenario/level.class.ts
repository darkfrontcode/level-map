import { Path } from "./path.class"
import { Point } from "./point.class"

export class Level
{
	public value:number
	public parent:Level
	private _children:Array<Level>
	public singleChild:boolean = false
	public hasChildren:boolean = false
	public visited:boolean = false
	public path:Path
	public pin:Point
	
	constructor(value:number, children:Array<Level> = new Array<Level>())
	{
		this.value = value
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

	private clone(children:Array<Level>) : Array<Level>
	{
		return [ ...children ]
	}

	public addPath(path:Path) : void
	{
		this.path = path
	}

	public addPin(pin:Point) : void
	{
		this.pin = pin
	}
	
}