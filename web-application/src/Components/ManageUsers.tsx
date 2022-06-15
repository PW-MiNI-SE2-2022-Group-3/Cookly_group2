import React from "react";
import { useState, useEffect } from "react";

import Table from "@mui/material/Table";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import Button from "@mui/material/Button";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Slide from "@mui/material/Slide";

import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";

import TablePagination from "@mui/material/TablePagination";
import TableBody from "@mui/material/TableBody";
import TableFooter from "@mui/material/TableFooter";
import TablePaginationActions from "./TablePagination";
import LinearProgress from "@mui/material/LinearProgress";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";

import axios from "axios";

import EditIcon from "@mui/icons-material/Edit";

import "../styles/Manage.css";
import { TransitionProps } from "@mui/material/transitions";
import { PATH } from "../Constants/API";

var forge = require("node-forge");

interface ManageUserProps {}

const columns = ["USERNAME", "ACTIONS"];

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const ManageUsers: React.FC<ManageUserProps> = (props: ManageUserProps) => {
  type UserResponse = {
    username?: string;
    password?: string;
    token?: string;
    isadmin?: boolean;
  };

  const [loading, setLoading] = useState(false);

  const [editUser, setEditUser] = useState(false);
  const [editUserData, setEditUserData] = useState<UserResponse>({});
  const [validData, setValidData] = useState({ isValid: true, message: "" });

  const [clickedAdmin, setClickedAdmin] = useState(true);

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const [data, setData] = useState<UserResponse[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      getData();
    };

    fetchData();
  }, []);

  const getData = () => {
    axios
      .get(PATH + "/user?page=0&limit=5000", {
        headers: {
          "Content-Type": "application/json",
          Authorization: "---",
        },
      })
      .then((response: { data: { ingredients: any } }) => {
        setData(response.data.ingredients);
      })
      .catch((err: any) => {
        alert(err);
      });
  };

  const convertToSha = (password: any) => {
    let md = forge.md.sha256.create();
    md.update(password);
    return md.digest().toHex();
  };

  //Edit Ingredient
  // const editIngredientHandler = (event: any) => {
  //   setLoading(true);
  //   event.preventDefault();
  //   axios
  //     .put(
  //       PATH + "/ingredients?id=" + editIngredientData.id,
  //       editIngredientData,
  //       {
  //         headers: {
  //           "Content-Type": "application/json",
  //           Authorization: "---",
  //         },
  //       }
  //     )
  //     .then((response: any) => {
  //       setEditIngredient(false);
  //       setEditIngredientData({});
  //       setLoading(false);
  //       getData();
  //     })
  //     .catch((err: { message: any }) => {
  //       setLoading(false);
  //       alert(err.message);
  //     });
  // };

  const emptyRows = () => {
    return page > 0 ? Math.max(0, (1 + page) * rowsPerPage - data.length) : 0;
  };

  const handleChangePage = (event: any, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: any) => {
    setPage(0);
    setRowsPerPage(parseInt(event.target.value, 10));
  };

  return data !== undefined ? (
    <Box style={{ width: "100%", margin: "auto", paddingTop: "20px" }}>
      <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
        <Button
          data-testid="users-button"
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
          }}
        >
          USERS
        </Button>
      </Box>
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
                <TableCell className="tablecell">{d.username}</TableCell>
                <TableCell
                  className="tablecell"
                  style={{ textAlign: "center", width: "35%" }}
                >
                  <Button
                    data-testid="edit-button"
                    variant="contained"
                    style={{
                      backgroundColor: "green",
                      color: "white",
                      borderRadius: 0,
                      width: "200px",
                      margin: "5px",
                    }}
                    onClick={(event) => {
                      setEditUser(true);
                      setEditUserData(d);
                    }}
                    // tabIndex={d.id}
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

      {/* edit ingredient */}
      <Dialog
        sx={{
          "& .MuiDialog-paper": {
            width: "80%",
            maxHeight: 455,
            borderRadius: 0,
          },
        }}
        maxWidth="xs"
        open={editUser}
        TransitionComponent={Transition}
      >
        <DialogTitle
          sx={{
            backgroundColor: "#c4560c",
            color: "white",
          }}
        >
          EDIT USER
        </DialogTitle>
        {loading && <LinearProgress />}
        <form
          onSubmit={(event) => {
            event.preventDefault();
            if (validData.isValid) {
              setEditUser(false);
              console.log(editUserData);
              // editIngredientHandler(event);
            } else {
              alert(validData.message);
            }
          }}
        >
          <DialogContent>
            <TextField
              margin="dense"
              value={editUserData.username}
              label="Username"
              type="text"
              fullWidth
              variant="standard"
              onChange={(event) => {
                setEditUserData((prevState) => ({
                  ...prevState,
                  username: event.target.value,
                }));
              }}
            />
            <TextField
              margin="dense"
              label="Current Password"
              type="password"
              fullWidth
              variant="standard"
              tabIndex={0}
              onChange={(event) => {
                if (convertToSha(event.target.value) == editUserData.password)
                  setValidData((prevState) => ({
                    ...prevState,
                    isValid: true,
                    message: "",
                  }));
                else
                  setValidData((prevState) => ({
                    ...prevState,
                    isValid: false,
                    message: "Invalid Credential!",
                  }));
              }}
            />
            <TextField
              margin="dense"
              label="New Password"
              type="password"
              fullWidth
              variant="standard"
              onChange={(event) => {
                setEditUserData((prevState) => ({
                  ...prevState,
                  password: convertToSha(event.target.value),
                }));
              }}
            />
            <TextField
              margin="dense"
              label="Confirm Password"
              type="password"
              fullWidth
              variant="standard"
              onChange={(event) => {
                if (convertToSha(event.target.value) == editUserData.password)
                  setValidData((prevState) => ({
                    ...prevState,
                    isValid: true,
                    message: "",
                  }));
                else
                  setValidData((prevState) => ({
                    ...prevState,
                    isValid: false,
                    message:
                      "New password doesn't match with Confirm password!",
                  }));
              }}
            />
            <FormControlLabel
              control={
                <Checkbox
                  onChange={(event) => {
                    setEditUserData((prevState) => ({
                      ...prevState,
                      isadmin: event.target.checked,
                    }));
                  }}
                />
              }
              label="Are you an admin?"
            />
          </DialogContent>
          <DialogActions>
            <Button
              data-testid="cancel-edit-button"
              type="reset"
              color="error"
              onClick={() => {
                setEditUser(false);
              }}
            >
              Cancel
            </Button>
            <Button data-testid="ok-edit-button" type="submit">
              Ok
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </Box>
  ) : (
    <></>
  );
};
export default ManageUsers;
