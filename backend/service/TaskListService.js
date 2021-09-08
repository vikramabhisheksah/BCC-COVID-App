(function () {
  var mongoose = require("mongoose");
  var user = mongoose.model("tasklistModel");
  /**
     **_ Function to execute the create query to create the users.
     _** @param {**_} data user data
     _** @param {**_} callback callback function.
     _**/
  exports.createUser = function (data, callback) {
    user.create(data).then(
      (response) => {
        callback(null, response);
      },
      (error) => {
        callback(error, null);
      }
    );
  };

  /**
     _ Funtion to find the user from collections.
     _ @param {_} query condition or expression to find the user from collection.
     _ @param {_} callback callback function
     _/
    exports.findUser = function (query, callback) {
        user.findOne(query, callback);
    }

    /**
     **_ Function to execute the update query by user ID
     _** @param {**_} id user id
     _** @param {**_} data user data which we need to update.
     _**/
  exports.updateUserById = function (id, data, callback) {
    user.findByIdAndUpdate(
      {
        _id: id,
      },
      data,
      (err, response) => {
        callback(err, response);
      }
    );
  };

  /**
     _ Function to execute the update query.
     _ @param {_} query Condition or filter to find the user.
     _ @param {_} data data which we need to update.
     _ @param {_} options 
     _/
    exports.updateUser = function (query, data, options, callback) {
        user.findOneAndUpdate(query, data, options, (err, response) => {
            callback(err, response);
        });
    }

    exports.deleteUser = function (query, callback) {
        user.deleteOne(query, callback);
    }**/
})();
