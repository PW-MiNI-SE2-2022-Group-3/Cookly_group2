import React from "react";
import { useState,useEffect } from "react";
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
import Ingredient from "./models/IngredientModel";
import axios from "axios";

import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import EggIcon from "@mui/icons-material/Egg";

import AddIngredient from "./RegisterIngredient";
import "../styles/ManageAdmins.css";
import { getIngredients } from "../mock_server/api";
import { Label } from "@mui/icons-material";
import EditRecipe from "./EditRecipe";
import EditIngredients from "./EditIngredient";

interface ManageIngredientsProps {}

const columns = ["ID", "NAME", "ACTIONS"];

const ManageIngredients: React.FC<ManageIngredientsProps> = (
  props: ManageIngredientsProps
) => {
  const [deleteIngredient, setDeleteIngredient] = useState(false);
  const [editIngredient, setEditIngredient] = useState(false);
  const [editIngredientData, setEditIngredientData] = useState({});
  const [IngredientIdToDelete, setIngredientID] = useState(-1);
  const [addIngredient, setAddIngredient] = useState(false);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [data, setData] = useState<Ingredient[] | null>(null);


  const GetIngredientsFromServer = ()=>{
    //it will show deleting label and after server finishes(after 2 sconds) it will hide it
    getIngredients().then(
        (new_ingredients)=>{

            setData(new_ingredients);
        }
    ).catch((e)=>{
        console.error(`Error ${e.status} ${e.text}`);
    })


}
//load at the beginning
useEffect(() => {
  GetIngredientsFromServer()
}, [])


  const emptyRows = () => {
    // return page > 0 ? Math.max(0, (1 + page) * rowsPerPage - data.length) : 0;
  };

  const adminDeletion = () => {
    setDeleteIngredient(true);
  };
  const resetAdminDeletion = () => {
    setDeleteIngredient(false);
  };
  const setIDToDelete = (ID: number) => {
    setIngredientID(ID);
  };
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
  const editButtonHandler = (event: any, d: Ingredient) => {
    setEditIngredient(true);
    setEditIngredientData(d);
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
          setAddIngredient(true);
        }}
      >
        Add Ingredient
        <EggIcon style={{ marginLeft: "10px" }} />
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
          {
          data != null?
        <TableBody>
            {(rowsPerPage > 0
              ? data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              : data
            ).map((d) => (
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
          : <Label>No Recipes Available</Label>
        }
          
          <TableFooter>
            <TableRow>
              <TablePagination
                rowsPerPageOptions={[5, 10, 25, { label: "All", value: -1 }]}
                colSpan={5}
                count={data == null ? 0 : data.length}
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
  );
};
export default ManageIngredients;
