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
import { PATH } from "../Constants/API";

interface ManageIngredientsProps {}

const columns = ["NO.", "NAME", "ACTIONS"];

const ManageIngredients: React.FC<ManageIngredientsProps> = (
  props: ManageIngredientsProps
) => {
  type IngredientResponse = {
    id?: number;
    name?: string;
  };

  const [loading, setLoading] = useState(false);

  const [addIngredient, setAddIngredient] = useState(false);
  const [newIngredient, setNewIngredient] = useState<IngredientResponse>({});

  const [editIngredient, setEditIngredient] = useState(false);
  const [editIngredientData, setEditIngredientData] =
    useState<IngredientResponse>({});

  const [searchValue, setSearchValue] = useState("");

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const [data, setData] = useState<IngredientResponse[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      getData();
    };

    fetchData();
  }, []);

  const getData = () => {
    axios
      .post(PATH + "/ingredients/all?page=0&limit=5000", {
        headers: {
          "Content-Type": "application/json",
          Authorization: "---",
        },
      })
      .then((response: { data: { ingredients: any; }; }) => {
        setData(response.data.ingredients);
      })
      .catch((err: any) => {
        alert(err);
      });
  };

  //Add Ingredient
  const addIngredientHandler = (event: any) => {
    setLoading(true);
    event.preventDefault();

    axios
      .post(PATH + "/ingredients", {
        name: newIngredient.name,
      })
      .then((response: any) => {
        setAddIngredient(false);
        setNewIngredient({});
        setLoading(false);
        getData();
      })
      .catch((err: any) => {
        setLoading(false);
        alert(err);
      });
  };

  //Edit Ingredient
  const editIngredientHandler = (event: any) => {
    setLoading(true);
    event.preventDefault();
    axios
      .put(
        PATH + "/ingredients?id=" + editIngredientData.id,
        editIngredientData,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: "---",
          },
        }
      )
      .then((response: any) => {
        setEditIngredient(false);
        setEditIngredientData({});
        setLoading(false);
        getData();
      })
      .catch((err: { message: any; }) => {
        setLoading(false);
        alert(err.message);
      });
  };

  //Delete Ingredient
  const deleteButtonHandler = (event: any, ingredientId: number) => {
    axios
      .delete(PATH + "/ingredients/" + ingredientId, {
        headers: {
          "Content-Type": "application/json",
          Authorization: "---",
        },
      })
      .then((response: any) => {
        getData();
      })
      .catch((err: any) => {
        alert(err);
      });
  };

  //Filter Ingredients
  const filterIngredients = () => {
    axios
      .post(
        PATH + "/ingredients/all?page=0&limit=5000",
        { name: searchValue },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: "---",
          },
        }
      )
      .then((response: { data: { ingredients: any; }; }) => {
        setData(response.data.ingredients);
      })
      .catch((err: any) => {
        alert(err);
      });
  };

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
        onChange={(event: { target: { value: string; }; }) => {
          setSearchValue(event.target.value);
          if (event.target.value !== "") filterIngredients();
          else getData();
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
                    onClick={(event: any) => deleteButtonHandler(event, d.id)}
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
                    onClick={(event: any) => {
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
          onSubmit={(event: any) => {
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
              onChange={(event: { target: { value: any; }; }) => {
                setNewIngredient({ name: event.target.value });
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
          onSubmit={(event: any) => {
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
              onChange={(event: { target: { value: any; }; }) => {
                setEditIngredientData((prevState: any) => ({
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
            <Button type="submit">Ok</Button>
          </DialogActions>
        </form>
      </Dialog>
    </Box>
  ) : (
    <></>
  );
};
export default ManageIngredients;
