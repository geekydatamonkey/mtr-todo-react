// Child Components
/* global
  Task:true
  TaskForm:true
  HideCompleted:true
  AccountsUI:true
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

    // get incomplete tasks only
    // if hideCompleted is checked
    if (this.state.hideCompleted) {
      query = {checked: {$ne: true}};
    }

    return {
      tasks: Tasks
        .find(query, {sort: {createdAt: -1}})
        .fetch(),
      incompleteCount: Tasks
        .find({checked: {$ne: true}})
        .count(),
      currentUser: Meteor.user(),
    };
  },

  isLoggedIn() {
    return !!this.data.currentUser;
  },

  onUserInput(str) {
    this.setState({
      userInput: str,
    });
  },

  addTodo(todoText) {
    if (!this.isLoggedIn()) {
      console.error('Cannot add task if you are not logged in');
      return;
    }

    Tasks.insert({
      text: todoText,
      createdAt: new Date(),
      owner: Meteor.userId(),
      username: Meteor.user().username,
    });

    // reset form
    this.setState({ userInput: '' });
  },

  toggle(todo) {
    if (!this.isLoggedIn()) {
      return;
    }

    Tasks.update(todo._id, {
      $set: {
        checked: !todo.checked,
      },
    });
  },

  remove(todo) {
    if (!this.isLoggedIn()) {
      return;
    }

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
          loggedIn={ this.isLoggedIn() }
        />
      );
    });
  },

  renderTaskForm() {
    // only show task form if logged in
    if (this.isLoggedIn()) {
      return (
        <TaskForm
            userInput={this.state.userInput}
            onEdit={this.onUserInput}
            onSave={this.addTodo}
          />
      );
    }
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
          <AccountsUI />
          { this.renderTaskForm() }
        </header>

        <ul className="tasks">
          { this.renderTasks() }
        </ul>
      </div>
    );
  },
});
