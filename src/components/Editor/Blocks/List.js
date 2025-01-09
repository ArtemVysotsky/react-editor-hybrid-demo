import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import Editor from '../Editor.js'

const List = ({ menu, size, order, text, onChange }) => {

    const [editor, setEditor] = useState()

    useEffect(() => {
        menu.dispatch(
            menu.actions.insert(
                'resize', menu.resize
            )
        )
        if (!size) onChange('size', 'medium')
    }, [])

    useEffect(() => {
        menu.dispatch(
            menu.actions.insert(
                'order', {
                    value: false, label: 'Сортування', variant: 'secondary',
                    event: value => onChange('order', value),
                    submenu: {
                        numered: { label: 'Нумероване', value: true },
                        arbitrary: { label: 'Довільне', value: false }
                    }
                }
            )
        )
        if (!order) onChange('order', false)
    }, [])

    useEffect(() => {
        if (!editor) return
        const body = editor.getBody()
        if (!body) return
        body.dataset.size = size
    }, [editor, size])

    useEffect(() => {
        if (!order) return
        menu.dispatch(
            menu.actions.update('order', {
                value: order
            })
        )
    }, [order])

    return (
        <Editor
            tag={order ? 'ol' : 'ul'}
            value={text}
            plugins="lists"
            valid="li"
            multiline={true}
            size={size}
            setEditor={setEditor}
            onChange={value => onChange('text', value)}
        />
    )
}

List.propTypes = {
    menu: PropTypes.shape({
        dispatch: PropTypes.func.isRequired,
        actions: PropTypes.shape({
            insert: PropTypes.func.isRequired,
            update: PropTypes.func.isRequired
        }).isRequired,
        resize: PropTypes.object
    }).isRequired,
    size: PropTypes.string,
    order: PropTypes.bool,
    text: PropTypes.string,
    onChange: PropTypes.func.isRequired
}

List.displayName = 'List'

export default List