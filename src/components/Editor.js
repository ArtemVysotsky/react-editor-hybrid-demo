import React, { useMemo } from 'react'
import Reducer, { actions } from '../reducers/Editor/Blocks.js'
import Block from './Editor/Block.js'
import Intro from './Editor/Intro.js'
import config from '../config.js'
import '../assets/styles/components/editor.css'

const components = {}

for (const type of Object.keys(config.blocks.list)) {
    components[type] = (
        await import(/* webpackMode: "eager" */
            './Editor/Blocks/' + type[0].toUpperCase() + type.slice(1) + '.js'
        )
    ).default
}

function Editor(props) {

    const handleInsert = (type, id) => {
        props.blocks.dispatch(
            props.blocks.actions.insert(id, type)
        )
    }

    const handleMove = (direction, id) => {
        props.blocks.dispatch(
            props.blocks.actions.move(id, direction)
        )
    }

    const handleRemove = (value = null, id) => {
        props.blocks.dispatch(
            props.blocks.actions.remove(id)
        )
    }

    const menu = useMemo(() => {
        const menu = {
            insert: {
                event: handleInsert, label: 'Додати', variant: 'success',
                submenu: {}
            },
            move: {
                event: handleMove, label: 'Перемістити', variant: 'primary',
                submenu: {
                    first: { label: 'Перший' },
                    up: { label: 'Вгору' },
                    down: { label: 'Вниз' },
                    last: { label: 'Останній' }
                }
            },
            remove: {
                event: handleRemove, label: 'Видалити', variant: 'danger',
            }
        }
        Object.entries(config.blocks.list)
        .slice(0, config.blocks.limit)
        .forEach(([type, label]) =>
            menu.insert.submenu[type] = { label }
        )
        menu.insert.submenu.other = {
            label: 'Інші', divider: true, submenu: {}
        }
        Object.entries(config.blocks.list)
        .slice(config.blocks.limit)
        .forEach(([type, label]) =>
            menu.insert.submenu.other.submenu[type] = { label }
        )
        return menu
    }, [])

    return <>
        <Block type="intro" text={props.intro} label={'Вступ'}
            onChange={(name, value) => props.onChangeIntro(value)}
            component={Intro} blocks={props.blocks} menu={menu} key={0} />
        {props.blocks?.state && props.blocks.state.map(block =>
            <Block {...props} {...block} 
                menu={menu} label={config.blocks.list[block.type]}
                component={components[block.type]} key={block.id} />
        )}
    </>
}

export { Editor as default, Reducer, actions }