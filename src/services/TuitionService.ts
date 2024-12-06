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
  },

  async markTuitionsAsPaid(tuitionIds: string[]) {
    const now = new Date();
    const result = await Tuition.update(
      {
        status: 'paid',
        paymentDate: now
      },
      {
        where: {
          id: tuitionIds,
          status: 'pending' // Chỉ cập nhật những khoản chưa thanh toán
        }
      }
    );
    
    return await Tuition.findAll({
      where: {
        id: tuitionIds
      }
    });
  }
};