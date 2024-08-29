import { Student } from '../models/userModel';
export const createUser = async (data: any) => {
  return Student.create(data);
};

export const findAllUsers = async () => {
  return Student.findAll({
    where: {
      isDeleted: false
    },
    attributes: { exclude: ['password', 'createdAt', 'updatedAt','isDeleted','token','otp'] }
  });
};