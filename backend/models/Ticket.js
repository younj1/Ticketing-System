const mongoose = require('mongoose');

const noteSchema = new mongoose.Schema({
    text: {type: String, required: true},
    author: {type: String, required: true},
    createdAt: {type: Date, default: Date.now }
});
const ticketSchema = new mongoose.Schema({
    ticketId: {type: String, required: true, unique: true},
    title: {type: String, required: true},
    description: {type: String},
    requester: {type: String, required: true},
    category: {
        type: String,
        required: true,
        enum: ['Software', 'Hardware', 'Network', 'Security', 'Account/Access', 'Email', 'Printer','Other']
    },
    priority: {
        type: String,
        required: true,
        enum: ['Low', 'Medium', 'High', 'Critical'],
        default: 'Medium'
    },
    status: {
        type: String,
        required: true,
        enum: ['Open', 'In Progress', 'Resolved', 'Closed'],
        default: 'Open'
    },
    notes: [noteSchema]
}, {timestamps: true});

module.exports = mongoose.model('Ticket', ticketSchema);
