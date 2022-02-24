import {
	ADD_TASK,
	CHANGE_THEME,
	DELETE_TASK,
	DONE_TASK,
	EDIT_TASK,
	UPDATE_TASK,
} from "../types/ToDoListType";

export const addTask = (newTask) => ({
	type: ADD_TASK,
	newTask,
});

export const changeTheme = (newThemeId) => {
	return {
		type: CHANGE_THEME,
		newThemeId,
	};
};

export const doneTask = (taskId) => {
	return {
		type: DONE_TASK,
		taskId,
	};
};
export const deleteTask = (taskId) => {
	return {
		type: DELETE_TASK,
		taskId,
	};
};
export const editTask = (task) => ({
	type: EDIT_TASK,
	task,
});
export const updateTask = (taskName) => {
	return {
		type: UPDATE_TASK,
		taskName,
	};
};
