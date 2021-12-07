import { Sequelize, Options } from "sequelize";
const dbUrl: string = process.env.DB_URL || "";
const nodeEnv: string = process.env.NODE_ENV || "";

if (!dbUrl) {
  console.log("Please create .env file, refer .env.sample");
  process.exit(0);
}

let optionsObj: object = {
  benchmark: true,
  logging: console.log,
  // ssl: true,
  dialect: "postgres",
  protocol: "postgres",
  dialectOptions: {
    ssl: true,
    rejectUnauthorized: false,
  },
};

if (nodeEnv && nodeEnv === "production") {
  optionsObj = { logging: false };
}
const options: Options = optionsObj;
// #Host=ec2-34-236-136-215.compute-1.amazonaws.com;
// #port=5432; Username =ydutkwroypjelv;
// #password =3bbacb290e76c0e2e87a98e62874fc6a4f179d05e7e62aacb5e34b83b4171bce;
// #Database=d9o6mohhkssd06;sslmode=Prefer;Trust Server Certificate=true

export const sequelize: Sequelize = new Sequelize({
  database: "d9o6mohhkssd06",
  username: "ydutkwroypjelv",
  password: "3bbacb290e76c0e2e87a98e62874fc6a4f179d05e7e62aacb5e34b83b4171bce",
  host: "ec2-34-236-136-215.compute-1.amazonaws.com",
  port: 5432,
  dialect: "postgres",
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false, // <<<<<<< YOU NEED THIS
    },
  },
});

sequelize
  .authenticate()
  .then(() => {
    console.log("Connection has been established successfully..");
  })
  .catch((err) => {
    console.error("Unable to connect to the database:", err);
  });
