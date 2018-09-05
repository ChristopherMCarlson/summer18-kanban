let router = require('express').Router()
let Tasks = require('../models/task')


//GETS ALL TASKS BELONGING TO LIST
router.get('/:listId', (req, res, next) => {
  Tasks.find({ listId: req.params.listId })
    .then(data => {
      res.send(data)
    })
    .catch(err => {
      console.log(err)
      next()
    })
})


//MAKES A NEW TASK
router.post('/:listId', (req, res, next) => {
  req.body.authorId = req.session.uid
  req.body.listId = req.params.listId
  Tasks.create(req.body)
    .then(newList => {
      res.send(newList)
    })
    .catch(err => {
      console.log(err)
      next()
    })
})


//CREATES A NEW COMMENT ON SPECIFIC TASK
router.post('/:taskId/comments', (req, res, next) => {
  Tasks.findById(req.params.taskId)
    .then(task => {
      task.comments = task.comments.concat(req.body)
      task.save((err) => {
        if (err) {
          console.log(err)
          return res.status(500).send(err)
        }
        return res.send(task)
      })
    })
    .catch(err => {
      console.log(err)
      next()
    })
})


//GOOD LOGIC FOR LATER
// router.post('/:taskId/comments', (req, res, next) => {
//   Tasks.findByIdAndUpdate(req.params.taskId, { $push: { comments: req.body } })
//     .then(task => {
//       return res.send(task)
//     })
//     .catch(err => {
//       console.log(err)
//       next()
//     })
// })


//EDITS COMMENTS
router.put('/:taskId/comments/:commentId', (req, res, next) => {
  Tasks.findById(req.params.taskId)
    .then(task => {
      let comment = task.comments.find(c => c._id == req.params.commentId)
      comment.description = req.body.description
      console.log(comment.description)
      res.send(task)
    })
    .catch(err => {
      console.log(err)
      next()
    })
})


//DELETE SPECIFIC COMMENTS ON TASKS
router.delete('/:taskId/comments/:commentId', (req, res, next) => {
  Tasks.findById(req.params.taskId)
    .then(task => {
      task.comments.id(req.params.commentId).remove();
      task.save()
      res.send(task)
    })
    .catch(err => {
      console.log(err)
      next()
    })
})


//UPDATES TASKS TO NEW LISTS
router.put('/:taskId', (req, res, next) => {
  Tasks.findByIdAndUpdate(req.params.taskId, req.body)
    .then(() => res.send({
      message: 'Task updated!'
    }))
})


//DELETES A SINGLE TASK
router.delete('/:id', (req, res, next) => {
  Tasks.findById(req.params.id)
    .then(list => {
      if (!list.authorId.equals(req.session.uid)) {
        return res.status(401).send("ACCESS DENIED!")
      }
      Tasks.findByIdAndRemove(req.params.id)
        .then(data => {
          res.send('DELORTED')
        })
    })
})

module.exports = router