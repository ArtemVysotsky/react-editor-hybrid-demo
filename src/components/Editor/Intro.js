import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import Editor from './Editor.js'

const Intro = ({ menu, text, onChange, onEnter }) => {

    useEffect(() => {
        menu.dispatch(
            menu.actions.remove(['move', 'remove'])
        )
    }, [menu.dispatch, menu.actions])

    return <Editor tag="p" class="intro" value={text}
        onChange={value => onChange('text', value)}
        onEnter={onEnter} title="Перший абзац" />
}

Intro.propTypes = {
    menu: PropTypes.shape({
        dispatch: PropTypes.func.isRequired,
        actions: PropTypes.shape({
            remove: PropTypes.func.isRequired
        }).isRequired
    }).isRequired,
    text: PropTypes.string,
    onChange: PropTypes.func.isRequired,
    onEnter: PropTypes.func
}

export default Intro;