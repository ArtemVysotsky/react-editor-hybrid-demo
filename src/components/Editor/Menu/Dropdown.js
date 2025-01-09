import React, { useState } from 'react'
import { Dropdown, ButtonGroup } from 'react-bootstrap'
import PropTypes from 'prop-types'

const DropdownWrapper = ({
    variant, label, submenu, event, value, id
}) => {

    const [show, setShow] = useState(false)

    return (
        <Dropdown as={ButtonGroup} show={show} drop="down"
            onMouseEnter={() => setShow(true)} onMouseLeave={() => setShow(false)}>
            <Dropdown.Toggle variant={variant ?? 'none'}>
                {label}
            </Dropdown.Toggle>
            <Dropdown.Menu align="start" renderOnMount={true} style={{ minWidth: 'auto' }}>
                {Object.entries(submenu).map(([name, item]) => {
                    const result = [], itemValue = item.value ?? name;
                    if (item?.divider) {
                        result.push(<Dropdown.Divider key={name + 'Divider'} />)
                    }
                    result.push(
                        <Dropdown.Item as="div"
                            onClick={
                                !item?.submenu
                                    ? () => item?.event
                                        ? item.event()
                                        : event(itemValue, id)
                                    : null
                            } className={
                                (value !== undefined) && (value === itemValue) ? 'active' : ''
                            } key={name}>
                                {item?.submenu
                                    ? <DropdownWrapper {...item} value={value}
                                        id={id} event={item.event ?? event} />
                                    : item.label}
                        </Dropdown.Item>
                    )
                    return result
                })}
            </Dropdown.Menu>
        </Dropdown>
    )
}

DropdownWrapper.propTypes = {
    variant: PropTypes.string,
    label: PropTypes.string.isRequired,
    submenu: PropTypes.object.isRequired,
    event: PropTypes.func,
    value: PropTypes.any,
    id: PropTypes.number
}

export { DropdownWrapper as default }