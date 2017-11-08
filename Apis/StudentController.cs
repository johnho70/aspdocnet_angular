using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using StudentRecords.Models;
using StudentRecords.Repository;
using Microsoft.Extensions.Logging;
using StudentRecords.Infrastructure;
namespace StudentRecords.Apis
{
    [Produces("application/json")]
    [Route("api/student")]
    public class StudentController : Controller
    {
        IStudentsRepository _StudentsRepository;
        ILogger _Logger;
        public StudentController(IStudentsRepository studentsRepo, ILoggerFactory loggerFactory)
        {
            _StudentsRepository = studentsRepo;
            _Logger = loggerFactory.CreateLogger(nameof(StudentController));
        }
        // GET api/student
        [HttpGet]
        [NoCache]
        [ProducesResponseType(typeof(List<Student>), 200)]
        [ProducesResponseType(typeof(ApiResponse), 400)]
        public async Task<ActionResult> Students()
        {
            try
            {
                var student = await _StudentsRepository.GetStudentAsync();
                return Ok(student);
            }
            catch (Exception exp)
            {
                _Logger.LogError(exp.Message);
                return BadRequest(new ApiResponse { Status = false });
            }
        }
        // GET api/student
        [HttpGet("page/{skip}/{take}")]
        [NoCache]
        [ProducesResponseType(typeof(List<Student>), 200)]
        [ProducesResponseType(typeof(ApiResponse), 400)]
        public async Task<ActionResult> GetStudentsPageAsync(int skip, int take)
        {
            try
            {
                var student = await _StudentsRepository.GetStudentsPageAsync(skip, take);
                Response.Headers.Add("X-InlineCount", student.TotalRecords.ToString());
                return Ok(student.Records);
            }
            catch (Exception exp)
            {
                _Logger.LogError(exp.Message);
                return BadRequest(new ApiResponse { Status = false });
            }
        }
        // GET api/student/id
        [HttpGet("{id}")]
        [NoCache]
        [ProducesResponseType(typeof(Student), 200)]
        [ProducesResponseType(typeof(ApiResponse), 400)]
        public async Task<ActionResult> Student(int id)
        {
            try
            {
                var student = await _StudentsRepository.GetStudentByIdAsync(id);
                return Ok(student);
            }
            catch (Exception exp)
            {
                _Logger.LogError(exp.Message);
                return BadRequest(new ApiResponse { Status = false });
            }
        }

        // Post api/customer
        [HttpPost]
        [ProducesResponseType(typeof(Student), 201)]
        [ProducesResponseType(typeof(ApiResponse), 400)]
        public async Task<ActionResult> CreateStudent([FromBody]Student student)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(new ApiResponse { Status = false, ModelState = ModelState });
            }

            try
            {
                var newStudent = await _StudentsRepository.InsertStudentAsync(student);
                if (newStudent == null)
                {
                    return BadRequest(new ApiResponse { Status = false });
                }
                return CreatedAtRoute("GetStudentRoute", new { id = newStudent.Id },
                                      new ApiResponse { Status = true, Student = newStudent});
            }
            catch (Exception exp)
            {
                _Logger.LogError(exp.Message);
                return BadRequest(new ApiResponse { Status = false });
            }
        }


        //Put api/customer/id
        [HttpPut("{id}")]
        [ProducesResponseType(typeof(Student), 200)]
        [ProducesResponseType(typeof(ApiResponse), 400)]
        public async Task<ActionResult> UpdateStudent(int id, [FromBody]Student student)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(new ApiResponse { Status = false, ModelState = ModelState });
            }

            try
            {
                var status = await _StudentsRepository.UpdateStudentAsync(student);
                if(!status)
                {
                    return BadRequest(new ApiResponse { Status = false });
                }
                return Ok(new ApiResponse { Status = true, Student = student });
            }
            catch (Exception exp)
            {
                _Logger.LogError(exp.Message);
                return BadRequest(new ApiResponse { Status = false });
            }
        }

        // Delete api/student/id
        [HttpDelete("id")]
        [ProducesResponseType(typeof(ApiResponse), 200)]
        [ProducesResponseType(typeof(ApiResponse), 400)]
        public async Task<ActionResult> DeleteStudent(int id)
        {
            try
            {
                var status = await _StudentsRepository.DeleteStudentAsync(id);
                if (!status)
                {
                    return BadRequest(new ApiResponse { Status = false });
                }
                return Ok(new ApiResponse { Status = true });
            }
            catch (Exception exp)
            {
                _Logger.LogError(exp.Message);
                return BadRequest(new ApiResponse { Status = false });
            }
        }
    }
}