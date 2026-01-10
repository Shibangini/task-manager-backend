const Task = require('../models/Task');

exports.createTask = async (req, res) => {
  const { title, description } = req.body;
  if (!title) return res.status(400).json({ message: 'Title is required' });
  try {
    const task = await Task.create({ title, description, userId: req.user._id });
    res.status(201).json(task);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.getTasks = async (req, res) => {
  try {
    const tasks = await Task.find({ userId: req.user._id }).sort({ createdAt: -1 });
    res.json(tasks);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.updateTask = async (req, res) => {
  const { id } = req.params;
  try {
    const task = await Task.findById(id);
    if (!task) return res.status(404).json({ message: 'Task not found' });
    if (task.userId.toString() !== req.user._id.toString()) return res.status(403).json({ message: 'Not authorized' });

    const updates = req.body;
    Object.assign(task, updates);
    await task.save();
    res.json(task);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.deleteTask = async (req, res) => {
  const { id } = req.params;
  try {
    const task = await Task.findById(id);
    if (!task) return res.status(404).json({ message: 'Task not found' });
    if (task.userId.toString() !== req.user._id.toString()) return res.status(403).json({ message: 'Not authorized' });
    await task.remove();
    res.json({ message: 'Task removed' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};
