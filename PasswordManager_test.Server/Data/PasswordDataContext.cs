using Microsoft.EntityFrameworkCore;
using PasswordManager_test.Server.Models;

namespace PasswordManager_test.Server.Data
{
    public class PasswordDataContext : DbContext
    {
        public PasswordDataContext(DbContextOptions<PasswordDataContext> options) : base(options) { }
        public DbSet<PasswordData> PasswordData { get; set; }
    }
}
