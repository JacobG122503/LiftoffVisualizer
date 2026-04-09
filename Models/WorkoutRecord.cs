namespace LiftoffVisualizer.Models;

public class WorkoutRecord
{
    public DateTime Date { get; set; }
    public string Duration { get; set; } = "";
    public string WorkoutName { get; set; } = "";
    public string ExerciseName { get; set; } = "";
    public int SetOrder { get; set; }
    public double Weight { get; set; }
    public int Reps { get; set; }
    public double Distance { get; set; }
    public int Seconds { get; set; }
    public double? RPE { get; set; }
    public string Notes { get; set; } = "";
}

public class ExerciseSummary
{
    public string ExerciseName { get; set; } = "";
    public DateTime Date { get; set; }
    public double MaxWeight { get; set; }
    public double TotalVolume { get; set; } // weight * reps summed
    public int TotalReps { get; set; }
    public int TotalSets { get; set; }
    public double AvgWeight { get; set; }
    public double MaxEstimated1RM { get; set; } // Epley: weight * (1 + reps/30)
}
