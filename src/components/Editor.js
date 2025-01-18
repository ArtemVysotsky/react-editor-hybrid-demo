import React, { useMemo } from 'react'
import PropTypes from 'prop-types'
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

const Editor = ({ blocks, intro, onChangeIntro }) => {

    const handleInsert = (type, id) => {
        blocks.dispatch(
            blocks.actions.insert(id, type)
        )
    }

    const handleMove = (direction, id) => {
        blocks.dispatch(
            blocks.actions.move(id, direction)
        )
    }

    const handleRemove = (_value = null, id) => {
        blocks.dispatch(
            blocks.actions.remove(id)
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
        <Block type="intro" text={intro} label={'Вступ'}
            onChange={(_name, value) => onChangeIntro(value)}
            component={Intro} blocks={blocks} menu={menu} key={0} />
        {blocks?.state && blocks.state.map(block =>
            <Block {...block} blocks={blocks}
                menu={menu} label={config.blocks.list[block.type]}
                component={components[block.type]} key={block.id} />
        )}
    </>
}

Editor.propTypes = {
    blocks: PropTypes.shape({
        dispatch: PropTypes.func.isRequired,
        actions: PropTypes.shape({
            insert: PropTypes.func.isRequired,
            move: PropTypes.func.isRequired,
            remove: PropTypes.func.isRequired,
        }).isRequired,
        state: PropTypes.arrayOf(PropTypes.object),
    }).isRequired,
    intro: PropTypes.string.isRequired,
    onChangeIntro: PropTypes.func.isRequired,
}

export { Editor as default, Reducer, actions }