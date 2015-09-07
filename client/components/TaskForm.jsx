TaskForm = React.createClass({

  propTypes: {
    userInput: React.PropTypes.string.isRequired,
    onSave: React.PropTypes.func.isRequired,
    onEdit: React.PropTypes.func.isRequired,
  },

  handleChange(event) {
    this.props.onEdit(event.target.value);
  },

  handleSubmit(event) {
    event.preventDefault();
    const text = React.findDOMNode(this.refs.textInput).value.trim();

    this.props.onSave(text);
  },

  render() {
    return (
      <form
        className="new-task"
        onSubmit={this.handleSubmit} >
        <input
          ref="textInput"
          type="text"
          placeholder="Type to add new tasks"
          value={this.props.userInput}
          onChange={this.handleChange} />
      </form>
    );
  },

});
