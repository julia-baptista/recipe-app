// npm init -y // => para criar o projeto com Express e TypeScript
// npx tsc --init  // => inicia o TS
//  npm i express prisma @prisma/client cors dotenv
// express: cuida das requisições de api
// prisma: conexão com o banco de dados
// @primsa/client: permite interagir com o banco de dados de uma maneira amigável usando objetos e tipos
// cors: segurança que permite o acesso ao backend de uma porta diferente
// npm i ts-node-dev typescript nodemon @types/cors @types/express @types/node --save-dev
// ts-node: instala o typescript para o node 
// nodemone usado para dar start no backend com hotreloading quando a gente salva algo
//  "start": "ts-node-dev --respawn --transpile-only src/index.ts"


/* ts-node-dev: Este é um utilitário de desenvolvimento que combina o ts-node (um interpretador de TypeScript)
com um recurso de reinicialização automática semelhante ao nodemon. Ele permite que você execute o código
TypeScript diretamente sem precisar transpilar manualmente para JavaScript. Além disso, ele observa alterações
no código e reinicia automaticamente o servidor sempre que houver modificações.

--respawn: Este sinalizador instrui o ts-node-dev a reiniciar o processo sempre que o código for modificado.
É útil para desenvolvimento, pois elimina a necessidade de reiniciar o servidor manualmente após alterações.

--transpile-only: Este sinalizador faz com que o ts-node-dev transpile o código TypeScript diretamente sem fazer a
verificação completa de tipos (type checking). Isso acelera a execução, já que o foco é apenas na transpiração do
código (transformando de TypeScript para JavaScript), sem validar os tipos. É recomendado para desenvolvimento rápido,
mas não substitui a verificação completa de tipos, que pode ser feita com o comando tsc (TypeScript Compiler) separadamente.
 */

/* Using ts-node-dev instead of nodemon in your start script is a common practice when working with
TypeScript projects. Here are the reasons for this choice:

TypeScript Compilation: ts-node-dev is specifically designed to work with TypeScript. It automatically
compiles TypeScript files on the fly, which means you don’t have to pre-compile your TypeScript code
before running it. In contrast, nodemon only restarts the Node.js application and doesn't handle
TypeScript compilation.

Faster Restart: ts-node-dev is optimized for speed. It only recompiles files that have changed rather than recom */


// npx prisma init
// https://spoonacular.com/


import express from 'express'
import cors from 'cors'
import * as RecipeAPI from './recipe-api';
import { PrismaClient } from '@prisma/client'; 

import * as dotenv from 'dotenv';
dotenv.config();

const app = express();
const prismaClient = new PrismaClient();

app.use(express.json())
app.use(cors())


app.get("/api/recipes/search", async (req, res) => {
  // GET http://localhost/api/recipes/search?searchTerm=burgers&page=1

  const searchTerm = req.query.searchTerm as string;
  const page = parseInt(req.query.page as string);
  const results = await RecipeAPI.searchRecipes(searchTerm, page);

  return res.status(200).json(results);

  
})

app.get("/api/recipes/:recipeId/summary", async (req, res) => {

  const recipeId = req.params.recipeId;
  const results = await RecipeAPI.getRecipeSummary(recipeId);

  return res.status(200).json(results);

})


app.post("/api/recipes/favourite", async (req, res) => {
  const recipeId = req.body.recipeId;
  try {
    const favouriteRecipe = await prismaClient.favouriteRecipes.create({
      data: {
        recipeId: recipeId 
      }
    })

    return res.status(201).json(favouriteRecipe)
    
  } catch (error) {
    console.log(error);
    return res.status(500).json({error: "Oops, something went wrong"})
  }

})

app.get("/api/recipes/favourite", async (req, res) => {
  try {

    const recipes = await prismaClient.favouriteRecipes.findMany();
    const recipeIds = recipes.map((recipe)=> recipe.recipeId.toString());

    const favourites = await RecipeAPI.getFavouriteRecipesByIDs(recipeIds);

    return res.status(200).json(favourites);
    
  } catch (error) {
    console.log(error);
    return res.status(500).json({error: "Oops, something went wrong"})
  }
})

app.delete("/api/recipes/favourite", async (req, res) => {
  const recipeId = req.body.recipeId;

  try {

    await prismaClient.favouriteRecipes.delete({
      where: {
        recipeId: recipeId
      }
    })

    return res.status(204).send();
    
  } catch (error) {
    console.log(error);
    return res.status(500).json({error: "Oops, something went wrong"})
  }
})



app.listen(5000, ()=> {
  console.log("server running on localhost:5000")
})