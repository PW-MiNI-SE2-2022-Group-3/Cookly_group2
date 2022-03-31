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
import { TableBody, TableFooter } from "@material-ui/core";
import { TablePagination } from "@mui/material";
import TablePaginationActions from "./TablePagination";

import axios from "axios";

import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import PersonIcon from "@mui/icons-material/Person";

import Register from "./RegisterAdmin";
import "../styles/ManageAdmins.css";
import EditAdmin from "./EditAdmin";

interface ManageAdminProps {}

const columns = ["USER ID", "FIRST NAME", "LAST NAME", "USERNAME", "ACTIONS"];

const ManageAdmins: React.FC<ManageAdminProps> = (props: ManageAdminProps) => {
  // const [deleteAdmin, setDeleteAdmin] = useState(false);
  const [editAdmin, setEditAdmin] = useState(false);
  const [editAdminData, setEditAdminData] = useState({});
  const [addAdmin, setAddAdmin] = useState(false);
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

  // const adminDeletion = () => {
  //   setDeleteAdmin(true);
  // };
  // const resetAdminDeletion = () => {
  //   setDeleteAdmin(false);
  // };
  // const setIDToDelete = (ID: number) => {
  //   setAdminID(ID);
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
    setEditAdmin(true);
    setEditAdminData(d);
  };

  return (
    <Box style={{ width: "90%", margin: "auto" }}>
      <Button
        variant="contained"
        style={{
          backgroundColor: "#c4560c",
          color: "white",
          float: "right",
          marginBottom: "10px",
          borderRadius: 0,
          width: "15%",
        }}
        onClick={() => {
          setAddAdmin(true);
        }}
      >
        Add Admin
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
              {columns.map((name) => (
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
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {(rowsPerPage > 0
              ? data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
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
            ))}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TablePagination
                rowsPerPageOptions={[5, 10, 25, { label: "All", value: -1 }]}
                colSpan={5}
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
      {addAdmin && <Register setAddUser={setAddAdmin}></Register>}
      {editAdmin && (
        <EditAdmin
          setEditUser={setEditAdmin}
          editUserData={editAdminData}
        ></EditAdmin>
      )}
    </Box>
  );
};
export default ManageAdmins;
