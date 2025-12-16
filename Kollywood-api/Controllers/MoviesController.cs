using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Kollywood_Movie_App.Models;
using Kollywood_Movie_App.Services;
using Kollywood_Movie_App.Repositories;

namespace Kollywood_Movie_App.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MoviesController : ControllerBase
    {
        private readonly IMovieRepo _movieRepo;

        public MoviesController(IMovieRepo movieRepo)
        {
            _movieRepo = movieRepo;
        }

       

        // GET: api/Movies/5
        [HttpGet("{id}")]
        public async Task<ActionResult<MovieDTO>> GetMovie(int id)
        {
            var movie = await _movieRepo.GetMovie(id);

            if (movie == null)
            {
                return NotFound();
            }

            MovieDTO movieDTO = new MovieDTO
            {
                Id = movie.Id,
                Title = movie.Title,
                Director = movie.Director,
                Genre = movie.Genre,
                Cast = FormatService.FormatCast(movie.Cast),
                Overview = FormatService.FormatOverview(movie.Overview)
            };

            return movieDTO;
        }

        [HttpGet("matches/{input}")]
        public async Task<ActionResult<List<string>>> GetMatches(string input)
        {
            var response = await _movieRepo.GetMatches(input);
            return Ok(response);
        }


    }
}
