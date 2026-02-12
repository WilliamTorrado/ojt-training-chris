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

    const savedData = localStorage.getItem('saved_deployment');
    if (savedData) {
      const parsedData = JSON.parse(savedData);
    
  
      this.provinceControl.setValue(parsedData.province, { emitEvent: false });
    
      this.locationService.getTownCities(parsedData.province).subscribe(towns => {
        this.townCities = towns;

        this.townCityControl.setValue(parsedData.townCity, { emitEvent: false });
  
        this.locationService.getBarangays(parsedData.province, parsedData.townCity).subscribe(brgys => {
          this.barangays = brgys;
          this.barangayControl.setValue(parsedData.barangay, { emitEvent: false });
        });
      });
    }

  
    this.provinceControl.valueChanges.subscribe(val => {
      if (this.provinceControl.dirty) { 
        this.townCityControl.reset('');
        this.barangayControl.reset('');
        this.townCities = [];
        if (val) this.fetchTowns(val);
      }
  });

  this.townCityControl.valueChanges.subscribe(val => {
    if (this.townCityControl.dirty) {
      this.barangayControl.reset('');
      this.barangays = [];
      if (val && this.provinceControl.value) {
        this.fetchBarangays(this.provinceControl.value, val);
      }
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
    if (this.provinceControl.invalid || this.townCityControl.invalid || this.barangayControl.invalid) {
      this.errorMessage = "Please complete the form.";
      return;
    }

    this.isLoading = true;

    const payload = {
      province: this.provinceControl.value,
      townCity: this.townCityControl.value,
      barangay: this.barangayControl.value,
      userId: 'Jerald-001',
      updatedAt: new Date().toISOString()
    };

    this.locationService.saveDeployment(payload).subscribe({
      next: () => { 
        this.isLoading = false;

        alert('Location saved to Local!'); 
      },
      error: (err) => { 
        this.isLoading = false; 
        this.errorMessage = err; 
      }
    });
  }

}
