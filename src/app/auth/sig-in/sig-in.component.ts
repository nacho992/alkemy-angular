import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { tap } from 'rxjs/operators';
import { AuthService } from 'src/app/service/auth.service';
import { ToastService } from 'src/app/service/toast.service';

@Component({
  selector: 'app-sig-in',
  templateUrl: './sig-in.component.html',
  styleUrls: ['./sig-in.component.scss']
})
export class SigInComponent implements OnInit {

  datos = this.fb.group({
    email: ['', [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]],
    password: ['', [Validators.required, Validators.minLength(6)]],
  });

  constructor(private fb: FormBuilder,
              private authService: AuthService,
              private toastService: ToastService,
              private router: Router) { 
    
  }

  ngOnInit(): void {
    this.authService.isLogged.subscribe(res => {
      if (res) {
        this.router.navigateByUrl('home')
      }
    })
  }

  public signIn(){
    this.authService.login(this.datos.value).subscribe(
      res => {
        this.toastService.showSuccess('login successfully')
        this.router.navigateByUrl('home')
      },
      error => {
        console.log(error.error.error)
        this.toastService.showDanger(error.error.error)
      }
    )
  }

}
