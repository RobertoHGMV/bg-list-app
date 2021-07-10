import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BoardGame } from 'src/models/boardgame.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  form: FormGroup;
  mode = 'list';
  title = 'Board Games';
  bgs: BoardGame[] = [];

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      bgName: ['', Validators.compose([
        Validators.minLength(3),
        Validators.maxLength(60),
        Validators.required
      ])]
    });

    this.load();
  }

  add() {
    const bgName = this.form.controls['bgName'].value;
    const seq = this.bgs.length + 1;

    this.bgs.push(new BoardGame(seq, bgName));
    this.save();
    this.clear();
  }

  remove(bg: BoardGame) {
    const index = this.bgs.indexOf(bg);

    if (index !== -1) {
      this.bgs.splice(index, 1);
    
      this.save();
    }
  }

  save() {
    const data = JSON.stringify(this.bgs);
    localStorage.setItem('bgs', data);
    this.changeMode('list');
  }

  load() {
    const data = localStorage.getItem('bgs');
    
    if (data)
      this.bgs = JSON.parse(data);
    else
      this.bgs = [];
  }

  clear() {
    this.form.reset();
  }

  changeMode(mode: string) {
    this.mode = mode;
  }
}
