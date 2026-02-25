const bcrypt = require('bcrypt');

const PASSWORD = '';

async function hashPassword (password) {
    const hash = await bcrypt.hash(password, 10);
    console.log(hash);
}


hashPassword(PASSWORD);