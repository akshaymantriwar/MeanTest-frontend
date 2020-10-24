import { Component, OnInit } from '@angular/core';
import {User} from '../models/user.model';
import {UserService} from "./user.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {

  users: User[];
  constructor(private userService: UserService, private router: Router) {

  }

  ngOnInit(): void {
    this.getUsers();
  }

  getUsers(): void {
    this.userService.getUsers().subscribe((value: User[]) => {
      this.users = value;
    });
  }

  addNew(): void {
    this.router.navigateByUrl('users').then();
  }

  updateUser(id: string): void {
    this.router.navigateByUrl('users/' + id).then();
  }

  deleteUser(id: string): void {
    this.userService.deleteUser(id).subscribe((value: User[]) => {
      this.users = value;
      this.getUsers();
    });
  }
}
