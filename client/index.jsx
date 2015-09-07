/* global App:true */

Accounts.ui.config({
  passwordSignupFields: 'USERNAME_ONLY',
});

Meteor.startup(() => {
  React.render(
    <App />,
    document.getElementById('render-target')
  );
});
