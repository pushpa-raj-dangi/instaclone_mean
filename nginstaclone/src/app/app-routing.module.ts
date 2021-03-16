import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { ProfileComponent } from './components/profile/profile.component';
import { CommentDetailComponent } from './components/comment-detail/comment-detail.component';
import { MyProfileComponent } from './components/my-profile/my-profile.component';
import { HomeComponent } from './components/home/home.component';
import { CreatePostComponent } from './user/create-post/create-post.component';
import { AuthguardService } from './services/authguard.service';

const routes: Routes = [
  { path: '', component: HomeComponent, canActivate: [AuthguardService] },
  {
    path: 'comment/:postId',
    component: CommentDetailComponent,
    canActivate: [AuthguardService],
  },
  {
    path: 'profile/:id',
    component: ProfileComponent,
    canActivate: [AuthguardService],
  },
  {
    path: 'my-profile',
    component: MyProfileComponent,
    canActivate: [AuthguardService],
  },
  { path: 'signup', component: SignupComponent },
  { path: 'login', component: LoginComponent },
  { path: 'createpost', component: CreatePostComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
