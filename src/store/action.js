import {
    ADD_VISITED_VIEWS,
    DEL_VISITED_VIEWS
} from './mutation-types';


export const addVisitedViews = ({ commit }, view) => {
    commit(ADD_VISITED_VIEWS, view)
}

export const delVisitedViews = ({ commit, state }, view) => {
	return new Promise((resolve) => {
		commit(DEL_VISITED_VIEWS, view);
		resolve([...state.visitedViews])
	});
}