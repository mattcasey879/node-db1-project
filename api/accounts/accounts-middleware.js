const Acc = require("./accounts-model")





exports.checkAccountPayload = (req, res, next) => {
  const { name, budget } = req.body
  if (!name || !budget) {
    next({ status: 404, message: "name and budget are required" })
  } else {
    next()
  }
} 

exports.checkAccountNameUnique = (req, res, next) => {
  // DO YOUR MAGIC
}

exports.checkAccountId = async (req, res, next) => {
  try {
    const account = await Acc.getById(req.params.id)

    if (account) {
      res.account = account
      next();
    } else {
      next({ status: 404, message: "No account with that ID"})
    }
  } catch (err) { next(e) }
    
}
