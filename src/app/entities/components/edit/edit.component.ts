import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {GetHeroesService} from "../../services/get-heroes.service";

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit {
  public editForm: FormGroup = new FormGroup({
    'name': new FormControl(this.data.name, Validators.required),
    'power': new FormControl(this.data.power, Validators.required),
    'abilities': new FormControl(this.data.abilities),
    'startLevel': new FormControl(this.data.startLevel, Validators.required),
  })
  constructor(@Inject(MAT_DIALOG_DATA) public data: {
    name:string,
    power:number,
    selectedAbilities: [],
    abilities: [],
    startLevel:number,
    id: number,
  }, private _matDialogRef:MatDialogRef<EditComponent>,
              public _heroService: GetHeroesService) {
    this.editForm = new FormGroup({
      'name': new FormControl(data.name, Validators.required),
      'power': new FormControl(data.power, Validators.required),
      'abilities': new FormControl(data.abilities),
      'startLevel': new FormControl(data.startLevel, Validators.required),
    })
  }

  ngOnInit(): void {

  }
  ngOnDestroy(): void {}
  public edit():void {
    console.log(this.data.id);
    this._heroService.editHero(this.editForm.value,this.data.id);
    this._heroService.getHeroes();
  }
}
