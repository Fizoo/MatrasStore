import {Component, ViewChild} from '@angular/core';
import {TableComponent} from "../table/table.component";
import {MatSidenav, MatSidenavContainer,MatSidenavModule} from "@angular/material/sidenav";
import {MatToolbar} from "@angular/material/toolbar";
import {MatIcon} from "@angular/material/icon";
import {MatButton, MatIconButton} from "@angular/material/button";
import {MatCheckbox} from "@angular/material/checkbox";
import {MatListItem, MatNavList} from "@angular/material/list";
import {MatFormField} from "@angular/material/form-field";
import {MatAccordion, MatExpansionPanel, MatExpansionPanelTitle,MatExpansionModule} from "@angular/material/expansion";
import {MatInput} from "@angular/material/input";
import {NgForOf} from "@angular/common";

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [
    TableComponent,
    MatSidenavContainer,
    MatToolbar,
    MatIcon,
    MatIconButton,
    MatButton,
    MatSidenav,
    MatSidenavModule,
    MatCheckbox,
    MatNavList,
    MatListItem,
    MatFormField,
    MatExpansionPanel,
    MatExpansionPanelTitle,
    MatAccordion,
    MatExpansionModule,
    MatInput,
    NgForOf
  ],
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss'
})
export class MainComponent {
  @ViewChild('sidenav') sidenav: MatSidenav;
  isOpen=false


  toggle() {

      this.sidenav.toggle()
    }

  close() {
    this.sidenav.close()

  }
}
