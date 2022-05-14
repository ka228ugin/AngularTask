import { Component } from '@angular/core';
import {MatInputModule} from '@angular/material/input';
import {FormControl, FormGroup, FormGroupDirective, NgForm, Validators} from '@angular/forms';
import {GetHeroesService} from "./entities/services/get-heroes.service";
import {HeroInterface} from "./entities/interfaces/hero.interface";
import {MatDialog} from "@angular/material/dialog";
import {Dialog} from "primeng/dialog";
import DevExpress from "devextreme";
import dialog = DevExpress.ui.dialog;
import {EditComponent} from "./entities/components/edit/edit.component";
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {
  public arrayOfAbilities:any= [];
  public list: string [] = [];
  public abilitiesList = new Set();
  public listOfHeroes: any = ``;
  public heroes: HeroInterface[] = [];
  public condition = '';
  public sortDown: boolean = false;
  public copyHeroes: HeroInterface[] = [];
  title = 'MyNewAngularLibraryProject';
  public heroLevelSortForm: FormGroup = new FormGroup({
    'fromLevel': new FormControl(""),
    'toLevel': new FormControl(""),
  })
  public selectedAbilitiesForm: FormGroup = new FormGroup({
    'selectedAbility': new FormControl(""),
  })
  public heroForm: FormGroup = new FormGroup({
    'name': new FormControl("", Validators.required),
    'power': new FormControl("", Validators.required),
    'abilities': new FormControl(null),
    'startLevel': new FormControl("", Validators.required),
  })
  public abilityForm: FormGroup = new FormGroup({
    'newAbility': new FormControl("", Validators.required),
  })
  public nameSearchForm: FormGroup = new FormGroup({
    'nameSearch': new FormControl(""),
  });

  constructor(public _heroService: GetHeroesService, private _matDialog: MatDialog) {
    this._heroService.getHeroes();
    this._heroService.heroes$.subscribe(res => {
        this.listOfHeroes = res;
        this.copyHeroes = this.listOfHeroes.slice(0);
        console.log(this.abilitiesList);
        console.log(this.listOfHeroes);
        this.sortData();
        this.getAbilities();
        console.log(this.abilitiesList.entries());
      }
    )
    this.selectedAbilitiesForm = new FormGroup({
      'selectedAbility': new FormControl(""),
    })
    this.heroForm = new FormGroup({
      'name': new FormControl("", Validators.required),
      'power': new FormControl("", Validators.required),
      'abilities': new FormControl(),
      'startLevel': new FormControl("", Validators.required),
    })
    this.abilityForm = new FormGroup({
        'newAbility': new FormControl("", Validators.required),
      }
    )
    this.heroLevelSortForm = new FormGroup({
      'fromLevel': new FormControl(""),
      'toLevel': new FormControl(""),
    })
    this.nameSearchForm = new FormGroup({
      'nameSearch': new FormControl(""),
    });
  }

  public addHero(heroes: HeroInterface[] = []) {
    this._heroService.addHeroes(this.heroForm.value);
    this._heroService.heroes$.subscribe(res => {
      this.listOfHeroes = res;
      for (let i = 0; i < this.listOfHeroes.length; i++) {
        if (this.listOfHeroes[i].id === undefined) {
        }
        this.listOfHeroes[i].id = this.listOfHeroes.length;
      }
      this.copyHeroes = this.listOfHeroes.slice(0);
      this.listOfHeroes.sort(function (a: HeroInterface, b: HeroInterface) {
        return a.startLevel - b.startLevel
      });
    })
    this.heroForm.reset();
  }

  public addAbility() {
    this._heroService.addAbilities(this.abilityForm.value.newAbility.toLowerCase());
    this._heroService.abilities$.subscribe((list: string []) => {
        for (let i = 0; i < list.length; i++) {
          this.abilitiesList.add(list[i]);
        }
        console.log(this.abilitiesList);
      }
    )
    this.sortData();
    this.abilityForm.reset();
  }

  public sortData(): void {
    this.listOfHeroes.sort(function (a: HeroInterface, b: HeroInterface) {
      return a.startLevel - b.startLevel
    })
  }

  public sortClick(e: any): void {
    if (!this.sortDown) {
      this.sortDown = !this.sortDown;
      e.target.src = 'http://localhost:4200/assets/images/sortdown.png';
      this.listOfHeroes.sort(function (a: HeroInterface, b: HeroInterface) {
        return b.startLevel - a.startLevel
      });
    } else {
      this.sortDown = !this.sortDown;
      e.target.src = 'http://localhost:4200/assets/images/sortup.png';
      this.listOfHeroes.sort(function (a: HeroInterface, b: HeroInterface) {
        return a.startLevel - b.startLevel
      });
    }
  }

  public sort() {
    console.log(this.heroLevelSortForm.value.fromLevel);
    this.listOfHeroes = [];
    if (this.heroLevelSortForm.value.fromLevel == '') {
      if (this.selectedAbilitiesForm.value.selectedAbility.length == 0) {
        console.log(this.selectedAbilitiesForm.value);
        console.log(this.heroLevelSortForm.value.toLevel);
        for (let i = 0; i < this.copyHeroes.length; i++) {
          console.log(this.copyHeroes[i].startLevel);
          if ((this.copyHeroes[i].startLevel) <= parseInt(this.heroLevelSortForm.value.toLevel)) {
            console.log('works');
            this.listOfHeroes.push(this.copyHeroes[i]);
          }
        }
      }
      else {
        for (let i =0; i<this.copyHeroes.length; i++) {
          for (let j =0; j<this.copyHeroes[i].abilities.length; j++) {
            if (this.selectedAbilitiesForm.value.selectedAbility.includes(this.copyHeroes[i].abilities[j]) &&(this.copyHeroes[i].startLevel) <= parseInt(this.heroLevelSortForm.value.toLevel) ) {
              this.listOfHeroes.push(this.copyHeroes[i]);
              break
            }
          }
        }
      }
    }

      if (!this.sortDown) {
        this.listOfHeroes.sort(function (a: HeroInterface, b: HeroInterface) {
          return a.startLevel - b.startLevel
        });
      } else {
        this.listOfHeroes.sort(function (a: HeroInterface, b: HeroInterface) {
          return b.startLevel - a.startLevel
        });
      }
      console.log(this.listOfHeroes);
    if (this.heroLevelSortForm.value.toLevel == '') {
      this.listOfHeroes = [];
      if (this.selectedAbilitiesForm.value.selectedAbility.length == 0) {
        for (let i = 0; i < this.copyHeroes.length; i++) {
          console.log(this.copyHeroes[i].startLevel);
          if ((this.copyHeroes[i].startLevel) >= parseInt(this.heroLevelSortForm.value.fromLevel)) {
            console.log('works');
            this.listOfHeroes.push(this.copyHeroes[i]);
          }
        }
      }
      else {
        for (let i =0; i<this.copyHeroes.length; i++) {
          for (let j =0; j<this.copyHeroes[i].abilities.length; j++) {
            if (this.selectedAbilitiesForm.value.selectedAbility.includes(this.copyHeroes[i].abilities[j]) &&(this.copyHeroes[i].startLevel) >= parseInt(this.heroLevelSortForm.value.fromLevel) ) {
              this.listOfHeroes.push(this.copyHeroes[i]);
              break
            }
          }
        }
      }
      if (!this.sortDown) {
        this.listOfHeroes.sort(function (a: HeroInterface, b: HeroInterface) {
          return a.startLevel - b.startLevel
        });
      } else {
        this.listOfHeroes.sort(function (a: HeroInterface, b: HeroInterface) {
          return b.startLevel - a.startLevel
        });
      }
    }
    if (this.heroLevelSortForm.value.toLevel != '' && this.heroLevelSortForm.value.fromLevel != '') {
      if (this.selectedAbilitiesForm.value.selectedAbility.length == 0) {
        for (let i = 0; i < this.copyHeroes.length; i++) {
          console.log(this.copyHeroes[i].startLevel);
          if (((this.copyHeroes[i].startLevel) <= parseInt(this.heroLevelSortForm.value.toLevel)) && ((this.copyHeroes[i].startLevel) >= parseInt(this.heroLevelSortForm.value.fromLevel))) {
            this.listOfHeroes.push(this.copyHeroes[i]);
          }
        }
      }
      else {
        for (let i =0; i<this.copyHeroes.length; i++) {
          for (let j =0; j<this.copyHeroes[i].abilities.length; j++) {
            if (this.selectedAbilitiesForm.value.selectedAbility.includes(this.copyHeroes[i].abilities[j]) &&(this.copyHeroes[i].startLevel) >= parseInt(this.heroLevelSortForm.value.fromLevel) && (this.copyHeroes[i].startLevel) <= parseInt(this.heroLevelSortForm.value.toLevel) ) {
              this.listOfHeroes.push(this.copyHeroes[i]);
              break
            }
          }
        }
      }
      if (!this.sortDown) {
        this.listOfHeroes.sort(function (a: HeroInterface, b: HeroInterface) {
          return a.startLevel - b.startLevel
        });
      } else {
        this.listOfHeroes.sort(function (a: HeroInterface, b: HeroInterface) {
          return b.startLevel - a.startLevel
        });
      }
    }
    if (this.heroLevelSortForm.value.toLevel == '' && this.heroLevelSortForm.value.fromLevel == '') {

      if (this.selectedAbilitiesForm.value.selectedAbility.length == 0) {
        alert('Выберите параметры фильтрации!')
        this.listOfHeroes = this.copyHeroes.slice(0);
      }

      else {
        for (let i =0; i<this.copyHeroes.length; i++) {
          for (let j =0; j<this.copyHeroes[i].abilities.length; j++) {
            if (this.selectedAbilitiesForm.value.selectedAbility.includes(this.copyHeroes[i].abilities[j]) ) {
              this.listOfHeroes.push(this.copyHeroes[i]);
              break
            }
          }
        }
      }

      if (!this.sortDown) {
        this.listOfHeroes.sort(function (a: HeroInterface, b: HeroInterface) {
          return a.startLevel - b.startLevel
        });
      } else {
        this.listOfHeroes.sort(function (a: HeroInterface, b: HeroInterface) {
          return b.startLevel - a.startLevel
        });
      }
    }
  }

  public resetFilters() {
    console.log(this.abilitiesList);
    this.listOfHeroes = this.copyHeroes.slice(0);
    if (!this.sortDown) {
      this.listOfHeroes.sort(function (a: HeroInterface, b: HeroInterface) {
        return a.startLevel - b.startLevel
      });
    } else {
      this.listOfHeroes.sort(function (a: HeroInterface, b: HeroInterface) {
        return b.startLevel - a.startLevel
      });
    }
    this.heroLevelSortForm.reset();
   this.selectedAbilitiesForm.reset();
   this.nameSearchForm.reset();
  }

  public nameSearch(e: any) {
    if (e.keyCode == 13) {
      this.listOfHeroes = [];
      console.log(this.nameSearchForm.value)
      if (this.nameSearchForm.value.nameSearch != '') {
        for (let i = 0; i < this.copyHeroes.length; i++) {
          if ((this.copyHeroes[i].name.toLowerCase()) == this.nameSearchForm.value.nameSearch.toLowerCase()) {
            console.log(1);
            this.listOfHeroes.push(this.copyHeroes[i]);
          }
        }
      }
      if (this.nameSearchForm.value.nameSearch == '') {
        this.listOfHeroes = this.copyHeroes.slice(0);
      }
    }
    if (!this.sortDown) {
      this.listOfHeroes.sort(function (a: HeroInterface, b: HeroInterface) {
        return a.startLevel - b.startLevel
      });
    } else {
      this.listOfHeroes.sort(function (a: HeroInterface, b: HeroInterface) {
        return b.startLevel - a.startLevel
      });
    }
  }

  public openDialog(e: any) {
    this.arrayOfAbilities = [];
    this.abilitiesList.forEach(ability => this.arrayOfAbilities.push(ability));
    console.log(this.arrayOfAbilities)
    let hero: any = '';
    let id: number = e.target.parentNode.parentNode.id;
    for (let i = 0; i < this.listOfHeroes.length; i++) {
      if (this.listOfHeroes[i].id == id) {
        console.log(1);
        hero = this.listOfHeroes[i];
        console.log(hero);
        break
      }
    }
    console.log(e.target.parentNode.parentNode.id);
    this._matDialog.open(EditComponent, {
      data: {
        name: hero.name,
        power: hero.power,
        selectedAbilities: hero.abilities,
        abilities: this.arrayOfAbilities,
        startLevel: hero.startLevel,
        id: hero.id,
      },
      width: "500px",
      height: "500px",
    });
  }

  public getAbilities() {
    for (let i = 0; i < this.copyHeroes.length; i++) {
      for (let j = 0; j < this.copyHeroes[i].abilities.length; j++) {
        console.log(this.copyHeroes[i].abilities[j]);
        this.abilitiesList.add((this.copyHeroes[i]).abilities[j]);
      }
    }
  }

  public filterAbilities(): void {
    console.log(this.selectedAbilitiesForm.value.selectedAbility);
  }
}




