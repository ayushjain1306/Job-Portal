import React, { useContext, useEffect, useState } from 'react';
import { Box, Backdrop, Table, TableBody, TableCell, TableRow, CircularProgress, styled, Typography } from "@mui/material";
import { getAdminData } from "../../../services/admin/adminAccount";
import { Link, Outlet, useNavigate } from 'react-router-dom';
import { AdminContext } from '../../../context/admin/AdminProvider';
import { AccountBalance, Dashboard, DeveloperMode, Logout, Payments, Person, Work, Menu } from '@mui/icons-material';

const NewBox = styled(Box)(({theme}) => ({
    display: "flex",
    justifyContent: "space-between",
    height: "100vh",
    width: "100%",
    backgroundColor: "#ebebe9"
}))

const StyledBox = styled(Box)(({theme}) => ({
    height: "98vh",
    width: "17%",
    paddingTop: "2vh",
    boxShadow: "-3px 1px 6px 8px rgb(0,0,0,0.2)",
    backgroundColor: "white",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    [theme.breakpoints.down('sm')]: {
        display: 'none'
    },
    [theme.breakpoints.between('sm', 'lg')]: {
        width: "25%"
    }
}))

const HeadTypo = styled(Typography)(({theme}) => ({
    fontWeight: "600",
    fontSize: "18px",
    textAlign: "center"
}))

const OutletBox = styled(Box)(({ theme }) => ({
    height: "96vh",
    width: "79%",
    padding: "2vh 2%",
    paddingTop: "2vh",
    overflowY: "auto",
    [theme.breakpoints.down('sm')]: {
        width: "100%"
    },
    [theme.breakpoints.between('sm', 'lg')]: {
        width: "75vw"
    }
}))

const StyledMenu = styled(Menu)(({theme}) => ({
    display: "none",
    marginBottom: "2vh",
    marginLeft: "2vw",
    [theme.breakpoints.down('sm')]: {
        display: "block"
    }
}))

const elements = [
    { id: "6", name: "Your Profile", url: "profile", Component: Person },
    { id: "1", name: "Dashboard", url: "", Component: Dashboard  },
    { id: "4", name: "Wallet", url: "wallet", Component: AccountBalance  },
    { id: "3", name: "Subsciptions", url: "subscriptions", Component: Payments  },
    { id: "2", name: "Jobs", url: "jobs", Component: Work  },
    { id: "5", name: "Skills", url: "skills", Component: DeveloperMode  }
]

const AdminDashboard = () => {
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const { admin, setAdmin } = useContext(AdminContext);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAdminData = async () => {
        setLoading(true);
        const result = await getAdminData();
        setLoading(false);

        if (result) setAdmin(result);
        else navigate("/admin/login");
    }

    fetchAdminData();
  }, []);

  return (
    <Box>
        <Backdrop sx={(theme) => ({ color: "#fff", zIndex: theme.zIndex.drawer + 1 })} open={loading}>
            <CircularProgress color="inherit" />
        </Backdrop>
        {
            admin && 
            <NewBox>
                <StyledBox>
                    <div>
                        <HeadTypo>Company Logo & Name</HeadTypo>
                        <Table className="table" id="dashboard-table">
                            <TableBody>
                                <TableRow><TableCell></TableCell></TableRow>
                                {
                                    elements.map((element) => {
                                        return (
                                            <TableRow key={element.id}>
                                                <TableCell>
                                                    <Link style={{ color: "inherit", fontWeight: "600", textDecoration: "none", display: "flex", alignItems: "center" }} to={element.url}>
                                                        <element.Component fontSize="small" style={{ marginRight: "10px" }} />
                                                        {element.name}
                                                    </Link>
                                                </TableCell>
                                            </TableRow>
                                        )
                                    })
                                }
                            </TableBody>
                        </Table>
                    </div>
                    <div>
                        <Table className="table" style={{marginBottom: "0vh"}}>
                            <TableBody>
                                <TableRow><TableCell></TableCell></TableRow>
                                <TableRow>
                                    <TableCell style={{textAlign: "left"}}>
                                        <Link style={{color: "inherit", fontWeight: "600", textDecoration: "inherit", display: "flex", alignItems: "center"}} onClick={() => handleClick()}>
                                            <Logout fontSize="small" style={{marginRight: "10px"}} /> Logout
                                        </Link>
                                    </TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                    </div>
                </StyledBox>
                <OutletBox>
                    <StyledMenu fontSize="large" onClick={() => setOpen(true)} />
                    <Outlet />
                </OutletBox>
            </NewBox>
        }
        
    </Box>
  )
}

export default AdminDashboard