namespace Kollywood_Movie_App.Models
{
    public class MovieDTO
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string Director { get; set; }
        public string Overview { get; set; }
        public string[] Cast { get; set; }
        public string Genre { get; set; }

    }
}
