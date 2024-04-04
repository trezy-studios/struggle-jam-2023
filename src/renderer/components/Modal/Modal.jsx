// Module imports
import classnames from 'classnames'// Module imports
import { motion } from 'framer-motion'
import PropTypes from 'prop-types'





// Local imports
import styles from './Modal.module.scss'
import { useMemo } from 'react'





// Constants
const VARIANTS = {
	animate: { opacity: 1 },
	exit: { opacity: 0 },
	initial: { opacity: 0 },
}





/**
 * Renders the score screen for a round.
 *
 * @component
 */
export function Modal({
	children = null,
	className = '',
}) {
	const compiledClassName = useMemo(() => classnames(styles['modal'], className), [className])

	return (
		<motion.div
			animate={'animate'}
			className={styles['modal-backdrop']}
			exit={'exit'}
			initial={'initial'}
			variants={VARIANTS}>
			<div className={styles['modal-wrapper']}>
				<div className={compiledClassName}>
					<div className={styles['top-frame']}>
						<div className={styles['center-decoration']} />
					</div>

					{children}

					<div className={styles['bottom-frame']}>
						<div className={styles['center-decoration']} />
					</div>
				</div>
			</div>
		</motion.div>
	)
}

Modal.propTypes = {
	children: PropTypes.node,
	className: PropTypes.string,
}
