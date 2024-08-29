import { Request, Response } from 'express';
import Test from '../models/testModelTable';

// Create a new test question
export const createTest = async (req: Request, res: Response) => {
    try {
        // const { title, question, options, correctAnswer } = req.body;

        // Validate the input (optional, add more checks as needed)
        // if (!title || !question || !options || !Array.isArray(options)) {
        //     res.status(400).json({ error: 'Invalid input' });
        //     return;
        // }

        const newTest = await Test.create(req.body);
        res.status(201).json(newTest);
    } catch (error) {
        res.status(500).json({ error: 'Error creating test question' });
    }
};

// Get all test questions
export const getTests = async (_req: Request, res: Response): Promise<void> => {
    try {
        const tests = await Test.findAll();
        res.status(200).json(tests);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching test questions' });
    }
};

// Get a single test question by ID
export const getTestById = async (req: Request, res: Response): Promise<void> => {
    try {
        const test = await Test.findByPk(req.params.id);
        if (test) {
            res.status(200).json(test);
        } else {
            res.status(404).json({ error: 'Test question not found' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Error fetching test question' });
    }
};

// Update a test question
export const updateTest = async (req: Request, res: Response): Promise<void> => {
    try {
        const { title, question, options, correctAnswer } = req.body;

        // Validate the input (optional, add more checks as needed)
        if (!title || !question || !options || !Array.isArray(options)) {
            res.status(400).json({ error: 'Invalid input' });
            return;
        }

        const [updated] = await Test.update(
            { title, question, options, correctAnswer },
            { where: { id: req.params.id } }
        );

        if (updated) {
            const updatedTest = await Test.findByPk(req.params.id);
            res.status(200).json(updatedTest);
        } else {
            res.status(404).json({ error: 'Test question not found' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Error updating test question' });
    }
};

// Delete a test question
export const deleteTest = async (req: Request, res: Response): Promise<void> => {
    try {
        const deleted = await Test.destroy({ where: { id: req.params.id } });
        if (deleted) {
            res.status(204).json();
        } else {
            res.status(404).json({ error: 'Test question not found' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Error deleting test question' });
    }
};
