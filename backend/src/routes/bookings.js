import { Router } from 'express';
import Booking from '../models/Booking.js';
import Room from '../models/Room.js';
import { requireAuth } from '../middleware/auth.js';

const router = Router();

router.get('/', requireAuth, async (req, res) => {
  const list = await Booking.find().populate('room').sort({ start: -1 });
  res.json(list);
});

router.post('/', requireAuth, async (req, res) => {
  try {
    const { room, title, start, end } = req.body;
    const roomDoc = await Room.findById(room);
    if (!roomDoc) return res.status(400).json({ error: 'Room not found' });
    if (new Date(end) <= new Date(start)) return res.status(400).json({ error: 'End must be after start' });
    const overlap = await Booking.findOne({ 
      room, 
      $or: [
        { start: { $lt: end, $gte: start } },
        { end: { $gt: start, $lte: end } },
        { start: { $lte: start }, end: { $gte: end } }
      ]
    });
    if (overlap) return res.status(400).json({ error: 'Room already booked in that time range' });
    const booking = await Booking.create({ room, title, start, end, createdBy: req.user.id });
    res.json(booking);
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
});

router.delete('/:id', requireAuth, async (req, res) => {
  await Booking.findByIdAndDelete(req.params.id);
  res.json({ ok: true });
});

export default router;
