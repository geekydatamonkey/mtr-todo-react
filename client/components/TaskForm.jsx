NewTaskForm = React.createClass({

  getInitialState() {
    return {
      userInput: '',
    };
  },

  handleChange(event) {
    this.setState({
      userInput: event.target.value,
    });
  },

  handleSubmit(event) {
    event.preventDefault();
    const text = this.state.userInput.trim();

    Meteor.call('addTask', text);

    // reset form
    this.setState({
      userInput: '',
    });
  },

  render() {
    return (
      <form
        className="new-task"
        onSubmit={this.handleSubmit} >
        <input
          type="text"
          placeholder="Type to add new tasks"
          value={this.state.userInput}
          onChange={this.handleChange} />
      </form>
    );
  },

});
