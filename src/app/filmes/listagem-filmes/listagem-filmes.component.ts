import { FormGroup, FormBuilder } from '@angular/forms';
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
  texto:string;
  genero:string;
  filmes:Filme[]=[];
  filtrosListagem:FormGroup;
  generos:Array<string>

  constructor(private filmeService:FilmesService,private fb:FormBuilder) {}

  
  ngOnInit():void {
    this.filtrosListagem=this.fb.group({
      texto:[""],
      genero:[""]
    })

    this.filtrosListagem.get("texto").valueChanges.subscribe(val=>{
      this.texto=val;
      this.resetarConsulta();
    });
    this.filtrosListagem.get("genero").valueChanges.subscribe(val=>{
      this.texto=val;
      this.resetarConsulta();
    });
    this.generos = ["Ação", "Romance", "Aventura", "Terror", "Ficção Cientifica", "Comédia", "Drama"];
    this.listarFilmes();
  }

  onScroll():void{
    this.listarFilmes();
  
  }

  private listarFilmes():void{
    this.pagina++;
    this.filmeService.listar(this.pagina,this.qtdPagina,this.texto,this.genero)
    .subscribe((filmes:Filme[])=>this.filmes.push(...filmes))
    
  }

  private resetarConsulta():void{
    this.pagina=0
    this.filmes=[];
    this.listarFilmes();
  }

}
