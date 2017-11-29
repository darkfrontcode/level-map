import { Point } from "./point.class"

export class Path
{
	public forward:Array<Point>
	public backward:Array<Point>

	constructor(forward:Array<Point>, backward:Array<Point>)
	{
		this.forward = forward
		this.backward = backward
	}
}