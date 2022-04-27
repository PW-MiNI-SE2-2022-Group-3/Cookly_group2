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
import Select from "@mui/material/Select";
import OutlinedInput from "@mui/material/OutlinedInput";
import MenuItem from "@mui/material/MenuItem";

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

import { useTheme } from "@mui/material/styles";
import InputLabel from "@mui/material/InputLabel";

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

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

function getStyles(name: string, personName: any, theme: any) {
  return {
    fontWeight:
      personName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

const ManageRecipes: React.FC<ManageRecipesProps> = (
  props: ManageRecipesProps
) => {
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

  const theme = useTheme();

  const [loading, setLoading] = useState(false);

  const [addRecipe, setAddRecipe] = useState(false);
  const [newRecipe, setNewRecipe] = useState<RecipeResponse>({});
  const [newRecipeTags, setNewRecipeTags] = useState([]);
  const [newRecipeTagLabel, setNewRecipeTagLabel] = useState([]);
  const [newRecipeIngredientss, setNewRecipeIngredients] = useState([]);

  const [editRecipe, setEditRecipe] = useState(false);
  const [editRecipeData, setEditRecipeData] = useState<RecipeResponse>({});

  const [searchValue, setSearchValue] = useState("");

  const [addFilter, setAddFilter] = useState(false);
  const [filterValue, setFilterValue] = useState("");

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const [data, setData] = useState<RecipeResponse[]>([]);
  // const [data, setData] = useState([
  //   {
  //     id: 1,
  //     name: "Butter Chicken",
  //     instructions:
  //       "take chicken and butten and smash them together until it works",
  //     tags: "no lactose",
  //     Ingredients: "butter, chicken",
  //   },
  //   {
  //     id: 2,
  //     name: "Schabowy",
  //     instructions: "take surowy kotlet and fry it on a pan",
  //     tags: "gluten free",
  //     Ingredients: "surpoy kotlet",
  //   },
  //   {
  //     id: 3,
  //     name: "butter",
  //     instructions: "take butter chicken and remove chicken",
  //     tags: "no lactose",
  //     Ingredients: "butter chicken",
  //   },
  // ]);

  useEffect(() => {
    const fetchData = async () => {
      getData();
    };

    fetchData();
  }, []);

  const getData = () => {
    axios
      .post("http://localhost:3001/recipes/all?page=0&limit=5000", {
        headers: {
          "Content-Type": "application/json",
          Authorization: "---",
        },
      })
      .then((response) => {
        setData(response.data.recipes);
      })
      .catch((err) => {
        alert(err);
      });
  };

  const handleTagChange = (event: any) => {
    const {
      target: { value },
    } = event;
    setNewRecipeTagLabel(typeof value === "string" ? value.split(",") : value);
    setNewRecipeTags((prevState) => ({ ...prevState, value }));
    console.log(newRecipeTags);
  };

  //Add Recipe
  const addRecipeHandler = (event: any) => {
    setLoading(true);
    event.preventDefault();

    axios
      .post("http://localhost:3001/recipes", {
        name: newRecipe.name,
        id: 0,
      })
      .then((response) => {
        setAddRecipe(false);
        setNewRecipe({});
        setLoading(false);
        getData();
      })
      .catch((err) => {
        setLoading(false);
        alert(err);
      });
  };

  //Edit Recipe
  const editRecipeHandler = (event: any) => {
    setLoading(true);
    event.preventDefault();
    axios
      .put(
        "http://localhost:3001/recipes?id=" + editRecipeData.id,
        editRecipeData,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: "---",
          },
        }
      )
      .then((response) => {
        setEditRecipe(false);
        setEditRecipeData({});
        setLoading(false);
        getData();
      })
      .catch((err) => {
        setLoading(false);
        alert(err.message);
      });
  };

  //Delete Recipe
  const deleteButtonHandler = (event: any, recipeId: number) => {
    axios
      .delete("http://localhost:3001/recipes/" + recipeId, {
        headers: {
          "Content-Type": "application/json",
          Authorization: "---",
        },
      })
      .then((response) => {
        getData();
      })
      .catch((err) => {
        alert(err);
      });
  };

  //Filter Recipes
  const filterRecipes = () => {
    axios
      .post(
        "http://localhost:3001/recipes/all?page=0&limit=5000",
        { name: searchValue, tags: [filterValue] },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: "---",
          },
        }
      )
      .then((response) => {
        setData(response.data.recipes);
      })
      .catch((err) => {
        alert(err);
      });
  };

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
          if (event.target.value !== "") filterRecipes();
          else getData();
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
          // filterRecipes();
        }}
      >
        Tag Filter
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
                    textAlign:
                      name === "ACTIONS" ||
                      name === "TAGS" ||
                      name === "INGREDIENTS"
                        ? "center"
                        : "left",
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
                <TableCell className="tablecell">
                  <ul>
                    {d.tags.map((t: any) => (
                      <li>{t}</li>
                    ))}
                  </ul>
                </TableCell>
                <TableCell className="tablecell">
                  <ul>
                    {d.ingredients.map((i: any) => (
                      <li>
                        {i.quantity} of {i.ingredient.name}
                      </li>
                    ))}
                  </ul>
                </TableCell>

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
                      setEditRecipe(true);
                      setEditRecipeData(d);
                      console.log("From edit", d);
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

      {/* add recipe */}
      <Dialog
        sx={{
          "& .MuiDialog-paper": {
            width: "80%",
            maxHeight: 435,
            borderRadius: 0,
          },
        }}
        maxWidth="xs"
        open={addRecipe}
      >
        <DialogTitle
          sx={{
            backgroundColor: "#c4560c",
            color: "white",
          }}
        >
          ADD NEW RECIPE
        </DialogTitle>
        {loading && <LinearProgress />}
        <form
          onSubmit={(event) => {
            setNewRecipeTagLabel([]);
            addRecipeHandler(event);
          }}
        >
          <DialogContent>
            <TextField
              autoFocus
              required
              margin="dense"
              id="name"
              label="Recipe Name"
              type="text"
              fullWidth
              variant="standard"
              onChange={(event) => {
                setNewRecipe((prevState) => ({
                  ...prevState,
                  name: event.target.value,
                }));
              }}
              sx={{ margin: "10px 0px 10px 0px" }}
            />
            <TextField
              autoFocus
              required
              multiline
              margin="dense"
              id="name"
              label="Instructions"
              type="text"
              fullWidth
              variant="standard"
              onChange={(event) => {
                setNewRecipe((prevState) => ({
                  ...prevState,
                  instructions: event.target.value,
                }));
              }}
              sx={{ margin: "10px 0px 10px 0px" }}
            />
            <Box sx={{ margin: "10px 0px 10px 0px" }}>
              <InputLabel>Tags</InputLabel>
              <Select
                id="tags"
                multiple
                value={newRecipeTagLabel}
                onChange={handleTagChange}
                input={<OutlinedInput sx={{ width: "100%" }} label="Name" />}
                MenuProps={MenuProps}
              >
                {tagOptions.map((t) => (
                  <MenuItem
                    key={t}
                    value={t}
                    style={getStyles(t, newRecipeTagLabel, theme)}
                  >
                    {t}
                  </MenuItem>
                ))}
              </Select>
            </Box>
          </DialogContent>
          <DialogActions>
            <Button
              type="reset"
              color="error"
              onClick={() => {
                setAddRecipe(false);
                setNewRecipeTagLabel([]);
              }}
            >
              Cancel
            </Button>
            <Button type="submit">Add</Button>
          </DialogActions>
        </form>
      </Dialog>

      {/* edit recipe */}
      <Dialog
        sx={{
          "& .MuiDialog-paper": {
            width: "80%",
            maxHeight: 435,
            borderRadius: 0,
          },
        }}
        maxWidth="xs"
        open={editRecipe}
      >
        <DialogTitle
          sx={{
            backgroundColor: "#c4560c",
            color: "white",
          }}
        >
          EDIT RECIPE
        </DialogTitle>
        {loading && <LinearProgress />}
        <form
          onSubmit={(event) => {
            event.preventDefault();
            setNewRecipeTagLabel([]);
            // editRecipeHandler(event);
          }}
        >
          <DialogContent sx={{ marginTop: "20px" }}>
            <TextField
              autoFocus
              required
              margin="dense"
              value={editRecipeData.name}
              id="name"
              label="Recipe Name"
              type="text"
              fullWidth
              variant="standard"
              onChange={(event) => {
                setEditRecipeData((prevState) => ({
                  ...prevState,
                  name: event.target.value,
                }));
              }}
            />
            <TextField
              autoFocus
              required
              multiline
              margin="dense"
              value={editRecipeData.instructions}
              id="name"
              label="Instructions"
              type="text"
              fullWidth
              variant="standard"
              onChange={(event) => {
                setNewRecipe((prevState) => ({
                  ...prevState,
                  instructions: event.target.value,
                }));
              }}
              sx={{ margin: "10px 0px 10px 0px" }}
            />
            <Box sx={{ margin: "10px 0px 10px 0px" }}>
              <InputLabel>Tags</InputLabel>
              <Select
                id="tags"
                multiple
                value={newRecipeTagLabel}
                onChange={handleTagChange}
                input={<OutlinedInput sx={{ width: "100%" }} label="Name" />}
                MenuProps={MenuProps}
              >
                {tagOptions.map((t) => (
                  <MenuItem
                    key={t}
                    value={t}
                    style={getStyles(t, newRecipeTagLabel, theme)}
                  >
                    {t}
                  </MenuItem>
                ))}
              </Select>
            </Box>
          </DialogContent>
          <DialogActions>
            <Button
              type="reset"
              color="error"
              onClick={() => {
                setEditRecipe(false);
                setNewRecipeTagLabel([]);
              }}
            >
              Cancel
            </Button>
            <Button type="submit">Ok</Button>
          </DialogActions>
        </form>
      </Dialog>

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
  ) : (
    <></>
  );
};
export default ManageRecipes;
