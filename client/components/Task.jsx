Task = React.createClass({

  propTypes: {
    task: React.PropTypes.object.isRequired,
    onToggle: React.PropTypes.func.isRequired,
    onRemove: React.PropTypes.func.isRequired,
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

  render() {
    return (
      <li className={ this.getClassName() }>
        <button className="delete" onClick={this.deleteThisTask}>
          &times;
        </button>

        <input
          type="checkbox"
          readOnly={true}
          checked={this.props.task.checked}
          onChange={this.toggleChecked}
        />

        <span className="text">
          {this.props.task.text}
        </span>
      </li>
    );
  },

});
