using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using StudentRecords.Models;
namespace StudentRecords.Repository
{
    public interface IStudentsRepository
    {
        Task<List<Student>> GetStudentAsync();
        Task<PagingResult<Student>> GetStudentsPageAsync(int skip, int take);
        Task<Student> GetStudentByIdAsync(int id);
        Task<Student> InsertStudentAsync(Student student);
        Task<bool> UpdateStudentAsync(Student student);
        Task<bool> DeleteStudentAsync(int id);
    }
}
