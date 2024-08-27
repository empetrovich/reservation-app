import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { FireBaseCodeErrorsService } from '../../services/fire-base-code-errors.service';
import { AuthService } from '../../services/auth.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-reservation-form',
  templateUrl: './reservation-form.component.html',
  styleUrl: './reservation-form.component.css'
})
export class ReservationFormComponent implements OnInit{
  dataUser: any;
  reservationForm: FormGroup;
  loading: boolean = false;

  airlines = [
    {label: 'Alaska Airlines', value: 'Alaska Airlines'},
    {label: 'American Airlines', value: 'American Airlines'},
    {label: 'Delta', value: 'Delta'},
    {label: 'JetBlue', value: 'JetBlue'},
    {label: 'Southwest Airlines', value: 'Southwest Airlines'}
  ];

  constructor(
    private fb: FormBuilder,
    private afAuth: AngularFireAuth, 
    private toastr: ToastrService,
    private router: Router,
    private fireBaseErrors: FireBaseCodeErrorsService,
    private authService: AuthService,
    private http: HttpClient
  ) {
    this.reservationForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      airline: ['', Validators.required],
      flightnum: ['', Validators.required],
      arrivaldate: ['', Validators.required],
      arrivaltime: ['', Validators.required],
      numguests: ['', Validators.required],
      comments: ['']
    })
      
  }

  ngOnInit(): void {
    this.afAuth.authState.subscribe(user => {
      if(user  && user.emailVerified) {
        this.dataUser = user;
      } else {
        this.router.navigate(['/login']);
      }
    });

  }

  reserve() {
    //console.log(this.reservationForm.value);
    const headers = new HttpHeaders({'Candidate': 'Elvis Petrovich'});

    this.http.post("https://reservation-app-b1820-default-rtdb.firebaseio.com/reservations.json",
      {
          "airline": this.reservationForm.value.airline,
          "arrivalDate": this.reservationForm.value.arrivaldate,
          "arrivalTime": this.reservationForm.value.arrivaltime,
          "flightNumber": this.reservationForm.value.flightnum,
          "numOfGuests": this.reservationForm.value.numguests,
          "comments": this.reservationForm.value.comments
      }, {headers: headers})
      .subscribe({
        next: (val) => console.log("POST call successful value returned in body", val),
        error: (response) => {
          this.toastr.error('There was an issue submitting your reservation form.', "Error");
        },
        complete: () => {
          this.toastr.success('The reservation form has successfully been submitted!', "Success!");
          this.reservationForm.reset();
        }
    });


  }

  logOut() {
    this.authService.signOut().then(() => {
      this.router.navigate(['/login'])
    });
  }

}
