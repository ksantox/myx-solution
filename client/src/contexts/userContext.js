import API from "../common/API";
import storage from "../common/storage";
import { USER_DATA } from "../common/constants";
import createDataContext from "./createDataContext";

const ACTION_TYPES = {
    AUTH: "AUTH",
    LOGOUT: "LOGOUT",
    REGISTER: "REGISTER",
    DELETE_IMAGE: "DELETE_IMAGE",
    SET_AUTH_ERROR: "SET_AUTH_ERROR",
    SET_GENERAL_ERROR: "SET_GENERAL_ERROR",
    CLEAR_GENERAL_ERROR: "CLEAR_GENERAL_ERROR",
    UPDATE_STARED_IMAGES: "UPDATE_STARED_IMAGES"
};

const productReducer = (state, action) => {
    const payload = action.payload;
    // return { ...state, ...payload };

    switch(action.type) {
        case ACTION_TYPES.AUTH: return { ...state, ...payload, authError: "" };
        case ACTION_TYPES.SET_AUTH_ERROR: return { ...state, authError: payload };
        case ACTION_TYPES.CLEAR_GENERAL_ERROR: return { ...state, generalError: "" };
        case ACTION_TYPES.SET_GENERAL_ERROR: return { ...state, generalError: payload };
        case ACTION_TYPES.UPDATE_STARED_IMAGES: return { ...state, staredImages: payload };
        default: return state;
    }
};

const loadUser = dispatch => () => {
    const userData = storage.retrieve(USER_DATA, true);
    dispatch({ type: ACTION_TYPES.AUTH, payload: { ...userData } });
}

const registerAction = dispatch => async registerData => {
    try {
        const response = await API.post("/auth/register", registerData);
        
        if(response.data.error) {
            throw new Error(response.data.error);
        }

        storage.store(USER_DATA, response.data);
        dispatch({ type: ACTION_TYPES.AUTH, payload: { ...response.data } });
    } catch (error) {
        dispatch({ type: ACTION_TYPES.SET_AUTH_ERROR, payload: error.message });
    }
}

const loginAction = dispatch => async loginData => {
    try {
        const response = await API.post("/auth/login", loginData);

        if(response.data.error) {
            throw new Error(response.data.error);
        }

        storage.store(USER_DATA, response.data);
        dispatch({ type: ACTION_TYPES.AUTH, payload: { ...response.data } });
    } catch (error) {
        dispatch({ type: ACTION_TYPES.SET_AUTH_ERROR, payload: { authError: error.message } });
    }
}

const logoutAction = dispatch => () => {
    storage.purge(USER_DATA);
    dispatch({ type: ACTION_TYPES.AUTH, payload: { token: "", user: {} }});
}

const clearAuthError = dispatch => () => {
    dispatch({ type: ACTION_TYPES.SET_AUTH_ERROR, payload: "" });
}

const uploadImageAction = dispatch => async (imageData, callback) => {
    try {
        const formData = new FormData();
        formData.append("userImage", imageData);

        const response = await API.post(
            "/user/uploadImage",
            formData,
            { headers: { "Content-Type": "multipart/form-data" } }
        );
        
        callback(response.data.image);
    } catch (error) {
        dispatch({ type: ACTION_TYPES.SET_GENERAL_ERROR, payload: error.message });
    }
}

const starImage = (dispatch, state) => async _id => {
    try {
        const response = await API.put("/user/starImage", { _id });

        if(response.data.error) {
            throw new Error(response.data.error);
        }

        const updatedStarImages = { ...state.staredImages, [_id]: true };
        dispatch({ type: ACTION_TYPES.UPDATE_STARED_IMAGES, payload: updatedStarImages });
    } catch (error) {
        dispatch({ type: ACTION_TYPES.SET_GENERAL_ERROR, payload: error.message });
    }
}

const unstarImage = (dispatch, state) => async _id => {
    try {
        const response = await API.put("/user/unstarImage", { _id });

        if(response.data.error) {
            throw new Error(response.data.error);
        }

        if(!state.staredImages[_id]) {
            return;
        }

        const updatedStarImages = { ...state.staredImages, [_id]: false };

        dispatch({ type: ACTION_TYPES.UPDATE_STARED_IMAGES, payload: updatedStarImages });
    } catch (error) {
        dispatch({ type: ACTION_TYPES.SET_GENERAL_ERROR, payload: error.message });
    }
}

const deleteImage = dispatch => async (_id, callback) => {
    try {
        const response = await API.delete("/user/deleteImage", { data: { _id } });

        if(response.data.error) {
            throw new Error(response.data.error);
        }

        callback(_id);
    } catch (error) {
        dispatch({ type: ACTION_TYPES.SET_GENERAL_ERROR, payload: error.message });
    }
}

const clearGeneralErrorAction = dispatch => () => {
    dispatch({ type: ACTION_TYPES.CLEAR_GENERAL_ERROR });
}

export const { Context, Provider } = createDataContext(
    productReducer,
    {
        loadUser,
        starImage,
        loginAction,
        unstarImage,
        deleteImage,
        logoutAction,
        registerAction,
        clearAuthError,
        uploadImageAction,
        clearGeneralErrorAction
    },
    {
        user: {},
        token: "",
        authError: "",
        staredImages: {},
        generalError: ""
    }
);