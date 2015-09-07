function isTaskOwnedByUser(taskId) {
  check(taskId, String);

  const theTask = Tasks.findOne(taskId);
  if (!theTask) {
    throw Meteor.Error('task-id-not-found',
      `Task Id "${taskId}" not found in the collection`);
  }
  return theTask.owner === Meteor.userId();
}

Meteor.methods({
  addTask(todoText) {
    check(todoText, String);

    if (!Meteor.userId()) {
      throw new Meteor.Error('Not Authorized');
    }

    Tasks.insert({
      text: todoText,
      createdAt: new Date(),
      owner: Meteor.userId(),
      username: Meteor.user().username,
      checked: false,
      private: false,
    });
  },

  removeTask(taskId) {
    check(taskId, String);

    if (!Meteor.userId()) {
      throw new Meteor.Error('not-authorized');
    }

    if (!isTaskOwnedByUser(taskId)) {
      throw new Meteor.Error('not-authorized',
       'You must own a task to remove it.');
    }

    Tasks.remove(taskId);
  },

  setChecked(taskId, isChecked) {
    check(taskId, String);
    check(isChecked, Boolean);

    if (!Meteor.userId()) {
      throw new Meteor.Error('not-authorized');
    }

    Tasks.update(taskId, {
      $set: {
        checked: isChecked,
      },
    });
  },

  setPrivate(taskId, isPrivate) {
    check(taskId, String);
    check(isPrivate, Boolean);

    if (!isTaskOwnedByUser(taskId)) {
      throw new Meteor.Error('not-authorized',
       'Only task owners may change public/private.');
    }

    Tasks.update(taskId, {
      $set: {
        private: isPrivate,
      },
    });
  },

});
