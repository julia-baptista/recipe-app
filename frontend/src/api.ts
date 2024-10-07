//npm install axios
// import axios from 'axios';

import { Recipe } from "./types";


export const searchRecipes = async (searchTerm: string, page: number) => {
  const baseUrl = new URL("http://localhost:5000/api/recipes/search");
  baseUrl.searchParams.append("searchTerm", searchTerm);
  baseUrl.searchParams.append("page", String(page));

  const response = await fetch(baseUrl)
  if(!response.ok) {
    throw new Error(`HTTP error! Status: ${response.status}`)
  }

  return response.json();

}

export const searchRecipes2 = async (searchTerm: string, page: number) => {
  const baseUrl = `http://localhost:5000/api/recipes/search?searchTerm=${encodeURIComponent(searchTerm)}&page=${page}`;

  const response = await fetch(baseUrl);
  if (!response.ok) {
    throw new Error(`HTTP error! Status: ${response.status}`);
  }

  return response.json();
}

/* export const searchRecipes3 = async (searchTerm: string, page: number) => {
  const baseUrl = `http://localhost:5000/api/recipes/search`;

  try {
    const response = await axios.get(baseUrl, {
      params: {
        searchTerm: searchTerm,
        page: page
      }
    });
    return response.data;
  } catch (error) {
    throw new Error(`HTTP error! Status: ${error.response?.status}`);
  }
}; */
export const getRecipeSummary = async (recipeId: string) => {
  const url = new URL(`http://localhost:5000/api/recipes/${recipeId}/summary`);
  const response = await fetch(url);

  if(!response.ok) {
    throw new Error(`HTTP error! Status: ${response.status}`)
  }

  return response.json();

}


export const getFavouriteRecipes = async() => {
  const url = new URL('http://localhost:5000/api/recipes/favourite');
  const response = await fetch(url);

  if(!response.ok) {
    throw new Error(`HTTP error! Status: ${response.status}`)
  }

  return response.json();

}

export const addFavouriteRecipe = async(recipe: Recipe) => {
  const url = new URL('http://localhost:5000/api/recipes/favourite');
  const body = {
    recipeId: recipe.id
  }

  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(body)
  })

  if(!response.ok) {
    throw new Error(`HTTP error! Status: ${response.status}`)
  }


}


/* export const addFavouriteRecipe2 = async(recipe: Recipe) => {
  const url = 'http://localhost:5000/api/recipes/favourite';
  const body = {
    recipeId: recipe.id
  };

  try {
    const response = await axios.post(url, body, {
      headers: {
        "Content-Type": "application/json"
      }
    });

    
  } catch (error) {
    throw new Error(`HTTP error! ${error}`);
  }
}; */

export const removeFavouriteRecipe = async(recipe: Recipe) => {
  const url = new URL('http://localhost:5000/api/recipes/favourite');
  const body = {
    recipeId: recipe.id
  }

  const response = await fetch(url, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(body)
  })

  if(!response.ok) {
    throw new Error(`HTTP error! Status: ${response.status}`)
  }


}

/* export const removeFavouriteRecipe = async (recipe: Recipe) => {
  const url = 'http://localhost:5000/api/recipes/favourite';
  const body = {
    recipeId: recipe.id
  };

  try {
    const response = await axios.delete(url, {
      data: body,  // 'data' is used for the request body in DELETE requests with axios
      headers: {
        "Content-Type": "application/json"
      }
    });

    if (response.status !== 200) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

  } catch (error) {
    throw new Error(`Error removing favourite recipe: ${error}`);
  }
}; */

