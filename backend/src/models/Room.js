import mongoose from 'mongoose';

const RoomSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  capacity: { type: Number, required: true, min: 1 },
  type: { type: String, enum: ['Single', 'Double', 'Suite', 'Lab', 'Meeting'], default: 'Single' },
  features: [{ type: String }],
  allocatedTo: { type: String, default: '' } // optional label for assignment (e.g., "Team A" or "Student 103")
}, { timestamps: true });

export default mongoose.model('Room', RoomSchema);
