package tech.getarrrays.employeemanager.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.HttpSessionRequiredException;
import org.springframework.web.bind.annotation.*;
import tech.getarrrays.employeemanager.model.Employee;
import tech.getarrrays.employeemanager.service.EmployeeService;

import javax.swing.text.html.parser.Entity;
import java.util.List;

@RestController
@RequestMapping("/employee")
public class Controller {
    @Autowired
    private EmployeeService employeeService;

    public Controller(EmployeeService employeeService) {
        this.employeeService = employeeService;
    }
    @GetMapping("/all")
    public ResponseEntity<List<Employee>> getAllEmployees(){
        return new ResponseEntity<>(employeeService.findAllEmployees(), HttpStatus.OK);
    }
    @GetMapping("/find/{id}")
    public ResponseEntity<Employee> getEmployee(@PathVariable("id") Long id){
        return new ResponseEntity<>(employeeService.findEmployeeById(id), HttpStatus.OK);
    }
    @DeleteMapping("/delete/{id}")
    public ResponseEntity deleteEmployee(@PathVariable("id") Long id){
        employeeService.deleteEmloyee(id);
        return new ResponseEntity<HttpStatus>( HttpStatus.OK);
    }

    @PostMapping("/add")
    public ResponseEntity<Employee> addEmployee(@RequestBody Employee employee){

        return new ResponseEntity<>(employeeService.addEmploye(employee),HttpStatus.CREATED);

    }
    @PutMapping("/update")
    public ResponseEntity<Employee> updateEmployee(@RequestBody Employee employee){

        return new ResponseEntity<>(employeeService.updateEmployee(employee),HttpStatus.CREATED);

    }
}
