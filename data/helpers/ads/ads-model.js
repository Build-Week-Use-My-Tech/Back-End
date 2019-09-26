var query = require("../../db-config.js");

module.exports = {
  getAds() {
    return query("ads");
  },
  getAd(id) {
    return query("ads").where("id", id);
  },
  postAd(user_id, ad) {
    return query("users")
      .where("id", user_id)
      .first()
      .then(function validateUserId(result) {
        if (result) {
          return query("ads")
            .insert({ ...ad, user_id }, "id")
            .then(([id]) => {
              return query("ads")
                .where({ id })
                .first();
            });
        } else {
          return undefined;
        }
      });
  },
  updateAd(user_id, ad_id, change) {
    return query("users")
      .where("id", user_id)
      .then(function validateUserId(result) {
        if (result.length > 0) {
          return query("ads")
            .where("id", ad_id)
            .then(function validateAdId(result) {
              if (result.length > 0) {
                return query("ads")
                  .update(change)
                  .where("id", ad_id);
              } else {
                return ["Invalid ad id"];
              }
            });
        } else {
          return ["Invalid user id"];
        }
      });
  },
  deleteUserAd(user_id, ad_id) {
    return query("users")
      .where("id", user_id)
      .first()
      .then(function validateUserId(result) {
        if (result) {
          return query("ads")
            .where("id", ad_id)
            .first()
            .then(function validateAdId(result) {
              if (result) {
                return query("ads")
                  .del()
                  .where("id", ad_id);
              } else {
                return ["Ad doesn't exist"];
              }
            });
        } else {
          return ["User doesn't exist"];
        }
      });
  }
};
