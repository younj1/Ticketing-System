const express = require('express');
const router = express.Router();
const Ticket = require('../models/Ticket');
const Counter = require('../models/Counter');

//Get all tickets
router.get('/', async(req, res) => {
    try{
        const tickets = await Ticket.find().sort({ createdAt: -1 });
        res.json(tickets);
    }catch(err){
        res.status(500).json({ message: err.message });
    }
});

//GET single ticket
router.get('/:id', async(req, res) => {
    try{
        const ticket = await Ticket.findById(req.params.id);
        if (!ticket) return res.status(404).json({message: 'Ticket not found'});
        res.json(ticket);
    }
    catch(err){
        res.status(500).json({message: err.message});
    }
});

//POST created ticket
router.post('/', async (req, res) => {
    try{
        const counter = await Counter.findOneAndUpdate(
            { name: 'ticketID' },
            { $inc: { value: 1 } },
            { returnDocument: 'after', upsert: true }
        );
        const ticketId= `TKT-${String(counter.value).padStart(4, '0')}`;

        const ticket = new Ticket({
            ticketId,
            title:req.body.title,
            description:req.body.description,
            requester:req.body.requester,
            category:req.body.category,
            priority:req.body.priority
        });
        const newTicket = await ticket.save();
        res.status(201).json(newTicket);
    }catch(err){
        res.status(400).json({message: err.message});
    }
});

//PUT update ticket
router.put('/:id', async (req, res) => {
  try {
    const ticket = await Ticket.findById(req.params.id);
    if (!ticket) return res.status(404).json({ message: 'Ticket not found' });

    if (req.body.status) ticket.status = req.body.status;
    if (req.body.priority) ticket.priority = req.body.priority;
    if (req.body.note) ticket.notes.push(req.body.note);

    const updatedTicket = await ticket.save({ validateModifiedOnly: true });
    res.json(updatedTicket);
  } catch (err) {
    console.log('PUT error:', err.message);
    res.status(400).json({ message: err.message });
  }
});

//DELETE ticket
router.delete('/:id', async(req, res) => {
    try{
        const ticket = await Ticket.findById(req.params.id);
        if(!ticket) return res.status(404).json({message: 'Ticket not found'});
        await ticket.deleteOne();
        res.json({message: 'Ticket deleted'});
    }catch(err){
        res.status(500).json({message: err.message});
    }
});

module.exports = router;