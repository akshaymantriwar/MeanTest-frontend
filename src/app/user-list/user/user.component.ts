import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {User} from '../../models/user.model';
import {UserService} from '../user.service';
import {ActivatedRoute, Router} from '@angular/router';
import {FileUploader} from 'ng2-file-upload';

const uploadAPI = 'http://localhost:3000/api/upload';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  userForm: FormGroup;
  submitted = false;
  id: string;
  profile; string;
  public uploader: FileUploader = new FileUploader({ url: uploadAPI, itemAlias: 'file' });

  constructor(private formBuilder: FormBuilder, private userService: UserService,
              private route: ActivatedRoute, private router: Router) {

  }

  // convenience getter for easy access to form fields
  get f(): any {
    return this.userForm.controls;
  }

  ngOnInit(): void {
    this.userForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phoneNumber: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]],
    });
    this.id = this.route.snapshot.paramMap.get('id');
    if (this.id) {
      this.userService.getUser(this.id).subscribe((user: User) => {
        this.userForm.get('firstName').setValue(user.firstName);
        this.userForm.get('lastName').setValue(user.lastName);
        this.userForm.get('email').setValue(user.email);
        this.userForm.get('phoneNumber').setValue(user.phoneNumber);
        this.profile = user.profileImageUrl;
      });
    }
  }

  onSubmit(): any {
    this.submitted = true;

    // stop here if form is invalid
    if (this.userForm.invalid) {
      return;
    }
    const user = new User();
    user.firstName = this.userForm.get('firstName').value;
    user.lastName = this.userForm.get('lastName').value;
    user.email = this.userForm.get('email').value;
    user.phoneNumber = this.userForm.get('phoneNumber').value;
    user.profileImageUrl = this.profile;
    if (this.id) {
      user._id = this.id;
      this.userService.editUser(this.id, user).subscribe(value => {
        this.router.navigateByUrl('/').then();
      });
    } else {
      this.userService.addUser(user).subscribe(value => {
        this.router.navigateByUrl('/').then();
      });
    }
    alert('SUCCESS!! :-)\n\n' + JSON.stringify(this.userForm.value));
  }

  handleFileInput(files: File[]): void {
    this.userService.uploadFile(files[0]).subscribe(value => {
      console.log(value.name);
      this.profile = 'http://localhost:3000/' + value.name;
    });
  }
}
