// import express from "express";
// import isAuthenticated from "../middlewares/isAuthenticated.js";
// import { deleteJob, getAdminJobs, getAllJobs, getJobById, postJob } from "../controllers/job.controller.js";

// const router = express.Router();

// router.route("/post").post(isAuthenticated, postJob);
// router.route("/get").get(getAllJobs);
// router.route("/getadminjobs").get(isAuthenticated, getAdminJobs);
// router.route("/get/:id").get(getJobById);
// router.route('/delete').post(deleteJob)

// export default router;












import express from "express";
import isAuthenticated from "../middlewares/isAuthenticated.js";
import { deleteJob, getAdminJobs, getAllJobs, getJobById, postJob, updateJob } from "../controllers/job.controller.js";

const router = express.Router();

// Public routes
router.route("/get").get(getAllJobs);
router.route("/get/:id").get(getJobById);

// Protected routes (require authentication)
router.route("/post").post(isAuthenticated, postJob);
router.route("/getadminjobs").get(isAuthenticated, getAdminJobs);

// ADD THESE NEW ROUTES
router.route("/update/:id").put(isAuthenticated, updateJob);  // PUT /update/:id
router.route("/delete/:id").delete(isAuthenticated, deleteJob); // DELETE /delete/:id

// Keep the old delete route for backward compatibility
router.route('/delete').post(isAuthenticated, deleteJob); // POST /delete (with jobId in body)

export default router;