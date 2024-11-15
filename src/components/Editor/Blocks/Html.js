import React from 'react'
import Editor from '../Editor.js'

export default props => {

    return <Editor tag="article" value={props?.code} class="html" valid="*[*]" multiline
        onChange={value => props.onChange('code', value)} />
}