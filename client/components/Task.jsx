Task = React.createClass({

  propTypes: {
    task: React.PropTypes.object.isRequired,
    onToggle: React.PropTypes.func.isRequired,
    onRemove: React.PropTypes.func.isRequired,
    loggedIn: React.PropTypes.bool,
  },

  deleteThisTask() {
    this.props.onRemove(this.props.task);
  },

  toggleChecked() {
    this.props.onToggle(this.props.task);
  },

  getClassName() {
    return this.props.task.checked ? 'checked' : '';
  },

  renderCheckbox() {
    // only show if logged in
    if (!this.props.loggedIn) {
      return;
    }

    return (
      <input
        type="checkbox"
        readOnly={true}
        checked={this.props.task.checked}
        onChange={this.toggleChecked}
      />
    );
  },

  renderDeleteButton() {
    if (!this.props.loggedIn) {
      return;
    }

    return (
      <button className="delete" onClick={this.deleteThisTask}>
        &times;
      </button>
    );
  },

  render() {
    return (
      <li className={ this.getClassName() }>
        { this.renderDeleteButton() }
        { this.renderCheckbox() }
        <span className="text">
          <TaskOwner task={this.props.task} />
          { this.props.task.text }
        </span>
      </li>
    );
  },

});
