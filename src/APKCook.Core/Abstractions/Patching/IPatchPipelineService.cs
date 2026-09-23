using APKCook.Core.Models;

namespace APKCook.Core.Abstractions.Patching;

public interface IPatchPipelineService
{
    Task<PatchResult> RunAsync(PatchRequest request, CancellationToken cancellationToken = default);
}
