/* global App:true */

Meteor.startup(() => {
  React.render(<App />, document.getElementById('render-target'));
});
