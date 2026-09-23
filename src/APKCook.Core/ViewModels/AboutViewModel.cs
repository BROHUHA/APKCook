using CommunityToolkit.Mvvm.ComponentModel;
using CommunityToolkit.Mvvm.Input;
using System;
using System.Diagnostics;
using System.Linq;
using System.Reflection;
using APKCook.Core.Abstractions;
using Properties = APKCook.Core.Properties;

namespace APKCook.Core.ViewModels;

public partial class AboutViewModel : ObservableObject
{
    private readonly ISystemService _systemService;

    public string AppVersion => GetAppVersion();
    public string DeveloperName { get; } = "Abin Binoy";
    public string Year { get; } = "2026";

    public AboutViewModel(ISystemService systemService)
    {
        _systemService = systemService;
    }

    private string GetAppVersion()
    {
        var versionAssembly = ResolveVersionAssembly();
        var version = GetVersionString(versionAssembly);

        if (string.IsNullOrWhiteSpace(version) || version.StartsWith("1.2.8"))
        {
            version = GetProcessVersion();
        }

        if (string.IsNullOrWhiteSpace(version) || version.StartsWith("1.2.8") || version == "Unknown")
        {
            version = "0.0.1";
        }

        version = NormalizeVersion(version);

        return string.Format(Properties.Resources.About_Version, version);
    }

    private static Assembly ResolveVersionAssembly()
    {
        var entryAssembly = Assembly.GetEntryAssembly();
        if (entryAssembly != null)
        {
            return entryAssembly;
        }

        return AppDomain.CurrentDomain
                   .GetAssemblies()
                   .FirstOrDefault(assembly => assembly.EntryPoint != null)
               ?? Assembly.GetExecutingAssembly();
    }

    private static string? GetInformationalVersion(Assembly assembly)
    {
        var informationalVersion = assembly
            .GetCustomAttribute<AssemblyInformationalVersionAttribute>()
            ?.InformationalVersion;

        if (!string.IsNullOrWhiteSpace(informationalVersion))
        {
            return informationalVersion;
        }

        return assembly.GetCustomAttribute<AssemblyFileVersionAttribute>()?.Version;
    }

    private static string? GetVersionString(Assembly assembly)
    {
        var informationalVersion = GetInformationalVersion(assembly);
        if (!string.IsNullOrWhiteSpace(informationalVersion))
        {
            return informationalVersion;
        }

        return assembly.GetName().Version?.ToString(3);
    }

    private static string? GetProcessVersion()
    {
        if (string.IsNullOrWhiteSpace(Environment.ProcessPath))
        {
            return null;
        }

        var versionInfo = FileVersionInfo.GetVersionInfo(Environment.ProcessPath);
        if (!string.IsNullOrWhiteSpace(versionInfo.ProductVersion))
        {
            return versionInfo.ProductVersion;
        }

        return versionInfo.FileVersion;
    }

    private static string NormalizeVersion(string version)
    {
        var metadataSeparatorIndex = version.IndexOf('+');
        if (metadataSeparatorIndex >= 0)
        {
            version = version[..metadataSeparatorIndex];
        }

        var prereleaseSeparatorIndex = version.IndexOf('-');
        if (prereleaseSeparatorIndex >= 0)
        {
            version = version[..prereleaseSeparatorIndex];
        }

        return version;
    }

    [RelayCommand]
    private void OpenProjectPage()
    {
        _systemService.OpenUrl("https://github.com/BROHUHA/APKCook");
    }

    [RelayCommand]
    private void OpenDeveloperPage()
    {
        _systemService.OpenUrl("https://abinbinoy.vercel.app");
    }
}
