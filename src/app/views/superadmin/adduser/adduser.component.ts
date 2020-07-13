import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../../../service/auth.service';
import { AdminService } from '../../../service/admin.service';
import * as jwt_decode from 'jwt-decode';
import { UserServiceService } from '../../../service/user-service.service';
import { flatten } from '@angular/compiler';

@Component({
  selector: 'app-adduser',
  templateUrl: './adduser.component.html',
  styleUrls: ['./adduser.component.css']
})
export class AdduserComponent implements OnInit {
  isAwesome = false;
  table;
  pme :''
decoded = jwt_decode(this.adminservice.token);
userForm: FormGroup;
  constructor(private userservice: UserServiceService, private adminservice : AdminService) { }
  // tslint:disable-next-line: use-lifecycle-interface
  ngOnInit() {
    this.userForm = new FormGroup({
      name: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(8)]),
    });
    
    this.getpme()
  }
  // faire click button sur creat account
  addUser() {
    
    this.userservice.addUsr(this.pme,this.userForm.value).subscribe((res: any) => {
      console.log(res);
    });
  }
  getpme() {
    this.adminservice.getPmeByAdminId(this.decoded.data._id).subscribe((res: any) => {
      this.table = res;
      console.log(this.table);
  
  });
  }
  toggleIsAwesome() {
    this.isAwesome = !this.isAwesome;
    this.userForm.controls.notifRupture.setValue(this.isAwesome);
    console.log(this.isAwesome);
    console.log(this.userForm.value);   
  }


}
