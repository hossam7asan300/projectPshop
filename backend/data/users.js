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
      isSupplier: false,
   },
   {
      name: "Aya Gamal",
      email: "Aya@email.com",
      password: bcrypt.hashSync("123456", 10),
      isAdmin: false,
      isSupplier: false,
   },
   {
      name: "supp1",
      email: "supp1@email.com",
      password: bcrypt.hashSync("123456", 10),
      isAdmin: false,
      isSupplier: true,
   },
];

export default users;
