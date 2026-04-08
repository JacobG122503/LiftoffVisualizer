using System.Globalization;
using LiftoffVisualizer.Models;

namespace LiftoffVisualizer.Services;

public class WorkoutDataService
{
    private readonly HttpClient _http;
    private List<WorkoutRecord>? _records;

    public WorkoutDataService(HttpClient http)
    {
        _http = http;
    }

    public async Task<List<WorkoutRecord>> GetRecordsAsync()
    {
        if (_records != null) return _records;

        var csv = await _http.GetStringAsync("data/liftoff_workout_data.csv");
        _records = ParseCsv(csv);
        return _records;
    }

    public async Task<List<string>> GetExerciseNamesAsync()
    {
        var records = await GetRecordsAsync();
        return records
            .Select(r => r.ExerciseName)
            .Where(n => !string.IsNullOrWhiteSpace(n))
            .Distinct()
            .OrderBy(n => n)
            .ToList();
    }

    public async Task<List<ExerciseSummary>> GetExerciseSummariesAsync(string exerciseName)
    {
        var records = await GetRecordsAsync();
        return records
            .Where(r => r.ExerciseName == exerciseName)
            .GroupBy(r => r.Date.Date)
            .Select(g => new ExerciseSummary
            {
                ExerciseName = exerciseName,
                Date = g.Key,
                MaxWeight = g.Max(r => r.Weight),
                TotalVolume = g.Sum(r => r.Weight * r.Reps),
                TotalReps = g.Sum(r => r.Reps),
                TotalSets = g.Count(),
                AvgWeight = g.Average(r => r.Weight)
            })
            .OrderBy(s => s.Date)
            .ToList();
    }

    public async Task<Dictionary<string, int>> GetMuscleGroupCountsAsync()
    {
        var records = await GetRecordsAsync();
        var grouped = records
            .GroupBy(r => GetMuscleGroup(r.ExerciseName))
            .ToDictionary(g => g.Key, g => g.Select(r => r.Date.Date).Distinct().Count());
        return grouped;
    }

    public static string GetMuscleGroup(string exerciseName)
    {
        var name = exerciseName.ToLowerInvariant();
        if (name.Contains("curl") || name.Contains("bicep")) return "Biceps";
        if (name.Contains("tricep") || name.Contains("pushdown") || name.Contains("dip")) return "Triceps";
        if (name.Contains("bench") || name.Contains("chest") || name.Contains("fly")) return "Chest";
        if (name.Contains("shoulder") || name.Contains("lateral raise")) return "Shoulders";
        if (name.Contains("row") || name.Contains("pulldown") || name.Contains("pull up") || name.Contains("chin up") || name.Contains("lat")) return "Back";
        if (name.Contains("squat") || name.Contains("leg press") || name.Contains("leg ext") || name.Contains("leg curl") || name.Contains("deadlift") || name.Contains("hack")) return "Legs";
        if (name.Contains("calf")) return "Calves";
        if (name.Contains("crunch") || name.Contains("plank")) return "Abs";
        if (name.Contains("shrug") || name.Contains("wrist")) return "Forearms/Traps";
        if (name.Contains("treadmill") || name.Contains("cycling")) return "Cardio";
        return "Other";
    }

    private static List<WorkoutRecord> ParseCsv(string csv)
    {
        var records = new List<WorkoutRecord>();
        var lines = csv.Split('\n', StringSplitOptions.RemoveEmptyEntries);

        for (int i = 1; i < lines.Length; i++)
        {
            var fields = ParseCsvLine(lines[i]);
            if (fields.Count < 11) continue;

            var exerciseName = fields[3].Trim();
            if (string.IsNullOrWhiteSpace(exerciseName)) continue;

            records.Add(new WorkoutRecord
            {
                Date = DateTime.TryParse(fields[0], CultureInfo.InvariantCulture, DateTimeStyles.None, out var d) ? d : DateTime.MinValue,
                Duration = fields[1],
                WorkoutName = fields[2],
                ExerciseName = exerciseName,
                SetOrder = int.TryParse(fields[4], out var so) ? so : 0,
                Weight = double.TryParse(fields[5], CultureInfo.InvariantCulture, out var w) ? w : 0,
                Reps = int.TryParse(fields[6], out var r) ? r : 0,
                Distance = double.TryParse(fields[7], CultureInfo.InvariantCulture, out var dist) ? dist : 0,
                Seconds = int.TryParse(fields[8], out var s) ? s : 0,
                RPE = double.TryParse(fields[9], CultureInfo.InvariantCulture, out var rpe) ? rpe : null,
                Notes = fields.Count > 10 ? fields[10] : ""
            });
        }

        return records.Where(r => r.Date != DateTime.MinValue).ToList();
    }

    private static List<string> ParseCsvLine(string line)
    {
        var fields = new List<string>();
        bool inQuotes = false;
        var current = new System.Text.StringBuilder();

        for (int i = 0; i < line.Length; i++)
        {
            char c = line[i];
            if (c == '"')
            {
                inQuotes = !inQuotes;
            }
            else if (c == ',' && !inQuotes)
            {
                fields.Add(current.ToString());
                current.Clear();
            }
            else
            {
                current.Append(c);
            }
        }
        fields.Add(current.ToString());
        return fields;
    }
}
