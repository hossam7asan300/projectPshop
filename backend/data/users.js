import bcrypt from "bcryptjs";
const users = [
   {
      name: "Admin User",
      email: "admin@email.com",
      password: bcrypt.hashSync("123456", 10),
      isAdmin: true,
   },
   {
      name: "Hossam Hasan",
      email: "Hossam@email.com",
      password: bcrypt.hashSync("123456", 10),
      isAdmin: false,
   },
   {
      name: "Aya Gamal",
      email: "Aya@email.com",
      password: bcrypt.hashSync("123456", 10),
      isAdmin: false,
   },
];

export default users;
