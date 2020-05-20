const mongoose = require('mongoose')

const { model, Schema } = mongoose

const TodoSchema = new Schema({
    content: {type: String, required: true},
    isComplete: {type: Boolean, default: false}
})

module.exports = model('Todo', TodoSchema)