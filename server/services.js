
module.exports = {
    HelloWorld: async ({name, lastname}) => {
        return `Hello ${name} ${lastname}, this is a message from beyond!`;
    },
    CalculateAge: async ({year, month, day}) => {
        let date = new Date(new Date() - new Date(year, month, day)).getFullYear() - 1970;
        return {message: "Your age is:", age: date};
    },
    Profile: async ({age, name, nationality}) => {
        return {
            name: name,
            age: age,
            nationality: nationality,
            registered: true
        }
    },
    Login: async ({email, password}) => {
        if(email === "guzowskd@tcd.ie" && password === "pass") {
            let token = jwt.sign({user_name: "Dominik Guzowski", is_admin:true}, process.env.AUTHENTICTION_SECRET);
            return {user_name: "Dominik Guzowski", is_admin:true, token: token.replaceAll(".", "###")};
        }
    }
};