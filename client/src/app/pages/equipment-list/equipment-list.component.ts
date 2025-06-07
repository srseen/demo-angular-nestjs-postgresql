import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Equipment, EquipmentService } from '../../services/equipment.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-equipment-list',
  imports: [CommonModule],
  templateUrl: './equipment-list.component.html',
  styleUrl: './equipment-list.component.css',
})
export class EquipmentListComponent implements OnInit {
  equipmentList: Equipment[] = [];

  constructor(private service: EquipmentService, private router: Router) {}

  ngOnInit(): void {
    this.fetchData();
  }

  fetchData() {
    this.service.getAll().subscribe((data) => {
      this.equipmentList = data;
    });
  }

  edit(id: number) {
    this.router.navigate(['/equipment/edit', id]);
  }

  delete(id: number) {
    if (confirm('ต้องการลบใช่หรือไม่?')) {
      this.service.delete(id).subscribe(() => this.fetchData());
    }
  }
}
