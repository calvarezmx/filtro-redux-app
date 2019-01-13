import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducers';

import * as fromTodo from '../todo.actions';
@Component({
  selector: 'app-todo-add',
  templateUrl: './todo-add.component.html',
  styles: []
})
export class TodoAddComponent implements OnInit {

  textInput: FormControl;

  constructor( private store: Store<AppState> ) { }

  ngOnInit() {
    this.textInput = new FormControl('', Validators.required);
  }

  addTodo() {

    if ( this.textInput.invalid ) {
      return;
    }

    const accion = new fromTodo.AgregarTodoAction( this.textInput.value );
    this.store.dispatch( accion );


    console.log('value: ', this.textInput.value);
    console.log('valid: ',  this.textInput.valid);

    this.textInput.setValue('');
  }

}
