import bcrypt from "bcryptjs";

const hashPasword = password => bcrypt.hashSync(password, bcrypt.genSaltSync(12));

export default hashPasword;
