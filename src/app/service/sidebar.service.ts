import { Injectable } from '@angular/core';
import { navItems } from './../_nav';
import {INavData} from '@coreui/angular';
import {Observable, of} from 'rxjs';
import * as jwt_decode from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {
  items$: Observable<INavData[]>;
  private navItems = navItems;
  constructor() {
    this.items$ = this.getNavItemsByRole();
   }
  token = localStorage.getItem('token');

  decoded = jwt_decode(this.token);
  role = this.decoded.data.role;

    // get navigation item by role
    getNavItemsByRole(): Observable<INavData[]> {
      console.log(this.role);
      if (this.role === 'superAdmin') {
        const filtredItems = this.navItems.filter((item) => {
          return item.url === '/home/dashboard' ||
          item.url === '/home/setting';
        });
        const  societeMenu = this.navItems.filter(item => item.name === 'Socièté');
        if ( societeMenu != null && societeMenu !== undefined && societeMenu.length > 0) {
          const newMenuSoci: INavData[] = societeMenu[0].children.filter((item) => {
            return item.url === '/home/superadmin/listsociete';
          } );
          filtredItems.push(newMenuSoci[0]);
        }
        return of(filtredItems);
      }
      if (this.role === 'admin') {
        const filtredItems = this.navItems.filter((item) => {
          return item.url === '/home/dashboard' ||
          item.name === 'Socièté' ||
          item.name === 'User';
        });
        const  produitMenu = this.navItems.filter(item => item.name === 'Produit');
        if ( produitMenu != null && produitMenu !== undefined && produitMenu.length > 0) {
          const newMenuproduit: INavData[] = produitMenu[0].children.filter((item) => {
            return item.url === '/home/produit/listproduit';
          });
          filtredItems.push(newMenuproduit[0]);
        }
        const  CategorieMenu = this.navItems.filter(item => item.name === 'Categorie');
        if ( CategorieMenu != null && CategorieMenu !== undefined && CategorieMenu.length > 0) {
          const newMenuCategorie: INavData[] = CategorieMenu[0].children.filter((item) => {
            return item.url === '/home/categorie/listcategorie';
          });
          filtredItems.push(newMenuCategorie[0]);
        }
        const  FournisseurMenu = this.navItems.filter(item => item.name === 'Fournisseur');
        if ( FournisseurMenu != null && FournisseurMenu !== undefined && FournisseurMenu.length > 0) {
          const newMenuFournisseur: INavData[] = FournisseurMenu[0].children.filter((item) => {
            return item.url === '/home/fournisseur/list-fournisseur';
          });
          filtredItems.push(newMenuFournisseur[0]);
        }
        return of(filtredItems);
      }
      if (this.role === 'user') {
        const filtredItems = this.navItems.filter((item) => {
          return item.url === '/home/dashboard' ||
          item.name === 'Produit' ||
          item.name === 'Categorie' ||
          item.name === 'Fournisseur';
        });
        return of(filtredItems);
      }

    }
    reloadNavItem() {
      this.role = this.decoded.data.role;
      this.items$ = this.getNavItemsByRole();
    }
}
