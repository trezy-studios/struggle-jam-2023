/* eslint-disable no-undefined */

// Module imports
import classnames from 'classnames'
import { motion } from 'framer-motion'
import PropTypes from 'prop-types'
import { useMemo } from 'react'





// Local imports
import styles from './Button.module.scss'





/**
 * Renders a button.
 *
 * @component
 */
export function Button({
	animate = undefined,
	children,
	className = '',
	exit = undefined,
	initial = undefined,
	isDisabled = false,
	onClick = undefined,
	onMouseDown = undefined,
	onMouseOut = undefined,
	onMouseOver = undefined,
	onMouseUp = undefined,
	transition = undefined,
	variants = undefined,
}) {
	const compiledClassName = useMemo(() => {
		return classnames({
			[styles['button']]: true,
			[styles['is-disabled']]: isDisabled,
			[className]: true,
		})
	}, [
		className,
		isDisabled,
	])

	return (
		<motion.button
			animate={animate ?? (variants?.animate && 'animate') ?? (variants?.visible && 'visible')}
			className={compiledClassName}
			disabled={isDisabled}
			exit={exit ?? (variants?.exit && 'exit') ?? (variants?.hidden && 'hidden')}
			initial={initial ?? (variants?.initial && 'initial') ?? (variants?.hidden && 'hidden')}
			onClick={onClick}
			onMouseDown={onMouseDown}
			onMouseOut={onMouseOut}
			onMouseOver={onMouseOver}
			onMouseUp={onMouseUp}
			transition={transition}
			variants={variants}>
			{children}
		</motion.button>
	)
}

Button.propTypes = {
	animate: PropTypes.string,
	children: PropTypes.node.isRequired,
	className: PropTypes.string,
	exit: PropTypes.string,
	initial: PropTypes.string,
	isDisabled: PropTypes.bool,
	onClick: PropTypes.func,
	onMouseDown: PropTypes.func,
	onMouseOut: PropTypes.func,
	onMouseOver: PropTypes.func,
	onMouseUp: PropTypes.func,
	transition: PropTypes.object,
	variants: PropTypes.object,
}
