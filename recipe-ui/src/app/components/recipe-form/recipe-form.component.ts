import { Component, OnInit } from '@angular/core';
import { Form ,FormControl} from "@angular/forms";
import { Router } from "@angular/router";
import { RecipeService } from "../../services/recipe.service";
import { ActivatedRoute } from "@angular/router";
import {subscribeOn} from "rxjs";

@Component({
  selector: 'app-recipe-form',
  templateUrl: './recipe-form.component.html',
  styleUrls: ['./recipe-form.component.css']
})
export class RecipeFormComponent implements OnInit {

  private model: any;

  constructor(private router: Router, private recipeService: RecipeService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    if(this.route.snapshot.paramMap.get('id') != null){
      this.recipeService.getRecipe(this.route.snapshot.paramMap.get('id')).subscribe({
        next: data => this.model = data,
        error: err => console.log(err)
      })
    }else{
      this.model = { id: null, name: null, description: null};
    }
  }

  onSubmit(){
    if(this.model.id){
      this.recipeService.updateRecipe(this.model.id, this.model).subscribe({
        next: success => this.router.navigate(['/']),
        error: err => console.log(err)
      })
    }else{
    }
    this.recipeService.createRecipe(this.model).subscribe({
      next: success => this.router.navigate(['/']),
      error: err => console.log(err)
    })
    this.router.navigate(['/']);
  }

  public getModel(): any {
    return this.model;
  }

}
