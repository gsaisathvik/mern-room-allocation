import { Router } from 'express';
import Room from '../models/Room.js';
import { requireAuth, requireAdmin } from '../middleware/auth.js';

const router = Router();

router.get('/', requireAuth, async (req, res) => {
  const rooms = await Room.find().sort({ createdAt: -1 });
  res.json(rooms);
});

router.post('/', requireAuth, requireAdmin, async (req, res) => {
  try {
    const room = await Room.create(req.body);
    res.json(room);
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
});

router.get('/:id', requireAuth, async (req, res) => {
  const room = await Room.findById(req.params.id);
  if (!room) return res.status(404).json({ error: 'Not found' });
  res.json(room);
});

router.put('/:id', requireAuth, requireAdmin, async (req, res) => {
  try {
    const room = await Room.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(room);
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
});

router.delete('/:id', requireAuth, requireAdmin, async (req, res) => {
  await Room.findByIdAndDelete(req.params.id);
  res.json({ ok: true });
});

router.post('/:id/allocate', requireAuth, requireAdmin, async (req, res) => {
  const { allocatedTo } = req.body;
  const room = await Room.findByIdAndUpdate(req.params.id, { allocatedTo }, { new: true });
  res.json(room);
});

export default router;
