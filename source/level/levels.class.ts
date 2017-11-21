import { Level } from './level.class'

export class Levels
{
	public list: Array<Level>

	// TODO: loop this
	constructor(avatar:HTMLElement)
	{
		this.list = new Array(
			new Level(1, document.getElementById("line"), avatar),
			new Level(2, document.getElementById("line-two"), avatar),
			new Level(3, document.getElementById("line-three"), avatar),
			new Level(4, document.getElementById("line-four"), avatar),
			new Level(5, document.getElementById("line-five"), avatar)
		)	
	}
}