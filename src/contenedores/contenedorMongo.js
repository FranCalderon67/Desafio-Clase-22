const { MongoClient } = require("mongodb");

class ContenedorMongoDB {
  constructor(connection, db, collection) {
    this.mongo = new MongoClient(connection);
    this.db = db;
    this.collection = collection;
  }
  async conectarMongo() {
    try {
      await this.mongo.connect();
      console.log("Conectado a Mongo Atlas");
    } catch (error) {
      throw error;
    }
  }
  async obtenerTodos() {
    try {
      const data = await this.mongo.db(this.db).collection(this.collection).find({}).toArray();
      return data;
    } catch (error) {
      throw error;
    }
  }
  async obtenerPorId(id) {
    try {
      const data = await this.mongo.db(this.db).collection(this.collection).findOne({ id: id });
      return data;
    } catch (error) {
      throw error;
    }
  }
  async agregarItem(data) {
    try {
      await this.mongo.db(this.db).collection(this.collection).insertOne(data);
      return data.id;
    } catch (error) {
      throw error;
    }
  }
  async actualizarItem(id, data) {
    try {
      return await this.mongo.db(this.db).collection(this.collection).updateOne({ id: id }, { $set: data });
    } catch (error) {
      throw error;
    }
  }
  async eliminarItem(id) {
    try {
      return await this.mongo.db(this.db).collection(this.collection).deleteOne({ id: id });
    } catch (error) {
      throw error;
    }
  }

  async obtenerUsuario(email) {
    try {
      const data = await this.mongo.db(this.db).collection(this.collection).findOne({ email: email });
      return data;
    } catch (error) {
      throw error;
    }
  }
}

module.exports = ContenedorMongoDB;
