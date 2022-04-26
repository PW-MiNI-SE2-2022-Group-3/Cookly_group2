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
import FilterListIcon from "@mui/icons-material/FilterList";
import EditIcon from "@mui/icons-material/Edit";
import SearchIcon from "@mui/icons-material/Search";
import FoodBankIcon from "@mui/icons-material/FoodBank";
import AddRecipes from "./RegisterRecipe";
import EditRecipe from "./EditRecipe";

interface ManageRecipesProps {}

const columns = [
  "ID",
  "NAME",
  "INSTRUCTIONS",
  "TAGS",
  "INGREDIENTS",
  "ACTIONS",
];

const tagOptions = ["Vegetarian", "Gluten Free", "Low Calorie", "No Lactose"];

const ManageRecipes: React.FC<ManageRecipesProps> = (
  props: ManageRecipesProps
) => {
  type IngredientResponse = {
    name?: string;
  };

  type RecipeResponse = {
    name?: string;
    instruction?: string;
    ingredients?: IngredientResponse[];
    tags?: string[];
  };

  const [loading, setLoading] = useState(false);

  const [addRecipe, setAddRecipe] = useState(false);
  const [newRecipe, setNewRecipe] = useState<RecipeResponse>({});

  const [editRecipe, setEditRecipe] = useState(false);
  const [editRecipeId, setEditRecipeId] = useState(-1);
  const [editRecipeData, setEditRecipeData] = useState<RecipeResponse>({});

  // const [deleteRecipe, setDeleteRecipe] = useState(false);
  // const [recipeIdToDelete, setRecipeIdToDelete] = useState(-1);

  const [searchValue, setSearchValue] = useState("");

  const [addFilter, setAddFilter] = useState(false);
  const [filterValue, setFilterValue] = useState("");

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [data, setData] = useState([
    {
      id: 1,
      name: "Butter Chicken",
      instructions:
        "take chicken and butten and smash them together until it works",
      tags: "no lactose",
      Ingredients: "butter, chicken",
    },
    {
      id: 2,
      name: "Schabowy",
      instructions: "take surowy kotlet and fry it on a pan",
      tags: "gluten free",
      Ingredients: "surpoy kotlet",
    },
    {
      id: 3,
      name: "butter",
      instructions: "take butter chicken and remove chicken",
      tags: "no lactose",
      Ingredients: "butter chicken",
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

  const emptyRows = () => {
    return page > 0 ? Math.max(0, (1 + page) * rowsPerPage - data.length) : 0;
  };

  // const adminDeletion = () => {
  //   setDeleteRecipe(true);
  // };
  // const resetAdminDeletion = () => {
  //   setDeleteRecipe(false);
  // };
  // const setIDToDelete = (ID: number) => {
  //   setRecipeID(ID);
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
    setEditRecipe(true);
    setEditRecipeData(d);
  };

  return (
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
          margin: "0px 0px 10px 10px",
          borderRadius: 0,
          width: "15%",
          "&:hover": { backgroundColor: "#d97938" },
        }}
        onClick={() => {
          setAddRecipe(true);
        }}
      >
        Add Recipe
        <FoodBankIcon style={{ marginLeft: "10px" }} />
      </Button>
      <Button
        variant="contained"
        sx={{
          backgroundColor: "#c4560c",
          color: "white",
          float: "right",
          margin: "0px 0px 10px 10px",
          borderRadius: 0,
          width: "15%",
          "&:hover": { backgroundColor: "#d97938" },
        }}
        onClick={() => {
          setAddFilter(true);
        }}
      >
        Add Filter
        <FilterListIcon style={{ marginLeft: "10px" }} />
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
                <TableCell className="tablecell">{d.instructions}</TableCell>
                <TableCell className="tablecell"> {d.tags} </TableCell>
                <TableCell className="tablecell"> {d.Ingredients} </TableCell>

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
      {addRecipe && <AddRecipes setAddRegister={setAddRecipe} />}
      {editRecipe && (
        <EditRecipe
          setEditUser={setEditRecipe}
          editUserData={editRecipeData}
        ></EditRecipe>
      )}

      {/* filter tags */}
      <Dialog
        sx={{
          "& .MuiDialog-paper": {
            width: "80%",
            maxHeight: 435,
            borderRadius: 0,
          },
        }}
        maxWidth="xs"
        open={addFilter}
      >
        <DialogTitle
          sx={{
            backgroundColor: "#c4560c",
            color: "white",
          }}
        >
          FILTER TAGS
        </DialogTitle>
        <DialogContent dividers>
          <RadioGroup
            aria-label="tag"
            name="tag"
            value={filterValue}
            onChange={(event) => {
              setFilterValue(event.target.value);
            }}
          >
            {tagOptions.map((option: string) => (
              <FormControlLabel
                value={option}
                key={option}
                control={<Radio />}
                label={option}
              />
            ))}
          </RadioGroup>
        </DialogContent>
        <DialogActions>
          <Button
            autoFocus
            onClick={() => {
              setAddFilter(false);
            }}
          >
            Cancel
          </Button>
          <Button
            // type="submit"
            onClick={() => {
              console.log("Filter Value: " + filterValue);
              setAddFilter(false);
            }}
          >
            Ok
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};
export default ManageRecipes;
