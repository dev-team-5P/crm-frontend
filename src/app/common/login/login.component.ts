import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { AuthService } from "../../service/auth.service";
import { Router } from "@angular/router";
import { SidebarService } from "../../service/sidebar.service";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"],
})
export class LoginComponent implements OnInit {
  LoginForm: FormGroup;
  hide = true;

  constructor(
    private auth: AuthService,
    private router: Router,
    private sidebar: SidebarService
  ) {}

  ngOnInit(): void {
    this.LoginForm = new FormGroup({
      email: new FormControl("", [Validators.required, Validators.email]),
      password: new FormControl("", Validators.required),
    });
  }
  login() {
    this.auth
      .signin(this.LoginForm.value)
      .subscribe((res: { token: string }) => {
        localStorage.setItem("token", res.token);
        this.sidebar.reloadNavItem();
        // this.auth.isLogged.next(true);
        // if (this.auth.getRole() === "admin") {
        //   this.auth.isAdmin.next(true);
        //   this.auth.isUser.next(false);
        //   this.auth.isSuperAdmin.next(false);
        // } else if (this.auth.getRole() === "user") {
        //   this.auth.isAdmin.next(false);
        //   this.auth.isUser.next(true);
        //   this.auth.isSuperAdmin.next(false);
        // } else if (this.auth.getRole() === "superAdmin") {
        //   this.auth.isAdmin.next(false);
        //   this.auth.isUser.next(false);
        //   this.auth.isSuperAdmin.next(true);
        // }
        this.router.navigateByUrl("/home/dashboard");
      });
  }
}
