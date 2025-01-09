import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import Editor from '../Editor.js'

const tableTemplate = `<table>
    <tbody>
        <tr><td>11</td><td>12</td><td>13</td></tr>
        <tr><td>21</td><td>22</td><td>23</td></tr>
        <tr><td>31</td><td>32</td><td>33</td></tr>
    </tbody>
</table>`

const Table = ({ text, size, menu, onChange }) => {

    const [editor, setEditor] = useState()

    useEffect(() => {
        menu.dispatch(
            menu.actions.insert(
                'resize', menu.resize
            )
        )
        if (!size) {
            onChange('size', 'full')
        }
    }, [])

    useEffect(() => {
        if (!editor) return
        const content = editor.getContent()
        if (!content) return
        const container = document.createElement('div');
        container.innerHTML = content;
        container.firstElementChild.dataset.size = size
        editor.setContent(container.innerHTML)
   }, [editor, size])

    return <Editor tag="div" value={text ?? tableTemplate}
        valid={['table', 'thead', 'tbody', 'tfoot', 'tr', 'th[class]', 'td[class]', 'br']}
        toolbar="table align" plugins="table" setEditor={setEditor} multiline={true}
        onChange={
            value => onChange('text', value.replace(/\n+/g, ''))
        } />
}

Table.displayName = 'Table'

Table.propTypes = {
    menu: PropTypes.shape({
        dispatch: PropTypes.func.isRequired,
        actions: PropTypes.shape({
            insert: PropTypes.func.isRequired
        }).isRequired,
        resize: PropTypes.object
    }).isRequired,
    size: PropTypes.string,
    text: PropTypes.string,
    onChange: PropTypes.func.isRequired
}

export default Table