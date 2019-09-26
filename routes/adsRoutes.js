var adsRouter = require("express").Router();
var {
  getAds,
  getAd,
  postAd,
  updateAd,
  deleteUserAd
} = require("../data/helpers/ads/ads-model.js");
var { validateAd } = require("../middleware/validate.js");
var authenticateUser = require("../data/helpers/auth/auth-middleware.js");

adsRouter.use(authenticateUser);
// adsRouter.use(validateAd);

adsRouter.route("/").get(function rootAdsGETController(_, response) {
  getAds().then(function handleGetAds(result) {
    response.status(200).json({ result });
  });
});

adsRouter
  .route("/:id")
  .get(function idAdsGETController({ params: { id } }, response) {
    getAd(id)
      .then(function handleGetAd(result) {
        if (result) {
          response.status(200).json({ result });
        } else {
          throw new Error("oops there seems to be no ad here!");
        }
      })
      .catch(function handleGetAdError({ message }) {
        response.status(404).json({ message });
      });
  });

adsRouter
  .route("/user/:user_id")
  .post(validateAd, function userAdsPOSTController(request, response) {
    var user_id = request.params.user_id;
    var ad = { ...request.body, user_id };

    postAd(user_id, ad)
      .then(function handlePostAd(result) {
        if (result) {
          response.status(201).json(result);
        } else {
          throw new Error("oops there seems to be no user with that id here!");
        }
      })
      .catch(function handlePostAdError(error) {
        console.log(error);
        response.status(404).json(error.message);
      });
  });

adsRouter
  .route("/user/:user_id/update/:ad_id")
  .put(validateAd, function userAdsPUTController(request, response) {
    var user_id = request.params.user_id;
    var ad_id = request.params.ad_id;
    var change = { ...request.body, user_id };
    updateAd(user_id, ad_id, change)
      .then(function handlePutAd(result) {
        console.log(result);
        if (typeof result == "object") {
          throw new Error(result[0]);
        } else {
          response.status(200).json({ message: "OK updated" });
        }
      })
      .catch(function handlePutAdError({ message }) {
        response.status(404).json({ message });
      });
  });

adsRouter
  .route("/user/:user_id/delete/:ad_id")
  .delete(function userAdsDELETEController(request, response) {
    var user_id = request.params.user_id;
    var ad_id = request.params.ad_id;
    deleteUserAd(user_id, ad_id)
      .then(function handleDeleteUserAd(result) {
        if (Array.isArray(result)) {
          throw new Error(result[0]);
        } else {
          response.status(200).json({ message: "OK deleted." });
        }
      })
      .catch(function handlePutAdError({ message }) {
        response.status(404).json({ message });
      });
  });

module.exports = adsRouter;
