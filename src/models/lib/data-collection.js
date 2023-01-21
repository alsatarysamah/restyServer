class collection {
  constructor(model) {
    this.model = model;
  }

  ////////////creat=insert///////////////////////////

  async create(obj) {
    try {
      let newhistory = await this.model.create(obj);
      return newhistory;
    } catch (e) {
      console.log(e);
      console.error("error in creating a new history in model ", this.model);
      return e.message;
    }
  }
  /////////////read//////////////////////////
  async read(id) {
    try {
      let history = null;

      if (id) {
        history = await this.model.findOne({ where: { id: id } });
        return history;
      } else {
        history = await this.model.findAll();
        return history;
      }
    } catch (e) {
      return e.message;
    }
  }
  //////////////update///////////////////////
  async update(id, obj) {
    try {
      let updated = await this.model.update(obj);
      return updated;
    } catch (error) {
      return e.message;
    }
  }
  ///////////////delete/////////////////
  async delete(id) {
    try {
      let deleted = await this.model.destroy({ where: { id: id } });
      return deleted;
    } catch (error) {
      return error.message;
    }
  }
  async readByUsername(username) {
    try {
      let user = null;

      
        user = await this.model.findOne({ where: { username: username } });
        return user;
      
    } catch (e) {
      return e.message;
    }
  }
}

module.exports = collection;
