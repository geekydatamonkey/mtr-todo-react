Meteor.publish('tasks', function() {
  return Tasks.find({
    $or: [
      { private: {$ne: true} },
      { owner: this.userId },
    ],
  });
});


/**
* fat arrow binding and this.userId
* don't work as expected this 1.2-RC12
* TODO: submit issue for code below
*/

// Meteor.publish('tasks', function() {
//   return Tasks.find(
//     { owner: this.userId }
//   );
// });

