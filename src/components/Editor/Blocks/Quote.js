import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import Field from '../Field.js'

const Quote = ({
    name, text, work, size, link, menu, onChange, onPaste
}) => {

    useEffect(() => {
        menu.dispatch(
            menu.actions.insert(
                'resize', menu.resize
            )
        )
        if (!size) {
            onChange('size', 'large')
        }
    }, [])

    return <blockquote data-size={size} onPaste={onPaste}>
        <Field as="p" name="text" value={text} autoFocus
            title="Текст цитати" onChange={onChange} />
        <footer>
            <Field as="span" name="name" value={name}
                title="Автор цитати (не обов'язково)" onChange={onChange} />
            <Field as="span" name="work" value={work}
                title="Назва публікації (не обов'язково)" onChange={onChange} />
        </footer>
        <Field as="div" name="link" value={link}
            title="Адреса публікації (не обов'язково)" onChange={onChange} />
    </blockquote>
}

Quote.displayName = 'Quote';

Quote.propTypes = {
    menu: PropTypes.shape({
        dispatch: PropTypes.func.isRequired,
        actions: PropTypes.shape({
            insert: PropTypes.func.isRequired
        }).isRequired,
        resize: PropTypes.object
    }).isRequired,
    size: PropTypes.string,
    text: PropTypes.string,
    name: PropTypes.string,
    work: PropTypes.string,
    link: PropTypes.string,
    onChange: PropTypes.func.isRequired,
    onPaste: PropTypes.func
}

export default Quote