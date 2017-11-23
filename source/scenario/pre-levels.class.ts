import { Level } from './level.class'
import { PreLevel } from './pre-level.class'

export class PreLevels
{
	public list:Array<Level>

	constructor(preLevels:Array<PreLevel>)
	{
		this.list = new Array<Level>()
		this.buildList(preLevels)
		this.buildProps(preLevels)
	}

	private buildList(preLevels:Array<PreLevel>) : void
	{
		for(let preLevel of preLevels)
		{
			this.list.push(new Level(preLevel.value))
		}
	}

	private buildProps(preLevels:Array<PreLevel>) : void
	{
		for(let preLevel of preLevels)
		{
			const level = this.list[preLevel.value]
			const parent = this.list[preLevel.parent]

			level.addParent(parent)
			preLevel.children.map(c => level.addChild(this.list[c]))
		}
	}
}