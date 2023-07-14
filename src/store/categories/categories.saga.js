import { takeLatest, all, call, put} from 'redux-saga/effects'

import { fetchCategoriesSuccess, fetchCategoriesFailed } from './categories.action';

import { getCategoriesAndDocuments } from "../../utils/firebase/firebase.utils";

import { CATEGORIES_ACTION_TYPES } from './categories.types';


export function* fetchCategoriesAsync() { 
    try { 
        const categoriesArray = yield call(getCategoriesAndDocuments, 'categories')
        yield put(fetchCategoriesSuccess(categoriesArray))
    } catch (error) {
        yield put(fetchCategoriesFailed(error))
    }
  
}
    
export function* onFetchCateogires() { 
    yield takeLatest(CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_START, fetchCategoriesAsync)
}
 

//categoriesSaga generator function is the accumulator that holds all of the sagas that are related to categories
export function* categoriesSaga() { 
    yield all([call(onFetchCateogires)])
}

