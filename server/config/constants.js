const actions = {
  create: 'Create',
  update: 'Update',
  remove: 'Remove',
  find: 'Find',
  findAll: 'Find All'
}

const models = {
  board: {
    name: 'Board',
    endpoint: 'boards',
    useCustomRoutes: true
  },
  list: {
    name: 'List',
    endpoint: 'lists',
    useCustomRoutes: false
  },
  task: {
    name: 'Task',
    endpoint: 'tasks',
    useCustomRoutes: false
  },
  comment: {
    name: 'Comment',
    endpoint: 'comments',
    useCustomRoutes: false
  },
  user: {
    name: 'User',
    endpoint: 'users',
    preventDefaultApi: true,
    useCustomRoutes: true
  }
}


module.exports = {
  actions,
  models
}