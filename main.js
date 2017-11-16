
console.clear()

let tween

const motionPath = MorphSVGPlugin.pathDataToBezier("#motionPath", { align: "#balloon" })
const createAnimationButton = document.getElementById("createAnimation")

TweenLite.set("#balloon", { xPercent:-50, yPercent:-50 })

createAnimationButton.onclick = () => {
	tween = TweenLite.to("#balloon", 2, { bezier: { values:motionPath, type:"cubic"}})
}	