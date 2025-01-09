import React from 'react'
import PropTypes from 'prop-types'
import { Form } from 'react-bootstrap'

const Facebook = ({ url, width, height, onChange }) => {

    const handleChange = async event => {
        const matches = event.target.value.match(
            /src="([^"]+)".*width="([^"]+)".*height="([^"]+)"/
        )
        if (!matches) {
            return alert(
                'Невідомий формат HTML-коду вкладення'
            )
        }
        const data = {
            url: matches[1],
            width: parseInt(matches[2]),
            height: parseInt(matches[3])
        }
        onChange(data)
    }

    return url 
        ? <iframe src={url} className="facebook"
            width={width} height={height} allowFullScreen={true}
            allow="autoplay;clipboard-write;encrypted-media;picture-in-picture;web-share">
        </iframe>
        : <Form.Control as="textarea" title="HTML-код вкладення"
            onChange={handleChange} autoFocus />
}

Facebook.displayName = 'Facebook'

Facebook.propTypes = {
    url: PropTypes.string,
    width: PropTypes.number,
    height: PropTypes.number,
    onChange: PropTypes.func.isRequired
}

export default Facebook
