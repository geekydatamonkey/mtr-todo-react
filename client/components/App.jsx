// Child Components
/* global
  Task:true
  TaskForm:true
  HideCompleted:true
*/

App = React.createClass({
  mixins: [ReactMeteorData],

  getInitialState() {
    return {
      userInput: '',
      hideCompleted: false,
    };
  },

  getMeteorData() {
    let query = {};

    if (this.state.hideCompleted) {
      query = {checked: {$ne: true}};
    }

    return {
      tasks: Tasks.find(query, {sort: {createdAt: -1}}).fetch(),
    };
  },

  onUserInput(str) {
    this.setState({
      userInput: str,
    });
  },

  addTodo(todoText) {
    Tasks.insert({
      text: todoText,
      createdAt: new Date(),
    });

    // reset form
    this.setState({ userInput: '' });
  },

  toggle(todo) {
    Tasks.update(todo._id, {
      $set: {
        checked: !todo.checked,
      },
    });
  },

  remove(todo) {
    Tasks.remove(todo._id);
  },

  toggleHideCompleted() {
    this.setState({
      hideCompleted: !this.state.hideCompleted,
    });
  },

  renderTasks() {
    return this.data.tasks.map((task) => {
      return (
        <Task
          key={task._id}
          task={task}
          onToggle={this.toggle}
          onRemove={this.remove}
        />
      );
    });
  },

  render() {
    return (
      <div className="container">
        <header>
          <h1>To Do List</h1>
          <HideCompleted
            hideCompleted={this.state.hideCompleted}
            onToggle={this.toggleHideCompleted}
          />
          <TaskForm
            userInput={this.state.userInput}
            onEdit={this.onUserInput}
            onSave={this.addTodo}
          />
        </header>
        <ul className="tasks">
          { this.renderTasks() }
        </ul>
      </div>
    );
  },
});
