import {useEffect, useState} from "react";
import Logo from "./Logo";
import Hero from "./Hero";
import axios from "axios";
import {
    AppBar,
    Alert,
    Avatar,
    Box,
    Button,
    Chip,
    CircularProgress,
    Container,
    Paper,
    Snackbar,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    TextField,
    Toolbar,
    Typography
} from "@mui/material";

const SERVER_URL = process.env.REACT_APP_SERVER_URL;
const COLORS = ["#1976d2", "#7b1fa2", "#2e7d32", "#ed6c02", "#c62828", "#00838f"];

const initials = (name) =>
    (name || "").split(" ").filter(Boolean).slice(0, 2).map((w) => w[0].toUpperCase()).join("") || "?";

function App() {
    const [employees, setEmployees] = useState([]);
    const [name, setName] = useState("");
    const [employeeId, setEmployeeId] = useState("");
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [toast, setToast] = useState({open: false, message: "", severity: "success"});

    const showToast = (message, severity = "success") => setToast({open: true, message, severity});

    async function fetchEmployees() {
        try {
            const response = await axios.get(SERVER_URL);
            setEmployees(response.data || []);
        } catch (error) {
            showToast("Could not load employees", "error");
        } finally {
            setLoading(false);
        }
    }

    async function createEmployee() {
        if (!name.trim() || employeeId === "" || isNaN(parseInt(employeeId, 10))) {
            showToast("Please enter a name and a numeric ID", "warning");
            return;
        }
        setSaving(true);
        try {
            await axios.post(SERVER_URL, {name: name.trim(), employee_id: parseInt(employeeId, 10)});
            setName("");
            setEmployeeId("");
            await fetchEmployees();
            showToast("Employee added successfully");
        } catch (error) {
            showToast("Failed to add employee", "error");
        } finally {
            setSaving(false);
        }
    }

    useEffect(() => {
        fetchEmployees();
    }, []);

    const onEnter = (e) => {
        if (e.key === "Enter") createEmployee();
    };

    return (
        <Box sx={{minHeight: "100vh", bgcolor: "#f4f6fb"}}>
            <AppBar position="static" elevation={0}
                    sx={{background: "linear-gradient(90deg, #1565c0 0%, #7b1fa2 100%)"}}>
                <Toolbar sx={{justifyContent: "space-between"}}>
                    <Typography variant="h6" sx={{fontWeight: 700}}>
                        Employee Management System
                    </Typography>
                    <Chip label={`${employees.length} employees`}
                          sx={{bgcolor: "rgba(255,255,255,0.2)", color: "#fff", fontWeight: 600}}/>
                </Toolbar>
                     </AppBar>
                     <Hero/>

            <Container maxWidth="md" sx={{py: 4}}>
                <Paper elevation={2} sx={{p: 3, borderRadius: 3, mb: 4}}>
                    <Typography variant="h6" sx={{mb: 2, fontWeight: 600}}>
                        Add a new employee
                    </Typography>
                    <Box sx={{display: "flex", gap: 2, flexWrap: "wrap", alignItems: "center"}}>
                        <TextField label="Name" variant="outlined" size="small" value={name}
                                   onChange={(e) => setName(e.target.value)} onKeyDown={onEnter}
                                   sx={{flex: 2, minWidth: 180}}/>
                        <TextField label="Employee ID" type="number" variant="outlined" size="small"
                                   value={employeeId} onChange={(e) => setEmployeeId(e.target.value)}
                                   onKeyDown={onEnter} sx={{flex: 1, minWidth: 140}}/>
                        <Button variant="contained" size="large" onClick={createEmployee} disabled={saving}
                                sx={{textTransform: "none", fontWeight: 600, px: 4, borderRadius: 2}}>
                            {saving ? <CircularProgress size={22} color="inherit"/> : "Add Employee"}
                        </Button>
                    </Box>
                </Paper>

                <Paper elevation={2} sx={{borderRadius: 3, overflow: "hidden"}}>
                    <Box sx={{p: 2, borderBottom: "1px solid #eee"}}>
                        <Typography variant="h6" sx={{fontWeight: 600}}>Employees</Typography>
                    </Box>
                    <TableContainer>
                        <Table>
                            <TableHead sx={{bgcolor: "#fafbff"}}>
                                <TableRow>
                                    <TableCell sx={{fontWeight: 700}}>Employee</TableCell>
                                    <TableCell align="right" sx={{fontWeight: 700}}>Employee ID</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {loading && (
                                    <TableRow>
                                        <TableCell colSpan={2} align="center" sx={{py: 5}}>
                                            <CircularProgress size={28}/>
                                        </TableCell>
                                    </TableRow>
                                )}
                                {!loading && employees.length === 0 && (
                                    <TableRow>
                                        <TableCell colSpan={2} align="center" sx={{py: 5, color: "text.secondary"}}>
                                            No employees yet. Add your first one above.
                                        </TableCell>
                                    </TableRow>
                                )}
                                {employees.map((employee, index) => (
                                    <TableRow key={index} hover>
                                        <TableCell>
                                            <Box sx={{display: "flex", alignItems: "center", gap: 2}}>
                                                <Avatar sx={{bgcolor: COLORS[index % COLORS.length], fontWeight: 600}}>
                                                    {initials(employee.name)}
                                                </Avatar>
                                                <Typography sx={{fontWeight: 500}}>{employee.name}</Typography>
                                            </Box>
                                        </TableCell>
                                        <TableCell align="right">
                                            <Chip label={`#${employee.employee_id}`} size="small" variant="outlined"/>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Paper>
            </Container>

            <Snackbar open={toast.open} autoHideDuration={3000}
                      onClose={() => setToast({...toast, open: false})}
                      anchorOrigin={{vertical: "bottom", horizontal: "center"}}>
                <Alert severity={toast.severity} variant="filled" sx={{width: "100%"}}>
                    {toast.message}
                </Alert>
            </Snackbar>
        </Box>
    );
}

export default App;