import { Request, Response } from 'express';
import { Project } from '../models/projectModelTable';

// Create a new Project
export const createProject = async (req: Request, res: Response): Promise<Response> => {
    try {
        const { title, description, projects } = req.body;

        if (!title || !description || !Array.isArray(projects)) {
            return res.status(400).json({ error: 'All fields are required.' });
        }

        // Create the Project
        const project = await Project.create(req.body);             

        return res.status(201).json({ message: 'Project created successfully.', project });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'An error occurred while creating the Project.', error2: error });
    }
};

// Get all Projects
export const getAllProjects = async (req: Request, res: Response): Promise<Response> => {
    try {
        const projects = await Project.findAll();

        return res.json(projects);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'An error occurred while fetching Projects.' });
    }
};

// Get an Project by ID
export const getSingleProject = async (req: Request, res: Response): Promise<Response> => {
    try {
        const projectId = parseInt(req.params.id, 10);

        const project = await Project.findByPk(projectId);

        if (!project) {
            return res.status(404).json({ error: 'Project not found.' });
        }

        return res.json(project);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'An error occurred while fetching the Project.' });
    }
};
