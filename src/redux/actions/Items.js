import apiClient, { uploadApiClient } from '../../services/apiClient'
import { ITEMS, CART, ORDER, ORDERS, ORDER_STATUS, ADD_TO_CART, USER_INFO, CAFE_CONFIG, USERS } from '../../constants'

import {
    fetchItems,
    fetchItemsSuccess,
    fetchItemsFailed,
    fetchCartData,
    fetchCartDataSuccess,
    fetchCartDataFailed,
    discardCartData,
    discardCartDataSuccess,
    discardCartDataFailed,
    placeOrder,
    placeOrderSuccess,
    placeOrderFailed,
    resetPlaceOrder,
    fetchOrders,
    fetchOrdersSuccess,
    fetchOrdersFailed,
    changeOrderStatus,
    changeOrderStatusSuccess,
    changeOrderStatusFailed,
    addToCart,
    addToCartSuccess,
    addToCartFailed,
    getUserInfo,
    getUserInfoSuccess,
    getUserInfoFailed,
    getCafeConfig,
    getCafeConfigSuccess,
    getCafeConfigFailed,
    updateUser,
    updateUserSuccess,
    updateUserFailed,
    getUsers,
    getUsersSuccess,
    getUsersFailed,
} from '../reducer/Items'

export const getItems = () => async dispatch => {
    await dispatch(fetchItems())
    try {
        const response = await apiClient.get(`${ITEMS}`)

        return dispatch(fetchItemsSuccess(response.data))
    } catch (err) {
        return dispatch(fetchItemsFailed(err))
    }
}

export const getCartData = () => async dispatch => {
    await dispatch(fetchCartData())
    try {
        const response = await apiClient.get(`${CART}`)

        return dispatch(fetchCartDataSuccess(response.data))
    } catch (err) {
        return dispatch(fetchCartDataFailed(err))
    }
}

export const discardCart = () => async dispatch => {
    await dispatch(discardCartData())
    try {
        const response = await apiClient.delete(`${CART}`)

        return dispatch(discardCartDataSuccess(response.data))
    } catch (err) {
        return dispatch(discardCartDataFailed(err))
    }
}

export const proceedToPlaceOrder = (payload) => async dispatch => {
    await dispatch(placeOrder())
    try {
        const response = await apiClient.post(ORDER, payload)

        return dispatch(placeOrderSuccess(response.data))
    } catch (err) {
        return dispatch(placeOrderFailed(err))
    }
}

export const resetPreviousPlacedOrder = () => dispatch => {
    dispatch(resetPlaceOrder())
}

export const fetchAllOrders = (payload) => async dispatch => {
    await dispatch(fetchOrders())
    try {
        const response = await apiClient.post(ORDERS, payload || {})

        return dispatch(fetchOrdersSuccess(response.data))
    } catch (err) {
        return dispatch(fetchOrdersFailed(err))
    }
}

export const updateOrderStatus = (orderId, status) => async dispatch => {
    await dispatch(changeOrderStatus())
    try {
        const response = await apiClient.put(`${ORDER_STATUS}/${orderId}/${status}`)

        return dispatch(changeOrderStatusSuccess(response.data))
    } catch (err) {
        return dispatch(changeOrderStatusFailed(err))
    }
}

export const addToCartItems = (itemId, count, size) => async dispatch => {
    await dispatch(addToCart())
    try {
        const response = await apiClient.post(`${ADD_TO_CART}/${itemId}/${count}/${size}`)

        return dispatch(addToCartSuccess(response.data))
    } catch (err) {
        return dispatch(addToCartFailed(err))
    }
}

export const getUserByEmail = (email) => async dispatch => {
    await dispatch(getUserInfo())
    try {
        const response = await apiClient.get(`${USER_INFO}/${email}`)

        return dispatch(getUserInfoSuccess(response.data))
    } catch (err) {
        return dispatch(getUserInfoFailed(err))
    }
}

export const fetchCafeConfig = (restautant) => async dispatch => {
    await dispatch(getCafeConfig())
    try {
        const response = await apiClient.get(`${CAFE_CONFIG}/${restautant}`)

        return dispatch(getCafeConfigSuccess(response.data))
    } catch (err) {
        return dispatch(getCafeConfigFailed(err))
    }
}

export const updateUserProfile = (email, payload) => async dispatch => {
    await dispatch(updateUser())
    try {
        const response = await apiClient.put(`${USER_INFO}/${email}`, payload)

        return dispatch(updateUserSuccess(response.data))
    } catch (err) {
        return dispatch(updateUserFailed(err))
    }
}


export const getUsersData = (queryParams) => async dispatch => {
    await dispatch(getUsers())
    try {
        let url = USERS;
        if (queryParams) {
            const queryParamsString = Object.keys(queryParams)
                .map(key => `${key}=${encodeURIComponent(queryParams[key])}`)
                .join('&');
            url = `${USERS}?${queryParamsString}`;
        }

        const response = await apiClient.get(url);

        return dispatch(getUsersSuccess(response.data));
    } catch (err) {
        return dispatch(getUsersFailed(err));
    }
};
