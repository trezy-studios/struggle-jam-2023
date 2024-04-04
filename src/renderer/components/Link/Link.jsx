// Module imports
import classnames from 'classnames'
import PropTypes from 'prop-types'





// Local imports
import styles from './Link.module.scss'

import {
	useCallback,
	useMemo,
} from 'react'
import { ExternalLink } from '../ExternalLink/ExternalLink.jsx'





/**
 * Renders a link.
 *
 * @component
 */
export function Link({
	children,
	className = '',
	href,
	onMouseOut = null,
	onMouseOver = null,
}) {
	const compiledClassName = useMemo(() => classnames(styles['link'], className), [className])

	const handleMouseOut = useCallback(event => {
		if (onMouseOut) {
			onMouseOut(event)
		}
	}, [onMouseOut])

	const handleMouseOver = useCallback(event => {
		if (onMouseOver) {
			onMouseOver(event)
		}
	}, [onMouseOver])

	if ((href.startsWith('/')) || (href.startsWith('#'))) {
		return (
			// eslint-disable-next-line jsx-a11y/mouse-events-have-key-events, react/forbid-elements
			<a
				className={compiledClassName}
				href={href}
				onBlur={handleMouseOut}
				onFocus={handleMouseOver}
				onMouseOut={handleMouseOut}
				onMouseOver={handleMouseOver}>
				{children}
			</a>
		)
	}

	return (
		<ExternalLink
			className={compiledClassName}
			href={href}
			onMouseOut={handleMouseOut}
			onMouseOver={handleMouseOver}>
			{children}
		</ExternalLink>
	)
}

Link.propTypes = {
	children: PropTypes.node.isRequired,
	className: PropTypes.string,
	href: PropTypes.string.isRequired,
	onMouseOut: PropTypes.func,
	onMouseOver: PropTypes.func,
}
