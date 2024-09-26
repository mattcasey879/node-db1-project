const db = require("../../data/db-config")


const getAll = () => {
  return db("accounts")
}

const getById = id => {
  return db("accounts").where({id: id }).first(); 
}

const create = async account => {
  const [id] = await db("accounts").insert(account)
  const newAcc = getById(id)
  return newAcc;

}

const updateById = async (id, account) => {
  // DO YOUR MAGIC
  await db("accounts").where({ id: id }).update(account)

  return getById(id);
}

const deleteById = async id => {
  const deleteAcc = await getById(id)
  await db("accounts").where({ id: id }).delete()
  return deleteAcc;
}

module.exports = {
  getAll,
  getById,
  create,
  updateById,
  deleteById,
}
