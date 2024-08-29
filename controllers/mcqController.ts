import { Request, Response } from 'express';
import {MCQ} from '../models/mcqModelTable';

// Create a new MCQ
export const createMCQ = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { title, question_text, answer_key, correct_option } = req.body;

    if (!title || !question_text || !answer_key || correct_option == null) {
      return res.status(400).json({ error: 'All fields are required.' });
    }

    // Create the MCQ
    const mcq = await MCQ.create(req.body);

    return res.status(201).json({ message: 'MCQ created successfully.', mcq });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'An error occurred while creating the MCQ.' ,error2:error});
  }
};

// Get all MCQs
export const getAllMCQs = async (req: Request, res: Response): Promise<Response> => {
  try {
    const mcqs = await MCQ.findAll();

    return res.json(mcqs);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'An error occurred while fetching MCQs.' });
  }
};

// Get an MCQ by ID
export const getMCQById = async (req: Request, res: Response): Promise<Response> => {
  try {
    const mcqId = parseInt(req.params.id, 10);

    const mcq = await MCQ.findByPk(mcqId);

    if (!mcq) {
      return res.status(404).json({ error: 'MCQ not found.' });
    }

    return res.json(mcq);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'An error occurred while fetching the MCQ.' });
  }
};
