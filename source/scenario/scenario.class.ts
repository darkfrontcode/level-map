import { Level } from './level.class'

export class Scenario
{
	public levels:Array<Level>

	constructor(levels:Array<Level>)
	{
		this.levels = levels
	}

	public clone(levels:Array<Level>) : Array<Level>
	{
		return [ ...levels ]
	}

	public findPath(level:number) : Array<Level>
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