import { Point } from './point.class'
import { Level } from './level.class'

export class Tracker
{
	public points:Array<Array<Point>>
	public path: Array<Level>

	constructor(points:Array<Array<Point>>, path:Array<Level>)
	{
		this.points = points
		this.path = path
	}
}