var login = function(user,password){

    console.log(user,password)
    if(user==="admin@admin.com" && password==="admin"){
        return true;
    } else
    if(user==="fede@admin.com" && password==="fede"){
        return true;
    } else{
        return false;
    }
}

module.exports = { login };
