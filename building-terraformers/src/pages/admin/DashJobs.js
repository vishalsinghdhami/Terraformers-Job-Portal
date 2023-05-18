import React, { useEffect, useState } from "react";
import { Box, Button, Paper, Typography, Modal , TextField,MenuItem } from "@mui/material";
import { DataGrid, gridClasses,GridToolbar } from "@mui/x-data-grid";
import { Link } from "react-router-dom";
import AddIcon from "@mui/icons-material/Add";
import { useDispatch, useSelector } from "react-redux";
import { jobLoadAction } from "../../redux/actions/jobAction";
import { toast } from "react-toastify";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const DashJobs = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    setuserid(localStorage.getItem("user")._id);

    dispatch(jobLoadAction());
  }, []);
  const [userid, setuserid] = useState("");
  const [showJobCreate, setShowJobCreate] = useState(false);
  const handleShowCreateJob = () => setShowJobCreate(true);
  const handleCloseCreateJob = () => setShowJobCreate(false);

  const [showJobTypeCreate, setShowJobTypeCreate] = useState(false);
  const handleShowCreateJobType = () => setShowJobTypeCreate(true);
  const handleCloseCreateJobType = () => setShowJobTypeCreate(false);

  const { jobs, loading } = useSelector((state) => state.loadJobs);
  let data = [];
  data = jobs !== undefined && jobs.length > 0 ? jobs : [];

  //delete job by Id
  const deleteJobById = async (e, id) => {
    console.log(id);
    try {
      const { data } = await axios.delete(`/api/job/delete/${id}`);
      toast.success("job deleted successfully!");
    } catch (error) {
      toast.error(error.response.data.error);
    }
    window.location.reload(true);
    setTimeout(() => {
      navigate("/admin/users");
    }, 500);
  };
  //create Job
  const [jobTitle, setJobTitle] = useState("");
  const [jobDescription, setJobDescription] = useState("");
  const [jobSalary, setJobSalary] = useState("");
  const [jobType, setJobType] = useState("");
  const [jobDeadline, setJobDeadline] = useState("");
  const [jobEmail, setJobEmail] = useState("");
  const [jobContactNo, setJobContactNo] = useState("");
  const [jobLocation, setJobLocation] = useState("");
  
  const createJob = async () => {
    console.log(jobType)
    handleShowCreateJob();
    const response = await axios.post("/api/job/create ", {
      user: userid,
      title: jobTitle,
      description: jobDescription,
      salary: jobSalary,
      jobType: jobType,
      deadline: jobDeadline,
      email: jobEmail,
      contactNo: jobContactNo,
      location:jobLocation
    });
    setJobTitle("");
    setJobDescription("");
    setJobSalary("");
    setJobType("");
    setJobDeadline("");
    setJobEmail("");
    setJobContactNo("");
    setJobLocation("")
    console.log(response);
  };
 const ALLJOBTYPES={
    "6444e2845ff839745074c040": "backend",
    "6444e2ad5ff839745074c043":"frontend",
    "6444e2b75ff839745074c046": "ui/ux",
    "6444e2cd5ff839745074c049":  "Full Stack",
    "6466179df914a85a5cf794b9": "Devops",
    "64665e4ef914a85a5cf7960b": "Software Architect",
    "64665fbcf914a85a5cf79621":"Principal Software Engineer",
    "64666939f914a85a5cf796b2":"Tech Lead"
 }
  const [jobTypeCreate, setJobTypeCreate] = useState("");
  // create Job TYPE
  const createJobType = async () => {
    console.log(jobTypeCreate);
    handleShowCreateJobType();
    const response = await axios.post("/api/type/create", {
      jobTypeName: jobTypeCreate,
      user: userid,
    });
    setJobTypeCreate("");
    console.log(response);
  };
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const columns = [
    {
      field: "_id",
      headerName: "Job ID",
      width: 150,
      editable: true,
    },
    {
      field: "title",
      headerName: "Job name",
      width: 150,
    },
    {
      field: "jobType",
      headerName: "Category",
      width: 150,
      valueGetter: (data) => data.row.jobType.jobTypeName,
    },
    {
      field: "user",
      headerName: "User",
      width: 150,
      valueGetter: (data) => data.row.user.firstName,
    },
    {
      field: "available",
      headerName: "available",
      width: 150,
      renderCell: (values) => (values.row.available ? "Yes" : "No"),
    },

    {
      field: "salary",
      headerName: "Salary",
      type: Number,
      width: 150,
      renderCell: (values) => "$" + values.row.salary,
    },

    {
      field: "Actions",
      width: 200,
      renderCell: (values) => (
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            width: "170px",
          }}
        >
          <Button variant="contained">
            <Link
              style={{ color: "white", textDecoration: "none" }}
              to={`/admin/edit/job/${values.row._id}`}
            >
              Edit
            </Link>
          </Button>
          <Button
            onClick={(e) => deleteJobById(e, values.row._id)}
            variant="contained"
            color="error"
          >
            Delete
          </Button>
        </Box>
      ),
    },
  ];
  const handleCreateJobSubmit = (e) => {
    e.preventDefault();
    
    // Validate the form fields
    if (!jobTitle || !jobDescription || !jobSalary || !jobType || !jobDeadline || !jobEmail || !jobContactNo||!jobLocation) {
      // If any of the required fields are empty, display an error or perform the desired action
      alert('Please fill in all the required fields');
      return;
    }
    else{
        createJob();
    }
}
  return (
    <div>
      <Box>
        <Typography variant="h4" sx={{ color: "white", pb: 3 }}>
          Jobs list
        </Typography>
        <Box sx={{ pb: 2, pr: 5, display: "flex", justifyContent: "right" }}>
          <Button
            onClick={handleShowCreateJobType}
            variant="contained"
            color="success"
            startIcon={<AddIcon />}
          >
            {" "}
            <Link
              style={{
                color: "white",
                textDecoration: "none",
                marginRight: "3px",
              }}
            >
              Create Job Type
            </Link>
          </Button>
          <Button 
          onClick={handleShowCreateJob}
          variant="contained" color="success" startIcon={<AddIcon />}>
            {" "}
            <Link
              style={{ color: "white", textDecoration: "none" }}
            >
              Create Job
            </Link>
          </Button>
        </Box>

        <Paper sx={{ bgcolor: "secondary.midNightBlue" }}>
          <Box sx={{ height: 400, width: "100%" }}>
            <DataGrid
              getRowId={(row) => row._id}
              sx={{
                "& .MuiTablePagination-displayedRows": {
                  color: "white",
                },
                color: "white",
                [`& .${gridClasses.row}`]: {
                  bgcolor: (theme) =>
                    // theme.palette.mode === 'light' ? grey[200] : grey[900],
                    theme.palette.secondary.main,
                },
                button: {
                  color: "#ffffff",
                },
              }}
              rows={data}
              columns={columns}
              pageSize={5}
              rowsPerPageOptions={[5]}
              checkboxSelection
              slots={{ toolbar: GridToolbar }}
            />
          </Box>
        </Paper>
      </Box>
      {/* for creating job type */}
      <Modal
        open={showJobTypeCreate}
        onClose={handleCloseCreateJobType}
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Box
          sx={{
            width: 300,
            bgcolor: "background.paper",
            p: 2,
            borderRadius: 3,
          }}
        >
          <Typography >Add Job Type</Typography>
          <form >
            <input
              type="text"
              id="title"
              onChange={(e) => setJobTypeCreate(e.target.value)}
              value={jobTypeCreate}
              placeholder="Enter Job Title"
            />
          </form>
          <Button
            style={{ backgroundColor: "#d63031", fontSize: 9,color:'white' }}
            variant="secondary"
            onClick={handleCloseCreateJobType}
          >
            Close
          </Button>
          <Button
            variant="primary"
            style={{ backgroundColor: "#d63031", fontSize: 9 ,color:'white' ,marginLeft:'6px'}}
            onClick={createJobType}
          >
            Save Changes
          </Button>
        </Box>
      </Modal>

           {/* for creating Job*/}
           <Modal
        open={showJobCreate}
        onClose={handleCloseCreateJobType}
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Box
          sx={{
            width: 300,
            bgcolor: "background.paper",
            p: 2,
            borderRadius: 3,
          }}
        >
          <Typography >Enter Job Details</Typography>
          <form onSubmit={handleCreateJobSubmit}>
          <TextField
              label="Title"
              value={jobTitle}
              onChange={(e) => setJobTitle(e.target.value)}
              fullWidth
              margin="normal"
            />
            <TextField
              label="Description"
              value={jobDescription}
              onChange={(e) => setJobDescription(e.target.value)}
              fullWidth
              margin="normal"
            />
            <TextField
              label="Salary"
              value={jobSalary}
              onChange={(e) => setJobSalary(e.target.value)}
              fullWidth
              margin="normal"
            />
            <TextField
            select
              label="Job Type"
              value={jobType}
              onChange={(e) => setJobType(e.target.value)}
              fullWidth
              margin="normal"
            > {Object.entries(ALLJOBTYPES).map(([id, jobType]) => (
                <MenuItem key={id} value={id}>
                  {jobType}
                  </MenuItem>))}
                </TextField>
            <TextField
              label="Deadline"
              value={jobDeadline}
              onChange={(e) => setJobDeadline(e.target.value)}
              fullWidth
              margin="normal"
            />
               
            <TextField
              label="Email"
              value={jobEmail}
              onChange={(e) => setJobEmail(e.target.value)}
              fullWidth
              margin="normal"
            />
            <TextField
              label="Contact No"
              value={jobContactNo}
              onChange={(e) => setJobContactNo(e.target.value)}
              fullWidth
              margin="normal"
            />
             <TextField
              label="Location"
              value={jobLocation}
              onChange={(e) => setJobLocation(e.target.value)}
              fullWidth
              margin="normal"
            /> <Button
            style={{ backgroundColor: "#d63031", fontSize: 9,color:'white' }}
            variant="secondary"
            onClick={handleCloseCreateJob}
          >
            Close
          </Button>
            <Button
            variant="primary"
            style={{ backgroundColor: "#d63031", fontSize: 9 ,color:'white' ,marginLeft:'6px'}}
            type="submit"
          >
            Save Changes
          </Button>
          
          </form>
         
          
        </Box>
      </Modal>
    </div>
  );
};

export default DashJobs;
