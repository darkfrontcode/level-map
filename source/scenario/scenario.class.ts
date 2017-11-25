import { Path } from './path.class'
import { Level } from './level.class'

export class Scenario
{
	public levels:Array<Level>

	constructor(levels:Array<Level>)
	{
		this.levels = levels
	}

	public findPath(target:number, current:number) : Array<Array<Path>>
	{
		// console.log(this.levels)
		
		const levels = new Array<Level>()
		let level:Level
		let stop:number

		if(target > current)
		{
			level = this.levels[target]
			stop = current
		}
		else
		{
			level = this.levels[current]
			stop = target
		}

		while(true)
		{
			if(level.value == stop)
			{
				levels.unshift(level)
				break
			}
			else
			{
				levels.unshift(level)
				level = level.parent
			}
		}

		const paths = levels.map(level => {
			const list = new Array<Path>()
			level.path.forEach(p => {
				list.push(new Path(p.x, p.y))
			})
			return list
		})

		return [ ...paths ]

	}

}