import React, { useState, useEffect } from 'react'
import Editor from '../Editor.js'

export default props => {

    const [editor, setEditor] = useState()

    useEffect(() => {
        props.menu.dispatch(
            props.menu.actions.insert(
                'resize', props.menu.resize
            )
        )
        if (!props?.size) props.onChange('size', 'medium')
    }, [])

    useEffect(() => {
        props.menu.dispatch(
            props.menu.actions.insert(
                'order', {
                    value: false, label: 'Сортування', variant: 'secondary',
                    event: value => props.onChange('order', value),
                    submenu: {
                        numered: { label: 'Нумероване', value: true },
                        arbitrary: { label: 'Довільне', value: false }
                    }
                }
            )
        )
        if (!props?.order) props.onChange('order', false)
    }, [])

    useEffect(() => {
        if (!editor) return
        editor.getBody().dataset.size = props.size
    }, [editor, props.size])

    useEffect(() => {
        if (!('order' in props)) return
        props.menu.dispatch(
            props.menu.actions.update('order', {
                value: props.order
            })
        )
    }, [props.order])

    return <Editor tag={props?.order ? 'ol' : 'ul'} value={props?.text} plugins="lists"
        valid="li" multiline={true} size={props.size} setEditor={setEditor}
        onChange={value => props.onChange('text', value)} />
}