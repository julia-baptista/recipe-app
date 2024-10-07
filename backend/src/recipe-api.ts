import * as dotenv from 'dotenv';
import { URLSearchParams } from 'url';
dotenv.config();

const apiKey = process.env.API_KEY;

export const searchRecipes = async (searchTerm: string, page:number) => {
  
  if(!apiKey) {
    throw new Error("API Key not found")
  }

  const url = new URL("https://api.spoonacular.com/recipes/complexSearch")

  const queryParams = {
    apiKey,
    query: searchTerm,
    number: "10",
    offset: (page * 10).toString(),
  }

  url.search = new URLSearchParams(queryParams).toString()

  try {

    const searchResponse = await fetch(url);
    const resultJson = await searchResponse.json();
    return resultJson;
    
  } catch (error) {
    console.log(error)
  }

}

export const getRecipeSummary = async (recipeId:string) => {

  if(!apiKey) {
    throw new Error("API Key not found")
  }

  const url = new URL(`https://api.spoonacular.com/recipes/${recipeId}/summary`)

  const params = {
    apiKey: apiKey,
  }

  url.search = new URLSearchParams(params).toString();

  try {

    const response = await fetch(url);
    const json = await response.json();

    return json;
    
  } catch (error) {
    console.log(error)
  }
}

export const getFavouriteRecipesByIDs = async(ids: string[]) => {

  if(!apiKey) {
    throw new Error("API Key not found")
  }

  const url = new URL('https://api.spoonacular.com/recipes/informationBulk')
  const params = {
    apiKey: apiKey,
    ids: ids.join(",")
  }

  url.search = new URLSearchParams(params).toString();

  const serachResponse = await fetch(url);
  const json = await serachResponse.json();

  return { results: json }

}