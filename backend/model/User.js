class User {
    constructor(
        user_num,
        user_pwd,
        user_name,
        user_email,
        profile_img,
        signup_date,
        
    ) {
        this.user_num = user_num;
        this.user_pwd = user_pwd;
        this.user_name = user_name;
        this.user_email = user_email;
        this.profile_img = profile_img;
        this.signup_date = signup_date;
    }
}

module.exports = User