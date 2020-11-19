import { Filme } from 'src/app/shared/models/filme';
import { FilmesService } from './../../core/filmes.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertaComponent } from 'src/app/shared/components/alerta/alerta.component';
import { Alerta } from 'src/app/shared/models/alerta';
import { MatDialog } from '@angular/material';

@Component({
  selector: 'dio-vizualizar-filmes',
  templateUrl: './vizualizar-filmes.component.html',
  styleUrls: ['./vizualizar-filmes.component.scss']
})
export class VizualizarFilmesComponent implements OnInit {
  filme:Filme;
  id:number;
  readonly semFoto="https://lh3.googleusercontent.com/proxy/-3S4zjoVuZqkW6ltUR2BmioYOOsHQl7IJ-8C3zpVNaDlWD9iAAchJmba4eTiwByLzBm-1afrylP_Kl5YFCv3qhayB5jJEalGQ8aQDre-KRLwOkQBNE_Uvt9drqW7jFoe54-L-blMIUqCBa6iUYTdKfN5qzFNroyBt5Sd2Pq73877w42pc7_E"
  constructor(public dialog: MatDialog,private router:Router, private filmeService:FilmesService, private activatedRoute:ActivatedRoute) { }

  ngOnInit() {
    this.id=this.activatedRoute.snapshot.params["id"];
    this.vizualizar();
  }

  editar():void{
    this.router.navigateByUrl("/filmes/cadastro/"+this.id);
  }

  excluir():void{
    const config = {
      data: {
        titulo: "Você tem certeza que deseja excluir?",
        descricao: "Caso você tenha certeza que deseja excluir, clique no botão Ok",
        corBtnCancelar:"primary",
        corBtnSucesso:"warn",
        possuirBtnFechar: true
      } as Alerta
    }
    const dialogRef = this.dialog.open(AlertaComponent, config);
    dialogRef.afterClosed().subscribe((opcao: boolean) => {
      if (opcao) this.filmeService.excluir(this.id)
      .subscribe(()=>this.router.navigateByUrl("/filmes"));
    })
  }

  private vizualizar():void{
    this.filmeService.vizualizar(this.id).subscribe((filme:Filme)=>{
      this.filme=filme;
    })
  }

 

}
