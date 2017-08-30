//lists um....
let Lists = require('../models/list')
let Tasks = require('../models/task')
let Comments = require('../models/comment')

module.exports = {
  userLists: {
    path: '/userlists',
    reqType: 'get',
    method(req, res, next) {
      let action = 'Find Board Lists'
      Lists.find({ creatorId: req.session.uid })
        .then(lists => {
          res.send(handleResponse(action, lists))
        }).catch(error => {
          return next(handleResponse(action, null, error))
        })
    }
  },
  
  listAllTasks: {
    path: '/lists/:listId/tasks',
    reqType: 'get',
    method(req, res, next) {
      let action = 'Find all Tasks of one list'
      Tasks.find({ listId: req.params.listId }) //in Lists, find all boards with boardIdxxx
        .then(tasks => {
          res.send(handleResponse(action, tasks))
        }).catch(error => {
          return next(handleResponse(action, null, error))
        })
    }
  },

  aTask: {
    path: '/lists/:listId/tasks/:taskId',
    reqType: 'get',
    method(req, res, next) {
      let action = 'Find a specific Task'
      Tasks.findById(req.params.taskId) //in Lists, find all boards with boardIdxxx
        .then(task => {
          res.send(handleResponse(action, task))
        }).catch(error => {
          return next(handleResponse(action, null, error))
        })
    }
  },

  taskAllComments: {
    path: '/lists/:listId/tasks/:taskId/comments',
    reqType: 'get',
    method(req, res, next) {
      let action = 'Find all Comments of a specific task' //No Comment :)
      Comments.find({ taskId: req.params.taskId }) //in Lists, find all boards with boardIdxxx
        .then(comments => {
          res.send(handleResponse(action, comments))
        }).catch(error => {
          return next(handleResponse(action, null, error))
        })
    }
  },


  aComment: {
    path: '/lists/:listId/tasks/:taskId/comments/:commentId',
    reqType: 'get',
    method(req, res, next) {
      let action = 'Find a specific comment' //No Comment :)
      Comments.findById(req.params.commentId) //in Lists, find all boards with boardIdxxx
        .then(comment => {
          res.send(handleResponse(action, comment))
        }).catch(error => {
          return next(handleResponse(action, null, error))
        })
    }
  },




  sharedLists: {
    path: '/sharedLists',
    reqType: 'get',
    method(req, res, next) {
      Lists.find({ collaborators: { $in: req.session.uid } })
        .then(lists => {
          res.send(handleResponse(action, lists))
        }).catch(error => {
          return next(handleResponse(action, null, error))
        })
    }
  }
}


function handleResponse(action, data, error) {
  var response = {
    action: action,
    data: data
  }
  if (error) {
    response.error = error
  }
  return response
}