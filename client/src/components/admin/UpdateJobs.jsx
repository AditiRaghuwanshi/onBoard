// import  { useState, useEffect } from 'react';
// import { useParams, useNavigate } from 'react-router-dom';
// import Navbar from '../shared/Navbar';
// import { Label } from '../ui/label';
// import { Input } from '../ui/input';
// import { Button } from '../ui/button';
// import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
// import axios from 'axios';
// import { JOB_API_END_POINT } from '@/utils/constant';
// import { toast } from 'sonner';
// import { Loader2 } from 'lucide-react';
// import { motion } from 'framer-motion';
// import Footer from '../shared/Footer';

// const UpdateJobs = () => {
//     const { id: jobId } = useParams();

//     const navigate = useNavigate();
//     const [input, setInput] = useState({
//         title: '',
//         description: '',
//         requirements: '',
//         salary: '',
//         location: '',
//         jobType: '',
//         experience: '',
//         position: 0,
//         companyId: '',
//     });
//     const [loading, setLoading] = useState(false);
//     const [companies, setCompanies] = useState([]);
//     // Fetch job details
//     useEffect(() => {
//         const fetchJobDetails = async () => {
//             setLoading(true);
//             try {
//                 const response = await axios.get(`${JOB_API_END_POINT}/get/${jobId}`);
//                 setInput(response.data.job);
//             } catch (error) {
//                 toast.error('Failed to fetch job details. Please try again.');
//                 console.error(error);
//             } finally {
//                 setLoading(false);
//             }
//         };
//         fetchJobDetails();
//     }, [jobId]);


//     const changeEventHandler = (e) => {
//         setInput({ ...input, [e.target.name]: e.target.value });
//     };

//     const selectChangeHandler = (value) => {
//         setInput({ ...input, companyId: value });
//     };

//     // Handle form submission for updating job
//     const submitHandler = async (e) => {
//         e.preventDefault();
//         setLoading(true);
//         try {
//             await axios.put(`${JOB_API_END_POINT}/update`, { ...input, jobId });
//             toast.success('Job updated successfully!');
//             navigate('/jobs'); // Redirect to jobs list page
//         } catch (error) {
//             toast.error('Failed to update the job. Please try again.');
//             console.error(error);
//         } finally {
//             setLoading(false);
//         }
//     };

//     // Handle job deletion
//     const handleDelete = async () => {
//         setLoading(true);
//         try {
//             await axios.delete(`${JOB_API_END_POINT}/delete`, { data: { jobId } });
//             toast.success('Job deleted successfully!');
//             navigate('/jobs'); // Redirect to jobs list page
//         } catch (error) {
//             toast.error('Failed to delete the job. Please try again.');
//             console.error(error);
//         } finally {
//             setLoading(false);
//         }
//     };

//     return (
//         <div className="bg-white min-h-screen">
//             <Navbar />
//             <motion.div
//                 className="flex items-center justify-center w-full my-5 pt-10"
//                 initial={ { opacity: 0, y: -20 } }
//                 animate={ { opacity: 1, y: 0 } }
//                 transition={ { duration: 0.6 } }
//             >
//                 <form
//                     onSubmit={ submitHandler }
//                     className="p-8 max-w-4xl w-full bg-white border border-blue-300 shadow-lg rounded-md"
//                 >
//                     <motion.div
//                         className="grid grid-cols-1 md:grid-cols-2 gap-4"
//                         initial={ { opacity: 0 } }
//                         animate={ { opacity: 1 } }
//                         transition={ { duration: 0.7 } }
//                     >
//                         {/* Input fields */ }
//                         { Object.entries(input).map(([key, value]) => (
//                             key !== 'companyId' && (
//                                 <div key={ key }>
//                                     <Label>
//                                         { key.charAt(0).toUpperCase() + key.slice(1) }{ ' ' }
//                                         <span className="text-red-500">*</span>
//                                     </Label>
//                                     <Input
//                                         type={ typeof value === 'number' ? 'number' : 'text' }
//                                         name={ key }
//                                         value={ value }
//                                         onChange={ changeEventHandler }
//                                         className="my-1 border-blue-300 focus:ring-blue-500 focus:border-blue-500"
//                                     />
//                                 </div>
//                             )
//                         )) }
//                         { companies.length > 0 && (
//                             <div>
//                                 <Label>
//                                     Company <span className="text-red-500">*</span>
//                                 </Label>
//                                 <Select
//                                     onValueChange={ selectChangeHandler }
//                                     defaultValue={ input.companyId || '' }
//                                 >
//                                     <SelectTrigger className="w-full">
//                                         <SelectValue placeholder="Select a Company" />
//                                     </SelectTrigger>
//                                     <SelectContent>
//                                         <SelectGroup>
//                                             { companies.map((company) => (
//                                                 <SelectItem
//                                                     key={ company._id }
//                                                     value={ company._id }
//                                                 >
//                                                     { company.name }
//                                                 </SelectItem>
//                                             )) }
//                                         </SelectGroup>
//                                     </SelectContent>
//                                 </Select>
//                             </div>
//                         ) }
//                     </motion.div>
//                     { loading ? (
//                         <Button className="w-full my-4 bg-blue-500 text-white">
//                             <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Please wait
//                         </Button>
//                     ) : (
//                         <>
//                             <Button
//                                 type="submit"
//                                 className="w-full my-4 bg-blue-500 hover:bg-blue-600 text-white transition duration-300"
//                             >
//                                 Update Job
//                             </Button>
//                             <Button
//                                 type="button"
//                                 onClick={ handleDelete }
//                                 className="w-full my-4 bg-red-500 hover:bg-red-600 text-white transition duration-300"
//                             >
//                                 Delete Job
//                             </Button>
//                         </>
//                     ) }
//                     { companies.length === 0 && (
//                         <p className="text-xs text-red-600 font-bold text-center my-3">
//                             *Please register a company first, before updating jobs.
//                         </p>
//                     ) }
//                 </form>
//             </motion.div>
//             <Footer />
//         </div>
//     );
// };

// export default UpdateJobs;














import  { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Navbar from '../shared/Navbar';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import axios from 'axios';
import { JOB_API_END_POINT, COMPANY_API_END_POINT } from '@/utils/constant';
import { toast } from 'sonner';
import { Loader2 } from 'lucide-react';
import { motion } from 'framer-motion';
import Footer from '../shared/Footer';

const UpdateJobs = () => {
    const { id: jobId } = useParams();
    const navigate = useNavigate();
    
    const [input, setInput] = useState({
        title: '',
        description: '',
        requirements: '',
        salary: '',
        location: '',
        jobType: '',
        experience: '',
        position: 0,
        companyId: '',
    });
    const [loading, setLoading] = useState(false);
    const [companies, setCompanies] = useState([]);
    const [fetchingJob, setFetchingJob] = useState(true);

    // Fetch companies
    useEffect(() => {
        const fetchCompanies = async () => {
            try {
                const response = await axios.get(`${COMPANY_API_END_POINT}/get`, {
                    withCredentials: true
                });
                if (response.data.success) {
                    setCompanies(response.data.companies);
                }
            } catch (error) {
                console.error('Error fetching companies:', error);
                toast.error('Failed to fetch companies');
            }
        };
        
        fetchCompanies();
    }, []);

    // Fetch job details
    useEffect(() => {
        const fetchJobDetails = async () => {
            if (!jobId) return;
            
            setFetchingJob(true);
            try {
                console.log('Fetching job details for ID:', jobId);
                console.log('API URL:', `${JOB_API_END_POINT}/get/${jobId}`);
                
                const response = await axios.get(`${JOB_API_END_POINT}/get/${jobId}`, {
                    withCredentials: true
                });
                
                console.log('Job details response:', response.data);
                
                if (response.data.success && response.data.job) {
                    const job = response.data.job;
                    setInput({
                        title: job.title || '',
                        description: job.description || '',
                        requirements: Array.isArray(job.requirements) ? job.requirements.join(', ') : job.requirements || '',
                        salary: job.salary || '',
                        location: job.location || '',
                        jobType: job.jobType || '',
                        experience: job.experienceLevel || job.experience || '',
                        position: job.position || 0,
                        companyId: job.company?._id || job.company || '',
                    });
                } else {
                    toast.error('Invalid job data received');
                }
            } catch (error) {
                console.error('Error fetching job details:', error);
                if (error.response?.status === 404) {
                    toast.error('Job not found');
                    navigate('/admin/jobs');
                } else {
                    toast.error('Failed to fetch job details. Please try again.');
                }
            } finally {
                setFetchingJob(false);
            }
        };
        
        fetchJobDetails();
    }, [jobId, navigate]);

    const changeEventHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value });
    };

    const selectChangeHandler = (value) => {
        setInput({ ...input, companyId: value });
    };

    // Handle form submission for updating job
    const submitHandler = async (e) => {
        e.preventDefault();
        setLoading(true);
        
        // Basic validation
        if (!input.title || !input.description || !input.companyId) {
            toast.error('Please fill in all required fields');
            setLoading(false);
            return;
        }
        
        console.log('Submitting update with data:', input);
        console.log('Update URL:', `${JOB_API_END_POINT}/update/${jobId}`);
        
        try {
            const response = await axios.put(`${JOB_API_END_POINT}/update/${jobId}`, input, {
                withCredentials: true
            });
            
            console.log('Update response:', response.data);
            
            if (response.data.success) {
                toast.success('Job updated successfully!');
                navigate('/admin/jobs');
            } else {
                toast.error(response.data.message || 'Failed to update job');
            }
            
        } catch (error) {
            console.error('Update error:', error);
            
            if (error.response?.status === 404) {
                toast.error('Job not found or update endpoint not available');
            } else if (error.response?.status === 401) {
                toast.error('Unauthorized. Please login again.');
            } else if (error.response?.status === 403) {
                toast.error('You are not authorized to update this job.');
            } else {
                toast.error(error.response?.data?.message || 'Failed to update the job. Please try again.');
            }
        } finally {
            setLoading(false);
        }
    };

    // Handle job deletion
    const handleDelete = async () => {
        if (!window.confirm('Are you sure you want to delete this job?')) {
            return;
        }
        
        setLoading(true);
        try {
            console.log('Deleting job with ID:', jobId);
            
            const response = await axios.delete(`${JOB_API_END_POINT}/delete/${jobId}`, {
                withCredentials: true
            });
            
            if (response.data.success) {
                toast.success('Job deleted successfully!');
                navigate('/admin/jobs');
            } else {
                toast.error(response.data.message || 'Failed to delete job');
            }
            
        } catch (error) {
            console.error('Delete error:', error);
            
            if (error.response?.status === 404) {
                toast.error('Job not found');
            } else if (error.response?.status === 403) {
                toast.error('You are not authorized to delete this job.');
            } else {
                toast.error(error.response?.data?.message || 'Failed to delete the job. Please try again.');
            }
        } finally {
            setLoading(false);
        }
    };

    if (fetchingJob) {
        return (
            <div className="bg-white min-h-screen">
                <Navbar />
                <div className="flex items-center justify-center min-h-[50vh]">
                    <Loader2 className="h-8 w-8 animate-spin" />
                    <span className="ml-2">Loading job details...</span>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-white min-h-screen">
            <Navbar />
            <motion.div
                className="flex items-center justify-center w-full my-5 pt-10"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
            >
                <form
                    onSubmit={submitHandler}
                    className="p-8 max-w-4xl w-full bg-white border border-blue-300 shadow-lg rounded-md"
                >
                    <motion.div
                        className="grid grid-cols-1 md:grid-cols-2 gap-4"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.7 }}
                    >
                        <div>
                            <Label>Title <span className="text-red-500">*</span></Label>
                            <Input
                                type="text"
                                name="title"
                                value={input.title}
                                onChange={changeEventHandler}
                                className="my-1 border-blue-300 focus:ring-blue-500 focus:border-blue-500"
                                placeholder="Job Title"
                            />
                        </div>
                        
                        <div>
                            <Label>Description <span className="text-red-500">*</span></Label>
                            <Input
                                type="text"
                                name="description"
                                value={input.description}
                                onChange={changeEventHandler}
                                className="my-1 border-blue-300 focus:ring-blue-500 focus:border-blue-500"
                                placeholder="Job Description"
                            />
                        </div>
                        
                        <div>
                            <Label>Requirements <span className="text-red-500">*</span></Label>
                            <Input
                                type="text"
                                name="requirements"
                                value={input.requirements}
                                onChange={changeEventHandler}
                                className="my-1 border-blue-300 focus:ring-blue-500 focus:border-blue-500"
                                placeholder="Requirements (comma separated)"
                            />
                        </div>
                        
                        <div>
                            <Label>Salary <span className="text-red-500">*</span></Label>
                            <Input
                                type="text"
                                name="salary"
                                value={input.salary}
                                onChange={changeEventHandler}
                                className="my-1 border-blue-300 focus:ring-blue-500 focus:border-blue-500"
                                placeholder="Salary"
                            />
                        </div>
                        
                        <div>
                            <Label>Location <span className="text-red-500">*</span></Label>
                            <Input
                                type="text"
                                name="location"
                                value={input.location}
                                onChange={changeEventHandler}
                                className="my-1 border-blue-300 focus:ring-blue-500 focus:border-blue-500"
                                placeholder="Location"
                            />
                        </div>
                        
                        <div>
                            <Label>Job Type <span className="text-red-500">*</span></Label>
                            <Input
                                type="text"
                                name="jobType"
                                value={input.jobType}
                                onChange={changeEventHandler}
                                className="my-1 border-blue-300 focus:ring-blue-500 focus:border-blue-500"
                                placeholder="Job Type"
                            />
                        </div>
                        
                        <div>
                            <Label>Experience <span className="text-red-500">*</span></Label>
                            <Input
                                type="text"
                                name="experience"
                                value={input.experience}
                                onChange={changeEventHandler}
                                className="my-1 border-blue-300 focus:ring-blue-500 focus:border-blue-500"
                                placeholder="Experience Level"
                            />
                        </div>
                        
                        <div>
                            <Label>Position <span className="text-red-500">*</span></Label>
                            <Input
                                type="number"
                                name="position"
                                value={input.position}
                                onChange={changeEventHandler}
                                className="my-1 border-blue-300 focus:ring-blue-500 focus:border-blue-500"
                                placeholder="Number of Positions"
                            />
                        </div>
                        
                        {companies.length > 0 && (
                            <div className="md:col-span-2">
                                <Label>Company <span className="text-red-500">*</span></Label>
                                <Select
                                    onValueChange={selectChangeHandler}
                                    value={input.companyId}
                                >
                                    <SelectTrigger className="w-full">
                                        <SelectValue placeholder="Select a Company" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectGroup>
                                            {companies.map((company) => (
                                                <SelectItem
                                                    key={company._id}
                                                    value={company._id}
                                                >
                                                    {company.name}
                                                </SelectItem>
                                            ))}
                                        </SelectGroup>
                                    </SelectContent>
                                </Select>
                            </div>
                        )}
                    </motion.div>
                    
                    {loading ? (
                        <Button className="w-full my-4 bg-blue-500 text-white" disabled>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Please wait
                        </Button>
                    ) : (
                        <>
                            <Button
                                type="submit"
                                className="w-full my-4 bg-blue-500 hover:bg-blue-600 text-white transition duration-300"
                            >
                                Update Job
                            </Button>
                            <Button
                                type="button"
                                onClick={handleDelete}
                                className="w-full my-4 bg-red-500 hover:bg-red-600 text-white transition duration-300"
                            >
                                Delete Job
                            </Button>
                        </>
                    )}
                    
                    {companies.length === 0 && (
                        <p className="text-xs text-red-600 font-bold text-center my-3">
                            *Please register a company first, before updating jobs.
                        </p>
                    )}
                </form>
            </motion.div>
            <Footer />
        </div>
    );
};

export default UpdateJobs;