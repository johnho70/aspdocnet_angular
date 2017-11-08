using StudentRecords.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace StudentRecords.Repository
{
    public class StatesRepository : IStatesRepository
    {
        private readonly StudentsDbContext _Context;
        private readonly ILogger _Logger;

        public StatesRepository(StudentsDbContext context, ILoggerFactory loggerFactory)
        {
            _Context = context;
            _Logger = loggerFactory.CreateLogger("StatesRepository");
        }

        public async Task<List<State>> GetStatesAsync()
        {
            return await _Context.States.OrderBy(s => s.Abbreviation).ToListAsync();
        }
        
    }
}
