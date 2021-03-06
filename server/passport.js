const bcrypt = require("bcrypt");
const LocalStrategy = require("passport-local").Strategy;

module.exports = (passport, db) => {
  passport.use(
    new LocalStrategy((username, password, cb) => {
      db.query(
        "SELECT id, username, pass FROM admins WHERE username=$1",
        [username],
        (err, result) => {
          if (err) {
            console.error("Error when selecting user on login", err);
            return cb(err);
          }

          if (result.rows.length > 0) {
            const first = result.rows[0];
            bcrypt.compare(password, first.pass, function (err, res) {
              if (res) {
                cb(null, {
                  id: first.id,
                  username: first.username
                });
              } else {
                cb(null, false);
              }
            });
          } else {
            cb(null, false);
          }
        }
      );
    })
  );

  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser((id, cb) => {
    db.query(
      "SELECT id, username FROM admins WHERE id = $1",
      [parseInt(id, 10)],
      (err, results) => {
        if (err) {
          console.error(
            "Error when selecting user on session deserialize",
            err
          );
          return cb(err);
        }

        cb(null, results.rows[0]);
      }
    );
  });
};
