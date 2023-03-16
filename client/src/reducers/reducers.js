/**
 * Here there are the reducers for useReduce()
 */


/**
 * @Loading page data 
 * @Success fetch data
 * @Error fetch data
 */


export const fetch_reducer = (state, action)=>{
    switch (action.type) {
        case 'FETCH_REQUEST':
            return {...state,loading: true};
        case 'FETCH_SUCCESS':
            return {...state,loading: false, fetch_list: action.payload};
        case 'FETCH_ERROR':
            return {...state, loading: false, error: action.payload}
        default:
            return state;
    }
} 