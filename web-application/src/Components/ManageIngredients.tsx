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
import LinearProgress from "@material-ui/core/LinearProgress";

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
import SearchIcon from "@mui/icons-material/Search";
import EditIcon from "@mui/icons-material/Edit";
import EggIcon from "@mui/icons-material/Egg";

import "../styles/Manage.css";

interface ManageIngredientsProps {}

const columns = ["ID", "NAME", "ACTIONS"];

const ManageIngredients: React.FC<ManageIngredientsProps> = (
  props: ManageIngredientsProps
) => {
  type IngredientResponse = {
    id?: number;
    name?: string;
  };

  const [loading, setLoading] = useState(false);

  const [addIngredient, setAddIngredient] = useState(false);
  const [newIngredient, setNewIngredient] = useState("");

  const [editIngredient, setEditIngredient] = useState(false);
  const [editIngredientData, setEditIngredientData] = useState({
    name: "",
    id: 0,
  });

  const [deleteIngredient, setDeleteIngredient] = useState(false);
  const [ingredientIdToDelete, setIngredientIdToDelete] = useState(-1);

  const [searchValue, setSearchValue] = useState("");

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [data, setData] = useState<IngredientResponse[]>([
    /*]);*/
    {
      id: 1,
      name: "Butter",
    },
    {
      id: 2,
      name: "Chicken",
    },
    {
      id: 3,
      name: "Water",
    },
  ]);

  useEffect(() => {
    // setLoading(true);
    const fetchData = async () => {
      axios
        .get("http://localhost:3001/ingredients?page=0&limit=5000", {
          headers: {
            "Content-Type": "application/json",
            Authorization: "root",
          },
        })
        .then((response) => {
          console.log(response.data);
          setData(response.data.ingredients);
          // setLoading(false);
        })
        .catch((err) => {
          // setLoading(false);
          console.log(err);
          // alert(err);
        });
    };

    fetchData();
  }, []);

  //Add Ingredient
  const addIngredientHandler = (event: any) => {
    setLoading(true);
    event.preventDefault();
    const data = {
      name: newIngredient,
    };
    axios
      .post("http://localhost:3001/ingredients", data)
      .then((response) => {
        console.log(response.data);
        setAddIngredient(false);
        setNewIngredient("");
        setLoading(false);
        alert("Successfully added ingredient!");
      })
      .catch((err) => {
        setLoading(false);
        alert(err);
      });
  };

  //Edit Ingredient
  const editIngredientHandler = (event: any) => {
    setLoading(true);
    event.preventDefault();
    axios
      .post(
        "http://localhost:3001/ingredients/" + editIngredientData.id,
        editIngredientData,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: "root",
          },
        }
      )
      .then((response) => {
        console.log(response.data);
        setEditIngredient(false);
        setEditIngredientData({ name: "", id: 0 });
        setLoading(false);
        alert("Successfully edited ingredient!");
      })
      .catch((err) => {
        setLoading(false);
        alert(err.message);
      });
  };

  //Delete Ingredient
  const deleteButtonHandler = (event: any, ingredientId: number) => {
    axios
      .delete("http://localhost:3001/ingredients/" + ingredientId, {
        headers: {
          "Content-Type": "application/json",
          Authorization: "root",
        },
      })
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.error(error.message);
      });
  };

  // const adminDeletion = () => {
  //   setDeleteIngredient(true);
  // };
  // const resetAdminDeletion = () => {
  //   setDeleteIngredient(false);
  // };
  // const setIDToDelete = (ID: number) => {
  //   setIngredientIdToDelete(ID);
  // };

  const handleChangePage = (event: any, newPage: number) => {
    setPage(newPage);
  };
  const emptyRows = () => {
    return page > 0 ? Math.max(0, (1 + page) * rowsPerPage - data.length) : 0;
  };
  const handleChangeRowsPerPage = (event: any) => {
    setPage(0);
    setRowsPerPage(parseInt(event.target.value, 10));
  };

  return data !== undefined ? (
    <Box style={{ width: "100%", margin: "auto", paddingTop: "20px" }}>
      <TextField
        id="outlined-basic"
        variant="standard"
        placeholder="Search"
        sx={{
          backgroundColor: "white",
          width: "30%",
          padding: "0px",
          marginBottom: "10px",
        }}
        InputProps={{
          startAdornment: <SearchIcon />,
        }}
        onChange={(event) => {
          setSearchValue(event.target.value);
        }}
      />
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
          setAddIngredient(true);
        }}
      >
        Add Ingredient
        <EggIcon style={{ marginLeft: "10px" }} />
      </Button>

      {/* data table */}
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
            ).map((d: any) => (
              <TableRow hover>
                <TableCell className="tablecell"> {d.id} </TableCell>
                <TableCell className="tablecell">{d.name}</TableCell>

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
                    onClick={(event) => {
                      setEditIngredient(true);
                      setEditIngredientData({ name: d.name, id: d.id });
                    }}
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

      {/* add ingredient */}
      <Dialog
        sx={{
          "& .MuiDialog-paper": {
            width: "80%",
            maxHeight: 435,
            borderRadius: 0,
          },
        }}
        maxWidth="xs"
        open={addIngredient}
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
            addIngredientHandler(event);
          }}
        >
          <DialogContent sx={{ marginTop: "20px" }}>
            <TextField
              autoFocus
              required
              margin="dense"
              id="name"
              label="Ingredient Name"
              type="text"
              fullWidth
              variant="standard"
              onChange={(event) => {
                setNewIngredient(event.target.value);
              }}
            />
          </DialogContent>
          <DialogActions>
            <Button
              type="reset"
              color="error"
              onClick={() => {
                setAddIngredient(false);
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
        open={editIngredient}
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
            editIngredientHandler(event);
          }}
        >
          <DialogContent sx={{ marginTop: "20px" }}>
            <TextField
              autoFocus
              required
              margin="dense"
              value={editIngredientData.name}
              id="name"
              label="Ingredient Name"
              type="text"
              fullWidth
              variant="standard"
              onChange={(event) => {
                setEditIngredientData((prevState) => ({
                  ...prevState,
                  name: event.target.value,
                }));
              }}
            />
          </DialogContent>
          <DialogActions>
            <Button
              type="reset"
              color="error"
              onClick={() => {
                setEditIngredient(false);
              }}
            >
              Cancel
            </Button>
            <Button type="submit">Add</Button>
          </DialogActions>
        </form>
      </Dialog>
    </Box>
  ) : (
    <></>
  );
};
export default ManageIngredients;
