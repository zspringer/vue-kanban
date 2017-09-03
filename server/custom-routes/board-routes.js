//board has lists made up of a single list model
let Boards = require('../models/board')
let Lists = require('../models/list')
let Tasks = require('../models/task')
let Comments = require('../models/comment')

module.exports = {

    boardAllLists: {
        path: '/boards/:boardId/lists',
        reqType: 'get',
        method(req, res, next) {
            let action = 'Find Board Lists'
            Lists.find({ boardId: req.params.boardId }) 
                .then(lists => {
                    res.send(handleResponse(action, lists))
                }).catch(error => {
                    return next(handleResponse(action, null, error))
                })
        }
    },

    aList: {
        path: '/boards/:boardId/lists/:listId',
        reqType: 'get',
        method(req, res, next) {
            let action = 'Find specific list in Lists'
            Lists.findById(req.params.listId)
                .then(list => {
                    res.send(handleResponse(action, list))
                }).catch(error => {
                    return next(handleResponse(action, null, error))
                })
        }
    },

    listAllTasks: {
        path: '/boards/:boardId/lists/:listId/tasks',
        reqType: 'get',
        method(req, res, next) {
            let action = 'Find all Tasks of one list'
            Tasks.find({ listId: req.params.listId }) 
                .then(tasks => {
                    res.send(handleResponse(action, tasks))
                }).catch(error => {
                    return next(handleResponse(action, null, error))
                })
        }
    },

    aTask: {
        path: '/boards/:boardId/lists/:listId/tasks/:taskId',
        reqType: 'get',
        method(req, res, next) {
            let action = 'Find a specific Task'
            Tasks.findById(req.params.taskId) 
                .then(task => {
                    res.send(handleResponse(action, task))
                }).catch(error => {
                    return next(handleResponse(action, null, error))
                })
        }
    },

    taskAllComments: {
        path: '/boards/:boardId/lists/:listId/tasks/:taskId/comments',
        reqType: 'get',
        method(req, res, next) {
            let action = 'Find all Comments of a specific task' //No Comment :)
            Comments.find({ taskId: req.params.taskId }) 
                .then(comments => {
                    res.send(handleResponse(action, comments))
                }).catch(error => {
                    return next(handleResponse(action, null, error))
                })
        }
    },


    aComment: {
        path: '/boards/:boardId/lists/:listId/tasks/:taskId/comments/:commentId',
        reqType: 'get',
        method(req, res, next) {
            let action = 'Find a specific comment' //No Comment :)
            Comments.findById(req.params.commentId) 
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