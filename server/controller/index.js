const Todo = require('../model')

class TodoCtl {
    async home(ctx) {
        const type = ctx.params.type
        let todo
        switch (type) {
            case 'all':
                todo = await Todo.find();
                break
            case 'true':
                todo = await Todo.find({
                    isComplete: true
                });
                break
            case 'false':
                todo = await Todo.find({
                    isComplete: false
                });
                break
            default:
                return null
        }
        ctx.body = todo
    }
    async create(ctx) {
        const content = ctx.request.body
        const todo = await new Todo({
            content: content.input
        }).save()
        ctx.body = todo
    }
    async delete(ctx) {
        const id = ctx.params.id
        await Todo.findByIdAndRemove({
            _id: id
        })
        const todo = await Todo.find()
        ctx.body = todo
    }
    async update(ctx) {
        const id = ctx.params.id
        const todo = await Todo.findById(id)
        await Todo.findByIdAndUpdate(id, {
            isComplete: !todo.isComplete
        })
        const newTodo = await Todo.findById(id)
        ctx.body = newTodo
    }
}

module.exports = new TodoCtl()