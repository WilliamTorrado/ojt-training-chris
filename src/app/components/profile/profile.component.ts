import { Component, OnInit } from '@angular/core';
import { AdrressService } from '../../services/adrress.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  provinces: string[] = [];
  towns: string[] = [];
  barangays: string[] = [];

  selectedProvince: string = '';
  selectedTown: string = '';
  selectedBarangay: string = '';

  isLoading: boolean = false;
  errorMsg: string = '';

  constructor(private addressService: AdrressService) { }

  ngOnInit(): void {
    this.fetchProvinces();
  }

  fetchProvinces() {
    this.isLoading = true;
    this.addressService.getProvinces().subscribe({
      next: (data) => {
        this.provinces = data;
        if(data.length > 0){
        this.isLoading = true;
        }
      },
      error: (err) => {
        this.errorMsg = err.message;
        this.isLoading = false;
      }
    });
  }

  onProvinceChange(event) {
    this.selectedProvince = event
    console.log(this.selectedProvince);
    
    this.selectedTown = '';
    this.selectedBarangay = '';
    this.barangays = [];
    
    if (this.selectedProvince) {
      this.isLoading = true;
      this.addressService.getTownsCities(this.selectedProvince)
        .subscribe(data => this.towns = data);
        console.log(this.towns);
    }
  }

  onTownChange(event) {
    this.selectedTown = event
    console.log(this.selectedProvince,this.selectedTown);
    
    this.selectedBarangay = '';
    if (this.selectedProvince && this.selectedTown) {
      
      console.log(this.selectedTown);
      
      this.isLoading = true;
      this.addressService.getBarangays(this.selectedProvince, this.selectedTown)
        .subscribe(data => this.barangays = data);
    }
  }

  saveAddress() {
  if (!this.selectedProvince || !this.selectedTown || !this.selectedBarangay) {
    this.errorMsg = "Please complete the address selection first.";
    return;
  }

  this.isLoading = true;
  this.errorMsg = '';

  const payload = {
    province: this.selectedProvince,
    townCity: this.selectedTown,
    barangay: this.selectedBarangay,
    updatedAt: new Date().toISOString(),
    userId: 'Jerald-001' 
  };

  this.addressService.saveUserAddress(payload).subscribe({
    next: (response) => {
      this.isLoading = false;
      alert('Success! Your deployment address has been updated.');
      console.log('Server Response:', response);
    },
    error: (err) => {
      this.isLoading = false;
      this.errorMsg = "Post Failed: " + err.message;
    }
  });
}

}
