using System.Collections.Generic;

namespace APKCook.Core.Models;

public sealed record ApktoolRunResult(
    int ExitCode,
    IReadOnlyList<string> Stdout,
    IReadOnlyList<string> Stderr);
