var query = require("../queryBuilder.js");

module.exports = {
    getAds(){
        return query("ads").select("*").from("ads");
    },
    getAd(id){
        return query("ads").where("id", id).select("*");
    },
    updateAd(id, change){
        return query("ads").where("id", id).update(change);
    },
    insertAd(ad){
        return query("ad").insert(ad);
    },
    deleteAd(id){
        return query("ad").where("id", id).del();
    },

}