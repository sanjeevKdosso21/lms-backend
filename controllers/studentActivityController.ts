import { Request, Response } from 'express';
import Activity from '../models/studentActivityModel';
import VideoModel from '../models/videoModel';
import { Student } from '../models/userModel';
import { Op, Sequelize } from 'sequelize';

// Add or update user activity
// export const addActivity = async (req: Request, res: Response) => {
//     const { videoId, isWatched, date } = req.body;
//     const userId = req.body.userId; // Get userId from req.user

//     if ( !videoId || isWatched === undefined || !date) {
//         return res.status(400).json({ message: 'Missing required fields' });
//     }

//     try {
//         // Check if the user exists
//         const student = await Student.findByPk(userId);
//         if (!student) {
//             return res.status(404).json({ message: 'Student not found' });
//         }

//         // Check if the video exists
//         const video = await VideoModel.findByPk(videoId);
//         if (!video) {
//             return res.status(404).json({ message: 'Video not found' });
//         }

//         // Find the activity
//         const existingActivity = await Activity.findOne({
//             where: {
//                 userId,
//                 // Check if the activity array contains an object with the given videoId
//                 [Op.and]: [
//                     {
//                         activity: {
//                             [Op.contains]: [{ videoId }]
//                         }
//                     }
//                 ]
//             }
//         });

//         if (existingActivity) {
//             // Update the existing activity
//             const updatedActivities = existingActivity.activity.map(act =>
//                 act.videoId === videoId
//                     ? { ...act, isWatched, date }
//                     : act
//             );

//             await existingActivity.update({ activity: updatedActivities });
//             return res.status(200).json({ message: 'Activity updated successfully' });
//         } else {
//             // Add new activity
//             await Activity.create({
//                 userId,
//                 activity: [{ videoId, isWatched, date }],
//             });
//             return res.status(201).json({ message: 'Activity added successfully' });
//         }
//     } catch (error) {
//         console.error(error);
//         return res.status(500).json({ message: 'Server error' });
//     }
// };

export const addActivity = async (req: Request, res: Response) => {
    const { videoId, isWatched } = req.body;
    const userId = req.body.userId; // Assuming userId is attached to req.user

    if (!userId || !videoId || isWatched === undefined) {
        return res.status(400).json({ message: 'Missing required fields' });
    }

    try {
        // Check if the user exists
        const student = await Student.findByPk(userId);
        if (!student) {
            return res.status(404).json({ message: 'Student not found' });
        }

        // Check if the video exists
        const video = await VideoModel.findByPk(videoId);
        if (!video) {
            return res.status(404).json({ message: 'Video not found' });
        }

        // Use raw query to check if the activity already exists
        const existingActivity = await Activity.findOne({
            where: Sequelize.literal(
                `JSON_CONTAINS(activity, '{"videoId": ${videoId}}') AND userId = ${userId}`
            ),
        });

        if (existingActivity) {
            // Update the existing activity
            const updatedActivities = existingActivity.activity.map(act =>
                act.videoId === videoId
                    ? { ...act, isWatched }
                    : act
            );

            await existingActivity.update({ activity: updatedActivities });
            return res.status(200).json({ message: 'Activity updated successfully' });
        } else {
            // Add new activity
            await Activity.create({
                userId,
                activity: [{ videoId, isWatched }],
            });
            return res.status(201).json({ message: 'Activity added successfully' });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Server error',error });
    }
};

// Get activities by userId
export const getActivitiesByUserId = async (req: Request, res: Response) => {
    const userId = req.body.userId; // Get userId from req.user

    try {
        if (!userId) {
            return res.status(400).json({ message: 'User ID is required' });
        }

        const activities = await Activity.findAll({
            where: { userId },
        });

        if (!activities.length) {
            return res.status(404).json({ message: 'No activities found for this user' });
        }

        return res.status(200).json(activities);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Server error' });
    }
};

// Get all activities
export const getAllActivities = async (req: Request, res: Response) => {
    try {
        const activities = await Activity.findAll();

        if (!activities.length) {
            return res.status(404).json({ message: 'No activities found' });
        }

        return res.status(200).json(activities);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Server error' });
    }
};

// Delete an activity by ID
export const deleteActivity = async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
        const activity = await Activity.findByPk(id);
        if (!activity) {
            return res.status(404).json({ message: 'Activity not found' });
        }

        await activity.destroy();
        return res.status(200).json({ message: 'Activity deleted successfully' });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Server error' });
    }
};
