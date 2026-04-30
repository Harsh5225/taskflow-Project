import express from 'express';
import {
  createTask,
  updateTask,
  getTasksForProject,
  getDashboardStats
} from '../controllers/taskController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.use(protect); // All routes protected

router.route('/')
  .post(createTask);

router.route('/:id')
  .put(updateTask);

router.route('/project/:projectId')
  .get(getTasksForProject);

router.route('/dashboard/:projectId')
  .get(getDashboardStats);

export default router;
