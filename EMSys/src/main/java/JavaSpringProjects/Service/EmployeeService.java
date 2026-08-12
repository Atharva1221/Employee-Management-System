package JavaSpringProjects.Service;

import JavaSpringProjects.dto.EmployeeDto;

import java.util.List;

public interface EmployeeService{
    public EmployeeDto CreateNewEmployee(EmployeeDto employeeDto);

    public List<EmployeeDto> getAllEmployees();

    public EmployeeDto getEmployeeById(Long Id);

    public EmployeeDto updateEmployeeById(Long Id, EmployeeDto employeeDto);

    public void deleteEmployeeById(Long Id);
}
