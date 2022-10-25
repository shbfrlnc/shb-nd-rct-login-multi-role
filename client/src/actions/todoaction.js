import {
    getAllTodos,
    getLimitedTodos,
    getTodo,
    createTodo,
    editTodo,
    deleteTodo
} from '../services/todoservice';

export const actSetTodoTitle = (title) => {
    return async (dispatch) => {
        dispatch({
            type: "act-set-todo-title",
            payload: title
        })
    }
}

export const actSetTodoDescription = (description) => {
    return async (dispatch) => {
        dispatch({
            type: "act-set-todo-description",
            payload: description
        })
    }
}

export const actClearTodoItemData = () => {
    return async (dispatch) => {
        const data = {
            _id: "",
            title: "",
            description: ""
        }

        dispatch({
            type: "act-clear-todo-item-data",
            payload: data
        })
    }
}

export const actGetAllTodos = () => {
    return async (dispatch) => {
        try {
            const { data } = await getAllTodos();

            dispatch({
                type: "act-get-all-todos",
                payload: data.data
            })
        } catch (err) {
            alert(err.response.data.message)
            return;
        }

    }
}

export const actGetLimitedTodos = (page, perPage, query) => {
    return async (dispatch) => {
        try {
            const { data } = await getLimitedTodos(page, perPage, query);
            console.log(data);
            dispatch({
                type: "act-get-limited-todos",
                payload: data.data
            })
        } catch (err) {
            alert(err.response.data.message)
            return;
        }
    }
}

export const actGetTodo = (id) => {
    return async (dispatch) => {
        try {
            const { data } = await getTodo(id);
            console.log(data);
            dispatch({
                type: "act-get-todo",
                payload: data.data
            })
        } catch (err) {
            alert(err.response.data.message)
            return;
        }
    }
}

export const actCreateTodo = (newData) => {
    return async (dispatch) => {
        try {
            const { data } = await createTodo(newData);
            dispatch({
                type: "act-create-todo",
                payload: data.data
            })
        } catch (err) {
            alert(err.response.data.message)
            return;
        }
    }
}

export const actEditTodo = (newData) => {
    return async (dispatch) => {
        try {
            const { data } = await editTodo(newData);
            console.log(data);
            dispatch({
                type: "act-create-todo",
                payload: data.data
            })
        } catch (err) {
            alert(err.response.data.message)
            return;
        }
    }
}

export const actDeleteTodo = (id) => {
    return async (dispatch) => {
        try {
            const { data } = await deleteTodo(id);
            console.log(data);
            dispatch({
                type: "act-delete-todo",
                payload: data.data
            })
        } catch (err) {
            alert(err.response.data.message)
            return;
        }

    }
}

export const actClearTodoItems = () => {
    return async (dispatch) => {
        dispatch({
            type: "act-clear-todo-items",
            payload: []
        })
    }
}