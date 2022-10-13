import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router";
import { FormGroup, FormBuilder } from "@angular/forms";
import { CarService } from '../services/car.service';
import { PhotoService } from '../services/photo.service';

@Component({
  selector: 'app-update',
  templateUrl: './update.page.html',
  styleUrls: ['./update.page.scss'],
})
export class UpdatePage implements OnInit {

  updateUserFg: FormGroup;
  id: any;
  isSubmitted: boolean = false;
  capturedPhoto: string = "";
  formulario: any[];

  constructor(
    private carService: CarService,
    private photoService: PhotoService,
    private activatedRoute: ActivatedRoute,
    public formBuilder: FormBuilder,
    private router: Router
  ) {
    this.id = this.activatedRoute.snapshot.paramMap.get('id');
   }

   ionViewWillEnter() {
    this.isSubmitted = false;
    this.capturedPhoto = "";
  }

  ngOnInit() {
    this.fetchUser(this.id);
    this.updateUserFg = this.formBuilder.group({
      filename: [''],
      brand: [''],
      model: [''],
      price: ['']
    })
  }

  fetchUser(id) {
    this.carService.getCar(id).subscribe((data) => {
      this.updateUserFg.setValue({
        filename: data['filename'],
        brand: data['brand'],
        model: data['model'],
        price: data['price'],
        
      });
      this.formulario = data;
    });
  }
  takePhoto() {
    this.photoService.takePhoto().then(data => {
      this.capturedPhoto = data.webPath;
    });
  }

  pickImage() {
    this.photoService.pickImage().then(data => {
      this.capturedPhoto = data.webPath;
    });
  }

  discardImage() {
    this.capturedPhoto = null;
  }

  async onSubmit() {
    this.isSubmitted = true;
    if (!this.updateUserFg.valid) {
      console.log('Please provide all the required values!')
      return false;
    } else {
      let blob = null;
      if (this.capturedPhoto != "") {
        const response = await fetch(this.capturedPhoto);
        console.log("hola")
        blob = await response.blob();
      }

      this.carService.updateCar(this.id, this.updateUserFg.value,blob).subscribe(data => {
        console.log("Photo sent!");

        this.router.navigateByUrl("/list-car");
      })
    }


    // if (!this.updateUserFg.valid) {
    //   return false;
    // } else {
    //   this.carService.updateCar(this.id, this.updateUserFg.value)
    //     .subscribe(() => {
    //       this.updateUserFg.reset();
    //       this.router.navigate(['/list-car']);
    //     })
    // }
  }
}
