using Microsoft.EntityFrameworkCore;

namespace Kollywood_Movie_App.Models
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
        {
        }
        public DbSet<Movie> Movies { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Movie>().ToTable("Movies");
            modelBuilder.Entity<Movie>().HasKey(m => m.Id);
            modelBuilder.Entity<Movie>().Property(m => m.Id).HasColumnName("Id").IsRequired();
            modelBuilder.Entity<Movie>().Property(m => m.Title).HasColumnName("Title").IsRequired();
            modelBuilder.Entity<Movie>().Property(m => m.Director).HasColumnName("Director").IsRequired();
            modelBuilder.Entity<Movie>().Property(m => m.Genre).HasColumnName("Genre").IsRequired();
            modelBuilder.Entity<Movie>().Property(m => m.Overview).HasColumnName("Overview").IsRequired();
            modelBuilder.Entity<Movie>().Property(m => m.Cast).HasColumnName("Cast").IsRequired();

        }   

    }

}
