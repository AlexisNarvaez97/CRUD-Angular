import { Component, OnInit } from '@angular/core';
import { HeroeModel } from '../../models/heroe.model';
import { NgForm } from '@angular/forms';
import { HeroesService } from 'src/app/services/heroes.service';

import Swal from 'sweetalert2';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-heroe',
  templateUrl: './heroe.component.html',
  styleUrls: ['./heroe.component.css']
})
export class HeroeComponent implements OnInit {

  heroe: HeroeModel = new HeroeModel();

  constructor(private heroes: HeroesService, private route: ActivatedRoute) { }

  ngOnInit() {


    //Se atrapa el id que manda el routerLink de la vista heroes.
    const id = this.route.snapshot.paramMap.get('id');

    if( id !== 'nuevo') {

                                          //Resp de tipo heroe modal
      this.heroes.getHeroe(id).subscribe( (resp: HeroeModel) =>{
        console.log(resp);
        this.heroe = resp;
        this.heroe.id = id;
      });
    }
  }

  guardar( form: NgForm ) {

    if( form.invalid ) { 
      console.log('Formulario no valido');
      return; 
    }

    Swal.fire({
      title: 'Espera',
      text: 'Guardando información',
      type: 'info',
      allowOutsideClick: false
    });
    Swal.showLoading();

    let peticion: Observable<any>;

    if( this.heroe.id ) {
      peticion = this.heroes.actualizarHeroe(this.heroe);
    } else {
      peticion = this.heroes.crearHeroe(this.heroe);
    }

    peticion.subscribe( resp => {

      Swal.fire({
        title: this.heroe.nombre,
        text: 'Se actualizó correctamente',
        type: 'success'
      });

    });

    // console.log(form);
    // console.log(this.heroe);

  }

}
