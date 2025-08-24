import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true, lowercase: true, trim: true },
  passwordHash: { type: String, required: true },
  name: { type: String, trim: true },
  avatarUrl: { type: String }
}, { timestamps: true });

export default mongoose.model('User', UserSchema);
