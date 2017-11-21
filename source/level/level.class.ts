import { IPath } from './path.interface'

export class Level
{
	public id:number
	public element:HTMLElement
	public avatar:HTMLElement
	public path:Array<IPath>
	public children:Array<IPath>

	constructor(id:number, element:HTMLElement, avatar:HTMLElement)
	{
		this.id = id
		this.element = element
		this.avatar = avatar
		this.path = this.transform(this.element)
	}

	transform(target:HTMLElement) : Array<IPath>
	{
		// TODO: do better than this
		return window["MorphSVGPlugin"].pathDataToBezier(target, { align: this.avatar }) 
	}
}