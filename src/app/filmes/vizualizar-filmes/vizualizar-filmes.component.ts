import { Filme } from 'src/app/shared/models/filme';
import { FilmesService } from './../../core/filmes.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'dio-vizualizar-filmes',
  templateUrl: './vizualizar-filmes.component.html',
  styleUrls: ['./vizualizar-filmes.component.scss']
})
export class VizualizarFilmesComponent implements OnInit {
  filme:Filme;
  readonly semFoto="https://lh3.googleusercontent.com/proxy/-3S4zjoVuZqkW6ltUR2BmioYOOsHQl7IJ-8C3zpVNaDlWD9iAAchJmba4eTiwByLzBm-1afrylP_Kl5YFCv3qhayB5jJEalGQ8aQDre-KRLwOkQBNE_Uvt9drqW7jFoe54-L-blMIUqCBa6iUYTdKfN5qzFNroyBt5Sd2Pq73877w42pc7_E"
  constructor(private filmeService:FilmesService, private activatedRoute:ActivatedRoute) { }

  ngOnInit() {
    this.vizualizar(this.activatedRoute.snapshot.params["id"]);
  }
  private vizualizar(id:number):void{
    this.filmeService.vizualizar(id).subscribe((filme:Filme)=>{
      this.filme=filme;
    })
  }

}
