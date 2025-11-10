import jwt from "jsonwebtoken";

const generateToken = (id) => {
  // Using a hardcoded secret so it works on all systems without .env
  const secret = "supersecretkey123";  // you can name it anything

  return jwt.sign({ id }, secret, {
    expiresIn: "30d",
  });
};

export default generateToken;
