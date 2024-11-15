import React, { useEffect, useRef } from 'react'
import { Button } from 'react-bootstrap'
import Field from '../../../components/Editor/Field.js'

export default props => {

    const ref = useRef()

    // For demo version only!!!
    const handleChangeImage = () => {
        const result = prompt(
            'Вставте посилання на зображення',
            props.image?.url
        )
        props.onChange('image.url', result)
    }

    useEffect(() => ref.current.focus(), [ref.current])

    return <div className="block block-type-main">
            <div className={'main' + (props.image?.url ? ' image' : '')}
            style={{ backgroundImage: props.image?.url
                ? `url(${props.image.url})` : ''}}>
            <div className="layout">
                <div className="head"></div>
                <div className="body">
                    <h1 contentEditable="true" suppressContentEditableWarning="true"
                        onBlur={
                            event => props.onChange('title', event.target.textContent)
                        }
                        onPaste={props.onPaste} ref={ref} className="editable">
                        {props.title}
                    </h1>
                </div>
                <div className="foot"></div>
            </div>
            <div className="bottom">
                <Field name="image.source" value={props.image?.source}
                    title="Джерело зображення" className="source flex-grow-1 text-start w-25"
                    onChange={(name, value) => props.onChange(name, value)} />
                <div className="buttons flex-grow-0">
                    {props.image?.url
                        ? <Button variant="danger" onClick={() => props.onChange('image.url')}
                            title="Видалити зображення">Видалити зображення</Button>
                        : <Button variant="success" onClick={handleChangeImage}
                            title="Вставити зображення">Вставити зображення</Button>
                    }
                </div>
                <Field name="image.description" value={props.image?.description}
                    title="Опис зображення" className="description flex-grow-1 text-end w-25"
                    onChange={(name, value) => props.onChange(name, value)} />
            </div>
        </div>
    </div>
}