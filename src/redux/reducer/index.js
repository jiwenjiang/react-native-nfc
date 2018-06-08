const Title = (state = '', action) => {
    switch (action.type) {
        case 'SUB_TITLE':
            return action.item;
        default:
            return state;
    }
}

export {Title};