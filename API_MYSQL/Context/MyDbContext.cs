using API_MYSQL.Models;
using Microsoft.EntityFrameworkCore;

namespace API_MYSQL.Context
{
    public class MyDbContext : DbContext
    {
        public MyDbContext(DbContextOptions<MyDbContext> options) : base(options)
        {

        }
        public DbSet<Datos_Prueba> datos_prueba { get; set; }
        
    }
}
