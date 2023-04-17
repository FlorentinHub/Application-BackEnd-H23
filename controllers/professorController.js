
exports.create = async (req, res) => {
  const { name, professor } = req.body;
  try {
    const course = await Course.create({ name, professor });
    res.status(201).json(course);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.getById = async (req, res) => {
  const { id } = req.params;
  try {
    const course = await Course.findById(id)
      .populate('professor', 'name')
      .populate('students', 'name');
    if (!course) throw new Error('Course not found');
    res.status(200).json(course);
  } catch (err) {
    res.status(404).json({ error: err.message });
  }
};

exports.update = async (req, res) => {
  const { id } = req.params;
  const { name, professor } = req.body;
  try {
    const course = await Course.findByIdAndUpdate(id, { name, professor }, { new: true })
      .populate('professor', 'name')
      .populate('students', 'name');
    if (!course) throw new Error('Course not found');
    res.status(200).json(course);
  } catch (err) {
    res.status(404).json({ error: err.message });
  }
};

exports.delete = async (req, res) => {
  const { id } = req.params;
  try {
    const course = await Course.findByIdAndDelete(id);
    if (!course) throw new Error('Course not found');
    res.status(204).send();
  } catch (err) {
    res.status(404).json({ error: err.message });
  }
};

exports.create = async (req, res) => {
  const { name } = req.body;
  try {
    const professor = await Professor.create({ name });
    res.status(201).json(professor);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.getById = async (req, res) => {
  const { id } = req.params;
  try {
    const professor = await Professor.findById(id).populate('courses', 'name');
    if (!professor) throw new Error('Professor not found');
    res.status(200).json(professor);
  } catch (err) {
    res.status(404).json({ error: err.message });
  }
};

exports.update = async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  try {
    const professor = await Professor.findByIdAndUpdate(id, { name }, { new: true })
      .populate('courses', 'name');
    if (!professor) throw new Error('Professor not found');
    res.status(200).json(professor);
  } catch (err) {
    res.status(404).json({ error: err.message });
  }
};

exports.delete = async (req, res) => {
  const { id } = req.params;
  try {
    const professor = await Professor.findByIdAndDelete(id);
    if (!professor) throw new Error('Professor not found');
    res.status(204).send();
  } catch (err) {
    res.status(404).json({ error: err.message });
  }
};

exports.addCourse = async (req, res) => {
  const { id } = req.params;
  const { courseId } = req.body;
  try {
    const professor = await Professor.findByIdAndUpdate(
      id,
      { $addToSet: { courses: courseId } },
      { new: true }
    ).populate('courses', 'name');
    if (!professor) throw new Error('Professor not found');
    res.status(200).json(professor);
  } catch (err) {
    res.status(404).json({ error: err.message });
  }
};
