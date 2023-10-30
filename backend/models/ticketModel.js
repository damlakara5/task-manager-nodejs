const mongoose = require("mongoose")

const ticketSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please provide a name"],
        trim : true
    },
    description: String,
    category : {
        type : String,
        required: [true, "A task must have a category"] , //second one is the error string,
        enum: {
            values: ["Hardware Problem", "Software Problem", "Project"],  //values are available,
            message : 'Category is either Hardware Problem, Software Problem, Project'
        } 
    },
    createdAt : {
        type: Date,
        default: Date.now()
    },
    priority: { 
        type : Number,
        default: 1,
        min : [1, "Priority must be above 1"],
        max: [5, "Priority must be below 5"],
    },
    status : {
        type : String,
        required: [true, "A task must have a status"] , //second one is the error string,
        enum: {
            values: ["Not started", "Started", "Finished"],  //values are available,
            message : 'Difficulty is either Not started, Started, Finished'
        } 
    },
})


ticketSchema.pre("save", function(next) {
    this.createdAt = Date.now()

    next()
})

const Ticket =  mongoose.model("Ticket", ticketSchema)

module.exports = Ticket