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
import Slide from "@mui/material/Slide";

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
import LinearProgress from "@mui/material/LinearProgress";

import axios from "axios";

import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import PersonIcon from "@mui/icons-material/Person";

import "../styles/Manage.css";
import { TransitionProps } from "@mui/material/transitions";

interface ManageUserProps {}

const columns = ["USER ID", "FIRST NAME", "LAST NAME", "USERNAME", "ACTIONS"];
const adminColumns = ["USER ID", "FIRST NAME", "LAST NAME", "USERNAME"];

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const ManageUsers: React.FC<ManageUserProps> = (props: ManageUserProps) => {
  type IngredientResponse = {
    id?: number;
    name?: string;
  };

  type RecipeResponse = {
    id?: number;
    name?: string;
    instructions?: string;
    ingredients?: IngredientResponse[];
    tags?: string[];
  };

  type UserResponse = {
    id?: number;
    firstname?: string;
    lastname?: string;
    username?: string;
    password?: string;
    isAdmin?: boolean;
    savedRecipes?: RecipeResponse[];
  };

  const [loading, setLoading] = useState(false);

  const [addUser, setAddUser] = useState(false);
  const [newUser, setNewUser] = useState<UserResponse>({});

  const [editUser, setEditUser] = useState(false);
  const [editUserData, setEditUserData] = useState<UserResponse>({});

  const [clickedAdmin, setClickedAdmin] = useState(true);
  const [clickedAppUser, setclickedAppUser] = useState(false);

  const [searchValue, setSearchValue] = useState("");

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  // const [data, setData] = useState<UserResponse[]>([]);
  const [data, setData] = useState([
    {
      id: 1,
      firstname: "Ayetijhya",
      lastname: "Desmukhya",
      username: "ayeti82",
    },
    {
      id: 2,
      firstname: "Erza",
      lastname: "Scarlet",
      username: "scarlet56",
    },
  ]);

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
                    <TableCell className="tablecell">{d.firstname}</TableCell>
                    <TableCell className="tablecell">{d.lastname}</TableCell>
                    <TableCell className="tablecell"> {d.username} </TableCell>
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
                        onClick={(event) => {
                          console.log(d.id);
                        }}
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
                        onClick={(event) => {
                          setEditUser(true);
                          setEditUserData(d);
                        }}
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
                    <TableCell className="tablecell">{d.firstname}</TableCell>
                    <TableCell className="tablecell">{d.lastname}</TableCell>
                    <TableCell className="tablecell"> {d.username} </TableCell>
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

      {/* add user */}
      <Dialog
        sx={{
          "& .MuiDialog-paper": {
            width: "80%",
            maxHeight: 435,
            borderRadius: 0,
          },
        }}
        maxWidth="xs"
        open={addUser}
        TransitionComponent={Transition}
      >
        <DialogTitle
          sx={{
            backgroundColor: "#c4560c",
            color: "white",
          }}
        >
          ADD NEW INGREDIENT
        </DialogTitle>
        {loading && <LinearProgress />}
        <form
          onSubmit={(event) => {
            event.preventDefault();
            setAddUser(false);
            // addIngredientHandler(event);
          }}
        >
          <DialogContent>
            <TextField
              autoFocus
              required
              margin="dense"
              label="First Name"
              type="text"
              fullWidth
              variant="standard"
              onChange={(event) => {
                setNewUser((prevState) => ({
                  ...prevState,
                  name: event.target.value,
                }));
              }}
            />
            <TextField
              autoFocus
              required
              margin="dense"
              label="Last Name"
              type="text"
              fullWidth
              variant="standard"
              onChange={(event) => {
                setNewUser((prevState) => ({
                  ...prevState,
                  lastname: event.target.value,
                }));
              }}
            />
            <TextField
              autoFocus
              required
              margin="dense"
              label="Username"
              type="text"
              fullWidth
              variant="standard"
              onChange={(event) => {
                setNewUser((prevState) => ({
                  ...prevState,
                  username: event.target.value,
                }));
              }}
            />
            <TextField
              autoFocus
              required
              margin="dense"
              label="Password"
              type="password"
              fullWidth
              variant="standard"
              onChange={(event) => {
                setNewUser((prevState) => ({
                  ...prevState,
                  password: event.target.value,
                }));
              }}
            />
          </DialogContent>
          <DialogActions>
            <Button
              type="reset"
              color="error"
              onClick={() => {
                setAddUser(false);
              }}
            >
              Cancel
            </Button>
            <Button type="submit">Add</Button>
          </DialogActions>
        </form>
      </Dialog>

      {/* edit ingredient */}
      <Dialog
        sx={{
          "& .MuiDialog-paper": {
            width: "80%",
            maxHeight: 435,
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
          EDIT INGREDIENT
        </DialogTitle>
        {loading && <LinearProgress />}
        <form
          onSubmit={(event) => {
            event.preventDefault();
            setEditUser(false);
            // editIngredientHandler(event);
          }}
        >
          <DialogContent>
            <TextField
              autoFocus
              required
              margin="dense"
              value={editUserData.firstname}
              label="First Name"
              type="text"
              fullWidth
              variant="standard"
              onChange={(event) => {
                setEditUserData((prevState) => ({
                  ...prevState,
                  name: event.target.value,
                }));
              }}
            />
            <TextField
              autoFocus
              required
              margin="dense"
              value={editUserData.lastname}
              label="Last Name"
              type="text"
              fullWidth
              variant="standard"
              onChange={(event) => {
                setEditUserData((prevState) => ({
                  ...prevState,
                  lastname: event.target.value,
                }));
              }}
            />
            <TextField
              autoFocus
              required
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
              autoFocus
              required
              margin="dense"
              value={editUserData.password}
              label="Password"
              type="password"
              fullWidth
              variant="standard"
              onChange={(event) => {
                setEditUserData((prevState) => ({
                  ...prevState,
                  password: event.target.value,
                }));
              }}
            />
          </DialogContent>
          <DialogActions>
            <Button
              type="reset"
              color="error"
              onClick={() => {
                setEditUser(false);
              }}
            >
              Cancel
            </Button>
            <Button type="submit">Ok</Button>
          </DialogActions>
        </form>
      </Dialog>
    </Box>
  ) : (
    <></>
  );
};
export default ManageUsers;
