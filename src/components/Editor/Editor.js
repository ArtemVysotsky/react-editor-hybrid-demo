import React, { useState, useEffect } from 'react'
import { Editor } from '@tinymce/tinymce-react'
import PropTypes from 'prop-types'
import config from '../../config.js'

const initTemplate = {
    menubar: false, width: '100%', height: '600px', resize: true, ui_mode: 'split',
    plugins: ['charmap', 'code', 'codesample', 'link', 'nonbreaking', 'visualchars'],
    toolbar: 'bold italic underline strikethrough | ndash subscript superscript' +
        '| link | nonbreaking charmap | visualchars code | undo redo',
    bold: { inline: 'span', 'classes': 'bold' },
    italic: { inline: 'span', 'classes': 'italic' },
    underline: { inline: 'span', 'classes': 'underline', exact: true },
    strikethrough: { inline: 'del' },
    valid_elements: 'a[href|title|rel],strong,em,s,sup,sub,span[style]',
    link_target_list: false,
    relative_urls: false,
    paste_as_text: true,
    contextmenu: false,
    formats: {
        alignleft: { selector: 'table,tr,td,th', classes: 'left' },
        aligncenter: { selector: 'table,tr,td,th', classes: 'center' },
        alignright: { selector: 'table,tr,td,th', classes: 'right' },
        alignjustify: { selector: 'table,tr,td,th', classes: 'justify' }
    },
    link_rel_list: [
        { title: 'No Follow', value: 'nofollow' },
        { title: 'No Referrer', value: 'noreferrer' },
        { title: 'External Link', value: 'external' },
        { title: 'Empty' }
    ],
    license_key: 'gpl'
}

const EditorComponent = ({
    class: className, onChange, setEditor, value, tag, title, plugins,
    reset, toolbar, valid, newline, multiline, onEnter, callback
}) => {

    const [init, setInit] = useState(false)
    const [callbacks] = useState([
        editor => {
            editor.on('init', () => {
                const original = editor.windowManager.open
                editor.windowManager.open = (dialog, params) => {
                    if (dialog.title === 'Insert/Edit Link') {
                        if (!dialog.initialData.anchor) {
                            dialog.initialData.rel = 'nofollow'
                        }
                        dialog.body.items.splice(1, 1)
                    }
                    return original.apply(this, [dialog, params])
                }
                if (setEditor) setEditor(editor)
                editor.dom.addClass(editor.dom.getRoot(), 'editable')
                if (className) {
                    className.split(' ').forEach(className => 
                        editor.dom.addClass(editor.dom.getRoot(), className)
                    )
                }
                if ((className !== 'intro') && !value) {
                    editor.dom.getRoot().focus()
                }
                if (title) {
                    editor.dom.getRoot().setAttribute('title', title)
                }
            })
            editor.ui.registry.addButton('ndash', {
                text: '—', tooltip: 'Dash', onAction: () => {
                    editor.insertContent('&ndash;');
                }
            });
        }
    ])

    const handleChange = (newValue, editor) => {
        onChange(newValue, editor)
    }

    useEffect(() => {
        const initNew = structuredClone(initTemplate)
        const callbacksNew = [...callbacks]
        if (plugins) {
            if (reset) {
                initNew.plugins = plugins
            } else {
                Array.isArray(plugins)
                    ? initNew.plugins.push(...plugins)
                    : initNew.plugins.push(plugins)
            }
        }
        if (toolbar) {
            if (reset) {
                initNew.toolbar = toolbar
            } else {
                initNew.toolbar += ' | ' + toolbar
            }
        }
        if (valid) {
            initNew.valid_elements += ',' + (Array.isArray(valid)
                ? valid.join() : valid)
        }
        if (newline) {
            initNew.newline_behavior = newline
        }
        if (!multiline) {
            callbacksNew.push(editor => {
                editor.on('keydown', event => {
                    if (onEnter) {
                        onEnter(event)
                    }
                })
            })
        }
        if (callback) {
            callbacksNew.push(callback)
        }
        initNew.setup = editor => {
            callbacksNew.forEach(callback => callback(editor))
        }
        setInit(initNew)
    }, [])

    return init && <Editor tagName={tag ?? 'div'}
        value={(typeof value !== 'undefined') ? value.toString() : ''}
        init={init} inline={true} onEditorChange={handleChange}
        tinymceScriptSrc={config.tinymce} key={tag} autoFocus />
}

EditorComponent.propTypes = {
    class: PropTypes.string,
    onChange: PropTypes.func.isRequired,
    setEditor: PropTypes.func,
    value: PropTypes.string,
    tag: PropTypes.string,
    title: PropTypes.string,
    plugins: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.arrayOf(PropTypes.string)
    ]),
    reset: PropTypes.bool,
    toolbar: PropTypes.string,
    valid: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.arrayOf(PropTypes.string)
    ]),
    newline: PropTypes.string,
    multiline: PropTypes.bool,
    onEnter: PropTypes.func,
    callback: PropTypes.func
};

export default EditorComponent