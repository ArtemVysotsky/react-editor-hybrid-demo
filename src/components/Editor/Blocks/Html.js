import React from 'react'
import PropTypes from 'prop-types'
import Editor from '../Editor.js'

const Html = ({ code, onChange }) => {
    return (
        <Editor
            tag="article"
            value={code}
            className="html"
            valid="*[*]"
            multiline
            onChange={value => onChange('code', value)}
        />
    )
}

Html.displayName = 'Html'

Html.propTypes = {
    code: PropTypes.string,
    onChange: PropTypes.func.isRequired
}

export default Html