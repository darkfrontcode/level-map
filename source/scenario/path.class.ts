import { PathPoint } from "./path-point.class"

export class Path
{
	public forward:Array<PathPoint>
	public backward:Array<PathPoint>

	constructor(forward:Array<PathPoint>, backward:Array<PathPoint>)
	{
		this.forward = forward
		this.backward = backward
	}
}