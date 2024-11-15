import React, { useEffect } from 'react'
import { Form } from 'react-bootstrap'

export default props => {

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
        props.onChange(data)
    }

    useEffect(() => {
        props.menu.dispatch(
            props.menu.actions.insert(
                'resize', props.menu.resize
            )
        )
        if (!props?.size) {
            props.onChange('size', 'small')
        }
    }, [])

    return props?.url 
        ? <iframe src={props.url} className="sound" data-size={props.size}
            width={props?.width + '%'} height={props?.height} allowFullScreen={true}
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