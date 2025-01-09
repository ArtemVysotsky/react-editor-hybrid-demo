import React, { useState, useEffect, useRef } from 'react'
import hljs from 'highlight.js'
import PropTypes from 'prop-types'
import config from '../../../config.js'
import 'highlight.js/styles/androidstudio.css'

const Code = ({ 
    menu, language, text, size, onPaste, onChange 
}) => {
    const ref = useRef()
    const [textNew, setTextNew] = useState()
    const [editable, setEditable] = useState(false)

    const handleChangeText = event => {
        onChange('text', event.target.textContent)
        setEditable(false)
    }

    useEffect( () => {
        if (!text) setEditable(true)
        if (!language) {
            onChange('language', 'auto')
        }
    }, [])

    useEffect(() => {
        const languages = {
            value: 'auto', label: 'Мови', variant: 'secondary',
            submenu: {
                auto: { label: 'Auto' }
            },
            event: value => onChange('language', value)
        }
        Object.entries(config.highlight.languages.list)
        .slice(0, config.highlight.languages.limit)
        .forEach(([key, label]) =>
            languages.submenu[key] = { label }
        )
        languages.submenu.other = {
            label: 'Інші', divider: true, submenu: {}
        }
        Object.entries(config.highlight.languages.list)
        .slice(config.highlight.languages.limit)
        .forEach(([key, label]) =>
            languages.submenu.other.submenu[key] = { label }
        )
        menu.dispatch(
            menu.actions.insert(
                'languages', languages
            )
        )
    }, [])

    useEffect( () => {
        if (typeof text === 'undefined' ) return
        if (text.length) {
            const textHighlighted = language === 'auto'
                ? hljs.highlightAuto(text).value
                : hljs.highlight(text, {
                    language: language
                }).value
            setTextNew(textHighlighted)
        } else {
            setTextNew('')
        }
    }, [text, language])

    useEffect(() => {
        menu.dispatch(
            menu.actions.update(
                'languages', { value: language }
            )
        )
    }, [language])

    useEffect(() => {
        if (!('text' in { text }) && editable) ref.current.focus()
    }, [ref.current])

    return editable
        ? <pre contentEditable="true" suppressContentEditableWarning="true"
            className="code editable" onBlur={handleChangeText} onPaste={onPaste}
            dangerouslySetInnerHTML={{ __html: text }} key="1" ref={ref} />
        : <pre className="code" data-size={size}
            onClick={() => setEditable(true)} key="2">
            <code className="hljs" dangerouslySetInnerHTML={{ __html: textNew }} />
        </pre>
}

Code.propTypes = {
    size: PropTypes.string,
    text: PropTypes.string,
    language: PropTypes.string,
    onChange: PropTypes.func.isRequired,
    onPaste: PropTypes.func,
    menu: PropTypes.shape({
        dispatch: PropTypes.func.isRequired,
        actions: PropTypes.shape({
            insert: PropTypes.func.isRequired,
            update: PropTypes.func.isRequired
        }).isRequired
    }).isRequired
}
Code.displayName = 'Code'

export default Code