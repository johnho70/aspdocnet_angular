using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using StudentRecords.Models;
using Microsoft.Extensions.Logging;

namespace StudentRecords.Repository
{
    public class StudentsDbSeeker
    {
        readonly ILogger _Logger;

        public StudentsDbSeeker(ILoggerFactory loggerFactory)
        {
            _Logger = loggerFactory.CreateLogger("StudentsDbSeederLogger");
        }
        public async Task SeedAsync(IServiceProvider serviceProvider)
        {
            using(var serviceScope = serviceProvider.GetRequiredService<IServiceScopeFactory>().CreateScope())
            {
                var studentDb = serviceScope.ServiceProvider.GetService<StudentsDbContext>();
                if(await studentDb.Database.EnsureCreatedAsync())
                {
                    if(!await studentDb.Students.AnyAsync())
                    {
                        await InsertStudents(studentDb);
                    }
                }
            }
        }

        public async Task InsertStudents(StudentsDbContext db)
        {
            try
            {
                int numAffected = await db.SaveChangesAsync();
            }
            catch(Exception exp)
            {
                _Logger.LogError($"Error in {nameof(StudentsDbSeeker)}: " + exp.Message);
                throw;
            }
            var students = GetStudent();
            db.Students.AddRange(students);
            try
            {
                int numAffected = await db.SaveChangesAsync();
                _Logger.LogInformation($"Saved {numAffected} students");
            }
            catch (Exception exp)
            {
                _Logger.LogError($"Error in {nameof(StudentsDbSeeker)}: " + exp.Message);
                throw;
            }
        }
        private List<Student> GetStudent()
        {
            //students
            var studentNames = new string[]
            {
                "Marcus,HighTower,Male,acmecorp.com",
                "Jesse,Smith,Female,gmail.com",
                "Albert,Einstein,Male,outlook.com",
                "Dan,Wahlin,Male,yahoo.com",
                "Ward,Bell,Male,gmail.com",
                "Brad,Green,Male,gmail.com",
                "Igor,Minar,Male,gmail.com",
                "Miško,Hevery,Male,gmail.com",
                "Michelle,Avery,Female,acmecorp.com",
                "Heedy,Wahlin,Female,hotmail.com",
                "Thomas,Martin,Male,outlook.com",
                "Jean,Martin,Female,outlook.com",
                "Robin,Cleark,Female,acmecorp.com",
                "Juan,Paulo,Male,yahoo.com",
                "Gene,Thomas,Male,gmail.com",
                "Pinal,Dave,Male,gmail.com",
                "Fred,Roberts,Male,outlook.com",
                "Tina,Roberts,Female,outlook.com",
                "Cindy,Jamison,Female,gmail.com",
                "Robyn,Flores,Female,yahoo.com",
                "Jeff,Wahlin,Male,gmail.com",
                "Danny,Wahlin,Male,gmail.com",
                "Elaine,Jones,Female,yahoo.com",
                "John,Papa,Male,gmail.com"
            };
            List<Student> students = new List<Student>();
            for(var i = 0; i< studentNames.Length; i++)
            {
                var name = studentNames[i].Split(',');
                var student = new Student();
                //student.Id = i;
                student.FirstName = name[0];
                student.LastName = name[1];
                student.Gender = name[2];
                student.Email = name[0] + '.' + name[1] + '@' + name[3];
                student.GPA = 3.89;
                students.Add(student);
            }
            return students;
        }
    }
}
