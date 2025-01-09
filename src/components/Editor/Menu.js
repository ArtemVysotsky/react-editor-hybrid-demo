import React from 'react'
import PropTypes from 'prop-types'
import { Button, ButtonGroup } from 'react-bootstrap'
import Dropdown from './Menu/Dropdown.js'

const Menu = ({ id, items }) => {

    return <div className="menu position-absolute top-0 end-0">
        <ButtonGroup>{
            Object.entries(items).map(([name, item]) => {
                const variant = 'outline-' + (item.variant ?? 'secondary')
                return item?.submenu
                    ?   <Dropdown id={id} {...item}
                            variant={item.variant ? variant : ''} key={name} />
                    :   <Button onClick={() => item.event(name, id)}
                            variant={variant} key={name}>
                            {item.label}
                        </Button>
            })
        }</ButtonGroup>
    </div>
}

Menu.propTypes = {
    id: PropTypes.number,
    items: PropTypes.objectOf(PropTypes.shape({
        variant: PropTypes.string,
        label: PropTypes.string.isRequired,
        event: PropTypes.func.isRequired,
        submenu: PropTypes.object
    })).isRequired
}

export default Menu   