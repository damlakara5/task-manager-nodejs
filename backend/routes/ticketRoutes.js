const express = require("express")
const { createTicket, getAllTickets, getTicket, deleteTicket } = require("../controllers/ticketController")
const { protect } = require("../controllers/authController")

const router = express.Router()

router.route("/").get(getAllTickets).post(createTicket)
router.route("/delete").post(protect, deleteTicket)

router.route("/:id").get(getTicket)


module.exports = router