using Kollywood_Movie_App.Models;
namespace Kollywood_Movie_App.Repositories
{
    public interface IMovieRepo
    {
        public Task<Movie> GetMovie(int Id);
        public Task<List<string>> GetMatches(string input);
    }
}
