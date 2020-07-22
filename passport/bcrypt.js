const bcrypt = require('bcrypt')

const saltRounds = 10;
const myPassword = '12345';
const testPassword = 'password2';
const a = '$2b$10$Es29aPU/0fGDU6B08pNDPOHL4wokeeMHs1W1Pwrsn6jUSFxVbMrhC'


module.exports.encryptPwd = async (password) => {
    try {
        let hashedPwd = await bcrypt.hash(password, saltRounds)
        return hashedPwd
    }
    catch (err) {
        console.log(err)
    }

}

module.exports.comparePwd = async (password, hashed) => {
    try {
        let res = await bcrypt.compare(password, hashed)
        return res
    }
    catch (err) {
        console.log(err)
    }
}

