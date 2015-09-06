// Child Components
/* global Task:true */

App = React.createClass({
  mixins: [ReactMeteorData],

  getMeteorData() {
    return {
      tasks: Tasks.find({}).fetch(),
    };
  },

  // getTasks() {
  //   return [
  //     { _id: 1, text: 'this is task 1.'},
  //     { _id: 2, text: 'this is task 2.'},
  //     { _id: 3, text: 'this is task 3.'},
  //     { _id: 4, text: 'this is task 4.'},
  //   ];
  // },

  handleSubmit(event) {
    event.preventDefault();

    // find text via Reactive Ref
    const inputEl = React.findDOMNode(this.refs.textInput);

    Tasks.insert({
      text: inputEl.value.trim(),
      createdAt: new Date(),
    });

    // Clear form
    inputEl.value = '';
  },

  renderTasks() {
    return this.data.tasks.map((task) => {
      return (
        <Task key={task._id} task={task} />
      );
    });
  },

  render() {
    return (
      <div className="container">
        <header>
          <h1>To Do List</h1>

          <form className="new-task" onSubmit={this.handleSubmit} >
            <input
              ref="textInput"
              type="text"
              placeholder="Type to add new tasks"
            />
          </form>

        </header>
        <ul className="tasks">
          { this.renderTasks() }
        </ul>
      </div>
    );
  },
});
