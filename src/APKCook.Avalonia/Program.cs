using Avalonia;
using System;
using System.Diagnostics;

namespace APKCook.Avalonia;

class Program
{
    // Initialization code. Don't use any Avalonia, third-party APIs or any
    // SynchronizationContext-reliant code before AppMain is called: things aren't initialized
    // yet and stuff might break.
    [STAThread]
    public static void Main(string[] args)
    {
        ConfigureTerminalLogging();
        BuildAvaloniaApp().StartWithClassicDesktopLifetime(args);
    }

    // Avalonia configuration, don't remove; also used by visual designer.
    public static AppBuilder BuildAvaloniaApp()
        => AppBuilder.Configure<App>()
            .UsePlatformDetect()
            .WithInterFont()
            .LogToTrace();

    private static void ConfigureTerminalLogging()
    {
        Trace.AutoFlush = true;

        if (!HasConsoleTraceListener())
        {
            Trace.Listeners.Add(new ConsoleTraceListener(useErrorStream: false));
        }

        Console.WriteLine($"APKCook starting at {DateTimeOffset.Now:O}");
        Trace.TraceInformation("APKCook trace logging is enabled.");
    }

    private static bool HasConsoleTraceListener()
    {
        foreach (TraceListener listener in Trace.Listeners)
        {
            if (listener is ConsoleTraceListener)
            {
                return true;
            }
        }

        return false;
    }
}
