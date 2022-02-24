import React, { useState, useEffect } from "react";
import { Container } from "../components/Container";
import { ThemeProvider } from "styled-components";
import { Dropdown } from "../components/Dropdown";
import { Heading1, Heading3 } from "../components/Heading";
import { TextField } from "../components/TextField";
import { Button } from "../components/Button";
import { Table, Th, Thead, Tr } from "../components/Table";
import { useDispatch, useSelector } from "react-redux";
import {
	addTask,
	changeTheme,
	deleteTask,
	doneTask,
	editTask,
	updateTask,
} from "../redux/actions/ToDoListAction";
import { arrTheme } from "../components/Themes/ThemeManager";

export const ToDoListFunction = (props) => {
	const { taskList, taskEdit, themeToDoList } = useSelector(
		(state) => state.ToDoListReducer
	);
	const dispatch = useDispatch();

	const [taskName, setTaskName] = useState("");
	const [disabled, setDisabled] = useState(true);
	const [disabledAdd, setDisabledAdd] = useState(false);
	useEffect(() => {
		setTaskName(taskEdit.taskName);
	}, [taskEdit]);
	const renderTheme = () => {
		return arrTheme.map((theme, index) => {
			return (
				<option value={theme.id} key={index}>
					{theme.name}
				</option>
			);
		});
	};

	const renderTaskToDo = () => {
		return taskList
			.filter((task) => task.done === false)
			.map((task, index) => {
				return (
					<Tr key={index}>
						<Th style={{ verticalAlign: "middle" }}>{task.taskName}</Th>
						<Th className='text-end'>
							<Button
								className='ms-1'
								onClick={() => {
									dispatch(editTask(task));
									setTaskName(taskEdit.taskName);
									setDisabled(false);
									setDisabledAdd(true);
								}}>
								<i className='fa fa-edit'></i>
							</Button>
							<Button
								className='ms-1'
								onClick={() => {
									dispatch(doneTask(task.id));
								}}>
								<i className='fa fa-check'></i>
							</Button>
							<Button
								className='ms-1'
								onClick={() => {
									dispatch(deleteTask(task.id));
								}}>
								<i className='fa fa-trash'></i>
							</Button>
						</Th>
					</Tr>
				);
			});
	};
	const renderTaskComplete = () => {
		return taskList
			.filter((task) => task.done === true)
			.map((task, index) => {
				return (
					<Tr key={index}>
						<Th style={{ verticalAlign: "middle" }}>{task.taskName}</Th>
						<Th className='text-end'>
							<Button
								className='ms-1'
								onClick={() => {
									dispatch(doneTask(task.id));
								}}>
								<i className='fa fa-redo'></i>
							</Button>
							<Button
								className='ms-1'
								onClick={() => {
									dispatch(deleteTask(task.id));
								}}>
								<i className='fa fa-trash'></i>
							</Button>
						</Th>
					</Tr>
				);
			});
	};

	return (
		<ThemeProvider theme={themeToDoList}>
			<Container className=' mt-3'>
				<Dropdown
					onChange={(e) => {
						let { value } = e.target;
						dispatch(changeTheme(value));
					}}>
					{renderTheme()}
				</Dropdown>
				<Heading1>To Do List</Heading1>

				<TextField
					onChange={(e) => {
						setTaskName(e.target.value);
					}}
					value={taskName}
					label='Task name'
					name='taskName'
					className='w-50'
				/>

				<Button
					className='ms-2'
					disabled={disabledAdd}
					onClick={() => {
						let newTask = {
							id: Date.now(),
							taskName: taskName,
							done: false,
						};
						dispatch(addTask(newTask));
						setTaskName("");
					}}>
					<i className='fa fa-plus me-2'></i>
					Add task
				</Button>

				<Button
					className='ms-2'
					disabled={disabled}
					onClick={() => {
						dispatch(updateTask(taskName));
						setDisabled(true);
						setDisabledAdd(false);
					}}>
					<i className='fa fa-upload me-2'></i>
					Update task
				</Button>

				<hr />
				<Heading3>Task to do</Heading3>
				<Table>
					<Thead>{renderTaskToDo()}</Thead>
				</Table>
				<Heading3>Task completed</Heading3>
				<Table>
					<Thead>{renderTaskComplete()}</Thead>
				</Table>
			</Container>
		</ThemeProvider>
	);
};
