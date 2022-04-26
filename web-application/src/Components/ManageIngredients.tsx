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
import { TableBody, TableFooter } from "@material-ui/core";
import { TablePagination, TextField } from "@mui/material";
import TablePaginationActions from "./TablePagination";

import axios from "axios";

import DeleteIcon from "@mui/icons-material/Delete";
import SearchIcon from "@mui/icons-material/Search";
import EditIcon from "@mui/icons-material/Edit";
import EggIcon from "@mui/icons-material/Egg";

import AddIngredient from "./RegisterIngredient";
import EditIngredients from "./EditIngredients";
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

  const [deleteIngredient, setDeleteIngredient] = useState(false);
  const [editIngredient, setEditIngredient] = useState(false);
  const [editIngredientData, setEditIngredientData] = useState({});
  const [ingredientIdToDelete, setIngredientIdToDelete] = useState(-1);
  const [addIngredient, setAddIngredient] = useState(false);

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
        })
        .catch((error) => {
          console.log(error);
        });
    };

    fetchData();
  }, []);

  const emptyRows = () => {
    return page > 0 ? Math.max(0, (1 + page) * rowsPerPage - data.length) : 0;
  };

  const adminDeletion = () => {
    setDeleteIngredient(true);
  };
  const resetAdminDeletion = () => {
    setDeleteIngredient(false);
  };
  const setIDToDelete = (ID: number) => {
    setIngredientIdToDelete(ID);
  };
  const handleChangePage = (event: any, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: any) => {
    setPage(0);
    setRowsPerPage(parseInt(event.target.value, 10));
  };

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

  const editButtonHandler = (event: any, ingredient: any) => {
    console.log(ingredient);
    setEditIngredient(true);
    setEditIngredientData(ingredient);
  };

  return data !== undefined ? (
    <Box style={{ width: "90%", margin: "auto" }}>
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
      {addIngredient && (
        <AddIngredient setAddRegister={setAddIngredient}></AddIngredient>
      )}
      {editIngredient && (
        <EditIngredients
          setEditIngredient={setEditIngredient}
          editIngredientData={editIngredientData}
        ></EditIngredients>
      )}
    </Box>
  ) : (
    <></>
  );
};
export default ManageIngredients;
