import Tuition from '../models/Tuition';
import Class from '../models/Class';
import Course from '../models/Course';

export const TuitionService = {
  async getUnpaidTuitions(userId: string) {
    return await Tuition.findAll({
      where: {
        studentId: userId,
        status: 'pending'
      },
      include: [{
        model: Class,
        as: 'class',
        attributes: ['classCode', 'startTime', 'endTime', 'room'],
        include: [{
          model: Course,
          attributes: ['courseCode', 'name']
        }]
      }],
      order: [['dueDate', 'ASC']]
    });
  }
};