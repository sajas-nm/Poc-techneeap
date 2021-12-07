/* eslint-disable @typescript-eslint/no-unused-vars */
import {Dispatch} from 'redux';
import {httpClient} from './httpClient';
import {toast} from 'react-toastify';
export type DepartmentAction = {type: 'ADD_DEPARTMENT'; payload: []};

// Department Actions
export const getAllDepartments =
    (payload = {
        searchQuery:'',
        page:0,
        pageSize:5
    }) =>
    async (dispatch: Dispatch) => {
        try {
            dispatch({
                type: 'LOADING',
                payload: true,
            });

            const res = await httpClient('/department', {
                query: {
                    searchQuery: payload.searchQuery,
                    page: payload.page ,
                    pageSize: payload.pageSize,
                },
            });
            dispatch({
                type: 'ADD_DEPARTMENT',
                payload: res,
            });
        } catch (e) {
            console.error('[error]', e);
            toast(e);
            dispatch({
                type: 'LOADING',
                payload: false,
            });
        }
    };

export const createDepartment =
    (payload, onFinish) => async (dispatch: Dispatch) => {
        try {
            const {name} = payload;

            dispatch({
                type: 'CREATE_OR_UPDATE',
                payload: true,
            });

            const res = await httpClient('/department', {
                method: 'POST',
                body: {
                    name,
                },
            });

            if (onFinish) {
                onFinish();
            }
            toast('Department Created Successfully');
            console.log('🚀 ~ file: action.ts ~ line 22 ~ result', res);
        } catch (e) {
            console.log('e', e);
            toast(e);
            dispatch({
                type: 'CREATE_OR_UPDATE',
                payload: false,
            });
            if (onFinish) {
                onFinish();
            }
        }
    };

export const updateDepartment =
    (payload, id, onFinish) => async (dispatch: Dispatch) => {
        try {
            dispatch({
                type: 'CREATE_OR_UPDATE',
                payload: true,
            });
            const {name} = payload;
            await httpClient(`/department/${id}`, {
                method: 'PUT',
                body: {
                    name,
                },
            });
            toast('Department Updated Successfully');

            if (onFinish) {
                onFinish();
            }
        } catch (e) {
            console.log('e', e);
            toast(e);
            dispatch({
                type: 'CREATE_OR_UPDATE',
                payload: false,
            });
            if (onFinish) {
                onFinish();
            }
        }
    };

export const deleteDepartment =
    (id, onFinish) => async (dispatch: Dispatch) => {
        try {
            dispatch({
                type: 'CREATE_OR_UPDATE',
                payload: true,
            });
            const res = await httpClient(`/department/${id}`, {
                method: 'DELETE',
            });
            toast('Sucessfully deleted!');

            if (onFinish) {
                onFinish();
            }
        } catch (e) {
            toast('Somthing Went Wrong!', {
                type: 'error',
            });
            dispatch({
                type: 'CREATE_OR_UPDATE',
                payload: false,
            });
            if (onFinish) {
                onFinish();
            }
        }
    };

    // Department Actions
export const getAllEmployee =
(payload = {
    searchQuery:'',
    page:0,
    pageSize:5
}) =>
async (dispatch: Dispatch) => {
    try {
        dispatch({
            type: 'LOADING',
            payload: true,
        });

        const res = await httpClient('/employee', {
            query: {
                searchQuery: payload.searchQuery,
                page: payload.page ,
                pageSize: payload.pageSize,
            },
        });
        dispatch({
            type: 'ADD_EMPLOYEE',
            payload: res,
        });
    } catch (e) {
        console.error('[error]', e);
        toast(e);
        dispatch({
            type: 'LOADING',
            payload: false,
        });
    }
};

//TODO: Wrapper toast alert && Loading Dispatch
