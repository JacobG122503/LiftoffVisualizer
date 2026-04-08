namespace LiftoffVisualizer.Services;

public static class ExerciseIcons
{
    // Returns an SVG path/icon for each exercise category
    public static string GetSvgIcon(string exerciseName)
    {
        var name = exerciseName.ToLowerInvariant();

        // Bicep exercises
        if (name.Contains("curl") || name.Contains("bicep"))
            return @"<svg viewBox='0 0 64 64' fill='none' xmlns='http://www.w3.org/2000/svg' class='exercise-icon'><path d='M20 44c0-8 4-12 8-16s6-12 6-16' stroke='currentColor' stroke-width='3' stroke-linecap='round'/><path d='M34 12c2 4 6 6 8 4s0-6-2-8' stroke='currentColor' stroke-width='3' stroke-linecap='round'/><circle cx='36' cy='8' r='2' fill='currentColor'/><path d='M20 44c-2 4-2 8 0 10h16c2-2 2-6 0-10' stroke='currentColor' stroke-width='3' stroke-linecap='round' stroke-linejoin='round'/><path d='M28 28c4-2 8-1 10 2' stroke='currentColor' stroke-width='2.5' stroke-linecap='round'/></svg>";

        // Bench / chest press
        if (name.Contains("bench") || name.Contains("chest press") || name.Contains("chest fly"))
            return @"<svg viewBox='0 0 64 64' fill='none' xmlns='http://www.w3.org/2000/svg' class='exercise-icon'><rect x='8' y='28' width='48' height='4' rx='2' fill='currentColor' opacity='0.3'/><rect x='4' y='22' width='8' height='16' rx='2' fill='currentColor'/><rect x='52' y='22' width='8' height='16' rx='2' fill='currentColor'/><rect x='30' y='20' width='4' height='20' rx='1' fill='currentColor' opacity='0.5'/><circle cx='6' cy='30' r='5' stroke='currentColor' stroke-width='2'/><circle cx='58' cy='30' r='5' stroke='currentColor' stroke-width='2'/></svg>";

        // Shoulder press / lateral raise
        if (name.Contains("shoulder") || name.Contains("lateral raise"))
            return @"<svg viewBox='0 0 64 64' fill='none' xmlns='http://www.w3.org/2000/svg' class='exercise-icon'><path d='M22 36L32 16L42 36' stroke='currentColor' stroke-width='3' stroke-linecap='round' stroke-linejoin='round'/><path d='M18 36h28' stroke='currentColor' stroke-width='3' stroke-linecap='round'/><rect x='14' y='34' width='8' height='4' rx='2' fill='currentColor' opacity='0.5'/><rect x='42' y='34' width='8' height='4' rx='2' fill='currentColor' opacity='0.5'/><circle cx='32' cy='12' r='4' stroke='currentColor' stroke-width='2'/><path d='M26 44v8M38 44v8' stroke='currentColor' stroke-width='2' stroke-linecap='round'/></svg>";

        // Row exercises
        if (name.Contains("row"))
            return @"<svg viewBox='0 0 64 64' fill='none' xmlns='http://www.w3.org/2000/svg' class='exercise-icon'><path d='M16 24l16 8 16-8' stroke='currentColor' stroke-width='3' stroke-linecap='round' stroke-linejoin='round'/><path d='M16 32l16 8 16-8' stroke='currentColor' stroke-width='3' stroke-linecap='round' stroke-linejoin='round'/><path d='M32 32v16' stroke='currentColor' stroke-width='3' stroke-linecap='round'/><rect x='28' y='46' width='8' height='4' rx='2' fill='currentColor' opacity='0.5'/></svg>";

        // Pulldown / Pull up / Chin up
        if (name.Contains("pulldown") || name.Contains("pull up") || name.Contains("chin up"))
            return @"<svg viewBox='0 0 64 64' fill='none' xmlns='http://www.w3.org/2000/svg' class='exercise-icon'><rect x='8' y='8' width='48' height='4' rx='2' fill='currentColor'/><path d='M20 12v8M44 12v8' stroke='currentColor' stroke-width='3' stroke-linecap='round'/><path d='M20 20l12 12 12-12' stroke='currentColor' stroke-width='3' stroke-linecap='round' stroke-linejoin='round'/><circle cx='32' cy='36' r='4' stroke='currentColor' stroke-width='2'/><path d='M28 40v12M36 40v12' stroke='currentColor' stroke-width='2' stroke-linecap='round'/></svg>";

        // Dip / Tricep
        if (name.Contains("dip") || name.Contains("tricep") || name.Contains("pushdown"))
            return @"<svg viewBox='0 0 64 64' fill='none' xmlns='http://www.w3.org/2000/svg' class='exercise-icon'><path d='M20 16v32M44 16v32' stroke='currentColor' stroke-width='3' stroke-linecap='round'/><circle cx='32' cy='24' r='4' stroke='currentColor' stroke-width='2'/><path d='M28 28c-4 4-8 8-8 12M36 28c4 4 8 8 8 12' stroke='currentColor' stroke-width='2.5' stroke-linecap='round'/><path d='M28 32v12M36 32v12' stroke='currentColor' stroke-width='2' stroke-linecap='round'/></svg>";

        // Squat / Leg press / Hack squat
        if (name.Contains("squat") || name.Contains("leg press") || name.Contains("hack"))
            return @"<svg viewBox='0 0 64 64' fill='none' xmlns='http://www.w3.org/2000/svg' class='exercise-icon'><circle cx='32' cy='12' r='4' stroke='currentColor' stroke-width='2'/><path d='M32 16v12' stroke='currentColor' stroke-width='3' stroke-linecap='round'/><path d='M24 28h16' stroke='currentColor' stroke-width='3' stroke-linecap='round'/><path d='M24 28l-4 16M40 28l4 16' stroke='currentColor' stroke-width='3' stroke-linecap='round'/><path d='M18 44h8M38 44h8' stroke='currentColor' stroke-width='3' stroke-linecap='round'/><rect x='12' y='8' width='40' height='3' rx='1.5' fill='currentColor' opacity='0.4'/></svg>";

        // Leg extension / Leg curl
        if (name.Contains("leg ext") || name.Contains("leg curl"))
            return @"<svg viewBox='0 0 64 64' fill='none' xmlns='http://www.w3.org/2000/svg' class='exercise-icon'><rect x='16' y='20' width='20' height='12' rx='3' fill='currentColor' opacity='0.3'/><path d='M36 26l16 12' stroke='currentColor' stroke-width='3' stroke-linecap='round'/><circle cx='52' cy='38' r='3' stroke='currentColor' stroke-width='2'/><path d='M16 32v16' stroke='currentColor' stroke-width='3' stroke-linecap='round'/><path d='M12 48h8' stroke='currentColor' stroke-width='3' stroke-linecap='round'/></svg>";

        // Deadlift
        if (name.Contains("deadlift"))
            return @"<svg viewBox='0 0 64 64' fill='none' xmlns='http://www.w3.org/2000/svg' class='exercise-icon'><circle cx='32' cy='10' r='4' stroke='currentColor' stroke-width='2'/><path d='M32 14v10' stroke='currentColor' stroke-width='3' stroke-linecap='round'/><path d='M24 24l-8 16M40 24l8 16' stroke='currentColor' stroke-width='2.5' stroke-linecap='round'/><path d='M28 24v20M36 24v20' stroke='currentColor' stroke-width='2' stroke-linecap='round'/><rect x='8' y='38' width='48' height='4' rx='2' fill='currentColor' opacity='0.4'/><circle cx='10' cy='40' r='5' stroke='currentColor' stroke-width='2'/><circle cx='54' cy='40' r='5' stroke='currentColor' stroke-width='2'/></svg>";

        // Calf
        if (name.Contains("calf"))
            return @"<svg viewBox='0 0 64 64' fill='none' xmlns='http://www.w3.org/2000/svg' class='exercise-icon'><path d='M24 12v20c0 4 2 8 4 12l4 8M40 12v20c0 4-2 8-4 12l-4 8' stroke='currentColor' stroke-width='3' stroke-linecap='round'/><path d='M24 32c4 2 12 2 16 0' stroke='currentColor' stroke-width='2' stroke-linecap='round'/><rect x='20' y='8' width='24' height='4' rx='2' fill='currentColor' opacity='0.4'/></svg>";

        // Crunch / Abs / Plank
        if (name.Contains("crunch") || name.Contains("plank") || name.Contains("ab"))
            return @"<svg viewBox='0 0 64 64' fill='none' xmlns='http://www.w3.org/2000/svg' class='exercise-icon'><circle cx='32' cy='14' r='5' stroke='currentColor' stroke-width='2'/><path d='M32 19v6' stroke='currentColor' stroke-width='3' stroke-linecap='round'/><path d='M22 25c0 0 4 20 10 20s10-20 10-20' stroke='currentColor' stroke-width='3' stroke-linecap='round'/><path d='M26 45l-4 8M38 45l4 8' stroke='currentColor' stroke-width='2.5' stroke-linecap='round'/></svg>";

        // Shrug
        if (name.Contains("shrug") || name.Contains("wrist"))
            return @"<svg viewBox='0 0 64 64' fill='none' xmlns='http://www.w3.org/2000/svg' class='exercise-icon'><circle cx='32' cy='12' r='5' stroke='currentColor' stroke-width='2'/><path d='M22 22c0-4 4-6 10-6s10 2 10 6' stroke='currentColor' stroke-width='3' stroke-linecap='round'/><path d='M22 22v20M42 22v20' stroke='currentColor' stroke-width='3' stroke-linecap='round'/><rect x='18' y='40' width='8' height='4' rx='2' fill='currentColor' opacity='0.5'/><rect x='38' y='40' width='8' height='4' rx='2' fill='currentColor' opacity='0.5'/></svg>";

        // Treadmill / Cardio
        if (name.Contains("treadmill") || name.Contains("cycling") || name.Contains("run"))
            return @"<svg viewBox='0 0 64 64' fill='none' xmlns='http://www.w3.org/2000/svg' class='exercise-icon'><circle cx='32' cy='12' r='5' stroke='currentColor' stroke-width='2'/><path d='M32 17v8' stroke='currentColor' stroke-width='3' stroke-linecap='round'/><path d='M24 25l8 12 8-12' stroke='currentColor' stroke-width='2.5' stroke-linecap='round' stroke-linejoin='round'/><path d='M26 37l-6 14M38 37l6 14' stroke='currentColor' stroke-width='2.5' stroke-linecap='round'/><path d='M18 51h8M38 51h8' stroke='currentColor' stroke-width='2' stroke-linecap='round'/></svg>";

        // Fly / Cable
        if (name.Contains("fly") || name.Contains("cable"))
            return @"<svg viewBox='0 0 64 64' fill='none' xmlns='http://www.w3.org/2000/svg' class='exercise-icon'><circle cx='32' cy='14' r='5' stroke='currentColor' stroke-width='2'/><path d='M32 19v12' stroke='currentColor' stroke-width='3' stroke-linecap='round'/><path d='M18 20c6 4 10 8 14 11M46 20c-6 4-10 8-14 11' stroke='currentColor' stroke-width='2.5' stroke-linecap='round'/><path d='M28 31v14M36 31v14' stroke='currentColor' stroke-width='2' stroke-linecap='round'/></svg>";

        // Incline
        if (name.Contains("incline"))
            return @"<svg viewBox='0 0 64 64' fill='none' xmlns='http://www.w3.org/2000/svg' class='exercise-icon'><path d='M12 44l20-24h20' stroke='currentColor' stroke-width='3' stroke-linecap='round' stroke-linejoin='round'/><rect x='4' y='18' width='8' height='16' rx='2' fill='currentColor'/><rect x='52' y='14' width='8' height='16' rx='2' fill='currentColor'/><rect x='28' y='16' width='4' height='20' rx='1' fill='currentColor' opacity='0.3' transform='rotate(-10 30 26)'/></svg>";

        // Default dumbbell
        return @"<svg viewBox='0 0 64 64' fill='none' xmlns='http://www.w3.org/2000/svg' class='exercise-icon'><rect x='8' y='24' width='10' height='16' rx='3' fill='currentColor'/><rect x='46' y='24' width='10' height='16' rx='3' fill='currentColor'/><rect x='18' y='28' width='28' height='8' rx='2' fill='currentColor' opacity='0.5'/><rect x='4' y='28' width='8' height='8' rx='2' fill='currentColor' opacity='0.7'/><rect x='52' y='28' width='8' height='8' rx='2' fill='currentColor' opacity='0.7'/></svg>";
    }
}
