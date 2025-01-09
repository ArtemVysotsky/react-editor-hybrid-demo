import React, { useEffect, useRef } from 'react'
import PropTypes from 'prop-types'

const Raw = ({ text, onChange, onPaste }) => {

    const ref = useRef()

    useEffect(() => {
        if (!text) ref.current.focus()
    }, [])

    return <pre contentEditable="true" suppressContentEditableWarning="true"
        onBlur={event => onChange('text', event.target.textContent)}
        onPaste={onPaste} className="editable" ref={ref}>
        {text}
    </pre>
}

Raw.displayName = 'Raw'

Raw.propTypes = {
    text: PropTypes.string,
    onChange: PropTypes.func.isRequired,
    onPaste: PropTypes.func
}

export default Raw