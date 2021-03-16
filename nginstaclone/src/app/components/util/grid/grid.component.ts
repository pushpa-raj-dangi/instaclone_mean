import { Component, OnInit, Input } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { Mypost } from 'src/app/interfaces/mypost';

@Component({
  selector: 'app-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.css'],
})
export class GridComponent implements OnInit {
  @Input('posts') posts;
  @Input('id') id;
  @Input('p') p;
  data:Mypost[]=[];
  postId;
  // id;
  constructor(
    private userService: UserService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    router.events.subscribe((e) => {
      this.id = this.route.snapshot.paramMap.get('postId');
    });
  }

  ngOnInit(): void {
    // this.id = this.route.snapshot.paramMap.get('postId');
    this.userService.getUser(this.id).subscribe((data) => {
      this.postId = data;
      this.posts = data.posts;
      this.data = this.p
    });

  }
}


interface Data{
  datas:Mypost;
}
