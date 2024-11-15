import React, { useState } from 'react'
import { Dropdown, ButtonGroup } from 'react-bootstrap'

const DropdownWrapper = props => {

    const [show, setShow] = useState(false)

    return <Dropdown as={ButtonGroup} show={show} drop="down"
        onMouseEnter={() => setShow(true)} onMouseLeave={() => setShow(false)}>
        <Dropdown.Toggle variant={props.variant ?? 'none'}>
            {props.label}
        </Dropdown.Toggle>
        <Dropdown.Menu align="start" renderOnMount={true} style={{ minWidth: 'auto' }}>
            {Object.entries(props.submenu).map(([name, item]) => {
                const result = [], value = item.value ?? name;
                if (item?.divider) {
                    result.push(<Dropdown.Divider key={name + 'Divider'} />)
                }
                result.push(
                    <Dropdown.Item as="div"
                        onClick={
                            !item?.submenu
                                ? () => item?.event
                                    ? item.event()
                                    : props.event(value, props.id)
                                : null
                        } className={
                            ('value' in props) && (props.value === value) ? 'active' : ''
                        } key={name}>
                            {item?.submenu
                                ? <DropdownWrapper {...item}  value={props?.value}
                                    id={props.id} event={item.event ?? props.event} />
                                : item.label}
                    </Dropdown.Item>
                )
                return result
            })}
        </Dropdown.Menu>
    </Dropdown>
}

export { DropdownWrapper as default }