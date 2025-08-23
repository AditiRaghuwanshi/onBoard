

import { Job } from "../models/job.model.js";

export const postJob = async(req, res) => {
    try {
        const { title, description, requirements, salary, location, jobType, experience, position, companyId } = req.body;
        const userId = req.id;

        if (!title || !description || !requirements || !salary || !location || !jobType || !experience || !position || !companyId) {
            return res.status(400).json({
                message: "Something is missing.",
                success: false
            })
        };
        const job = await Job.create({
            title,
            description,
            requirements: requirements.split(","),
            salary: Number(salary),
            location,
            jobType,
            experienceLevel: experience,
            position,
            company: companyId,
            created_by: userId
        });
        return res.status(201).json({
            message: "New job created successfully.",
            job,
            success: true
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Internal server error",
            success: false
        });
    }
}

export const getAllJobs = async(req, res) => {
    try {
        const keyword = req.query.keyword || "";
        const query = {
            $or: [
                { title: { $regex: keyword, $options: "i" } },
                { description: { $regex: keyword, $options: "i" } },
            ]
        };
        const jobs = await Job.find(query).populate({
            path: "company"
        }).sort({ createdAt: -1 });
        if (!jobs) {
            return res.status(404).json({
                message: "Jobs not found.",
                success: false
            })
        };
        return res.status(200).json({
            jobs,
            success: true
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Internal server error",
            success: false
        });
    }
}

// Get job by ID
export const getJobById = async(req, res) => {
    try {
        const jobId = req.params.id;
        const job = await Job.findById(jobId).populate({
            path: "company"
        }).populate({
            path: "applications"
        });
        if (!job) {
            return res.status(404).json({
                message: "Job not found.",
                success: false
            })
        };
        return res.status(200).json({ job, success: true });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Internal server error",
            success: false
        });
    }
}

// Get all jobs created by specific admin
export const getAdminJobs = async(req, res) => {
    try {
        const adminId = req.id;
        const jobs = await Job.find({ created_by: adminId }).populate({
            path: 'company'
        }).sort({ createdAt: -1 });
        if (!jobs) {
            return res.status(404).json({
                message: "Jobs not found.",
                success: false
            })
        };
        return res.status(200).json({
            jobs,
            success: true
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Internal server error",
            success: false
        });
    }
}

// ADD THIS NEW UPDATE FUNCTION
export const updateJob = async(req, res) => {
    try {
        const jobId = req.params.id;
        const { title, description, requirements, salary, location, jobType, experience, position, companyId } = req.body;
        const userId = req.id;

        // Check if job exists
        const existingJob = await Job.findById(jobId);
        if (!existingJob) {
            return res.status(404).json({
                message: "Job not found.",
                success: false
            });
        }

        // Check if user is authorized to update this job
        if (existingJob.created_by.toString() !== userId.toString()) {
            return res.status(403).json({
                message: "You are not authorized to update this job.",
                success: false
            });
        }

        const updateData = {
            title,
            description,
            requirements: requirements.split(","),
            salary: Number(salary),
            location,
            jobType,
            experienceLevel: experience,
            position,
            company: companyId
        };

        const updatedJob = await Job.findByIdAndUpdate(jobId, updateData, { 
            new: true,
            runValidators: true
        }).populate({
            path: "company"
        });

        return res.status(200).json({
            message: "Job updated successfully.",
            job: updatedJob,
            success: true
        });

    } catch (error) {
        console.error("Error updating job:", error);
        return res.status(500).json({
            message: "Error updating job",
            success: false
        });
    }
}

// UPDATED DELETE FUNCTION - Supporting both methods your frontend tries
export const deleteJob = async(req, res) => {
    try {
        let jobId;
        
        // Check if jobId is in params (DELETE /delete/:id) or body (POST /delete)
        if (req.params.id) {
            jobId = req.params.id;
        } else if (req.body.jobId) {
            jobId = req.body.jobId;
        } else {
            return res.status(400).json({ 
                message: 'Job ID is required',
                success: false 
            });
        }

        const userId = req.id;

        // Find the job first
        const job = await Job.findById(jobId);
        if (!job) {
            return res.status(404).json({ 
                message: 'Job not found',
                success: false 
            });
        }

        // Check if user is authorized to delete this job
        if (job.created_by.toString() !== userId.toString()) {
            return res.status(403).json({
                message: "You are not authorized to delete this job.",
                success: false
            });
        }

        // Delete the job
        await Job.findByIdAndDelete(jobId);

        return res.status(200).json({
            message: 'Job deleted successfully',
            success: true
        });
    } catch (error) {
        console.error('Error deleting job:', error);
        return res.status(500).json({
            message: 'Error deleting the job',
            error: error.message,
            success: false
        });
    }
};