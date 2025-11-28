import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { Button } from 'react-bootstrap';
import Field from '../../../components/Editor/Field.js';

const Main = ({ image, title, onChange, onPaste }) => {

    const ref = useRef();

    // For demo version only!!!
    const handleChangeImage = () => {
        const result = prompt(
            'Вставте посилання на зображення',
            image?.url
        );
        onChange('image.url', result);
    };

    useEffect(() => ref.current.focus(), [ref.current]);

    return <div className="block block-type-main">
            <div className={'main' + (image?.url ? ' image' : '')}
            style={{ backgroundImage: image?.url
                ? `url(${image.url})` : ''}}>
            <div className="layout">
                <div className="head"></div>
                <div className="body">
                    <h1 contentEditable="true" suppressContentEditableWarning="true"
                        onBlur={
                            event => onChange('title', event.target.textContent)
                        }
                        onPaste={onPaste} ref={ref} className="editable">
                        {title}
                    </h1>
                </div>
                <div className="foot"></div>
            </div>
            <div className="bottom">
                <Field name="image.source" value={image?.source}
                    title="Джерело зображення" className="source flex-grow-1 text-start w-25"
                    onChange={(name, value) => onChange(name, value)} />
                <div className="buttons flex-grow-0">
                    {image?.url
                        ? <Button variant="danger" onClick={() => onChange('image.url')}
                            title="Видалити зображення">Видалити зображення</Button>
                        : <Button variant="success" onClick={handleChangeImage}
                            title="Вставити зображення">Вставити зображення</Button>
                    }
                </div>
                <Field name="image.description" value={image?.description}
                    title="Опис зображення" className="description flex-grow-1 text-end w-25"
                    onChange={(name, value) => onChange(name, value)} />
            </div>
        </div>
    </div>;
};

Main.propTypes = {
    image: PropTypes.shape({
        url: PropTypes.string,
        source: PropTypes.string,
        description: PropTypes.string
    }),
    title: PropTypes.string,
    onChange: PropTypes.func.isRequired,
    onPaste: PropTypes.func
};

export default Main;
