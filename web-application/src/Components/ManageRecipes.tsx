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
import { TablePagination } from "@mui/material";
import TablePaginationActions from "./TablePagination";
import Recipe from "./models/RecipeModel"
import axios from "axios";

import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import FoodBankIcon from "@mui/icons-material/FoodBank";
import AddRecipes from "./RegisterRecipe";
import EditRecipe from "./EditRecipe";
import { getRecipes } from "../mock_server/api";
import { Label } from "@mui/icons-material";

interface ManageRecipesProps {}

const columns = [
  "ID",
  "NAME",
  "INSTRUCTIONS",
  "TAGS",
  "INGREDIENTS",
  "ACTIONS",
];

const ManageRecipes: React.FC<ManageRecipesProps> = (
  props: ManageRecipesProps
) => {
  // const [deleteAdmin, setDeleteRecipe] = useState(false);
  const [editRecipe, setEditRecipe] = useState(false);
  const [editRecipeData, setEditRecipeData] = useState({});
  const [addRecipe, setAddRecipe] = useState(false);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [data, setData] = useState<Recipe[] | null>(null);

  
  const GetRecipesFromServer = ()=>{
    //it will show deleting label and after server finishes(after 2 sconds) it will hide it
    getRecipes().then(
        (new_recipes)=>{

            setData(new_recipes);
        }
    ).catch((e)=>{
        console.error(`Error ${e.status} ${e.text}`);
    })


}
//load at the beginning
useEffect(() => {
   GetRecipesFromServer()
}, [])



  const emptyRows = () => {
    // return page > 0 ? Math.max(0, (1 + page) * rowsPerPage - data.length) : 0;
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
          setAddRecipe(true);
        }}
      >
        Add Recipe
        <FoodBankIcon style={{ marginLeft: "10px" }} />
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
          {data != null ? <TableBody>
            {(rowsPerPage > 0
              ? data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              : data
            ).map((d) => (
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
          :<Label>No Ingredients Available</Label>}
          <TableFooter>
            <TableRow>
              <TablePagination
                rowsPerPageOptions={[5, 10, 25, { label: "All", value: -1 }]}
                colSpan={5}
                count={data==null ? 0 : data.length }
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
    </Box>
  );
};
export default ManageRecipes;
