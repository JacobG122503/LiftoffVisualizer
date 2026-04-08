namespace LiftoffVisualizer.Services;

public static class ExerciseIcons
{
    public static string GetEmoji(string exerciseName)
    {
        var name = exerciseName.ToLowerInvariant();

        if (name.Contains("curl") || name.Contains("bicep") || name.Contains("preacher"))
            return "💪";

        if (name.Contains("bench") || name.Contains("chest press") || name.Contains("iso-lateral chest"))
            return "🏋️";

        if (name.Contains("fly") || name.Contains("cable reverse fly"))
            return "🦅";

        if (name.Contains("shoulder") || name.Contains("lateral raise") || name.Contains("reverse fly"))
            return "🤸";

        if (name.Contains("row") || name.Contains("iso-lateral row") || name.Contains("iso-lateral high") || name.Contains("iso-lateral low"))
            return "🚣";

        if (name.Contains("pulldown") || name.Contains("pull up") || name.Contains("chin up") || name.Contains("one arm pull"))
            return "⬆️";

        if (name.Contains("tricep") || name.Contains("pushdown") || name.Contains("dip"))
            return "🔽";

        if (name.Contains("squat") || name.Contains("leg press") || name.Contains("hack"))
            return "🦵";

        if (name.Contains("leg ext") || name.Contains("single leg"))
            return "🦿";

        if (name.Contains("leg curl") || name.Contains("seated leg"))
            return "🔄";

        if (name.Contains("deadlift") || name.Contains("romanian"))
            return "⚡";

        if (name.Contains("calf"))
            return "🦶";

        if (name.Contains("crunch") || name.Contains("plank"))
            return "🧘";

        if (name.Contains("shrug"))
            return "🏔️";

        if (name.Contains("wrist"))
            return "🤜";

        if (name.Contains("treadmill") || name.Contains("cycling"))
            return "🏃";

        if (name.Contains("cable"))
            return "🔗";

        return "🏋️";
    }
}
