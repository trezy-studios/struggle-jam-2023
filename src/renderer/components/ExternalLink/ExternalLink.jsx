/* eslint-disable jsx-a11y/mouse-events-have-key-events */
// Module imports
import PropTypes from 'prop-types'
import { useCallback } from 'react'





/**
 * Renders a link to an external website.
 *
 * @component
 */
export function ExternalLink({
	children,
	className = '',
	href,
	onMouseOut = null,
	onMouseOver = null,
	rel = '',
}) {
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

	return (
		// eslint-disable-next-line react/forbid-elements
		<a
			className={className}
			href={href}
			onMouseOut={handleMouseOut}
			onMouseOver={handleMouseOver}
			rel={`noopener noreferrer ${rel}`}
			target={'_blank'}>
			{children}
		</a>
	)
}

ExternalLink.propTypes = {
	children: PropTypes.node.isRequired,
	className: PropTypes.string,
	href: PropTypes.string.isRequired,
	onMouseOut: PropTypes.func,
	onMouseOver: PropTypes.func,
	rel: PropTypes.string,
}
