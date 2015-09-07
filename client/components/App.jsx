// Child Components
/* global
  Task:true
  NewTaskForm:true
  HideCompleted:true
  AccountsUI:true
*/

App = React.createClass({
  mixins: [ReactMeteorData],

  getInitialState() {
    return {
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

  add(todoText) {
    Meteor.call('addTask', todoText);

    // reset form
    this.setState({ userInput: '' });
  },

  toggle(todo) {
    Meteor.call('setChecked', todo._id, !todo.checked);
  },

  remove(todo) {
    Meteor.call('removeTask', todo._id);
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
          loggedIn={ this.isLoggedIn() }
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
          <AccountsUI />
          <NewTaskForm show={this.isLoggedIn()} />
        </header>

        <ul className="tasks">
          { this.renderTasks() }
        </ul>
      </div>
    );
  },
});
