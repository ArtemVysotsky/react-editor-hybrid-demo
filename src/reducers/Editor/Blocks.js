const LOAD = 'load';
const INSERT = 'insert';
const UPDATE = 'update';
const MERGE = 'merge';
const MOVE = 'move';
const REMOVE = 'remove';

export const actions = {
    load: blocks => {
        return { type: LOAD, payload: { blocks } };
    },
    insert: (id, type) => {
        return { type: INSERT, payload: { id, type } };
    },
    update: (id, name, value) => {
        return { type: UPDATE, payload: { id, name, value } };
    },
    merge: (id, data) => {
        return { type: MERGE, payload: { id, data } };
    },
    move: (id, direction) => {
        return { type: MOVE, payload: { id, direction } };
    },
    remove: (id, name) => {
        return { type: REMOVE, payload: { id, name } };
    }
};

export default (state = [], action) => {
    switch (action.type) {
        case LOAD: return action.payload.blocks;
        case INSERT: {
            const blocks = state.map(block => block);
            blocks.splice(
                state.findIndex(block => block.id === action.payload.id) + 1,
                0,
                { id: Math.round(Date.now() / 1_000), type: action.payload.type }
            );
            return blocks;
        }
        case UPDATE: {
            return state.map(block => {
                if (block.id !== action.payload.id) return block;
                const names = action.payload.name.split('.');
                const last = names.length - 1;
                names.reduce((branch, name, index) => {
                    if (index === last) {
                        branch[name] = action.payload.value;
                    } else {
                        if (!(name in branch)) {
                            branch[name] = {};
                        }
                        return branch[name];
                    }
                }, block);
                return block;
            });
        }
        case MERGE: {
            return state.map(block => {
                return (block.id === action.payload.id)
                    ? { ...block, ...action.payload.data }
                    : block;
            });
        }
        case MOVE: {
            const blocks = [...state];
            const index = blocks.findIndex(block => block.id === action.payload.id);
            if (index === -1) return state;
            const [block] = blocks.splice(index, 1);
            switch (action.payload.direction) {
                case 'first':
                    blocks.unshift(block);
                    break;
                case 'last':
                    blocks.push(block);
                    break;
                case 'up':
                    blocks.splice(Math.max(0, index - 1), 0, block);
                    break;
                case 'down':
                    blocks.splice(Math.min(blocks.length, index + 1), 0, block);
                    break;
                default:
                    blocks.splice(index, 0, block);
            }
            return blocks;
        }
        case REMOVE: {
            if (typeof action.payload.name !== 'undefined') {
                return state.map(block => {
                    if (block.id !== action.payload.id) return block;
                    const names = action.payload.name.split('.');
                    const last = names.length - 1;
                    names.reduce((branch, name, index) => {
                        if (index === last) {
                            delete branch[name];
                        } else {
                            return branch[name];
                        }
                    }, block);
                    return block;
                });
            } else {
                return state.filter(block =>
                    block.id !== action.payload.id
                );
            }
        }
        default: {
            throw new Error('Unknown block type');
        }
    }
};
