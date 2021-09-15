const router = require('express').Router()
const { checkAccountId, checkAccountPayload } = require("./accounts-middleware")
const Acc = require("./accounts-model");

router.get('/',async (req, res, next) => {
  try {
    const data = await Acc.getAll()
    res.json(data)
  } catch (err) {
    next(err)
  }
  
  // DO YOUR MAGIC
})

router.get('/:id', checkAccountId, async (req, res, next) => {
  // DO YOUR MAGIC
  res.json(res.account)
})

router.post('/', checkAccountPayload, (req, res, next) => {
  const newAcc = req.body
  // using async await 
  //    try {
  //   const data = await Acc.create(newAcc)
  //   res.status(200).json(data)
  // } catch (e) {
  //   next(e)
  // }
  // ending of using async await
  Acc.create(newAcc)
  .then(acc => res.status(201).json(acc))
  .catch(next)
})

router.put('/:id', checkAccountId, checkAccountPayload, async(req, res, next) => {
  const acc = req.body
  try {
    const newAcc = await Acc.updateById(req.params.id, acc)
    res.status(200).json(newAcc)
  } catch (err) {
    next(err)
  }
});

router.delete('/:id', checkAccountId, (req, res, next) => {
  const { id } = req.params
  Acc.deleteById(id)
  .then(data => res.status(200).json(data))
  .catch(next)
})

router.use((err, req, res, next) => { // eslint-disable-line
  res.status( err.status || 500).json({ message: err.message || "Error with the accounts!"})
})

module.exports = router;
