var query = require("../queryBuilder.js");

module.exports = {
    getUsers(){
        return query("users").select("*").from("users");
    },
    getUser(id){
        return query("users").select("*").from("users").where("id", id);
    },
    updateUser(id, change){
        return query("users").where("id", id).update(change);
    },
    insertUser(user){
        return query("users").insert(user);
    },
    deleteUser(id){
        return query("users").where("id", id).del()
    },
    getLogin(id){
        return query("users").select("email", "password").where("id", id);
    },
    getUserAds(id){
        return query("users").join("ads", "user_id", "=", id).select("*")
    }
}