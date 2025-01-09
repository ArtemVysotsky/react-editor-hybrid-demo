import React from 'react'
import PropTypes from 'prop-types'
import Editor from '../Editor.js'

const Text = ({ text, onChange }) => {
    return <Editor value={text} class="text" /*valid="p" multiline*/
        onChange={value => onChange('text', value)}
        onEnter={event => 
            (event.key === 'Enter') && event.preventDefault()
        } />
}

Text.displayName = 'Text'

Text.propTypes = {
    text: PropTypes.string,
    onChange: PropTypes.func.isRequired
}

export default Text