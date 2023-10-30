const Ticket = require("../models/ticketModel")

exports.createTicket = async (req, res,next) => {
    try{
        const newTicket = await Ticket.create(req.body)
        res.status(200).json({
                message: "success",
                newTicket
            }     
        )}
    catch(e) {
        console.log(e)
        res.status(400).json({
            message: "fail",
            error: e
        })
    }

}


exports.getAllTickets = async (req,res,next) => {
    try{
        const tickets = await Ticket.find()
        res.status(200).json({
            message: "success",
            result: tickets.length,
            tickets
            }     
    )}catch(e)  {
        res.status(400).json({
            message: e,

        })
    }
}

exports.getTicket = async (req,res,next) => {
    try{
        const ticket = await Ticket.findById(req.params.id)
        res.status(200).json({
            message: "success",
            ticket
            }     
    )}catch(e)  {
        res.status(400).json({
            message: e,

        })
    }
}
exports.deleteTicket = async (req,res,next) => {
    try{
        const doc = await Ticket.findByIdAndDelete(req.body.id)
        if(!doc) {
            return next(new Error("No doc find with that ID"))
         }
        res.status(201).json({
            message: "success",
            }     
    )}catch(e)  {
        res.status(400).json({
            message: e,

        })
    }
}