import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { SkillService } from '../../services/skill.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-skills-mgmt',
  templateUrl: './skills-mgmt.component.html',
  styleUrls: ['./skills-mgmt.component.css']
})
export class SkillsMgmtComponent implements OnInit {
  // create reactive form
  skillsForm: FormGroup;

  // dollar sign indicates use of Observable
  formattedSkills$: Observable<string[]>;

  // initialize an empty array
  constructor(
    private fb: FormBuilder,

    // injecting skillservice to share data across the app
    private skillService: SkillService 
  ) {
    this.skillsForm = this.fb.group({
      internName: ['Jerald Bon Harris', Validators.required],
      skills: this.fb.array([]) 
    });
  }

  ngOnInit(): void {
    this.formattedSkills$ = this.skillService.getFormattedSkills();
    this.skillService.skills$.subscribe(currentSkills => {
      this.initFormWithSkills(currentSkills);
    });
  }

  
  private initFormWithSkills(skillList: string[]) {
    const skillControls = skillList.map(s => this.fb.control(s, [Validators.required, Validators.minLength(2)]));
    this.skillsForm.setControl('skills', this.fb.array(skillControls));
    
    if (this.skills.length === 0) {
      this.addSkill();
    }
  }

  get skills(): FormArray {
    return this.skillsForm.get('skills') as FormArray;
  }

  // prevent adding empty fields
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
      // sync whenever a field is removed
      this.skillService.updateSkills(this.skillsForm.value.skills);
    }
  }

  submitSkills() {
    if (this.skillsForm.valid) {
      // update service with new data 
      this.skillService.updateSkills(this.skillsForm.value.skills);
      console.log('Stream updated in Service');
      alert('Skill set updated via RxJS Service!');
    }
  }

}
