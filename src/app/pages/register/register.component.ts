import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent implements OnInit {
  form: FormGroup = new FormGroup({});
  hide = true;

  constructor(private formBuilder: FormBuilder) {}

  
  ngOnInit(): void {
        this.form = this.formBuilder.group({
      fullName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      status: ['', Validators.required],
      age: ['', Validators.required],
      roles: ['', Validators.required]
    });
  }

  register(): void {
    if (this.form.valid) {

      const formData = this.form.value;
      console.log('Registration form submitted:', formData);
      this.form.reset();

    } else {
        console.log('Invalid form data. Please check the fields.');
    }
  }

  togglePasswordVisibility(): void {
    this.hide = !this.hide;
  }
}
