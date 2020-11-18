import { Filme } from 'src/app/shared/models/filme';
import { FilmesService } from './../../core/filmes.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'dio-listagem-filmes',
  templateUrl: './listagem-filmes.component.html',
  styleUrls: ['./listagem-filmes.component.scss']
})
export class ListagemFilmesComponent implements OnInit {

  readonly qtdPagina=4;
  pagina=0;
  filmes:Filme[]=[];
  constructor(private filmeService:FilmesService ) {}
  
  ngOnInit():void {
    this.listarFilmes();
  }

  onScroll():void{
    this.listarFilmes();
  
  }

  private listarFilmes():void{
    this.pagina++;
    this.filmeService.listar(this.pagina,this.qtdPagina)
    .subscribe((filmes:Filme[])=>this.filmes.push(...filmes))
    
  }

}
