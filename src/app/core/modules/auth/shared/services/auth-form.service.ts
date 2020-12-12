import { Injectable } from '@angular/core';
import { FormlyFieldConfig } from '@ngx-formly/core';

@Injectable({
  providedIn: 'root',
})
export class AuthFormService {
  constructor() {}

  get questionsToLogin() {
    const questions: FormlyFieldConfig[] = [
      {
        key: 'email',
        type: 'input',
        templateOptions: {
          label: 'Email',
          placeholder: 'Entre com um email',
          required: true,
          minLength: 3,
        },
      },
      {
        key: 'password',
        type: 'input',
        templateOptions: {
          label: 'Senha',
          placeholder: 'Entre com uma senha',
          required: true,
          minLength: 3,
        },
      },
    ];
    return questions;
  }

  get modelToLogin() {
    const model = {
      email: '',
      password: '',
    };
    return model;
  }
}
