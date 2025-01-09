import React, { useEffect, useRef } from 'react'
import PropTypes from 'prop-types'

const Field = ({ 
    as = 'div', name, value, className, onChange, autoFocus, ...rest
}) => {

    const ref = useRef(null)

    const handleChange = event => {
        onChange(name, event.target.textContent.length ? event.target.textContent : undefined)
    }

    useEffect(() => {
        if (autoFocus && !value) {
            ref.current.focus()
        }
    }, [ref.current])

    return React.createElement(
        as, {
            contentEditable: "true",
            suppressContentEditableWarning: "true",
            className: 'editable ' + (className ?? name),
            onBlur: handleChange,
            onKeyDown: event => {
                if (event.key === 'Enter') event.preventDefault()
            },
            ref,
            ...rest
        }, value
    )
}    

Field.propTypes = {
    as: PropTypes.string,
    name: PropTypes.string.isRequired,
    value: PropTypes.string,
    className: PropTypes.string,
    onChange: PropTypes.func.isRequired,
    autoFocus: PropTypes.bool
}

Field.displayName = 'Field'

export default Field
