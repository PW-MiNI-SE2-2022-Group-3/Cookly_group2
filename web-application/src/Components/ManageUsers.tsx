import React from "react";
import { useState } from "react";

import Table from "@mui/material/Table";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import Button from "@mui/material/Button";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";

import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import FormControlLabel from "@mui/material/FormControlLabel";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";

import TablePagination from "@mui/material/TablePagination";
import TableBody from "@mui/material/TableBody";
import TableFooter from "@mui/material/TableFooter";
import TablePaginationActions from "./TablePagination";

import axios from "axios";

import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import PersonIcon from "@mui/icons-material/Person";

import Register from "./RegisterUser";
import "../styles/Manage.css";
import EditUser from "./EditUser";
import { ViewColumnSharp } from "@mui/icons-material";

interface ManageUserProps {}

const columns = ["USER ID", "FIRST NAME", "LAST NAME", "USERNAME", "ACTIONS"];
const adminColumns = ["USER ID", "FIRST NAME", "LAST NAME", "USERNAME"];

const ManageUsers: React.FC<ManageUserProps> = (props: ManageUserProps) => {
  // const [deleteUser, setDeleteUser] = useState(false);
  const [clickedAdmin, setClickedAdmin] = useState(true);
  const [clickedAppUser, setclickedAppUser] = useState(false);
  const [editUser, setEditUser] = useState(false);
  const [editUserData, setEditUserData] = useState({});
  const [addUser, setAddUser] = useState(false);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [data, setData] = useState([
    {
      id: 1,
      firstName: "Ayetijhya",
      lastName: "Desmukhya",
      login: "ayeti82",
    },
    {
      id: 2,
      firstName: "Erza",
      lastName: "Scarlet",
      login: "scarlet56",
    },
    {
      id: 3,
      firstName: "Wanda",
      lastName: "Maximoff",
      login: "maxi09",
    },
    {
      id: 4,
      firstName: "Ayetijhya",
      lastName: "Desmukhya",
      login: "ayeti82",
    },
    {
      id: 5,
      firstName: "Erza",
      lastName: "Scarlet",
      login: "scarlet56",
    },
    {
      id: 6,
      firstName: "Wanda",
      lastName: "Maximoff",
      login: "maxi09",
    },
    {
      id: 7,
      firstName: "Ayetijhya",
      lastName: "Desmukhya",
      login: "ayeti82",
    },
    {
      id: 8,
      firstName: "Erza",
      lastName: "Scarlet",
      login: "scarlet56",
    },
    {
      id: 9,
      firstName: "Wanda",
      lastName: "Maximoff",
      login: "maxi09",
    },
    {
      id: 10,
      firstName: "Ayetijhya",
      lastName: "Desmukhya",
      login: "ayeti82",
    },
    {
      id: 11,
      firstName: "Erza",
      lastName: "Scarlet",
      login: "scarlet56",
    },
    {
      id: 12,
      firstName: "Wanda",
      lastName: "Maximoff",
      login: "maxi09",
    },
  ]);

  const emptyRows = () => {
    return page > 0 ? Math.max(0, (1 + page) * rowsPerPage - data.length) : 0;
  };

  // const userDeletion = () => {
  //   setDeleteUser(true);
  // };
  // const resetUserDeletion = () => {
  //   setDeleteUser(false);
  // };
  // const setIDToDelete = (ID: number) => {
  //   setUserID(ID);
  // };
  const handleChangePage = (event: any, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: any) => {
    setPage(0);
    setRowsPerPage(parseInt(event.target.value, 10));
  };
  const deleteButtonHandler = (event: any, userId: number) => {
    // axios.delete(
    //   "--link--" + userId.toString(),
    //   {
    //     headers: {
    //       "Content-Type": "application/json",
    //       Authorization: "--authorization--",
    //     },
    //   }
    // );
    //  this.props.resetUserDeletion();
  };
  const editButtonHandler = (event: any, d: any) => {
    console.log(d);
    setEditUser(true);
    setEditUserData(d);
  };

  return (
    <Box style={{ width: "100%", margin: "auto", paddingTop: "20px" }}>
      <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
        <Button
          key="admins"
          sx={{
            background: clickedAdmin ? "brown" : "#c4560c",
            my: 2,
            width: "10%",
            color: "white",
            display: "block",
            borderRadius: 0,
            marginRight: "5px",
            "&:hover": { backgroundColor: "#d97938" },
          }}
          onClick={() => {
            setClickedAdmin(true);
            setclickedAppUser(false);
          }}
        >
          ADMINS
        </Button>
        <Button
          key="appUsers"
          sx={{
            background: clickedAppUser ? "brown" : "#c4560c",
            my: 2,
            width: "10%",
            color: "white",
            display: "block",
            borderRadius: 0,
            "&:hover": { backgroundColor: "#d97938" },
          }}
          onClick={() => {
            setClickedAdmin(false);
            setclickedAppUser(true);
          }}
        >
          APP USERS
        </Button>
      </Box>
      <Button
        variant="contained"
        sx={{
          backgroundColor: "#c4560c",
          color: "white",
          float: "right",
          marginBottom: "10px",
          borderRadius: 0,
          width: "15%",
          "&:hover": { backgroundColor: "#d97938" },
        }}
        onClick={() => {
          setAddUser(true);
        }}
      >
        {clickedAdmin ? "Add Admin" : "Add User"}
        <PersonIcon style={{ marginLeft: "10px" }} />
      </Button>
      <TableContainer
        component={Paper}
        className="tablecontainer"
        style={{ borderRadius: 0 }}
      >
        <Table size="small" className="table">
          <TableHead>
            <TableRow>
              {clickedAppUser
                ? columns.map((name) => (
                    <TableCell
                      key={name}
                      className="tablecellheader"
                      style={{
                        textAlign: name === "ACTIONS" ? "center" : "left",
                        color: "white",
                      }}
                    >
                      {name}
                    </TableCell>
                  ))
                : adminColumns.map((name) => (
                    <TableCell
                      key={name}
                      className="tablecellheader"
                      style={{
                        color: "white",
                      }}
                    >
                      {name}
                    </TableCell>
                  ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {clickedAppUser
              ? (rowsPerPage > 0
                  ? data.slice(
                      page * rowsPerPage,
                      page * rowsPerPage + rowsPerPage
                    )
                  : data
                ).map((d) => (
                  <TableRow hover>
                    <TableCell className="tablecell"> {d.id} </TableCell>
                    <TableCell className="tablecell">{d.firstName}</TableCell>
                    <TableCell className="tablecell">{d.lastName}</TableCell>
                    <TableCell className="tablecell"> {d.login} </TableCell>
                    <TableCell
                      className="tablecell"
                      style={{ textAlign: "center", width: "35%" }}
                    >
                      <Button
                        variant="contained"
                        style={{
                          backgroundColor: "darkred",
                          color: "white",
                          borderRadius: 0,
                          width: "200px",
                          margin: "5px",
                        }}
                        onClick={(event) => deleteButtonHandler(event, d.id)}
                        tabIndex={d.id}
                      >
                        Delete
                        <DeleteIcon style={{ marginLeft: "10px" }} />
                      </Button>
                      <Button
                        variant="contained"
                        style={{
                          backgroundColor: "green",
                          color: "white",
                          borderRadius: 0,
                          width: "200px",
                          margin: "5px",
                        }}
                        onClick={(event) => editButtonHandler(event, d)}
                        tabIndex={d.id}
                      >
                        Edit
                        <EditIcon style={{ marginLeft: "10px" }} />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              : (rowsPerPage > 0
                  ? data.slice(
                      page * rowsPerPage,
                      page * rowsPerPage + rowsPerPage
                    )
                  : data
                ).map((d) => (
                  <TableRow hover>
                    <TableCell className="tablecell"> {d.id} </TableCell>
                    <TableCell className="tablecell">{d.firstName}</TableCell>
                    <TableCell className="tablecell">{d.lastName}</TableCell>
                    <TableCell className="tablecell"> {d.login} </TableCell>
                  </TableRow>
                ))}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TablePagination
                rowsPerPageOptions={[5, 10, 25, { label: "All", value: -1 }]}
                colSpan={columns.length}
                count={data.length}
                rowsPerPage={rowsPerPage}
                page={page}
                SelectProps={{
                  inputProps: {
                    "aria-label": "rows per page",
                  },
                  native: true,
                }}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
                ActionsComponent={TablePaginationActions}
              />
            </TableRow>
          </TableFooter>
        </Table>
      </TableContainer>
      {addUser && <Register setAddUser={setAddUser}></Register>}
      {editUser && (
        <EditUser
          setEditUser={setEditUser}
          editUserData={editUserData}
        ></EditUser>
      )}
    </Box>
  );
};
export default ManageUsers;
