import { BaseTheme } from "../../components/Themes/BaseTheme";

import { arrTheme } from "../../components/Themes/ThemeManager";
import {
	ADD_TASK,
	CHANGE_THEME,
	DELETE_TASK,
	DONE_TASK,
	EDIT_TASK,
	UPDATE_TASK,
} from "../types/ToDoListType";

const initialState = {
	themeToDoList: BaseTheme,
	taskList: [
		{ id: "task-1", taskName: "task 1", done: true },
		{ id: "task-2", taskName: "task 2", done: true },
		{ id: "task-3", taskName: "task 3", done: false },
		{ id: "task-4", taskName: "task 4", done: false },
	],
	taskEdit: { id: "", taskName: "", done: false },
};

export const ToDoListReducer = (state = initialState, action) => {
	switch (action.type) {
		case ADD_TASK: {
			if (action.newTask.taskName.trim() === "") {
				alert("Task name is required!");
				return { ...state };
			}
			let taskListUpdate = [...state.taskList];
			let index = taskListUpdate.findIndex(
				(task) => task.taskName === action.newTask.taskName
			);
			if (index !== -1) {
				alert("Task name already exists!");
				return { ...state };
			}

			taskListUpdate.push(action.newTask);
			state.taskList = taskListUpdate;
			return { ...state };
		}
		case CHANGE_THEME: {
			let theme = arrTheme.find((theme) => theme.id == action.newThemeId);
			if (theme) {
				state.themeToDoList = { ...theme.theme };
			}
			return { ...state };
		}
		case DONE_TASK: {
			let taskListUpdate = [...state.taskList];

			let index = taskListUpdate.findIndex((task) => task.id === action.taskId);
			if (index !== -1) {
				taskListUpdate[index].done = !taskListUpdate[index].done;
			}

			state.taskList = taskListUpdate;
			return { ...state };
		}
		case DELETE_TASK: {
			return {
				...state,
				taskList: state.taskList.filter((task) => task.id !== action.taskId),
			};
		}
		case EDIT_TASK: {
			return { ...state, taskEdit: action.task };
		}
		case UPDATE_TASK: {
			state.taskEdit = { ...state.taskEdit, taskName: action.taskName };
			let taskListUpdate = [...state.taskList];

			let index = taskListUpdate.findIndex(
				(task) => task.id === state.taskEdit.id
			);
			if (index !== -1) {
				taskListUpdate[index] = state.taskEdit;
			}

			state.taskList = taskListUpdate;
			state.taskEdit = { id: "-1", taskName: "", done: false };
			return { ...state };
		}
		default:
			return state;
	}
};
