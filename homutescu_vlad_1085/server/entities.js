import Sequelize from "sequelize";

const sequelize = new Sequelize({
  storage: "./database.db",
  dialect: "sqlite",
  logging: false,
});

const VirtualShelf = sequelize.define("VirtualShelf", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  descriere: {
    type: Sequelize.STRING,
    allowNull: false,
    length: { minimum: 3 },
  },
});

const Book = sequelize.define("Book", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  titlu: {
    type: Sequelize.STRING,
    allowNull: false,
    length: { minimum: 5 },
  },
  genLiterar: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  url: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      isUrl: true,
    },
  },
});

VirtualShelf.hasMany(Book, { foreigKey: "VirtualShelfID" });
Book.belongsTo(VirtualShelf, { foreigKey: "VirtualShelfID" });

async function initialize() {
  await sequelize.authenticate();
  await sequelize.sync({});
}

export { initialize, VirtualShelf, Book };
