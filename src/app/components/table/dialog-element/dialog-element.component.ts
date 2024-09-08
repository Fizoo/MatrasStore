import {Component, Inject} from '@angular/core';
import {MatButton} from "@angular/material/button";
import {MAT_DIALOG_DATA, MatDialogModule, MatDialogRef} from "@angular/material/dialog";
import {MatFormFieldModule} from "@angular/material/form-field";
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {MatInputModule} from "@angular/material/input";
import {Mattress} from "../../../../data/data";


@Component({
  selector: 'app-dialog-element',
  standalone: true,
  imports: [
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatButton,
    ReactiveFormsModule
  ],
  templateUrl: './dialog-element.component.html',
  styleUrl: './dialog-element.component.scss'
})
export class DialogElementComponent {

  form: FormGroup;

  constructor(
    private fb: FormBuilder, // Додаємо FormBuilder для створення форми
    public dialogRef: MatDialogRef<DialogElementComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Mattress
  ) {}

  ngOnInit(): void {
    // Ініціалізуємо форму з початковими значеннями з переданих даних
    this.form = this.fb.group({
      price: [this.data.price, [Validators.required, Validators.min(0)]],
      quantity: [this.data.quantity, [Validators.required, Validators.min(0)]]
    });
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  onSave(): void {
    if (this.form.valid) {
      const updatedData: Mattress = {
        ...this.data, // Зберігаємо початкові властивості
        price: this.form.value.price, // Оновлюємо значення з форми
        quantity: this.form.value.quantity
      };
      // Записуємо змінені дані в переданий даних

      this.dialogRef.close(updatedData); // Повертаємо відредаговані дані
    }
  }
}
