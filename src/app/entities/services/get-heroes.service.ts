import {Injectable} from "@angular/core";
import {BehaviorSubject, Observable} from "rxjs";
import {HeroInterface} from "../interfaces/hero.interface";
import {HttpClient} from "@angular/common/http";



@Injectable({
  providedIn: "root",
})
export class GetHeroesService {
  private _heroes$$: BehaviorSubject<HeroInterface[]> = new BehaviorSubject<HeroInterface[]>([]);
  public heroes$: Observable<HeroInterface[]> = this._heroes$$.asObservable();
  private _abilities$$: BehaviorSubject<string[]> = new BehaviorSubject<string[]>([]);
  public abilities$: Observable<string[]> = this._abilities$$.asObservable();
  public heroes: HeroInterface[] = [];
  public abilities: string[] = [];
  constructor(private _http: HttpClient,) {
  }
  public async getHeroes() {

    await this._http.get('http://localhost:3000/items').subscribe((res: any) => this._heroes$$.next(res));
  }

   public addHeroes( hero: HeroInterface): void {
    this._http.post('http://localhost:3000/items',hero).subscribe();
    this.heroes = this._heroes$$.getValue();
    this.heroes.push(hero);
    this._heroes$$.next(this.heroes);
    console.log(this._heroes$$.value);
    //this.makeHeroBlock(this.heroes[this.heroes.length-1].name,this.heroes[this.heroes.length-1].startLevel);
  }
  public addAbilities (ability: string): void {
    this.abilities = this._abilities$$.getValue();
    this.abilities.push(ability);
    this._abilities$$.next(this.abilities);
    console.log(this._abilities$$.value);
  }
  public editHero(hero:HeroInterface,id:number):void {
    console.log(id);
    this._http.put(`http://localhost:3000/items/${String(id)}`,hero).subscribe();
  }
}
