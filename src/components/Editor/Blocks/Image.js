import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { Form, Button, Carousel, Row, Col } from 'react-bootstrap'
import Field from '../Field.js'

const Edit = props => {
    const [urls, setUrls] = useState([''])

    const handleInsert = () => {
        const urlsNew = [...urls]
        urlsNew.push('')
        setUrls(urlsNew)
    }

    const handleChange = (event, index) => {
        const urlsNew = [...urls]
        urlsNew[index] = event.target.value
        setUrls(urlsNew)
    }

    const handleRemove = index => {
        const urlsNew = [...urls]
        urlsNew.splice(index, 1)
        setUrls(urlsNew)
    }

    const handleSave = () => {
        console.log('handleSave', urls)
        props.onChange('url', urls.length > 1 ? urls : urls[0])
    }

    return <div className="text-center mt-5 mb-4">
        <div className="mx-auto" style={{ maxWidth: '380px' }}>
            {urls.map((url, index) => (
                <Row className="my-3" key={index}>
                    <Col sm={8}>
                        <Form.Control value={url}
                            onChange={event => handleChange(event, index) }
                            title="Вставте посилання на зображення"
                             />
                    </Col>
                    <Col sm={4}>
                        <Button variant="danger"
                            onClick={() => handleRemove(index)}
                            title="Видалити поле"
                            disabled={urls.length === 1}>Видалити</Button>
                    </Col>
                </Row>
            ))}
        </div>
        <div className="mt-4">
            <Button variant="success" onClick={handleInsert}
                title="Додати поле">Додати</Button>
            <Button variant="primary" onClick={handleSave}
                title="Зберегти зображення" className="ms-2">Зберегти</Button>
        </div>
    </div>
}

Edit.displayName = 'Edit'

Edit.propTypes = {
    onChange: PropTypes.func.isRequired
}

const View = props => {
    return <figure onPaste={props.onPaste}>
        <div className="image" data-size={props.size}>
            {Array.isArray(props.url)
                ? (<Carousel slide={false} interval={null}
                    nextLabel="Наступний" prevLabel="Попередній">
                    {props.url.map((image, index) => (
                        <Carousel.Item key={index}>
                            <img src={image} className="d-block w-100"
                            alt={'Зображення №' + (index + 1)} />
                        </Carousel.Item>
                    ))}
                </Carousel>)
                : <img src={props.url} alt={props.title} />
            }
            <div className="copyright">
                <Field name="source" value={props.source}
                    title="Джерело зображення" onChange={props.onChange} />
                <Field name="author" value={props.author}
                    title="Автор зображення" onChange={props.onChange} />
            </div>
        </div>
        <Field as="figcaption" name="title" value={props.title}
            title="Підпис зображення" onChange={props.onChange} />
    </figure>
}

View.displayName = 'View'

View.propTypes = {
    url: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.arrayOf(PropTypes.string)
    ]).isRequired,
    size: PropTypes.string,
    title: PropTypes.string,
    source: PropTypes.string,
    author: PropTypes.string,
    onChange: PropTypes.func.isRequired,
    onPaste: PropTypes.func
}

const Image = props => {
    useEffect(() => {
        if (!props?.url) return
        props.menu.dispatch(
            props.menu.actions.insert('resize', props.menu.resize)
        )
        if (!props?.size) props.onChange('size', 'full')
    }, [props.url])

    return props?.url ? <View {...props} /> : <Edit {...props}/>
}

Image.displayName = 'Image'

Image.propTypes = {
    url: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.arrayOf(PropTypes.string)
    ]),
    size: PropTypes.string,
    menu: PropTypes.shape({
        dispatch: PropTypes.func.isRequired,
        actions: PropTypes.shape({
            insert: PropTypes.func.isRequired
        }).isRequired,
        resize: PropTypes.object
    }).isRequired,
    onChange: PropTypes.func.isRequired
}

export default Image