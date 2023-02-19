class collection {
  constructor(model) {
    this.model = model;
  }

  ////////////creat=insert///////////////////////////

  async create(obj) {
    
    let newHistory = await this.model.create(obj);
    return newHistory;
  }
  /////////////read//////////////////////////
  async read(id) {
    let history = null;

    if (id) {
      history = await this.model.findOne({ where: { id: id } });
      return history;
    } else {
      history = await this.model.findAll();
      return history;
    }
  }
  //////////////update///////////////////////
  async update(id, obj) {
    let updated = await this.model.update(obj, { where: { id: id } });
    return updated;
  }
  ///////////////delete/////////////////
  async delete(id) {
    let deleted = await this.model.destroy({ where: { id: id } });
    return deleted;
  }
  async readByUsername(username) {
    let user = null;

    user = await this.model.findOne({ where: { username: username } });
    return user;
  }
}

module.exports = collection;
