package com.recepimanager.restapi.controllers;

import com.recepimanager.restapi.models.Recipe;
import com.recepimanager.restapi.repositories.RecipeJpaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/v1/recipes")
public class RecipesController {

    @Autowired
    private RecipeJpaRepository recipeJpaRepository;


    @GetMapping("")
    public List<Recipe> listRecipes(){
        return recipeJpaRepository.findAll();
    }

    @GetMapping("/{id}")
    public Recipe getRecipe(@PathVariable Long id){
        return recipeJpaRepository.getOne(id);
    }

    @PostMapping("")
    public Recipe createRecipe(@RequestBody Recipe recipe){
        return recipeJpaRepository.saveAndFlush(recipe);
    }

    @PutMapping ("/{id}")
    public Recipe updateRecipe(@RequestBody Recipe recipe, @PathVariable Long id){
        Recipe existingRecipe = recipeJpaRepository.getById(id);
        existingRecipe.setName(recipe.getDescription());
        existingRecipe.setDescription(recipe.getDescription());
        return recipeJpaRepository.save(existingRecipe);
    }

    @DeleteMapping("/{id}")
    public void deleteRecipe(@PathVariable Long id){
        recipeJpaRepository.deleteById(id);
    }
}
