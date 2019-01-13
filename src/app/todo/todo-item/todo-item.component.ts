import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { Todo } from '../model/todo.model';
import { FormControl, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducers';
import { ToggleTodoAction, EDITAR_TODO, EditarTodoAction, BorrarTodoAction } from '../todo.actions';

@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.component.html',
  styles: []
})
export class TodoItemComponent implements OnInit {

  @Input() todo: Todo;
  chkField: FormControl;
  txtInput: FormControl;
  editando: boolean;
  @ViewChild('txtInputFisico') txtInputFisico: ElementRef;

  constructor( private store: Store<AppState> ) { }

  ngOnInit() {
    this.chkField = new FormControl( this.todo.completado );
    this.txtInput = new FormControl( this.todo.texto, Validators.required );
    console.log('todo item: ', this.todo );

    this.chkField.valueChanges.subscribe( value => {
      const accion = new ToggleTodoAction( this.todo.id );
      this.store.dispatch( accion );
    });
  }

  editar() {
    this.editando = true;
    setTimeout( () => {
      this.txtInputFisico.nativeElement.select();
    }, 1);
  }

  terminarEdicion() {
    this.editando = false;
    if ( this.txtInput.invalid || this.txtInput.value === this.todo.texto ) {
      return;
    }
    const accion = new EditarTodoAction( this.todo.id, this.txtInput.value );
    this.store.dispatch( accion );
  }

  borrarTodo() {
    const accion = new BorrarTodoAction( this.todo.id );
    this.store.dispatch( accion );
  }

}
