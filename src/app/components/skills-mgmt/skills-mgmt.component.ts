import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';

@Component({
  selector: 'app-skills-mgmt',
  templateUrl: './skills-mgmt.component.html',
  styleUrls: ['./skills-mgmt.component.css']
})
export class SkillsMgmtComponent implements OnInit {
  skillsForm: FormGroup;

  // initialize an empty array
  constructor(private fb: FormBuilder) {
    this.skillsForm = this.fb.group({
      internName: ['Jerald Bon Harris', Validators.required],
      skills: this.fb.array([]) 
    });
  }

  ngOnInit(): void {
    this.addSkill();
  }

  get skills(): FormArray {
    return this.skillsForm.get('skills') as FormArray;
  }

  get isLastSkillInvalid(): boolean {
    const controls = this.skills.controls;
    return controls.length > 0 && controls[controls.length - 1].invalid;
  }

  addSkill() {
    if (this.isLastSkillInvalid) return;
    
    this.skills.push(this.fb.control('', [Validators.required, Validators.minLength(2)]));
  }

  removeSkill(index: number) {
    if (this.skills.length > 1) {
      this.skills.removeAt(index);
    }
  }

  submitSkills() {
    if (this.skillsForm.valid) {
      console.log('Saved Skills:', this.skillsForm.value.skills);
      alert('Skills updated!!');
    }
  }

}
