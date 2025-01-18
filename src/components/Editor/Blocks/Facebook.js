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
            onChange={handleChange} autoFocus placeholder={
                '<iframe src="https://www.facebook.com/plugins/video.php?height=314'
                + '&href=https%3A%2F%2Fwww.facebook.com%2FBostonDynamicsOfficial%2F'
                + 'videos%2F1119847332589252%2F&show_text=false&width=560&t=0"'
                + 'width="560" height="314" allowFullScreen="true" scrolling="no" frameborder="0"'
                + 'allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"'
                + 'style="border:none;overflow:hidden"></iframe>'
            } />
}

Facebook.displayName = 'Facebook'

Facebook.propTypes = {
    url: PropTypes.string,
    width: PropTypes.number,
    height: PropTypes.number,
    onChange: PropTypes.func.isRequired
}

export default Facebook
