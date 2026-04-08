using System;
using System.Text.RegularExpressions;

namespace LiftoffVisualizer.Pages
{
    public static class DurationParser
    {
        // Parses strings like "00 hours 29 minutes 27 seconds" to total minutes (double)
        public static double ParseToMinutes(string duration)
        {
            if (string.IsNullOrWhiteSpace(duration)) return 0;
            var regex = new Regex(@"(?:(\d+) hours?)?\s*(?:(\d+) minutes?)?\s*(?:(\d+) seconds?)?", RegexOptions.IgnoreCase);
            var match = regex.Match(duration);
            if (!match.Success) return 0;
            int hours = match.Groups[1].Success ? int.Parse(match.Groups[1].Value) : 0;
            int minutes = match.Groups[2].Success ? int.Parse(match.Groups[2].Value) : 0;
            int seconds = match.Groups[3].Success ? int.Parse(match.Groups[3].Value) : 0;
            return hours * 60 + minutes + seconds / 60.0;
        }
    }
}
