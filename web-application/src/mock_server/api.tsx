import axios from 'axios';
import Ingredient from '../Components/models/IngredientModel';
import Recipe from '../Components/models/RecipeModel';

const BASE_URL = 'http://localhost:3001';
const ING_URL = 'http://localhost:3001/ingredients';
const REC_URL = 'http://localhost:3001/recipes';

//GETS
// export const getIngredients = async () => {
// try{
//     let response = await fetch(`${BASE_URL}/ingredients`);
//     if(response.ok){
//         return await response.json();
//     }
//     else{
//          throw {ok:false, status:500, statusText:'Internal Server Error'}
//     }
// }catch(e){throw e;}
// }


// export const getRecipes = async () => {
// 	try{
// 		let response = await fetch(`${BASE_URL}/recipes`);
// 		if(response.ok){
// 			return await response.json();
// 		}
// 		else{
// 			 throw {ok:false, status:500, statusText:'Internal Server Error'}
// 		}
// 	}catch(e){throw e;}
// 	}

	////INGREDIENTS
	////INGREDIENTS
	////INGREDIENTS
	export const getAllIngredients = async () => {
		return await axios.get(`${ING_URL}`);
	}
	
	export const addIngredient = async (ingredient: Ingredient) => {
		console.log(ingredient);

		return await axios.post(ING_URL,ingredient);
	}
	
	export const editIngredient = async (id:number, ingredient: Ingredient) => {
		return await axios.put(`${ING_URL}/${id}`,ingredient);
	}
	
	export const deleteIngredient = async (id:number) => {
		return await axios.delete(`${ING_URL}/${id}`);
	}
	////RECIPES
	////RECIPES
	////RECIPES

	export const getAllRecipes = async () => {
		return await axios.get(`${REC_URL}`);
	}
	
	export const addRecipe = async (recipe: Recipe) => {
		return await axios.post(REC_URL,recipe);
	}
	
	export const editRecipe = async (id:number, recipe: Recipe) => {
		return await axios.put(`${REC_URL}/${id}`,recipe);
	}
	
	
	export const deleteRecipe = async (id:number) => {
		return await axios.delete(`${REC_URL}/${id}`);
	}