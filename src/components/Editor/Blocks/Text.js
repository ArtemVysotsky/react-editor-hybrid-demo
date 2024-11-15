import React from 'react'
import Editor from '../Editor.js'

export default props => {

    return <Editor value={props?.text} class="text" /*valid="p" multiline*/
        onChange={value => props.onChange('text', value)}
        onEnter={event => 
            (event.key === 'Enter') && event.preventDefault()
        } />
}