import React, { useEffect, useRef } from 'react'
import PropTypes from 'prop-types'

const Header = ({ text, onChange, onEnter, onPaste }) => {
    const ref = useRef()

    useEffect(() => {
        if (!text) ref.current.focus()
    }, [])

    return (
        <h2
            contentEditable="true"
            suppressContentEditableWarning="true"
            onBlur={event => onChange('text', event.target.textContent)}
            onKeyDown={onEnter}
            onPaste={onPaste}
            className="editable"
            ref={ref}
        >
            {text}
        </h2>
    )
}

Header.propTypes = {
    text: PropTypes.string,
    onChange: PropTypes.func.isRequired,
    onEnter: PropTypes.func.isRequired,
    onPaste: PropTypes.func.isRequired
}

Header.displayName = 'Header'

export default Header
