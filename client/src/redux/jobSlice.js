

















import { createSlice } from "@reduxjs/toolkit";

const jobSlice = createSlice({
    name: "job",
    initialState: {
        allJobs: [],
        allAdminJobs: [],
        singleJob: null,
        searchJobByText: "",
        allAppliedJobs: [],
        searchedQuery: "",
        selectedFilters: {
            Location: [],
            Industry: [],
            Skills: [],
            Salary: []
        }, // ✅ Added selectedFilters to initial state
    },
    reducers: {
        // actions
        setAllJobs: (state, action) => {
            state.allJobs = action.payload;
        },
        setSingleJob: (state, action) => {
            state.singleJob = action.payload;
        },
        setAllAdminJobs: (state, action) => {
            state.allAdminJobs = action.payload;
        },
        setSearchJobByText: (state, action) => {
            state.searchJobByText = action.payload;
        },
        setAllAppliedJobs: (state, action) => {
            state.allAppliedJobs = action.payload;
        },
        setSearchedQuery: (state, action) => {
            state.searchedQuery = action.payload;
        },
        setSelectedFilters: (state, action) => {
            state.selectedFilters = action.payload;
        }, //  Added new action for filters
        clearFilters: (state) => {
            state.selectedFilters = {
                Location: [],
                Industry: [],
                Skills: [],
                Salary: []
            };
        } //  Added clear filters action (bonus feature)
    }
});

export const {
    setAllJobs,
    setSingleJob,
    setAllAdminJobs,
    setSearchJobByText,
    setAllAppliedJobs,
    setSearchedQuery,
    setSelectedFilters, //  Export new action
    clearFilters //  Export clear action
} = jobSlice.actions;

export default jobSlice.reducer;