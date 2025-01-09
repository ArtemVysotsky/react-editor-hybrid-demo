import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { Form } from 'react-bootstrap'

const Video = ({ url, ratio, size, menu, onChange }) => {

    const handleChange = async event => {
        const matches = event.target.value.match(
            /width="([^"]+)".*height="([^"]+)".*src="([^"]+)"/
        )
        if (!matches) {
            return alert(
                'Невідомий формат HTML-коду вкладення'
            )
        }
        const ratio = Math.round(
            (parseInt(matches[1]) / parseInt(matches[2])) * 100
        ) / 100
        const data = { url: matches[3], ratio: ratio }
        onChange(data)
    }

    useEffect(() => {
        menu.dispatch(
            menu.actions.insert(
                'resize', menu.resize
            )
        )
        if (!size) onChange('size', 'small')
    }, [])

    return url 
        ? <iframe src={url} data-size={size} data-ratio={ratio}
            allow="accelerometer;autoplay;clipboard-write;encrypted-media;gyroscope;picture-in-picture"
            allowFullScreen title="YouTube video player" className="video">
        </iframe>
        : <Form.Control as="textarea" title="HTML-код вкладення"
            onChange={handleChange} placeholder={
                '<iframe width="560" height="315"'
                + ' src="https://www.youtube.com/embed/k7dy1B6bOeM?si=cpvSkAV6EJYu40dh'
                + ' title="YouTube video player" frameborder="0" allowfullscreen'
                + ' allow="accelerometer;autoplay;clipboard-write;encrypted-media;'
                + ' gyroscope;picture-in-picture;web-share"></iframe>'
            } autoFocus
        />
}

Video.displayName = 'Video'

Video.propTypes = {
    url: PropTypes.string,
    ratio: PropTypes.number,
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

export default Video