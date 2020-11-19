import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { AlertaComponent } from './../../shared/components/alerta/alerta.component';
import { FilmesService } from './../../core/filmes.service';
import { ValidarCamposService } from 'src/app/shared/components/campos/validar-campos.service';
import { Filme } from 'src/app/shared/models/filme';
import { Alerta } from 'src/app/shared/models/alerta';

@Component({
  selector: 'dio-cadastro-filmes',
  templateUrl: './cadastro-filmes.component.html',
  styleUrls: ['./cadastro-filmes.component.scss']
})
export class CadastroFilmesComponent implements OnInit {

  id:number;
  cadastro: FormGroup;
  generos: Array<string>;

  constructor(public dialog: MatDialog,
     public validacao: ValidarCamposService,
     private fb: FormBuilder,
     private filmeService: FilmesService,
     private router:Router,
     private activatedRoute:ActivatedRoute) { }

  get f() {
    return this.cadastro.controls;
  }

  ngOnInit(): void {

    this.id=this.activatedRoute.snapshot.params["id"];
    if(this.id) this.filmeService.vizualizar(this.id).subscribe((filme:Filme)=>this.popularFormulario(filme));
    else this.popularFormulario(this.criarFilmeEmBranco());
    this.generos = ["Ação", "Romance", "Aventura", "Terror", "Ficção Cientifica", "Comédia", "Drama"];
  }

  submit(): void {
    this.cadastro.markAllAsTouched();
    if (this.cadastro.invalid) return;
    const filme = this.cadastro.getRawValue() as Filme;
    filme.id=this.id;
    if(this.id) this.editar(filme);
    else this.salvar(filme);
  }

  reiniciarForm(): void {
    this.cadastro.reset();
  }

  private criarFilmeEmBranco():Filme{
    return {
      id:null,
      titulo: null,
      dtLancamento:null,
      nota:null,
      urlFoto:null,
      urlIMDb:null,
      genero:null
    }
  }

  private popularFormulario(filme:Filme):void{
    this.cadastro = this.fb.group({
      titulo: [filme.titulo, [Validators.required, Validators.minLength(2), Validators.maxLength(256)]],
      urlFoto: [filme.urlFoto, [Validators.minLength(10)]],
      dtLancamento: [filme.dtLancamento, [Validators.required]],
      descricao: [filme.descricao],
      nota: [filme.nota, [Validators.required, Validators.min(0), Validators.max(10)]],
      urlIMDb: [filme.urlIMDb, [Validators.minLength(10)]],
      genero: [filme.genero, [Validators.required]]
    });
  }

  private salvar(filme: Filme): void {
    this.filmeService.salvar(filme).subscribe(() => {
      const config = {
        data: {
          btnSucesso: "Ir para listagem",
          btnCancelar: "Cadastrar um novo filme",
          corBtnCancelar: "primary",
          possuirBtnFechar: true
        } as Alerta
      }
      const dialogRef = this.dialog.open(AlertaComponent, config);
      dialogRef.afterClosed().subscribe((opcao: boolean) => {
        if (opcao) this.router.navigateByUrl("filmes");
        else{
          this.reiniciarForm();
        }
      })
    }, () => {
      const config = {
        data: {
          titulo: "Erro ao salvar o registro",
          descricao: "Não foi possivel salvar o registro, tente novamente mais tarde.",
          corBtnSucesso: "warn",
          btnSucesso: "Fechar"
        } as Alerta
      };
      this.dialog.open(AlertaComponent, config)
    });
  }

  private editar(filme: Filme): void {
    this.filmeService.editar(filme).subscribe(() => {
      const config = {
        data: {
          titulo: "Registro atualizado com sucesso!",
          descricao:"Seu registro foi atualizado com sucesso!"
        } as Alerta
      }
      const dialogRef = this.dialog.open(AlertaComponent, config);
      dialogRef.afterClosed().subscribe(() => this.router.navigateByUrl("filmes"))
    }, () => {
      const config = {
        data: {
          titulo: "Erro ao editar ao registro",
          descricao: "Não foi possivel editar o registro, tente novamente mais tarde.",
          corBtnSucesso: "warn",
          btnSucesso: "Fechar"
        } as Alerta
      };
      this.dialog.open(AlertaComponent, config)
    });
  }
  

}
