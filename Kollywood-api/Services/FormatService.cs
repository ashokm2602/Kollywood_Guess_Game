namespace Kollywood_Movie_App.Services
{
    public class FormatService
    {
        public static string FormatOverview(string overview)
        {
            if (overview.Contains('"'))
            {
                int index = overview.IndexOf('"');
                string result = overview.Substring(index);
                return result;
            }
            else
            {
                return overview;
            }
        }

        public static string[] FormatCast(string cast) { 
            return cast.Split(',').Select(member => member.Trim()).ToArray();
        }
    }
}
