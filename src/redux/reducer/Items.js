import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    isItemsLoading: false,
    isCartDataLoading: false,
    isDiscardCartDataLoading: false,
    isPlaceOrderLoading: false,
    items: [],
    cartData: [],
    orderId: '',
    message: '',
    isError: false,
}

export const itemsReducer = createSlice({
    name: 'items',
    initialState,
    reducers: {
        fetchItems(state, action) {
            return {
                ...state,
                isError: false,
                isItemsLoading: true,
            }
        },
        fetchItemsSuccess(state, action) {
            return {
                ...state,
                isItemsLoading: false,
                items: action?.payload,
                isError: false,
            }
        },
        fetchItemsFailed(state, action) {
            return {
                ...state,
                message: 'Fetch Items Failed',
                isError: true,
                isItemsLoading: false,
            }
        },
        fetchCartData(state, action) {
            return {
                ...state,
                isError: false,
                isCartDataLoading: true,
            }
        },
        fetchCartDataSuccess(state, action) {
            return {
                ...state,
                isCartDataLoading: false,
                cartData: action?.payload,
                isError: false,
            }
        },
        fetchCartDataFailed(state, action) {
            return {
                ...state,
                message: 'Fetch Cart Data Failed',
                isError: true,
                isCartDataLoading: false,
            }
        },
        discardCartData(state, action) {
            return {
                ...state,
                isError: false,
                isDiscardCartDataLoading: true,
            }
        },
        discardCartDataSuccess(state, action) {
            return {
                ...state,
                isDiscardCartDataLoading: false,
                isError: false,
            }
        },
        discardCartDataFailed(state, action) {
            return {
                ...state,
                message: 'Discard Cart Data Failed',
                isError: true,
                isDiscardCartDataLoading: false,
            }
        },
        placeOrder(state, action) {
            return {
                ...state,
                isError: false,
                isPlaceOrderLoading: true,
            }
        },
        placeOrderSuccess(state, action) {
            return {
                ...state,
                isPlaceOrderLoading: false,
                orderId: action?.payload["order_id"],
                isError: false,
            }
        },
        placeOrderFailed(state, action) {
            return {
                ...state,
                message: 'Place Order Failed',
                isError: true,
                isPlaceOrderLoading: false,
            }
        },
        resetPlaceOrder(state, action) {
            return {
                ...state,
                orderId: '',
            }
        }
    },
})

export const {
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
} = itemsReducer.actions

export default itemsReducer.reducer
