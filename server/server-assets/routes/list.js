let router = require('express').Router()
let Lists = require('../models/list')

router.get('/:boardId', (req, res, next) => {
  Lists.find({ boardId: req.params.boardId })
    .then(data => {
      res.send(data)
    })
    .catch(err => {
      console.log(err)
      next()
    })
})

router.post('/:boardId', (req, res, next) => {
  req.body.authorId = req.session.uid
  req.body.boardId = req.params.boardId
  Lists.create(req.body)
    .then(newList => {
      res.send(newList)
    })
    .catch(err => {
      console.log(err)
      next()
    })
})

router.put('/:id', (req, res, next) => {
  Lists.findByIdAndUpdate(req.params.id, req.body)
    .then(() => res.send({
      message: "List Updated"
    }))
})

router.delete('/:id', (req, res, next) => {
  Lists.findById(req.params.id)
    .then(list => {
      if (!list.authorId.equals(req.session.uid)) {
        return res.status(401).send("ACCESS DENIED!")
      }
      Lists.findByIdAndRemove(req.params.id)
        .then(data => {
          res.send('DELORTED')
        })
    })
})

module.exports = router