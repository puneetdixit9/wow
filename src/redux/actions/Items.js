import apiClient, { uploadApiClient } from '../../services/apiClient'
import { ITEMS } from '../../constants'

import {
    fetchItems,
    fetchItemsSuccess,
    fetchItemsFailed,
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