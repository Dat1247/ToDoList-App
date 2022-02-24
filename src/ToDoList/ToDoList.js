import React, { Component } from "react";
import { Container } from "../components/Container";
import { ThemeProvider } from "styled-components";
import { Dropdown } from "../components/Dropdown";
import { Heading1, Heading3 } from "../components/Heading";
import { TextField } from "../components/TextField";
import { Button } from "../components/Button";
import { Table, Th, Thead, Tr } from "../components/Table";
import { connect } from "react-redux";
import {
	addTask,
	changeTheme,
	deleteTask,
	doneTask,
	editTask,
	updateTask,
} from "../redux/actions/ToDoListAction";
import { arrTheme } from "../components/Themes/ThemeManager";

class ToDoList extends Component {
	state = {
		taskName: "",
		disabled: true,
	};

	renderTheme = () => {
		return arrTheme.map((theme, index) => {
			return (
				<option value={theme.id} key={index}>
					{theme.name}
				</option>
			);
		});
	};

	renderTaskToDo = () => {
		return this.props.taskList
			.filter((task) => task.done === false)
			.map((task, index) => {
				return (
					<Tr key={index}>
						<Th style={{ verticalAlign: "middle" }}>{task.taskName}</Th>
						<Th className='text-end'>
							<Button
								className='ms-1'
								onClick={() => {
									this.setState(
										{
											disabled: false,
										},
										() => {
											this.props.dispatch(editTask(task));
										}
									);
								}}>
								<i className='fa fa-edit'></i>
							</Button>
							<Button
								className='ms-1'
								onClick={() => {
									this.props.dispatch(doneTask(task.id));
								}}>
								<i className='fa fa-check'></i>
							</Button>
							<Button
								className='ms-1'
								onClick={() => {
									this.props.dispatch(deleteTask(task.id));
								}}>
								<i className='fa fa-trash'></i>
							</Button>
						</Th>
					</Tr>
				);
			});
	};
	renderTaskComplete = () => {
		return this.props.taskList
			.filter((task) => task.done === true)
			.map((task, index) => {
				return (
					<Tr key={index}>
						<Th style={{ verticalAlign: "middle" }}>{task.taskName}</Th>
						<Th className='text-end'>
							<Button
								className='ms-1'
								onClick={() => {
									this.props.dispatch(doneTask(task.id));
								}}>
								<i className='fa fa-redo'></i>
							</Button>
							<Button
								className='ms-1'
								onClick={() => {
									this.props.dispatch(deleteTask(task.id));
								}}>
								<i className='fa fa-trash'></i>
							</Button>
						</Th>
					</Tr>
				);
			});
	};

	render() {
		return (
			<ThemeProvider theme={this.props.themeToDoList}>
				<Container className='w-50'>
					<Dropdown
						onChange={(e) => {
							let { value } = e.target;
							this.props.dispatch(changeTheme(value));
						}}>
						{this.renderTheme()}
					</Dropdown>
					<Heading1>To Do List</Heading1>
					<TextField
						onChange={(e) => {
							this.setState({ taskName: e.target.value });
						}}
						value={this.state.taskName}
						label='Task name'
						name='taskName'
						className='w-50'
					/>
					<Button
						className='ms-2'
						onClick={() => {
							let newTask = {
								id: Date.now(),
								taskName: this.state.taskName,
								done: false,
							};
							this.props.dispatch(addTask(newTask));
						}}>
						<i className='fa fa-plus me-2'></i>
						Add task
					</Button>
					<Button
						className='ms-2'
						disabled={this.state.disabled}
						onClick={() => {
							let { taskName } = this.state;
							this.setState(
								{
									disabled: true,
									taskName: "",
								},
								() => {
									this.props.dispatch(updateTask(taskName));
								}
							);
						}}>
						<i className='fa fa-upload me-2'></i>
						Update task
					</Button>
					<hr />
					<Heading3>Task to do</Heading3>
					<Table>
						<Thead>{this.renderTaskToDo()}</Thead>
					</Table>
					<Heading3>Task completed</Heading3>
					<Table>
						<Thead>{this.renderTaskComplete()}</Thead>
					</Table>
				</Container>
			</ThemeProvider>
		);
	}

	componentDidUpdate(prevProps, prevState) {
		if (prevProps.taskEdit.id !== this.props.taskEdit.id) {
			this.setState({
				taskName: this.props.taskEdit.taskName,
			});
		}
	}
}
const mapStateToProps = (state) => {
	return {
		themeToDoList: state.ToDoListReducer.themeToDoList,
		taskList: state.ToDoListReducer.taskList,
		taskEdit: state.ToDoListReducer.taskEdit,
	};
};

export default connect(mapStateToProps)(ToDoList);
