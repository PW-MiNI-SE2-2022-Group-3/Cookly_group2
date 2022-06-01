//edit recipe check
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
import InputLabel from "@mui/material/InputLabel";
import Slide from "@mui/material/Slide";

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

import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import IconButton from "@mui/material/IconButton";

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
import AddIcon from "@mui/icons-material/Add";
import RefreshIcon from "@mui/icons-material/Refresh";

import { useTheme } from "@mui/material/styles";
import { TransitionProps } from "@mui/material/transitions";
import { PATH } from "../Constants/API";

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

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const ManageRecipes: React.FC<ManageRecipesProps> = (
  props: ManageRecipesProps
) => {
  type IngredientResponseBase = {
    id?: number;
    name?: string;
  };
  type IngredientResponse = {
    ingredient?: IngredientResponseBase;
    quantity?: string;
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

  const [editRecipe, setEditRecipe] = useState(false);
  const [editRecipeData, setEditRecipeData] = useState<RecipeResponse>({});

  const [addIngredient, setAddIngredient] = useState(false);
  const [newIngredient, setNewIngredient] = useState<IngredientResponse>({});
  const [newIngredients, setNewIngredients] = useState<IngredientResponse[]>(
    []
  );

  const [editIngredient, setEditIngredient] = useState(false);
  const [editIngredientData, setEditIngredientData] =
    useState<IngredientResponse>({});

  const [searchValue, setSearchValue] = useState("");

  const [addFilter, setAddFilter] = useState(false);
  const [filterValue, setFilterValue] = useState("");

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const [data, setData] = useState<RecipeResponse[]>([]);
  const [ingredientData, setIngredientData] = useState<
    IngredientResponseBase[]
  >([]);

  const capitalizeWords = (arr: string[]) => {
    return arr.map((element) => {
      return (
        element.charAt(0).toUpperCase() + element.substring(1).toLowerCase()
      );
    });
  };

  useEffect(() => {
    const fetchData = async () => {
      getData();
      getIngredientData();
    };

    fetchData();
  }, []);

  const getData = () => {
    axios
      .post(PATH + "/recipes/all?page=0&limit=5000", {
        headers: {
          "Content-Type": "application/json",
          Authorization: "---",
        },
      })
      .then((response: { data: { recipes: any } }) => {
        setData(response.data.recipes);
      })
      .catch((err: any) => {
        alert(err);
      });
  };

  const getIngredientData = () => {
    axios
      .post(PATH + "/ingredients/all?page=0&limit=5000", {
        headers: {
          "Content-Type": "application/json",
          Authorization: "---",
        },
      })
      .then((response: { data: { ingredients: any } }) => {
        setIngredientData(response.data.ingredients);
      })
      .catch((err: any) => {
        alert(err);
      });
  };

  const handleTagChange = (event: any) => {
    const {
      target: { value },
    } = event;

    setNewRecipeTagLabel(typeof value === "string" ? value.split(",") : value);

    setNewRecipeTags((prevState: any) => ({
      ...prevState,
      value,
    }));

    setNewRecipe((prevState: any) => ({
      ...prevState,
      tags: value,
    }));
  };

  //Add Recipe
  const addRecipeHandler = (event: any) => {
    setLoading(true);
    event.preventDefault();

    axios
      .post(PATH + "/recipes", newRecipe, {
        headers: {
          "Content-Type": "application/json",
          Authorization: "---",
        },
      })
      .then((response: any) => {
        setLoading(false);
        getData();
      })
      .catch((err: any) => {
        setLoading(false);
        alert(err);
      });
  };

  //----------------------------------------------------------
  //Edit Recipe
  const editRecipeHandler = (event: any) => {
    setLoading(true);
    event.preventDefault();
    axios
      .put(PATH + "/recipes?id=" + editRecipeData.id, editRecipeData, {
        headers: {
          "Content-Type": "application/json",
          Authorization: "---",
        },
      })
      .then((response: any) => {
        setEditRecipe(false);
        setEditRecipeData({});
        setLoading(false);
        getData();
      })
      .catch((err: { message: any }) => {
        setLoading(false);
        alert(err.message);
      });
  };

  //Delete Recipe
  const deleteButtonHandler = (event: any, recipeId: number) => {
    axios
      .delete(PATH + "/recipes/" + recipeId, {
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

  //Filter Recipes
  const filterRecipes = (searchText: string) => {
    let filterOptions = {
      name: searchText,
      tags: filterValue !== "" ? [filterValue.toLowerCase()] : [],
    };

    axios
      .post(PATH + "/recipes/all?page=0&limit=5000", filterOptions, {
        headers: {
          "Content-Type": "application/json",
          Authorization: "---",
        },
      })
      .then((response: { data: { recipes: any } }) => {
        setData(response.data.recipes);
      })
      .catch((err: any) => {
        alert(err);
      });

    setFilterValue("");
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
        data-testid="search-textfield"
        id="search-textfield"
        value={searchValue}
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
        onChange={(event: { target: { value: string } }) => {
          setSearchValue(event.target.value);
          if (event.target.value !== "") filterRecipes(event.target.value);
          else getData();
        }}
      />
      <IconButton
        sx={{
          color: "gray",
        }}
        onClick={() => {
          setSearchValue("");
          setFilterValue("");
          getData();
        }}
      >
        <RefreshIcon />
      </IconButton>
      <Button
        data-testid="add-button"
        id="add-button"
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
        data-testid="filter-button"
        id="filter-button"
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
                <TableCell className="tablecell">{d.id}</TableCell>
                <TableCell className="tablecell" sx={{ width: "10%" }}>
                  {d.name}
                </TableCell>
                <TableCell className="tablecell" sx={{ width: "25%" }}>
                  {d.instructions}
                </TableCell>
                <TableCell className="tablecell" sx={{ width: "15%" }}>
                  <ul>
                    {d.tags.map((t: any) => (
                      <li>{t}</li>
                    ))}
                  </ul>
                </TableCell>
                <TableCell className="tablecell" sx={{ width: "15%" }}>
                  <ul>
                    {d.ingredients.map((i: any) => (
                      <li>
                        {i.ingredient.name}
                        <br></br>
                        <em>{i.quantity}</em>
                      </li>
                    ))}
                  </ul>
                </TableCell>

                <TableCell
                  className="tablecell"
                  style={{ textAlign: "center", width: "35%" }}
                >
                  <Button
                    data-testid="delete-button"
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
                    data-testid="edit-button"
                    variant="contained"
                    style={{
                      backgroundColor: "green",
                      color: "white",
                      borderRadius: 0,
                      width: "200px",
                      margin: "5px",
                    }}
                    onClick={(event: any) => {
                      setEditRecipe(true);
                      setEditRecipeData(d);

                      // let constTags = d.tags;
                      // for (let i = 0; i < constTags.length; i++) {
                      //   constTags[i] = capitalizeWords(
                      //     constTags[i].split(" ")
                      //   ).join(" ");
                      // }
                      setNewRecipeTagLabel(d.tags);
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
            maxHeight: "650px",
            borderRadius: 0,
          },
        }}
        maxWidth="sm"
        open={addRecipe}
        TransitionComponent={Transition}
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
          onSubmit={(event: any) => {
            addRecipeHandler(event);
            setAddRecipe(false);
            setNewRecipe({});
            setNewRecipeTags([]);
            setNewRecipeTagLabel([]);
            setAddIngredient(false);
            setNewIngredients([]);
          }}
        >
          <DialogContent>
            <TextField
              data-testid="name-textfield"
              autoFocus
              required
              margin="dense"
              id="name"
              label="Recipe Name"
              type="text"
              fullWidth
              variant="standard"
              onChange={(event: { target: { value: any } }) => {
                setNewRecipe((prevState: any) => ({
                  ...prevState,
                  name: event.target.value,
                }));
              }}
              sx={{ margin: "10px 0px 10px 0px" }}
            />
            <TextField
              data-testid="instructions-textfield"
              autoFocus
              required
              multiline
              margin="dense"
              id="instructions"
              label="Instructions"
              type="text"
              fullWidth
              variant="standard"
              onChange={(event: { target: { value: any } }) => {
                setNewRecipe((prevState: any) => ({
                  ...prevState,
                  instructions: event.target.value,
                }));
              }}
              sx={{ margin: "10px 0px 10px 0px" }}
            />
            <Box sx={{ margin: "10px 0px 10px 0px" }}>
              <InputLabel>Tags</InputLabel>
              <Select
                data-testid="tags-select"
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
                    value={t.toLowerCase()}
                    style={getStyles(t, newRecipeTagLabel, theme)}
                  >
                    {t}
                  </MenuItem>
                ))}
              </Select>
            </Box>
            <Box sx={{ margin: "10px 0px 10px 0px" }}>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginTop: "20px",
                }}
              >
                <InputLabel>Ingredients</InputLabel>
                <Button
                  data-testid="add-ingredients-button"
                  sx={{
                    float: "right",
                    borderRadius: 5,
                    padding: 0,
                    minWidth: "10px",
                    color: "gray",
                  }}
                  onClick={() => {
                    setAddIngredient(true);
                  }}
                >
                  <AddIcon />
                </Button>
              </Box>
              <List
                dense={true}
                sx={{
                  border: 1,
                  borderColor: "lightgray",
                  borderRadius: 1,
                  maxHeight: "150px",
                  overflow: "auto",
                }}
              >
                {newRecipe.ingredients !== undefined &&
                  newRecipe.ingredients.map((i: any) => (
                    <ListItem>
                      <ListItemText
                        primary={i.ingredient.name}
                        secondary={i.quantity}
                      />
                    </ListItem>
                  ))}
              </List>
            </Box>
          </DialogContent>
          <DialogActions>
            <Button
              data-testid="reset-button"
              type="reset"
              color="error"
              onClick={() => {
                setAddRecipe(false);
                setNewRecipe({});
                setNewRecipeTags([]);
                setNewRecipeTagLabel([]);
                setAddIngredient(false);
                setNewIngredients([]);
              }}
            >
              Cancel
            </Button>
            <Button data-testid="submit-button" type="submit">
              Add
            </Button>
          </DialogActions>
        </form>
      </Dialog>

      {/* edit recipe */}
      <Dialog
        sx={{
          "& .MuiDialog-paper": {
            width: "80%",
            maxHeight: "650px",
            borderRadius: 0,
          },
        }}
        maxWidth="sm"
        open={editRecipe}
        TransitionComponent={Transition}
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
          onSubmit={(event: { preventDefault: () => void }) => {
            event.preventDefault();
            setNewRecipeTagLabel([]);
            editRecipeHandler(event);
          }}
        >
          <DialogContent sx={{ marginTop: "20px" }}>
            <TextField
              data-testid="name-edit-textfield"
              autoFocus
              margin="dense"
              value={editRecipeData.name}
              id="name"
              label="Recipe Name"
              type="text"
              fullWidth
              variant="standard"
              onChange={(event: { target: { value: any } }) => {
                setEditRecipeData((prevState: any) => ({
                  ...prevState,
                  name: event.target.value,
                }));
              }}
            />
            <TextField
              data-testid="instructions-edit-textfield"
              autoFocus
              multiline
              margin="dense"
              value={editRecipeData.instructions}
              id="instructions"
              label="Instructions"
              type="text"
              fullWidth
              variant="standard"
              onChange={(event: { target: { value: any } }) => {
                setNewRecipe((prevState: any) => ({
                  ...prevState,
                  instructions: event.target.value,
                }));
              }}
              sx={{ margin: "10px 0px 10px 0px" }}
            />
            <Box sx={{ margin: "10px 0px 10px 0px" }}>
              <InputLabel>Tags</InputLabel>
              <Select
                data-testid="tags-edit-select"
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
                    value={t.toLowerCase()}
                    style={getStyles(t, newRecipeTagLabel, theme)}
                  >
                    {t}
                  </MenuItem>
                ))}
              </Select>
            </Box>
            <Box sx={{ margin: "10px 0px 10px 0px" }}>
              <InputLabel>Ingredients</InputLabel>
              <List
                dense={true}
                sx={{
                  border: 1,
                  borderColor: "lightgray",
                  borderRadius: 1,
                  maxHeight: "150px",
                  overflow: "auto",
                }}
              >
                {editRecipeData.ingredients !== undefined &&
                  editRecipeData.ingredients.map((i: any) => (
                    <ListItem
                      secondaryAction={
                        <>
                          <IconButton
                            edge="end"
                            aria-label="edit"
                            style={{ marginRight: "1px" }}
                            onClick={() => {
                              setEditIngredient(true);
                              setEditIngredientData(i);
                            }}
                          >
                            <EditIcon />
                          </IconButton>
                          <IconButton
                            edge="end"
                            aria-label="delete"
                            onClick={() => {
                              // editRecipeData.ingredients?.splice()
                            }}
                          >
                            <DeleteIcon />
                          </IconButton>
                        </>
                      }
                    >
                      <ListItemText
                        primary={i.ingredient.name}
                        secondary={i.quantity}
                      />
                    </ListItem>
                  ))}
              </List>
            </Box>
          </DialogContent>
          <DialogActions>
            <Button
              data-testid="reset-edit-button"
              type="reset"
              color="error"
              onClick={() => {
                setEditRecipe(false);
                setNewRecipeTagLabel([]);
              }}
            >
              Cancel
            </Button>
            <Button data-testid="submit-edit-button" type="submit">
              Ok
            </Button>
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
        TransitionComponent={Transition}
      >
        <DialogTitle
          sx={{
            backgroundColor: "#c4560c",
            color: "white",
          }}
        >
          FILTER TAGS
        </DialogTitle>
        <form
          onSubmit={(event: { preventDefault: () => void }) => {
            event.preventDefault();
            filterRecipes(searchValue);
          }}
        >
          <DialogContent dividers>
            <RadioGroup
              data-testid="tags-radiogroup"
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
                  control={<Radio id={option} />}
                  label={option}
                />
              ))}
            </RadioGroup>
          </DialogContent>
          <DialogActions>
            <Button
              data-testid="reset-filter-button"
              autoFocus
              onClick={() => {
                setAddFilter(false);
              }}
            >
              Cancel
            </Button>
            <Button
              data-testid="submit-filter-button"
              type="submit"
              onClick={() => {
                setAddFilter(false);
              }}
            >
              Ok
            </Button>
          </DialogActions>
        </form>
      </Dialog>

      {/* add ingredient */}
      <Dialog
        sx={{
          "& .MuiDialog-paper": {
            width: "80%",
            maxHeight: "650px",
            borderRadius: 0,
          },
        }}
        maxWidth="sm"
        open={addIngredient}
        TransitionComponent={Transition}
      >
        <DialogTitle
          sx={{
            backgroundColor: "#c4560c",
            color: "white",
          }}
        >
          ADD INGREDIENT
        </DialogTitle>
        {loading && <LinearProgress />}
        <form
          onSubmit={(event: { preventDefault: () => void }) => {
            event.preventDefault();
            setAddIngredient(false);
            setNewIngredients([
              ...newIngredients,
              {
                ingredient: newIngredient.ingredient,
                quantity: newIngredient.quantity,
              },
            ]);
            setNewRecipe((prevState: any) => ({
              ...prevState,
              ingredients: [
                ...newIngredients,
                {
                  ingredient: newIngredient.ingredient,
                  quantity: newIngredient.quantity,
                },
              ],
            }));
            setNewIngredient({});
          }}
        >
          <DialogContent sx={{ marginTop: "20px" }}>
            <Box sx={{ margin: "10px 0px 10px 0px" }}>
              <InputLabel>Ingredient Name</InputLabel>
              <Select
                data-testid="ingredients-select"
                id="ingredients"
                onChange={(event: any) => {
                  setNewIngredient((prevState: any) => ({
                    ...prevState,
                    ingredient: {
                      id: 0,
                      name: event.target.value,
                    },
                  }));
                }}
                input={<OutlinedInput sx={{ width: "100%" }} label="Name" />}
                MenuProps={MenuProps}
              >
                {ingredientData.map((i) => (
                  <MenuItem key={i.name} value={i.name}>
                    {i.name}
                  </MenuItem>
                ))}
              </Select>
            </Box>

            <TextField
              data-testid="quantity-textfield"
              autoFocus
              required
              margin="dense"
              id="quantity"
              label="Quantity"
              type="text"
              fullWidth
              variant="standard"
              onChange={(event: { target: { value: any } }) => {
                setNewIngredient((prevState: any) => ({
                  ...prevState,
                  quantity: event.target.value,
                }));
              }}
              sx={{ margin: "10px 0px 10px 0px" }}
            />
          </DialogContent>
          <DialogActions>
            <Button
              data-testid="reset-ingredient-button"
              type="reset"
              color="error"
              onClick={() => {
                setAddIngredient(false);
              }}
            >
              Cancel
            </Button>
            <Button data-testid="submit-ingredient-button" type="submit">
              Ok
            </Button>
          </DialogActions>
        </form>
      </Dialog>

      {/* edit ingredient */}
      <Dialog
        sx={{
          "& .MuiDialog-paper": {
            width: "80%",
            maxHeight: "650px",
            borderRadius: 0,
          },
        }}
        maxWidth="sm"
        open={editIngredient}
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
          onSubmit={(event: { preventDefault: () => void }) => {
            event.preventDefault();
            console.log(editIngredientData);
            setEditIngredient(false);
            // editRecipeHandler(event);
          }}
        >
          <DialogContent sx={{ marginTop: "20px" }}>
            <TextField
              data-testid="quantity-edit-textfield"
              autoFocus
              value={editIngredientData.quantity}
              margin="dense"
              id="quantity"
              label="Quantity"
              type="text"
              fullWidth
              variant="standard"
              onChange={(event: { target: { value: any } }) => {
                setEditIngredientData((prevState: any) => ({
                  ...prevState,
                  quantity: event.target.value,
                }));
              }}
              sx={{ margin: "10px 0px 10px 0px" }}
            />
          </DialogContent>
          <DialogActions>
            <Button
              data-testid="reset-ingredient-edit-button"
              type="reset"
              color="error"
              onClick={() => {
                setEditIngredient(false);
              }}
            >
              Cancel
            </Button>
            <Button
              data-testid="submit-ingredient-edit-textfield"
              type="submit"
            >
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
export default ManageRecipes;
