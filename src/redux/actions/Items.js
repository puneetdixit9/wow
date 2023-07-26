import apiClient, { uploadApiClient } from '../../services/apiClient'
import { ITEMS, CART, ORDER } from '../../constants'

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

export const proceedToPlaceOrder = () => async dispatch => {
    await dispatch(placeOrder())
    try {
        const response = await apiClient.post(`${ORDER}`)

        return dispatch(placeOrderSuccess(response.data))
    } catch (err) {
        return dispatch(placeOrderFailed(err))
    }
}

export const resetPreviousPlacedOrder = () => async dispatch => {
    await dispatch(resetPlaceOrder())
}