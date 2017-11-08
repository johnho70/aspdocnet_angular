using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using StudentRecords.Models;

namespace StudentRecords.Repository
{
    public class StudentsRepository : IStudentsRepository
    {
        private readonly StudentsDbContext _Context;
        private readonly ILogger _Logger;
        public StudentsRepository(StudentsDbContext context, ILoggerFactory loggerFactory)
        {
            _Context = context;
            _Logger = loggerFactory.CreateLogger("StudentsRepository");
        }

        public async Task<List<Student>> GetStudentAsync()
        {
            return await _Context.Students.OrderBy(c => c.LastName)
                                 .ToListAsync();
        }
        public async Task<PagingResult<Student>> GetStudentsPageAsync(int skip, int take)
        {
            var totalRecords = await _Context.Students.CountAsync();
            var students = await _Context.Students.OrderBy(c => c.LastName)
                                            .Skip(skip)
                                            .Take(take)
                                            .ToListAsync();
            return new PagingResult<Student>(students, totalRecords);
        }
        public async Task<Student> GetStudentByIdAsync(int id)
        {
            return await _Context.Students.SingleOrDefaultAsync(c => c.Id == id);
        }

        public async Task<Student> InsertStudentAsync(Student student)
        {
            _Context.Add(student);
            try
            {
                await _Context.SaveChangesAsync();
            }
            catch(Exception ex)
            {
                _Logger.LogError($"Error in {nameof(InsertStudentAsync)}: " + ex.Message);
            }
            return await _Context.Students.SingleOrDefaultAsync();
        }
        public async Task<bool> UpdateStudentAsync(Student student)
        {
            _Context.Students.Attach(student);
            _Context.Entry(student).State = EntityState.Modified;
            try
            {
                return (await _Context.SaveChangesAsync() > 0 ? true : false);
            }
            catch (Exception exp)
            {
                _Logger.LogError($"Error in {nameof(UpdateStudentAsync)}: " + exp.Message);
            }
            return false;
        }
        public async Task<bool> DeleteStudentAsync(int id)
        {
            //Extra hop to the database but keeps it nice and simple for this demo
            //Including orders since there's a foreign-key constraint and we need
            //to remove the orders in addition to the student
            var student = await _Context.Students
                                .SingleOrDefaultAsync(c => c.Id == id);
            _Context.Remove(student);
            try
            {
                return (await _Context.SaveChangesAsync() > 0 ? true : false);
            }
            catch (System.Exception exp)
            {
                _Logger.LogError($"Error in {nameof(DeleteStudentAsync)}: " + exp.Message);
            }
            return false;
        }
    }
}
