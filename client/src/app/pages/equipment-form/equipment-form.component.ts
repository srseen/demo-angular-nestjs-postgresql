import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { EquipmentService } from '../../services/equipment.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-equipment-form',
  imports: [ReactiveFormsModule],
  templateUrl: './equipment-form.component.html',
  styleUrl: './equipment-form.component.css',
})
export class EquipmentFormComponent implements OnInit {
  form: FormGroup;
  id?: number;
  isEdit = false;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private service: EquipmentService
  ) {
    this.form = this.fb.group({
      name: ['', Validators.required],
      description: [''],
      quantity: [1, Validators.required],
      purchaseDate: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.id = +this.route.snapshot.paramMap.get('id')!;
    this.isEdit = !!this.id;

    if (this.isEdit) {
      this.service.get(this.id).subscribe((data) => {
        this.form.patchValue(data);
      });
    }
  }

  submit() {
    if (this.form.invalid) return;

    const payload = this.form.value;
    const req = this.isEdit
      ? this.service.update(this.id!, payload)
      : this.service.create(payload);

    req.subscribe(() => this.router.navigate(['/equipment']));
  }
}
