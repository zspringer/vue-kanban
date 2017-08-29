//lists um....
let Lists = require('../models/list')
let Tasks = require('../models/task')
let Comments = require('../models/comment')

module.exports = {
  userLists: {
    path: '/userlists',
    reqType: 'get',
    method(req, res, next){
      let action = 'Find Board Lists'
      Lists.find({creatorId: req.session.uid})
        .then(lists => {
          res.send(handleResponse(action, lists))
        }).catch(error => {
          return next(handleResponse(action, null, error))
        })
    }
  },
  sharedLists: {
    path: '/sharedLists',
    reqType: 'get',
    method(req, res, next){
      Lists.find({collaborators: { $in: req.session.uid}})
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