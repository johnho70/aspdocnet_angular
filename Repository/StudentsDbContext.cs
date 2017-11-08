using StudentRecords.Models;
using Microsoft.EntityFrameworkCore;
namespace StudentRecords.Repository
{
    public class StudentsDbContext : DbContext
    {
        public DbSet<Student> Students{ get; set; }
        public DbSet<State> States { get; set; }
        public StudentsDbContext (DbContextOptions<StudentsDbContext> options) : base(options) { }
    }
}
