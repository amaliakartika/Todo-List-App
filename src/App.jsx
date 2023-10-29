import React, { Component } from 'react';
import './App.css'; // Import file CSS


class TodoApp extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tasks: [],
            taskText: "",
            filter: "all",
            editIndex: -1,
        };
    }

    addTask = () => {
        if (this.state.taskText.trim() !== "") {
            const newTask = {
                text: this.state.taskText,
                completed: false,
            };
            this.setState({
                tasks: [...this.state.tasks, newTask],
                taskText: "",
            });
        }
    }

    handleInputChange = (event) => {
        this.setState({ taskText: event.target.value });
    }

    toggleTask = (index) => {
        const updatedTasks = [...this.state.tasks];
        updatedTasks[index].completed = !updatedTasks[index].completed;
        this.setState({ tasks: updatedTasks });
    }

    deleteTask = (index) => {
        const updatedTasks = [...this.state.tasks];
        updatedTasks.splice(index, 1);
        this.setState({ tasks: updatedTasks, editIndex: -1 });
    }

    editTask = (index, newText) => {
        const updatedTasks = [...this.state.tasks];
        updatedTasks[index].text = newText;
        this.setState({ tasks: updatedTasks, editIndex: -1 });
    }

    changeFilter = (filter) => {
        this.setState({ filter });
    }

    getFilteredTasks = () => {
        const { tasks, filter } = this.state;
        if (filter === "active") {
            return tasks.filter(task => !task.completed);
        } else if (filter === "complete") {
            return tasks.filter(task => task.completed);
        } else {
            return tasks;
        }
    }

    render() {
        return (
            <div>
                <h1>Whats's the plan for today?</h1>
                <div>
                    <input
                        type="text"
                        placeholder="What to do"
                        value={this.state.taskText}
                        onChange={this.handleInputChange}
                    />
                    <button onClick={this.addTask}>Add</button>
                </div>
                <div>
                    <button onClick={() => this.changeFilter("all")}>ALL</button>
                    <button onClick={() => this.changeFilter("active")}>ACTIVE</button>
                    <button onClick={() => this.changeFilter("completed")}>COMPLETED</button>
                </div>
                <ul>
                    {this.getFilteredTasks().map((task, index) => (
                        <li key={index} className={task.completed ? 'completed' : ''}>
                            <input
                                type="checkbox"
                                checked={task.completed}
                                onChange={() => this.toggleTask(index)}
                            />
                            {this.state.editIndex === index ? (
                                <input
                                    type="text"
                                    value={task.text}
                                    onChange={(e) => this.editTask(index, e.target.value)}
                                    onBlur={() => this.editTask(index, task.text)}
                                />
                            ) : (
                                <span
                                    onDoubleClick={() => this.setState({ editIndex: index })}
                                >
                                    {task.text}
                                </span>
                            )}
                            <button onClick={() => this.deleteTask(index)}>Hapus</button>
                        </li>
                    ))}
                </ul>
            </div>
        );
    }
}

export default TodoApp;