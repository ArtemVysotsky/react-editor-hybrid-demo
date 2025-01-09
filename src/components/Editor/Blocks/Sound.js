import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { Form } from 'react-bootstrap'

const Sound = ({ url, width, height, size, menu, onChange }) => {

    const handleChange = async event => {
        const matches = event.target.value.match(
            /width="([^"]+)".*height="([^"]+)".*src="([^"]+)"/
        )
        if (!matches) {
            return alert(
                'Невідомий формат HTML-коду вкладення'
            )
        }
        const data = {
            url: matches[3],
            width: parseInt(matches[1]),
            height: parseInt(matches[2])
        }
        onChange(data)
    }

    useEffect(() => {
        menu.dispatch(
            menu.actions.insert(
                'resize', menu.resize
            )
        )
        if (!size) {
            onChange('size', 'small')
        }
    }, [])

    return url 
        ? <iframe src={url} className="sound" data-size={size}
            width={width + '%'} height={height} allowFullScreen={true}
            allow="autoplay;clipboard-write;encrypted-media;picture-in-picture;web-share">
        </iframe>
        : <Form.Control as="textarea" title="HTML-код вкладення"
            onChange={handleChange} autoFocus placeholder={
                '<iframe src="https://w.soundcloud.com/player/?url='
                + 'https%3A//api.soundcloud.com/playlists/281510610'
                + '&color=%23ff5500&auto_play=false&hide_related=false'
                + '&show_comments=true&show_user=true&show_reposts=false'
                + '&show_teaser=true&visual=true" width="100%" height="300"'
                + ' scrolling="no" frameborder="no" allow="autoplay" >'
                + '</iframe>'
            }
        />
}

Sound.displayName = 'Sound'

Sound.propTypes = {
    url: PropTypes.string,
    width: PropTypes.number,
    height: PropTypes.number,
    size: PropTypes.string,
    menu: PropTypes.shape({
        dispatch: PropTypes.func.isRequired,
        actions: PropTypes.shape({
            insert: PropTypes.func.isRequired
        }).isRequired,
        resize: PropTypes.object
    }).isRequired,
    onChange: PropTypes.func.isRequired
};

export default Sound