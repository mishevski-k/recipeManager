import { Component, OnInit } from '@angular/core';
import { RecipeService} from "../../services/recipe.service";

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {

  constructor(private recipeService: RecipeService) { }

/*  private recipes = [
    new Recipe(1, 'Chocolate Chip Cookies', 'Sugar, flour, chocolate chips, etc.'),
    new Recipe(2, 'Wheat Bread', 'Yeast, flour, water, etc.'),
    new Recipe(3, 'Apple Pie', 'Apple pie filling, pie crust, water, etc.'),
  ];*/

/*  private recipes = [
    {id: 1, name: "Chocolate Chip Cookies", description: "Sugar, flour, chocolate chips, etc."},
    {id: 2, name: "Wheat Bread", description: "Yeast, flour, water, etc."},
    {id: 3, name: "Apple Pie", description: "Apple pie filling, pie crust, water, etc."},
  ]*/

  recipes: any;

  private selectedRecipe: any;

  ngOnInit(): void {
    this.recipeService.getRecipeList().subscribe({
      next: data => this.recipes = data,
      error: err => console.log(err)
    })
  }

  public getRecipes(): Array<any>{
    return this.recipes;
  }

  public getSelectedRecipe(): any{
    return this.selectedRecipe;
  }

  public onSelect(recipe: any){
    this.selectedRecipe = recipe;
  }

  public onDelete(recipe: any){
    this.recipeService.deleteRecipe(recipe.id).subscribe({
      next: success => this.ngOnInit(),
      error: err => console.log(err)
    })
  }

}
