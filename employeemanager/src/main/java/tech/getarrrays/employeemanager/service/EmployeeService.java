package tech.getarrrays.employeemanager.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import tech.getarrrays.employeemanager.exceptions.userNorFoundException;
import tech.getarrrays.employeemanager.model.Employee;
import tech.getarrrays.employeemanager.repository.EmployeeRepo;

import java.util.List;
import java.util.Optional;

@Service
public class EmployeeService {
    @Autowired
    private EmployeeRepo employeeRepo;

    public EmployeeService(EmployeeRepo employeeRepo) {
        this.employeeRepo = employeeRepo;
    }

    public Employee findEmployeeById(Long id){
        return employeeRepo.findById(id).orElseThrow(()-> new userNorFoundException("User by ID "+ id+" was not Found"));

    }
    public List<Employee> findAllEmployees(){
        return employeeRepo.findAll();
    }

    public void deleteEmloyee(Long id){
        employeeRepo.deleteById(id);
    }
    public Employee updateEmployee(Employee employee){
        return employeeRepo.save(employee);
    }
    public Employee addEmploye(Employee employee){
        return employeeRepo.save(employee);
    }
}
