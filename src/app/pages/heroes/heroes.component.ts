import { Component, OnInit } from '@angular/core';
import { HeroesService } from '../../services/heroes.service';
import { HeroeModel } from 'src/app/models/heroe.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})
export class HeroesComponent implements OnInit {

  heroesT: HeroeModel[] = [];

  cargando = false;

  constructor(private heroes: HeroesService) { }

  ngOnInit() {

    this.cargando = true;
    this.heroes.getHeroes().subscribe( resp => {
      this.heroesT = resp
      this.cargando = false;
    });
  }


  borrarHeroe( heroe:HeroeModel, i: number ){

    Swal.fire({
      title: '¿Está seguro?',
      text: `Esta seguro que desea borrar a ${heroe.nombre}`,
      type: 'question',
      showConfirmButton: true,
      showCancelButton: true
    }).then(resp =>{
      if( resp.value ) {
        //Borrar un heroe del arreglo y actualizar la vista automaticamente.
        this.heroesT.splice(i, 1);
                              //Se pasa el id por medio del modelo.
        this.heroes.borrarHeroe(heroe.id).subscribe();
      }
    });

  }

}
