import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CarService } from '../services/car.service';

@Component({
  selector: 'app-list-car',
  templateUrl: './list-car.page.html',
  styleUrls: ['./list-car.page.scss'],
})
export class ListCarPage implements OnInit {

  cars: any = [];

  constructor(
    private carService: CarService, 
    private router: Router) { }

  ngOnInit() { }

  ionViewDidEnter(){
    this.carService.getCars().subscribe((response) => {
      this.cars = response;
    })
  }

  getAllCars() {
    this.carService.getCars().subscribe(bikes => {
      console.log(bikes);
      this.cars = bikes;
    })
  }

  addCar(){
    this.router.navigateByUrl("/add-car");
  }

  removeCar(c, i) {
    if (window.confirm('Estas seguro de que quieres borrar el coche?')) {
      this.carService.deleteCar(c.id)
      .subscribe(() => {
          this.ionViewDidEnter();
        }
      )
    }
  }
}
