import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { LocationService } from '../../../services/location.service';
import { Province, TownCity, Barangay } from '../../../shared/models/location.model';

@Component({
  selector: 'app-deployment',
  templateUrl: './deployment.component.html',
  styleUrls: ['./deployment.component.css']
})
export class DeploymentComponent implements OnInit {
  provinces: any[] = [];
  townCities: string[] = [];
  barangays: string[] = [];

  provinceControl = new FormControl('', Validators.required);
  townCityControl = new FormControl('', Validators.required);
  barangayControl = new FormControl('', Validators.required);

  errorMessage = '';
  isLoading = false;

  constructor(private locationService: LocationService) {}
    
  ngOnInit(): void {
    this.fetchProvinces();

    // Reset logic integrated from ProfileComponent
    this.provinceControl.valueChanges.subscribe(val => {
      this.townCityControl.reset('');
      this.barangayControl.reset('');
      if (val) this.fetchTowns(val);
    });

    this.townCityControl.valueChanges.subscribe(val => {
      this.barangayControl.reset('');
      if (val && this.provinceControl.value) {
        this.fetchBarangays(this.provinceControl.value, val);
      }
    });
  }

  fetchProvinces() {
    this.isLoading = true;
    this.locationService.getProvinces().subscribe({
      next: (data) => { this.provinces = data; this.isLoading = false; },
      error: (err) => { this.errorMessage = err; this.isLoading = false; }
    });
  }

 fetchTowns(province: string) {
    this.isLoading = true;
    this.locationService.getTownCities(province).subscribe({
      next: (data) => { this.townCities = data; this.isLoading = false; },
      error: () => this.isLoading = false
    });
  }

 fetchBarangays(prov: string, town: string) {
    this.isLoading = true;
    this.locationService.getBarangays(prov, town).subscribe({
      next: (data) => { this.barangays = data; this.isLoading = false; },
      error: () => this.isLoading = false
    });
  }

  onSave() {
    if (this.provinceControl.invalid || this.townCityControl.invalid) return;

    this.isLoading = true;
    const payload = {
      province: this.provinceControl.value,
      townCity: this.townCityControl.value,
      barangay: this.barangayControl.value,
      userId: 'Jerald-001'
    };

    this.locationService.saveDeployment(payload).subscribe({
      next: () => { this.isLoading = false; alert('Deployment Saved!'); },
      error: (err) => { this.isLoading = false; this.errorMessage = err; }
    });
  }

}
