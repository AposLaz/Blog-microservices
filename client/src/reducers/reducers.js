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
            return ;
        case 'FETCH_SUCCESS':
            return ;
        case 'FETCH_ERROR':
            return ;
        default:
            return state;
    }
} 