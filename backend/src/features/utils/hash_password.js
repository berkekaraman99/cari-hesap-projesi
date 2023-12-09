import bcrypt from "bcrypt";

export const hashPassword = async (password) => {
  const saltRounds = 10;

  try {
    let x;
    const hashedPassword = await bcrypt
      .genSalt(saltRounds)
      .then((salt) => {
        x = bcrypt.hash(password, salt);
      })
      .then((hash) => {
        console.log("Hash: ", hash);
      })
      .catch((err) => console.log(err.message));
    console.log("x, ", x);
    return x;
  } catch (error) {
    throw new Error("Hash hatası: " + error.message);
  }
};

export const comparePassword = async (password, hashedPassword) => {
  try {
    const match = await bcrypt.compare(password, hashedPassword);
    return match;
  } catch (error) {
    throw new Error("Şifre karşılaştırma hatası: " + error.message);
  }
};
