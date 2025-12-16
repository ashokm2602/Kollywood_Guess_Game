using Kollywood_Movie_App.Models;

namespace Kollywood_Movie_App.Services
{
    public class Moviematch
    {   
       

        public static string[] Matches(string input,AppDbContext Context)
        {
            string inp = input.ToLower();
            string[] matched = Context.Movies.Where(m => m.Title.Contains(inp)).Select(m => m.Title).ToArray();
            return matched;

        }
    }
}
