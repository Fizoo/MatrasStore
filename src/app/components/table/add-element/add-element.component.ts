import {Component} from '@angular/core';
import {MatDialogModule, MatDialogRef} from "@angular/material/dialog";
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatButtonModule} from "@angular/material/button";

@Component({
  selector: 'app-add-element',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    FormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule
  ],
  templateUrl: './add-element.component.html',
  styleUrl: './add-element.component.scss'
})
export class AddElementComponent {
  mattressForm: FormGroup;
  formFields = [
    {
      label: 'Назва',
      controlName: 'name',
      type: 'text',
      errorMessage: 'Це поле є обов\'язковим',
    },
    {
      label: 'Розмір',
      controlName: 'size',
      type: 'text',
      errorMessage: 'Це поле є обов\'язковим',
    },
    {
      label: 'Ціна',
      controlName: 'price',
      type: 'number',
      errorMessage: 'Вкажіть коректну ціну',
    },
    {
      label: 'Кількість',
      controlName: 'quantity',
      type: 'number',
      errorMessage: 'Вкажіть коректну кількість',
    },
    {
      label: 'Статус',
      controlName: 'status',
      type: 'number',
      errorMessage: 'Вкажіть коректний статус',
    },
    {
      label: 'SKU',
      controlName: 'sku',
      type: 'number',
      errorMessage: 'Вкажіть коректний SKU',
    },
  ];

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<AddElementComponent>
  ) {
    this.mattressForm = this.fb.group({
      name: ['', Validators.required],
      size: ['', Validators.required],
      price: [null, [Validators.required, Validators.min(0)]],
      quantity: [null, [Validators.required, Validators.min(0)]],
      status: [null, Validators.required],
      sku: [null, Validators.pattern(/^\d{7}$/)],
    });
  }

  onSubmit(): void {
    if (this.mattressForm.valid) {
      this.dialogRef.close(this.mattressForm.value);
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}
