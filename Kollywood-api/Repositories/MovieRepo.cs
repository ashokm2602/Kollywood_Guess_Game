using Humanizer;
using Kollywood_Movie_App.Models;

namespace Kollywood_Movie_App.Repositories
{
    public class MovieRepo : IMovieRepo
    {
        private readonly AppDbContext _context;
        public MovieRepo(AppDbContext context)
        {
            _context = context;
        }

        public async Task<Movie> GetMovie(int Id)
        {
            try
            {
                var response = await _context.Movies.FindAsync(Id);
                return response;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        public async Task<List<string>> GetMatches(string input)
        {
            try
            {   
                string inp = input.Pascalize();
                var list =  _context.Movies.Where(m=> m.Title.Contains(inp)).Select(m=>m.Title).ToList();
                return list;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

    }
}
