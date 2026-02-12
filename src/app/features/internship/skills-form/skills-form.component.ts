import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { SkillsService } from '../../../services/skills.service';

function noNumbersValidator(control: AbstractControl): ValidationErrors | null {
  const value = control.value || '';
  const hasNumbers = /\d/.test(value);
  return hasNumbers ? { noNumbers: true } : null;
}

@Component({
  selector: 'app-skills-form',
  templateUrl: './skills-form.component.html',
  styleUrls: ['./skills-form.component.css']
})
export class SkillsFormComponent implements OnInit {
  skillsForm!: FormGroup;
  savedSkills: string[] = [];

  skillLevels = [
    { value: 'beginner', label: 'Beginner' },
    { value: 'intermediate', label: 'Intermediate' },
    { value: 'advanced', label: 'Advanced' }
  ];

  constructor(private fb: FormBuilder, private skillsService: SkillsService) {}

  ngOnInit(): void {
    this.skillsForm = this.fb.group({
      skills: this.fb.array([this.createSkillGroup()])
    });

  
    const existingSkills = this.skillsService.getSkills();
    if (existingSkills && existingSkills.length > 0) {
      this.savedSkills = existingSkills;
    }
  }

  get skills(): FormArray {
    return this.skillsForm.get('skills') as FormArray;
  }

  createSkillGroup(): FormGroup {
    return this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2), noNumbersValidator]],
      level: ['beginner', Validators.required],
      category: ['', Validators.required]
    });
  }

  addSkill(): void {
    this.skills.push(this.createSkillGroup());
  }

  removeSkill(index: number): void {
    if (this.skills.length > 1) {
      this.skills.removeAt(index);
    }
  }

  onSubmit(): void {
    if (this.skillsForm.invalid) {
      this.markAllAsTouched();
      return;
    }
    this.savedSkills = this.skills.controls
      .map(c => {
        const val = c.get('name');
        return val ? val.value : '';
      })
      .map(s => (s || '').trim())
      .filter(Boolean);

    this.skillsService.setSkills(this.savedSkills);
  }

  private markAllAsTouched(): void {
    this.skills.controls.forEach(group => {
      group.markAllAsTouched();
    });
  }
}
