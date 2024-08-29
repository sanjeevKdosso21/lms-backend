import { fstat } from "fs";
import ContactUsForm from "../models/contactUsForm";
import {Request,Response} from 'express';
import { Admin } from "../models/adminModel";
import bcrypt from 'bcrypt';
import jwt from "jsonwebtoken";
import { CourseTable } from "../models/courseModel";
import { TopicTable } from "../models/topicModel";

export const AdminCreate = async (req: Request, res: Response) => {
    try {
        const { email, password, mobile, name } = req.body;

        // Validate required fields
        if (!email || !password || !name) {
            return res.status(400).send({ message: 'Email, password, and name are required.', status: false });
        }

        // Check if email already exists
        const existingAdmin = await Admin.findOne({ where: { email } });
        if (existingAdmin) {
            return res.status(400).send({ message: 'Email already in use.', status: false });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create new admin record
        const newAdmin = await Admin.create({
            email,
            password: hashedPassword,
            mobile,
            name,
        });

        res.status(201).send({ message: 'Admin created successfully', status: true, data: newAdmin });
    } catch (err) {
        console.error(err); // Log the error for debugging
        res.status(500).send({ message: 'Internal server error', status: false });
    }
};


export const AdminLogin = async (req: Request, res: Response) => {
    try {
  
      const { email, password } = req.body;
      // Validate input
  
      if (!email || !password) {
        return res
          .status(400)
          .json({ message: "userName and password are required" });
      }
      // Find the user by mobile number
  
      let checkUserName = await Admin.findOne({
        where: { email  },
      });
  
      if (!checkUserName) {
        return res
          .status(401)
          .json({ message: "Invalid email  or password" });
      }
      console.log('Hashed password from DB:', checkUserName.password);
  
      // Compare passwords
      const isMatch = await bcrypt.compare(password, checkUserName.password);
  
      if (!isMatch) {
        return res
          .status(401)
          .json({ message: "Invalid  password", isMatch });
      }
  
      // Generate a token
      const token = jwt.sign({ id: checkUserName.id }, `${process.env.SECRET_KEY}`, { expiresIn: '3d' });
  
      await Admin.update(
        { token: token },
        { where: { email } }
      );
  
      res
        .status(200)
        .json({
          data: { token, id: checkUserName.id, mobileNo: checkUserName },
        });
    } catch (error) {
      //console.log("error", error);
      res.status(500).json({ message: "Internal server error", data: error });
    }
  };




  export const AdminGetAllCourseList = async (req: Request, res: Response) => {
    try {
      const data = await CourseTable.findAll({
        where: {
          isDeleted: false
        },
        attributes : ['name','id']
      });
      
      res
        .status(200)
        .json({
          data: { message : 'All course list ', data : data },
        });
    } catch (error) {
      //console.log("error", error);
      res.status(500).json({ message: "Internal server error", data: error });
    }
  };

  export const AdminGetAllTopicList = async (req: Request, res: Response) => {
    try {
      const {courseId}  = req.params;
      if(!courseId){
        return res.status(400).send({message : 'course id is required in params', status : false})
      }
      const data = await TopicTable.findAll({
        where: {
          isDeleted: false,
          courseId : courseId
        },
        attributes : ['topic','id']
      });
      
      res
        .status(200)
        .json({
          data: { message : 'All topic list ', data : data },
        });
    } catch (error) {
      //console.log("error", error);
      res.status(500).json({ message: "Internal server error", data: error });
    }
  };


  export const AdminCreateTopic = async (req: Request, res: Response) => {
    try {

      //check that course id exist in database
      const {courseId} = req.body;
      let id = courseId;
      const response = await CourseTable.findByPk(id)
      if(!response){
        return res.status(400).send({message : 'please send correct course id if there is no course go and add course'})
      }
      const data = await TopicTable.create(req.body)
      res
        .status(200)
        .json({
          data: { message : 'topic created', data : data },
        });
    } catch (error) {
      //console.log("error", error);
      res.status(500).json({ message: "Internal server error", data: error });
    }
  };



  export const AdminCreateCourse = async (req: Request, res: Response) => {
    try {
      const response = await CourseTable.findOne({where : {name : req.body.name}})
      if(response){
         return res.status(400).send({message : 'this course name is already registerd', response})
      }
      const data = await CourseTable.create(req.body)
      res
        .status(200)
        .json({
          data: { message : 'course created', data : data },
        });
    } catch (error) {
      //console.log("error", error);
      res.status(500).json({ message: "Internal server error", data: error });
    }
  };
