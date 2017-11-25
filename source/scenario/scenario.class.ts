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
		return JSON.parse(JSON.stringify(levels))
		// return [ ...levels ]
	}

	public findPath(target:number, current:number) : Array<Level>
	{
		// console.log(this.levels)
		const levels = this.clone(this.levels)
		const path = new Array<Level>()

		const conditional = target > current
		let level = conditional ? levels[target] : levels[current]
		const stop = conditional ? current : target

		while(true)
		{
			if(level.value == stop)
			{
				path.unshift(level)
				break
			}
			else
			{
				path.unshift(level)
				level = level.parent
			}
		}

		return path
	}

}