import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    isItemsLoading: false,
    isCartDataLoading: false,
    isDiscardCartDataLoading: false,
    isPlaceOrderLoading: false,
    isFetchOrdersLoading: false,
    items: [],
    cartData: [],
    orderNo: 0,
    changeOrderStatusError: "",
    orders: [],
    message: '',
    isError: false,
    userInfo: {},
    gettingUserInfo: false,
    isUserUpdating: false,
    cafeConfig: {},
    users: [],
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
                orderNo: action?.payload["order_no"],
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
                orderNo: 0,
                orders: []
            }
        },
        fetchOrders(state, action) {
            return {
                ...state,
                isError: false,
                isFetchOrdersLoading: true,
            }
        },
        fetchOrdersSuccess(state, action) {
            return {
                ...state,
                isFetchOrdersLoading: false,
                orders: action?.payload,
                isError: false,
            }
        },
        fetchOrdersFailed(state, action) {
            return {
                ...state,
                message: 'Fetch Order Failed',
                isError: true,
                isFetchOrdersLoading: false,
            }
        },
        changeOrderStatus(state, action) {
            return {
                ...state,
                isError: false,
                changeOrderStatusError: "",
            }
        },
        changeOrderStatusSuccess(state, action) {
            return {
                ...state,
                isError: false,
                changeOrderStatusError: "",
            }
        },
        changeOrderStatusFailed(state, action) {
            return {
                ...state,
                message: 'Change order status Failed',
                isError: true,
                changeOrderStatusError: action.payload?.error,
            }
        },
        addToCart(state, action) {
            return {
                ...state,
                isError: false,
            }
        },
        addToCartSuccess(state, action) {
            return {
                ...state,
                isError: false,
            }
        },
        addToCartFailed(state, action) {
            return {
                ...state,
                message: 'Add to cart Failed',
                isError: true,
            }
        },
        getUserInfo(state, action) {
            return {
                ...state,
                isError: false,
                gettingUserInfo: true,
            }
        },
        getUserInfoSuccess(state, action) {
            return {
                ...state,
                isError: false,
                userInfo: action.payload,
                gettingUserInfo: false,
            }
        },
        getUserInfoFailed(state, action) {
            return {
                ...state,
                message: 'Failed to get user info',
                isError: true,
                gettingUserInfo: false,
            }
        },
        getCafeConfig(state, action) {
            return {
                ...state,
                isError: false,
            }
        },
        getCafeConfigSuccess(state, action) {
            return {
                ...state,
                isError: false,
                cafeConfig: action.payload,
            }
        },
        getCafeConfigFailed(state, action) {
            return {
                ...state,
                message: 'Failed to get cafe config',
                isError: true,
            }
        },
        updateUser(state, action) {
            return {
                ...state,
                isError: false,
                isUserUpdating: true,
            }
        },
        updateUserSuccess(state, action) {
            return {
                ...state,
                isError: false,
                isUserUpdating: false,

            }
        },
        updateUserFailed(state, action) {
            return {
                ...state,
                message: 'Failed to update user profile',
                isError: true,
                isUserUpdating: false,
            }
        },
        getUsers(state, action) {
            return {
                ...state,
                isError: false,
            }
        },
        getUsersSuccess(state, action) {
            return {
                ...state,
                isError: false,
                users: action.payload,

            }
        },
        getUsersFailed(state, action) {
            return {
                ...state,
                message: 'Failed to get users',
                isError: true,
            }
        },
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
} = itemsReducer.actions

export default itemsReducer.reducer
