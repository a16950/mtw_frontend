import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CourseDetailComponent } from './course-detail/course-detail.component';
import { CoursesComponent } from './courses/courses.component';
import { EvaluationComponentsComponent } from './courses/evaluation-components/evaluation-components.component';
import { CriteriaComponent } from './criteria/criteria.component';
import { EvaluationDetailComponent } from './evaluation-detail/evaluation-detail.component';
import { StudentDetailComponent } from './student-detail/student-detail.component';
import { StudentsComponent } from './students/students.component';

const routes: Routes = [
  {path: "", component:CoursesComponent},
  {path: "edit_course", component:CourseDetailComponent},
  {path: "disciplines", component:EvaluationComponentsComponent},
  {path: "edit_discipline", component:EvaluationDetailComponent},
  {path: "students", component:StudentsComponent},
  {path: "edit_student", component:StudentDetailComponent},
  {path: "criterias", component:CriteriaComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
