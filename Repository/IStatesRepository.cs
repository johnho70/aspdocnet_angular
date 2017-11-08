using System.Collections.Generic;
using System.Threading.Tasks;
using StudentRecords.Models;

namespace StudentRecords.Repository
{
    public interface IStatesRepository
    {
        Task<List<State>> GetStatesAsync();
    }
}