const PHOTO_VIEWS_REDUCER = (state = '', action) => {
    switch (action.type) {
        case 'PHOTO_VIEWS':
            return action.item;
        default:
            return state;
    }
};

export { PHOTO_VIEWS_REDUCER };