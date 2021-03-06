import { Component, OnInit } from "@angular/core";
import { AdminService } from "../../../service/admin.service";
import * as jwt_decode from "jwt-decode";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { ProduitService } from "../../../service/produit.service";
import { CategorieService } from "../../../service/categorie.service";
import { ToastrService } from "ngx-toastr";
import { Router } from "@angular/router";
@Component({
  selector: "app-addproduit",
  templateUrl: "./addproduit.component.html",
  styleUrls: ["./addproduit.component.css"],
})
export class AddproduitComponent implements OnInit {
  data: FormData;
  pageSize = 1000;
  currentPage = 1;
  constructor(
    private adminservice: AdminService,
    private router: Router,
    private produit: ProduitService,
    private categorie: CategorieService,
    private toastr: ToastrService
  ) {
    this.data = new FormData();
  }
  isAwesome = true;
  file: File;
  decoded = jwt_decode(this.adminservice.token);
  table;
  produitform: FormGroup;
  categorietable;
  ngOnInit(): void {
    this.getcatigorie();
    this.produitform = new FormGroup({
      name: new FormControl("", [Validators.required]),
      ref: new FormControl(""),
      stock: new FormControl(""),
      description: new FormControl("", [Validators.required]),
      prix: new FormControl(""),
      min: new FormControl(""),
      categorie: new FormControl("", [Validators.required]),
      notifRupture: new FormControl(true),
    });
  }

  onFileChange(event) {
    if (event.target.files && event.target.files.length) {
      this.file = event.target.files[0];
    }
  }
  addproduit() {
    if (this.produitform.valid) {
      this.produit
        .addProduit(this.decoded.data.pme, this.produitform.value)
        .subscribe((res: any) => {
          this.upload(res._id);
          return (
            this.toastr.success("Produit Add with successfully") &&
            this.router.navigateByUrl("/home/produit/listproduit")
          );
        });
    } else {
      return this.toastr.warning("Produit invalid");
    }
  }
  upload(id) {
    this.data.set("image", this.file);
    this.produit.upload(this.data, id).subscribe((res) => {});
    // this.router.navigateByUrl('/home');
  }
  /***********get categorie *********** */
  getcatigorie() {
    this.categorie
      .GetCategorie(this.decoded.data.pme, this.pageSize, this.currentPage)
      .subscribe((res: any) => {
        this.categorietable = res.categ;
      });
  }
  toggleIsAwesome() {
    this.isAwesome = !this.isAwesome;
  }
}
