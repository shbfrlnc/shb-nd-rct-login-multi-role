import {
    combineReducers
} from 'redux';

import todoreducer from './todoreducer';

export default combineReducers({
    todos: todoreducer
});
