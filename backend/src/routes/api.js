import { Router } from 'express';
import { requireAuth } from '../middleware/auth.js';

const router = Router();

// Example protected route replacing Supabase table access
router.get('/items', requireAuth, async (req, res) => {
  // TODO: replace with Mongoose model operations based on your data
  res.json({ items: [] });
});

export default router;
