import {Component, OnInit} from '@angular/core';
import {FormArray, FormControl, FormGroup, Validators} from '@angular/forms';
import {MyValidators} from './my.validators';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
    form: FormGroup;

    ngOnInit() {
        this.form = new FormGroup({
            email: new FormControl('', [
                Validators.email,
                Validators.required,
                MyValidators.restrictedEmails
            ], MyValidators.uniqEmail),
            password: new FormControl(null, [
                Validators.required,
                Validators.minLength(10)
            ]),
            address: new FormGroup({
                country: new FormControl('ua'),
                city: new FormControl('', Validators.required)
            }),
            skills: new FormArray([])
        });


    }

    submit() {
        if (this.form.valid) {

            console.log('Form:', this.form);
            const formData = {...this.form.value};
            console.log('Form:', formData);
        }
        this.form.reset();
    }

    setCapital() {
        const cityMap = {
            ru: 'Moskva',
            ua: 'Kiev',
            by: 'Minsk'
        };

        const citykey = this.form.get('address').get('country').value;
        const city = cityMap[citykey];

        this.form.patchValue({address: {city}});
    }

    addSkills() {
        const control = new FormControl('', Validators.required);
        // (<FormArray> this.form.get('skills'));
        (this.form.get('skills') as FormArray).push(control);
    }
}

