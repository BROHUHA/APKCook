using System;

namespace APKCook.Core.Services;

public interface IAppLogService
{
    string LogFilePath { get; }
    void LogInfo(string category, string message);
    void LogError(string category, string message, Exception? exception = null);
}
