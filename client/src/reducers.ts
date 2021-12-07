import {DepartmentAction} from './action';

export interface IDepartmentState {
    departments: {
        rows: DepartmentType[];
        count: Number;
    };
    loading: Boolean;
    isCreateOrUpdate: Boolean;
}

export interface IEmployeeState {
    employees: {
        rows: EmployeeType[];
        count: Number;
    };
    loading: Boolean;
    isCreateOrUpdate: Boolean;
}

export type DepartmentType = {
    name: string;
    id: number;
    dob: string;
    profilePicUrl: string;
    departmentId: number;
};

export type EmployeeType = {
    name: string;
    id: number;
};

// title
const intialState = {
    departments: {
        rows: [],
        count: 0,
    },
    employees: {
        rows: [],
        count: 0,
    },
    loading: false,
    isCreateOrUpdate: false,
};

export const deparmentReducer = (
    state: IDepartmentState = intialState,
    action,
) => {
    switch (action.type) {
        case 'LOADING': {
            return {...state, loading: action.payload};
        }
        case 'CREATE_OR_UPDATE': {
            return {...state, isCreateOrUpdate: action.payload};
        }
      
        case 'ADD_DEPARTMENT': {
            
            return {
                ...state,
                departments: action?.payload,
                loading: false,
                isCreateOrUpdate: false,
            };
        }
        case 'ADD_EMPLOYEE': {
            
            return {
                ...state,
                departments: action?.payload,
                loading: false,
                isCreateOrUpdate: false,
            };
        }
        default:
            return state;
    }
};


export const employeeReducer = (
    state: IEmployeeState = intialState,
    action,
) => {
    switch (action.type) {
        case 'LOADING': {
            return {...state, loading: action.payload};
        }
        case 'CREATE_OR_UPDATE': {
            return {...state, isCreateOrUpdate: action.payload};
        }
      
        case 'ADD_EMPLOYEE': {
            
            return {
                ...state,
                employees: action?.payload,
                loading: false,
                isCreateOrUpdate: false,
            };
        }
        default:
            return state;
    }
};
