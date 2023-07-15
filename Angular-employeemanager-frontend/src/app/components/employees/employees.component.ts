import { EmployeeService } from './../../services/employee.service';
import { Employee } from './../../models/employee';
import { Component, OnInit } from '@angular/core';
import { HttpErrorResponse, HttpStatusCode } from '@angular/common/http';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.css']
})
export class EmployeesComponent implements OnInit{
public employees:Employee[]=[];
public editEmployee: Employee| null=null;
public deleteId:number|undefined=undefined;
constructor(private employeeService:EmployeeService){}
public getEmployees():void{
  this.employeeService.getEmployees().subscribe(

    (response:Employee[])=>{
      this.employees=response;
    },
    (error:HttpErrorResponse)=>{
alert(error.message);
    }
  );
}
  ngOnInit(): void {
    this.getEmployees();
    
  }
public onOpenModal(mode:string, emloyee:Employee|null):void{
const button=document.createElement('button');
button.type='button';
button.style.display="none";

button.setAttribute("data-toggle","modal");
if(mode === "add"){
  button.setAttribute('data-target','#addEmployeeModal');

}
if(mode === "edit"){
  button.setAttribute('data-target','#updateEmployeeModal');
  this.editEmployee=emloyee;

  
}
if(mode === "delete"){
  button.setAttribute('data-target','#deleteEmployeeModal');
  this.editEmployee=emloyee;
  this.deleteId=emloyee?.id;

 
}
const container =document.getElementById('main-container');
if(container){
  container.appendChild(button);
}
button.click();



}
public onAddEmployee(addForm : NgForm):void{
  const btnClose=document.getElementById("btnClose");
  this.employeeService.addEmployee(addForm.value).subscribe(
    (response:Employee)=>{

       
       if(btnClose)
       btnClose.click();
       this.getEmployees();
       addForm.reset();
    },
    (error:HttpErrorResponse)=>{alert(error.message);}
 



  );
 
}
public searchEmployee(key:string):void{


  const result :Employee[]=[];
  
  for(const employee of this.employees){
    if(employee.name.toLowerCase().indexOf(key.toLowerCase()) !== -1 ||employee.email.toLowerCase().indexOf(key.toLowerCase()) !== -1|| employee.phone.toLowerCase().indexOf(key.toLowerCase()) !== -1)
  result.push(employee);
  console.log("result=> ",employee)
  }
  this.employees=result;
  if(result.length === 0 || !key)
  this.getEmployees();


}


public onUpdateEmployee(editForm : Employee):void{
  const editBtnClose=document.getElementById("editBtnClose");

  this.employeeService.updateEmployee(editForm).subscribe(
    (response:Employee)=>{
       
     
       
       if(editBtnClose)
       editBtnClose.click();
       this.getEmployees();
       
    },
    (error:HttpErrorResponse)=>{alert(error.message);}
 



  );
 
}


public onDeleteEmployee(id:number|undefined):void{
  const deleteBtn=document.getElementById("deleteBtn");
  if(id)
  this.employeeService.deleteEmployee(id).subscribe(
    (response)=>{console.log(response);
      if(deleteBtn)
      deleteBtn.click();
      console.log("deleted",id)
      this.getEmployees();
     
    
    },
    (error:HttpErrorResponse)=>{
      console.log(error)
    }
    );
  
}


}
