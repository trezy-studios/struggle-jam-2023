// Module imports
import {
	Container,
	Sprite,
} from '@pixi/react'
import { Assets } from 'pixi.js'
import { useMemo } from 'react'
import { useStore } from 'statery'





// Local imports
import { ANCHORS } from '../../data/ANCHORS.js'
import { store } from '../../store/store.js'





/**
 * Renders the creepy hands in the doorframe that become more visible as time runs out.
 *
 * @component
 */
export function CreepyHandsBackground() {
	const {
		timeAvailable,
		timeRemaining,
		viewport,
		lastTick,
	} = useStore(store)

	const spriteProps = useMemo(() => {
		const texture = Assets.get('background::creepy-hands')

		let width = viewport.width * 0.6

		const scale = width / texture.orig.width
		let height = texture.orig.height * scale

		const oscillationX = Math.sin(Math.PI * 2 * lastTick / 5000) * 2
		const oscillationY = Math.sin(Math.PI * 2 * lastTick / 4000) * 5
		const rotation = Math.sin(Math.PI * 2 * lastTick / 8000) * Math.PI / 64

		const oscillationScale = Math.sin(Math.PI * 2 * lastTick / 12000) * 0.05 + 1
		width *= oscillationScale
		height *= oscillationScale

		return {
			anchor: ANCHORS.BOTTOM_CENTER,
			width,
			height,
			texture,
			x: viewport.width / 2 + oscillationX,
			y: viewport.height + (viewport.height * (timeRemaining / timeAvailable)) + oscillationY,
			rotation,
		}
	}, [
		timeAvailable,
		timeRemaining,
		viewport,
		lastTick,
	])

	return (
		<Container>
			<Sprite {...spriteProps} />
		</Container>
	)
}
