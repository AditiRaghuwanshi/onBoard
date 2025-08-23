// import React, { useEffect, useState } from 'react';
// import Navbar from './shared/Navbar';
// import FilterCard from './FilterCard';
// import Job from './Job';
// import { useSelector } from 'react-redux';
// import { motion } from 'framer-motion';

// const Jobs = () => {
//     // const { allJobs, searchedQuery, selectedFilters } = useSelector(store => store.job);
//     const [filteredJobs, setFilteredJobs] = useState([]);
//     const [showFilters, setShowFilters] = useState(false); // State to control filter card visibility

//     // useEffect(() => {
//     //     if (searchedQuery) {
//     //         const queryWords = searchedQuery.toLowerCase().split(" ");
//     //         const filtered = allJobs.filter(job => {
//     //             const searchFields = [
//     //                 job.title,
//     //                 job.description,
//     //                 job.requirements?.join(" "), 
//     //                 job.location
//     //             ];
//     //             return queryWords.some(word =>
//     //                 searchFields.some(field => field?.toLowerCase().includes(word))
//     //             );
//     //         });
//     //         setFilteredJobs(filtered);
//     //     } else {
//     //         setFilteredJobs(allJobs);
//     //     }
//     // }, [allJobs, searchedQuery]);



    
// const { allJobs, searchedQuery, selectedFilters } = useSelector(store => store.job);

// useEffect(() => {
//     let jobs = allJobs;

//     // 🔹 Step 1: Search filter
//     if (searchedQuery) {
//         const queryWords = searchedQuery.toLowerCase().split(" ");
//         jobs = jobs.filter(job => {
//             const searchFields = [
//                 job.title,
//                 job.description,
//                 job.requirements?.join(" "),
//                 job.location
//             ];
//             return queryWords.some(word =>
//                 searchFields.some(field => field?.toLowerCase().includes(word))
//             );
//         });
//     }

//     // 🔹 Step 2: Apply filters
//     if (selectedFilters) {
//         jobs = jobs.filter(job => {
//             // Salary
//             if (selectedFilters.salary.length > 0 && !selectedFilters.salary.includes(job.salary)) {
//                 return false;
//             }

//             // Location
//             if (selectedFilters.Location.length > 0 && !selectedFilters.Location.includes(job.location)) {
//                 return false;
//             }

//             // Industry
//             if (selectedFilters.Industry.length > 0 && !selectedFilters.Industry.includes(job.industry)) {
//                 return false;
//             }

//             // Skills
//             if (selectedFilters.Skills.length > 0 && !job.skills.some(skill => selectedFilters.Skills.includes(skill))) {
//                 return false;
//             }
              
//             console.log("Selected Salary:", selectedFilters.Salary);
// console.log("Job Salary:", job.salary);

//             return true;
//         });
//     }

//     setFilteredJobs(jobs);
// }, [allJobs, searchedQuery, selectedFilters]);


//     return (
//         <div className="bg-gray-100 min-h-screen">
//             <Navbar />
//             <div className="max-w-7xl mx-auto pt-20 bg-gradient-to-br from-[#00040A] to-[#001636]">
//                 <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
//                     <div className="lg:hidden w-full">
//                         <button
//                             onClick={ () => setShowFilters(!showFilters) }
//                             className="w-full bg-blue-600 text-white py-2 px-4 rounded-md mb-4"
//                         >
//                             { showFilters ? 'Hide Filters' : 'Show Filters' }
//                         </button>
//                     </div>
//                     {/* Filter Sidebar */ }
//                     <div className={ `lg:block ${showFilters ? 'block' : 'hidden'} lg:col-span-1` }>
//                         <FilterCard />
//                     </div>

//                     {/* Button to toggle filter card on small screens */ }


//                     {/* Main Job List Section */ }
//                     <div className="lg:col-span-3">
//                         <motion.div
//                             className="grid grid-cols-1 gap-8"
//                             initial={ { opacity: 0 } }
//                             animate={ { opacity: 1 } }
//                             transition={ { duration: 0.5 } }
//                         >
//                             { filteredJobs.length > 0 ? (
//                                 filteredJobs.map((job) => (
//                                     <motion.div
//                                         key={ job?._id }
//                                         layout
//                                         initial={ { opacity: 0, y: 50 } }
//                                         animate={ { opacity: 1, y: 0 } }
//                                         transition={ {
//                                             type: 'spring',
//                                             stiffness: 200,
//                                             damping: 20
//                                         } }
//                                     >
//                                         <Job job={ job } />
//                                     </motion.div>
//                                 ))
//                             ) : (
//                                 <span className="text-blue-600 font-bold">No jobs found</span>
//                             ) }
//                         </motion.div>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default Jobs;


























import React, { useEffect, useState } from 'react';
import Navbar from './shared/Navbar';
import FilterCard from './FilterCard';
import Job from './Job';
import { useSelector } from 'react-redux';
import { motion } from 'framer-motion';

const Jobs = () => {
    const { allJobs, searchedQuery, selectedFilters } = useSelector(store => store.job);
    const [filteredJobs, setFilteredJobs] = useState([]);
    const [showFilters, setShowFilters] = useState(false);

    // ✅ Helper function to check if salary falls within a range
    const checkSalaryRange = (jobSalary, salaryFilter) => {
        // Convert salary to number (handle both string and number formats)
        let salary;
        if (typeof jobSalary === 'string') {
            // Remove any non-numeric characters except decimal point
            salary = parseFloat(jobSalary.replace(/[^\d.]/g, ''));
        } else {
            salary = parseFloat(jobSalary);
        }
        
        console.log(` Checking salary: "${jobSalary}" -> parsed as: ${salary} against range: ${salaryFilter}`);
        
        if (isNaN(salary)) {
            console.log(` Could not parse salary: ${jobSalary}`);
            return false;
        }
        
        switch (salaryFilter) {
            case "0-3":
                return salary >= 0 && salary <= 3;
            case "3-6":
                return salary > 3 && salary <= 6;
            case "6-10":
                return salary > 6 && salary <= 10;
            case "10-15":
                return salary > 10 && salary <= 15;
            case "15+":
                return salary > 15;
            default:
                return false;
        }
    };

    useEffect(() => {
        console.log(" ===== STARTING FILTER PROCESS =====");
        console.log(" Total Jobs:", allJobs?.length || 0);
        console.log(" Search Query:", searchedQuery);
        console.log("Selected Filters:", selectedFilters);
        
        // Sample the first few jobs to see data structure
        if (allJobs?.length > 0) {
            console.log(" Sample job data:", {
                title: allJobs[0]?.title,
                salary: allJobs[0]?.salary,
                location: allJobs[0]?.location,
                industry: allJobs[0]?.industry,
                requirements: allJobs[0]?.requirements,
                skills: allJobs[0]?.skills // Check if this exists
            });
        }
        
        let jobs = [...(allJobs || [])]; // Create a copy and handle undefined

        // 🔹 Step 1: Search filter
        if (searchedQuery && searchedQuery.trim()) {
            console.log(" Applying search filter...");
            const queryWords = searchedQuery.toLowerCase().split(" ");
            jobs = jobs.filter(job => {
                const searchFields = [
                    job.title,
                    job.description,
                    job.requirements?.join(" "),
                    job.location
                ];
                const matches = queryWords.some(word =>
                    searchFields.some(field => field?.toLowerCase().includes(word))
                );
                return matches;
            });
            console.log(" After search filter:", jobs.length, "jobs remain");
        }

        // 🔹 Step 2: Apply filters
        if (selectedFilters && Object.keys(selectedFilters).length > 0) {
            console.log(" Applying category filters...");
            
            jobs = jobs.filter((job, index) => {
                console.log(`\n🔍 Filtering job ${index + 1}: "${job.title}"`);
                
                //  Salary Filter
                if (selectedFilters.Salary?.length > 0) {
                    console.log(` Checking salary filter...`);
                    const salaryMatches = selectedFilters.Salary.some(salaryRange => {
                        const matches = checkSalaryRange(job.salary, salaryRange);
                       
                        return matches;
                    });
                    if (!salaryMatches) {
                        console.log(` Job "${job.title}" filtered out by salary`);
                        return false;
                    }
                    console.log(`✅ Job "${job.title}" passed salary filter`);
                }

                // Location Filter
                if (selectedFilters.Location?.length > 0) {
                    console.log(`Checking location filter...`);
                    const locationMatches = selectedFilters.Location.includes(job.location);
                    console.log(`   Job location: "${job.location}" | Selected: [${selectedFilters.Location.join(', ')}] | Match: ${locationMatches ? '✅' : '❌'}`);
                    if (!locationMatches) {
                        console.log(` Job "${job.title}" filtered out by location`);
                        return false;
                    }
                }

                // Industry Filter
                if (selectedFilters.Industry?.length > 0) {
                    console.log(`Checking industry filter...`);
                    const industryMatches = selectedFilters.Industry.includes(job.industry);
                    console.log(`   Job industry: "${job.industry}" | Selected: [${selectedFilters.Industry.join(', ')}] | Match: ${industryMatches ? '✅' : '❌'}`);
                    if (!industryMatches) {
                        console.log(` Job "${job.title}" filtered out by industry`);
                        return false;
                    }
                }

                // Skills Filter
                if (selectedFilters.Skills?.length > 0) {
                    console.log(`Checking skills filter...`);
                    const jobSkills = job.requirements || job.skills || [];
                    console.log(`   Job skills: [${jobSkills.join(', ')}]`);
                    console.log(`   Selected skills: [${selectedFilters.Skills.join(', ')}]`);
                    
                    const skillsMatch = jobSkills.some(skill => 
                        selectedFilters.Skills.some(selectedSkill => 
                            skill.toLowerCase().includes(selectedSkill.toLowerCase()) ||
                            selectedSkill.toLowerCase().includes(skill.toLowerCase())
                        )
                    );
                   
                    if (!skillsMatch) {
                        console.log(` Job "${job.title}" filtered out by skills`);
                        return false;
                    }
                }

                console.log(` Job "${job.title}" passed all filters`);
                return true;
            });
        }

        console.log(" ===== FILTER PROCESS COMPLETE =====");
        console.log(" Final filtered jobs:", jobs.length);
        setFilteredJobs(jobs);
    }, [allJobs, searchedQuery, selectedFilters]);

    return (
        <div className="bg-gray-100 min-h-screen">
            <Navbar />
            <div className="max-w-7xl mx-auto pt-20 bg-gradient-to-br from-[#00040A] to-[#001636]">
                {/* Debug Info Panel */}
                <div className="bg-gray-800 text-white p-4 mb-4 rounded-lg text-xs">
                    <h3 className="font-bold text-blue-400 mb-2"> Job Info:</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                            <strong>Total Jobs:</strong> {allJobs?.length || 0}
                        </div>
                        <div>
                            <strong>Filtered Jobs:</strong> {filteredJobs.length}
                        </div>
                        <div>
                            <strong>Active Filters:</strong> {
                                selectedFilters ? 
                                Object.entries(selectedFilters)
                                    .filter(([key, value]) => value.length > 0)
                                    .map(([key, value]) => `${key}(${value.length})`)
                                    .join(', ') || 'None'
                                : 'None'
                            }
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                    <div className="lg:hidden w-full">
                        <button
                            onClick={() => setShowFilters(!showFilters)}
                            className="w-full bg-blue-600 text-white py-2 px-4 rounded-md mb-4"
                        >
                            {showFilters ? 'Hide Filters' : 'Show Filters'}
                        </button>
                    </div>
                    
                    {/* Filter Sidebar */}
                    <div className={`lg:block ${showFilters ? 'block' : 'hidden'} lg:col-span-1`}>
                        <FilterCard />
                    </div>

                    {/* Main Job List Section */}
                    <div className="lg:col-span-3">
                        <motion.div
                            className="grid grid-cols-1 gap-8"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.5 }}
                        >
                            {filteredJobs.length > 0 ? (
                                filteredJobs.map((job) => (
                                    <motion.div
                                        key={job?._id}
                                        layout
                                        initial={{ opacity: 0, y: 50 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{
                                            type: 'spring',
                                            stiffness: 200,
                                            damping: 20
                                        }}
                                    >
                                        <Job job={job} />
                                    </motion.div>
                                ))
                            ) : (
                                <div className="text-center text-white">
                                    <span className="text-blue-600 font-bold text-xl">No jobs found</span>
                                    <p className="text-gray-400 mt-2">
                                        {allJobs?.length > 0 ? 
                                            "Try adjusting your filters or search criteria" : 
                                            "No jobs available"}
                                    </p>
                                </div>
                            )}
                        </motion.div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Jobs;