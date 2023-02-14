import { IMAGE_STEP_COUNT } from "../common/constants";
import createDataContext from "./createDataContext";

const ACTION_TYPES = {
    ADD_IMAGE: "ADD_IMAGE",
    REMOVE_IMAGE: "REMOVE_IMAGE",
    LOAD_MORE_IMAGES: "LOAD_MORE_IMAGES",
    SET_GENERAL_ERROR: "SET_GENERAL_ERROR",
    IMAGES_END_REACHED: "IMAGES_END_REACHED"
};

const productReducer = (state, action) => {
    const payload = action.payload;
    
    switch(action.type) {
        case ACTION_TYPES.LOAD_MORE_IMAGES: return { ...state, images: payload };
        case ACTION_TYPES.IMAGES_END_REACHED: return { ...state, didReachEnd: true };
        case ACTION_TYPES.SET_GENERAL_ERROR: return { ...state, generalError: payload };
        case ACTION_TYPES.ADD_IMAGE: return { ...state, images: [payload, ...state.images] };
        case ACTION_TYPES.REMOVE_IMAGE: return { ...state, images: [...state.images].filter(image => image._id !== payload) };
        default: return state;
    }
};

const loadMoreImages = (dispatch, state) => async (skip, callback) => {
    try {
        const limit = skip + IMAGE_STEP_COUNT;
        const response = await fetch(`/gallery/getMoreImages?skip=${skip}&limit=${limit}`).then(resp => resp.json());

        if(response.error) {
            dispatch({ type: ACTION_TYPES.SET_GENERAL_ERROR, payload: response.error.message });
            return;
        }

        if(!response.images.length) {
            dispatch({ type: ACTION_TYPES.IMAGES_END_REACHED });
            callback();
            return;
        }

        const updatedCollection = [...state.images, ...response.images];

        dispatch({ type: ACTION_TYPES.LOAD_MORE_IMAGES, payload: updatedCollection });
        callback();
    } catch (error) {
        dispatch({ type: ACTION_TYPES.SET_GENERAL_ERROR, payload: error.message });
    }
}

const addImageAction = dispatch => newImage => {
    dispatch({ type: ACTION_TYPES.ADD_IMAGE, payload: newImage });
};

const removeImageAction = dispatch => imageId => {
    dispatch({ type: ACTION_TYPES.REMOVE_IMAGE, payload: imageId });
}

const clearGeneralErrorAction = dispatch => () => {
    dispatch({ type: ACTION_TYPES.SET_GENERAL_ERROR, payload: "" });
}

export const { Context, Provider } = createDataContext(
    productReducer,
    {
        addImageAction,
        loadMoreImages,
        removeImageAction,
        clearGeneralErrorAction
    },
    {
        images: [],
        generalError: "",
        didReachEnd: false
    }
);