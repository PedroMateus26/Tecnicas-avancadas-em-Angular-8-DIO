import { ConfigParams } from './../../shared/models/config-params';
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

  config:ConfigParams={
    pagina:0,
    limite:4
  };
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
      this.config.pesquisa=val;
      this.resetarConsulta();
    });
    this.filtrosListagem.get("genero").valueChanges.subscribe(val=>{
      this.config.campo={tipo:"genero",valor:val};
      this.resetarConsulta();
    });
    this.generos = ["Ação", "Romance", "Aventura", "Terror", "Ficção Cientifica", "Comédia", "Drama"];
    this.listarFilmes();
  }

  onScroll():void{
    this.listarFilmes();
  
  }

  private listarFilmes():void{
    this.config.pagina++;
    this.filmeService.listar(this.config)
    .subscribe((filmes:Filme[])=>this.filmes.push(...filmes))
    
  }

  private resetarConsulta():void{
    this.config.pagina=0
    this.filmes=[];
    this.listarFilmes();
  }

}
