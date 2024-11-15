import React, { useEffect } from 'react'
import Editor from './Editor.js'

export default props => {

    useEffect(() => {
        props.menu.dispatch(
            props.menu.actions.remove(['move', 'remove'])
        )
    }, [])

    return <Editor tag="p" class="intro" value={props?.text}
        onChange={value => props.onChange('text', value)}
        onEnter={props.onEnter} title="Перший абзац" />
}