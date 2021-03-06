import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { AdminService } from "../../../service/admin.service";
import * as jwt_decode from "jwt-decode";
import { UserServiceService } from "../../../service/user-service.service";
import { ToastrService } from "ngx-toastr";
import { Router } from "@angular/router";

@Component({
  selector: "app-adduser",
  templateUrl: "./adduser.component.html",
  styleUrls: ["./adduser.component.css"],
})
export class AdduserComponent implements OnInit {
  hide = true;
  isAwesome = false;
  table;
  // pme: '';
  pageSize = 1000;
  currentPage = 1;
  decoded = jwt_decode(this.adminservice.token);
  userForm: FormGroup;
  constructor(
    private userservice: UserServiceService,
    private adminservice: AdminService,
    private toastr: ToastrService,
    private router: Router
  ) {}
  // tslint:disable-next-line: use-lifecycle-interface
  ngOnInit() {
    this.userForm = new FormGroup({
      name: new FormControl("", [Validators.required]),
      email: new FormControl("", [Validators.required, Validators.email]),
      password: new FormControl("", [
        Validators.required,
        Validators.minLength(8),
      ]),
      pme: new FormControl(null, Validators.required),
    });

    this.getpme();
  }
  // faire click button sur creat account
  addUser() {
    if (this.userForm.valid) {
      this.userservice
        .addUsr(this.userForm.value.pme, this.userForm.value)
        .subscribe(
          () => {
            this.toastr.success("User added succesfully") &&
              this.router.navigateByUrl("/home/superadmin/listuser");
          },
          (err) => {
            return this.toastr.warning(err.error.message);
          }
        );
    } else {
      return this.toastr.warning("add user invalid");
    }
  }
  getpme() {
    if (this.decoded.data.role === "superAdmin") {
      this.adminservice
        .getall(this.pageSize, this.currentPage)
        .subscribe((res: { pme; count }) => {
          this.table = res.pme;
        });
    } else if (this.decoded.data.role === "admin") {
      this.adminservice
        .getPmeByAdminId(this.decoded.data._id, this.pageSize, this.currentPage)
        .subscribe((res: { pme; count }) => {
          this.table = res.pme;
        });
    }
  }
}
