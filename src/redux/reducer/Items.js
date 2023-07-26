import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    isItemsLoading: false,
    items: [],
    message: '',
    isError: false,
}

export const itemsReducer = createSlice({
    name: 'product',
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
                message: 'Fetch Products Failed',
                isError: true,
                isItemsLoading: false,
            }
        },
    },
})

export const {
    fetchItems,
    fetchItemsSuccess,
    fetchItemsFailed,
} = itemsReducer.actions

export default itemsReducer.reducer
