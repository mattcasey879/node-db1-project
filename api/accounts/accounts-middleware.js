const Acc = require("./accounts-model")





exports.checkAccountPayload = (req, res, next) => {
  const { name, budget } = req.body
  if (!name || !budget) {
    next({ status: 400, message: "name and budget are required" })
  } else if (typeof name !== 'string') {
    next({ status: 400, message: "name must be a string"})
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
      next({ status: 404, message: "account not found"})
    }
  } catch (err) { next(e) }
    
}
