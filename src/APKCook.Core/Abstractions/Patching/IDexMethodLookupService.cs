namespace APKCook.Core.Abstractions.Patching;

public interface IDexMethodLookupService
{
    bool ContainsMethodReference(byte[] dexData, string classDescriptor, string methodName, string signature);
}
