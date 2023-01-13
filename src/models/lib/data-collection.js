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
      return "error in creating a new history";
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
      console.error("error in reading history in model ", this.model);
      return "error in reading history";
    }
  }
  //////////////update///////////////////////
  async update(id, obj) {
    try {
      let updated = await this.model.update(obj);
      return updated;
    } catch (error) {
      console.error("error while updating  history in ", this.model);
      return "error while updating  history";
    }
  }
  ///////////////delete/////////////////
  async delete(id) {
    try {
      let deleted = null;
      deleted = await this.model.destroy({ where: { id: id } });
      return deleted;
    } catch (error) {
      console.error("error while deleting  history in ", this.model);
      return "error while deleting  history";
    }
  }
}

module.exports = collection;
