using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using PasswordManager_test.Server.Data;
using PasswordManager_test.Server.Models;

namespace PasswordManager_test.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PasswordDataController : ControllerBase
    {
        private readonly PasswordDataContext _context;

        public PasswordDataController(PasswordDataContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<PasswordData>>> GetPasswordRecords()
        {
            return await _context.PasswordData.OrderByDescending(p => p.DateCreated).ToListAsync();
        }

        [HttpPost]
        public async Task<ActionResult<PasswordData>> PostPasswordRecord(PasswordData record)
        {
            if (_context.PasswordData.Any(r => r.Name == record.Name))
            {
                return Conflict(new { message = "Record with this name already exists." });
            }

            record.DateCreated = DateTime.UtcNow;
            _context.PasswordData.Add(record);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetPasswordRecords), new { id = record.Id }, record);
        }
    }
}
