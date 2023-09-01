import { Component } from '@angular/core';
import { MenuConstant } from '../../models/menu.model';
import { StateService } from '../../service/state.service';
import { navItems } from './_nav';
import { cilFace } from '@coreui/icons';

@Component({
  selector: 'app-dashboard',
  templateUrl: './default-layout.component.html',
  styleUrls: ['./default-layout.component.scss'],
})
export class DefaultLayoutComponent {

  public navItems = navItems;
  menus: any = [];
  filteredMenu: any =[];
  roles: any;
  constructor(private state: StateService) {
    this.menus = MenuConstant.menus;
    const user = this.state.getState();
    this.roles = user.details.role;
    this.filteredMenu = this.menus.filter((element: any) => element.roles == this.roles);
  }
}
