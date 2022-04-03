const BASE_URL = 'http://localhost:3001';

export const getIngredients = async () => {
try{
    let response = await fetch(`${BASE_URL}/ingredients`);
    if(response.ok){
        return await response.json();
    }
    else{
         throw {ok:false, status:500, statusText:'Internal Server Error'}
    }
}catch(e){throw e;}
}
export const getRecipes = async () => {
	try{
		let response = await fetch(`${BASE_URL}/recipes`);
		if(response.ok){
			return await response.json();
		}
		else{
			 throw {ok:false, status:500, statusText:'Internal Server Error'}
		}
	}catch(e){throw e;}
	}