using Microsoft.AspNetCore.Mvc.ModelBinding;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using StudentRecords.Models;

namespace StudentRecords.Models
{
    public class ApiResponse
    {
        public bool Status { get; set; }
        public Student Student { get; set; }
        public ModelStateDictionary ModelState { get; set; }
    }
}
