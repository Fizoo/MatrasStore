import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {MatSidenav, MatSidenavContainer, MatSidenavContent} from "@angular/material/sidenav";
import {MatToolbar} from "@angular/material/toolbar";
import {MatButton, MatIconButton} from "@angular/material/button";
import {MatIcon} from "@angular/material/icon";
import {
  MatAccordion,
  MatExpansionPanel,
  MatExpansionPanelHeader,
  MatExpansionPanelTitle
} from "@angular/material/expansion";
import {MatCheckbox} from "@angular/material/checkbox";
import {Mattress} from "../../../data/data";
import {FormBuilder, FormGroup, ReactiveFormsModule} from "@angular/forms";
import {DataService} from "../../services/data.service";
import {Subscription} from "rxjs";


@Component({
  selector: 'app-filter-page',
  standalone: true,
  imports: [
    MatSidenavContainer,
    MatToolbar,
    MatSidenav,
    MatIconButton,
    MatIcon,
    MatAccordion,
    MatExpansionPanel,
    MatExpansionPanelTitle,
    MatExpansionPanelHeader,
    MatSidenavContent,
    MatCheckbox,
    MatButton,
    ReactiveFormsModule,

  ],
  templateUrl: './filter-page.component.html',
  styleUrl: './filter-page.component.scss'
})
export class FilterPageComponent implements OnInit, OnDestroy {
  allData: Mattress[] = [];
  listName: string[] = [];
  listSize: string[] = [];
  form: FormGroup;
  private dataSubscription: Subscription;

  @ViewChild('sidenav') sidenav: MatSidenav;
  isOpen: any;

  constructor(
    private fb: FormBuilder,
    private dataService: DataService
  ) {}

  ngOnInit() {
    this.initForm();

    this.dataSubscription = this.dataService.data$.subscribe(data => {
      this.allData = data;
      this.listName = Array.from(new Set(this.allData.map(el => el.name)));
      this.listSize = Array.from(new Set(this.allData.map(el => el.size)));
      this.updateFormControls();
    });
  }

  private initForm(): void {
    this.form = this.fb.group({
      sizes: this.fb.array([]),
      names: this.fb.array([]),
    });
  }

  private updateFormControls(): void {
    this.form.setControl('sizes', this.fb.array(this.initCheckboxes(this.listSize)));
    this.form.setControl('names', this.fb.array(this.initCheckboxes(this.listName)));
  }

  private initCheckboxes(items: string[]): any[] {
    return items.map(() => this.fb.control(false));
  }

  onSubmit(): void {
    const { sizes, names } = this.form.value;
    const selectedSizes = this.listSize.filter((_, i) => sizes[i]);
    const selectedNames = this.listName.filter((_, i) => names[i]);

    if (selectedSizes.length === 0 && selectedNames.length === 0) {
      this.dataService.resetData();
    } else {
      this.dataService.filterData(selectedSizes, selectedNames);
    }
  }

  ngOnDestroy(): void {
    if (this.dataSubscription) {
      this.dataSubscription.unsubscribe();
    }
  }

  toggleSidenav(): void {
    this.sidenav.toggle();
  }

  closeSidenav(): void {
    this.sidenav.close();
  }

  countFn(field: keyof Mattress, value: any): number {
    return this.allData.filter(el => el[field] === value && el.quantity > 0).length;
  }

  sortByQuantityDesc(arr: Mattress[]): string[] {
    return arr
      .sort((a, b) => b.quantity - a.quantity)
      .map(el => el.name);
  }
}
