import {
  AfterContentInit,
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit,
  ViewChild
} from '@angular/core';
import { getStyle } from '@coreui/utils';
import { ChartjsComponent } from '@coreui/angular-chartjs';
import { StateService } from 'src/app/service/state.service';
import { DepartmentService } from 'src/app/service/department.service';

@Component({
  selector: 'app-widgets-dropdown',
  templateUrl: './widgets-dropdown.component.html',
  styleUrls: ['./widgets-dropdown.component.scss'],
  changeDetection: ChangeDetectionStrategy.Default
})
export class WidgetsDropdownComponent implements OnInit, AfterContentInit {
  role: any;
  users: any;
  examForms: any;
  courses: any;
  currentSemester: any;
  currentSemesterName: any;
  totalSubjects: any;
  constructor(
    private changeDetectorRef: ChangeDetectorRef,
    private state: StateService,
    private general: DepartmentService
  ) {}

  ngOnInit(): void {
    const user = this.state.getState();
    // console.log(user)
    this.role = user.details.role;
    if(this.role == 8){
      this.setCoursesCount();
      this.setExamFormCount();
      this.setUserCount();
    }
    if(this.role == 7){
      this.getCurrentSemester(user.details.id);
    }
  }

  setUserCount(){
    this.general.getUserCount().subscribe((res :any) => {
      // console.log(res)
      this.users = res.data.length;
    });
  }
  setExamFormCount(){
    this.general.getExamFormCount().subscribe((res :any) => {
      // console.log(res)
      this.examForms = res.data.length;
    });
  }
  setCoursesCount(){
    this.general.getCoursesCount().subscribe((res :any) => {
      // console.log(res)
      this.courses = res.data.length;
    });
  }

  getCurrentSemester(id: any){
    this.general.getCurrentSemester({id: id}).subscribe((res :any) => {
      // console.log(res)
      this.currentSemester = res.data[0].currentSemester;
      this.getSemesterName(res.data[0].currentSemester);
    });
  }

  getSemesterName(id: any){
    this.general.getSemesterName({id: id}).subscribe((res :any) => {
      // console.log(res)
      this.currentSemesterName = res.data[0].name;
      this.getSubjectCount(this.currentSemester);
    });
  }

  getSubjectCount(id: any) {
    console.log(id)
    this.general.getTotalSubjects({id: id}).subscribe((res :any) => {
      // console.log(res)
      this.totalSubjects = res.data.length
    });
  }

  ngAfterContentInit(): void {
    this.changeDetectorRef.detectChanges();

  }
}

@Component({
  selector: 'app-chart-sample',
  template: '<c-chart type="line" [data]="data" [options]="options" width="300" #chart></c-chart>'
})
export class ChartSample implements AfterViewInit {

  constructor() {}

  @ViewChild('chart') chartComponent!: ChartjsComponent;

  colors = {
    label: 'My dataset',
    backgroundColor: 'rgba(77,189,116,.2)',
    borderColor: '#4dbd74',
    pointHoverBackgroundColor: '#fff'
  };

  labels = ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'];

  data = {
    labels: this.labels,
    datasets: [{
      data: [65, 59, 84, 84, 51, 55, 40],
      ...this.colors,
      fill: { value: 65 }
    }]
  };

  options = {
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false
      }
    },
    elements: {
      line: {
        tension: 0.4
      }
    }
  };

  ngAfterViewInit(): void {
    setTimeout(() => {
      const data = () => {
        return {
          ...this.data,
          labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May'],
          datasets: [{
            ...this.data.datasets[0],
            data: [42, 88, 42, 66, 77],
            fill: { value: 55 }
          }, { ...this.data.datasets[0], borderColor: '#ffbd47', data: [88, 42, 66, 77, 42] }]
        };
      };
      const newLabels = ['Jan', 'Feb', 'Mar', 'Apr', 'May'];
      const newData = [42, 88, 42, 66, 77];
      let { datasets, labels } = { ...this.data };
      // @ts-ignore
      const before = this.chartComponent?.chart?.data.datasets.length;
      console.log('before', before);
      // console.log('datasets, labels', datasets, labels)
      // @ts-ignore
      // this.data = data()
      this.data = {
        ...this.data,
        datasets: [{ ...this.data.datasets[0], data: newData }, {
          ...this.data.datasets[0],
          borderColor: '#ffbd47',
          data: [88, 42, 66, 77, 42]
        }],
        labels: newLabels
      };
      // console.log('datasets, labels', { datasets, labels } = {...this.data})
      // @ts-ignore
      setTimeout(() => {
        const after = this.chartComponent?.chart?.data.datasets.length;
        console.log('after', after);
      });
    }, 5000);
  }
}
