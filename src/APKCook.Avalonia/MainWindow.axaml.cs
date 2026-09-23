using Avalonia;
using Avalonia.Controls;
using Avalonia.Media.Imaging;
using APKCook.Core.ViewModels;
using System;
using System.IO;
using System.Threading.Tasks;

namespace APKCook.Avalonia;

public partial class MainWindow : Window
{
    public MainWindow()
    {
        InitializeComponent();
    }

    public MainWindow(MainViewModel viewModel) : this()
    {
        DataContext = viewModel;
    }

    protected override async void OnOpened(EventArgs e)
    {
        base.OnOpened(e);

        if (Environment.GetEnvironmentVariable("CAPTURE_SCREENSHOTS") == "1" && DataContext is MainViewModel vm)
        {
            await Task.Delay(800);
            await CaptureScreenshotsAsync(vm);
            Close();
        }
    }

    private async Task CaptureScreenshotsAsync(MainViewModel vm)
    {
        var imagesDir = Path.GetFullPath("images");
        Directory.CreateDirectory(imagesDir);

        // 1. Decompile Screen
        vm.NavigateToDecompileCommand.Execute(null);
        if (vm.CurrentView is DecompileViewModel dvm)
        {
            dvm.ApkPath = @"C:\Android\APKs\InsecureBankv2.apk";
            dvm.OutputFolder = @"C:\Android\Projects\InsecureBankv2_decompiled";
            dvm.ConsoleLog = "I: Using Apktool 2.10.0 on InsecureBankv2.apk\nI: Loading resource table...\nI: Decoding AndroidManifest.xml with resources...\nI: Regular manifest package...\nI: Decoding file-resources...\nI: Decoding values */* XMLs...\nI: Baksmaling classes.dex...\nI: Copying assets and libs...\nI: Copying unknown files...\nI: Decompilation complete.";
        }
        await Task.Delay(400);
        SaveWindowScreenshot(Path.Combine(imagesDir, "pulse_apk_decompile.png"));

        // 2. Build Screen
        vm.NavigateToBuildCommand.Execute(null);
        if (vm.CurrentView is BuildViewModel bvm)
        {
            bvm.ProjectPath = @"C:\Android\Projects\InsecureBankv2_decompiled";
            bvm.OutputApkName = "InsecureBankv2_rebuilt.apk";
            bvm.OutputFolderPath = @"C:\Android\Projects\build";
            bvm.SignApk = true;
            bvm.ConsoleLog = "I: Using Apktool 2.10.0\nI: Checking whether sources has changed...\nI: Smaling smali folder into classes.dex...\nI: Building apk file...\nI: Copying unknown files/dir...\nI: Built apk: InsecureBankv2_rebuilt.apk\nI: Signing APK with Uber-APK-Signer...\nI: [OK] zipalign verification passed.\nI: [OK] Verified signatures: v1, v2, v3.\n[SUCCESS] Rebuilt and signed APK created successfully!";
        }
        await Task.Delay(400);
        SaveWindowScreenshot(Path.Combine(imagesDir, "pulse_apk_build.png"));

        // 3. Patching Screen
        vm.NavigateToPatchCommand.Execute(null);
        if (vm.CurrentView is PatchViewModel pvm)
        {
            pvm.ApkPath = @"C:\Android\APKs\InsecureBankv2.apk";
            pvm.OutputFolderPath = @"C:\Android\Projects\patched";
            pvm.OutputApkName = "InsecureBankv2_patched.apk";
            pvm.SignApk = true;
            pvm.InjectLibForAllArchitectures = true;
            pvm.ConsoleLog = "Starting patch pipeline...\nPatching 'InsecureBankv2.apk' -> 'InsecureBankv2_patched.apk'\n[INFO] Script profile: Inject frida-gadget and custom script\n[INFO] Resolved config: libfrida-gadget.config.so\n[OK] architecture: arm64-v8a, armeabi-v7a, x86_64\n[OK] decompile: APK decompiled successfully.\n[OK] manifest-patch: Network security configuration injected.\n[OK] gadget-injection: Frida gadget integrated into launch activity.\n[OK] build: Rebuilt modified APK.\n[OK] signing: Signed with debug signature.\n[SUCCESS] Patch pipeline completed successfully!";
        }
        await Task.Delay(400);
        SaveWindowScreenshot(Path.Combine(imagesDir, "patching.png"));

        // 4. Analyser Screen
        vm.NavigateToAnalyserCommand.Execute(null);
        if (vm.CurrentView is AnalyserViewModel avm)
        {
            avm.ProjectPath = @"C:\Android\Projects\InsecureBankv2_decompiled";
            avm.ConsoleLog = "Found 12,482 Smali files. Starting static vulnerability analysis...\nLoaded 9 analysis rule categories from smali_analysis_rules.json\n\n[HIGH] Insecure HTTP Connection: 'http://api.insecurebank.local/login'\n  -> Lcom/insecurebank/v2/DoLogin;->postCredentials()\n[HIGH] Hardcoded Secret Key: 'AES_SECRET_KEY_128BIT'\n  -> Lcom/insecurebank/v2/CryptoClass;->key\n[MEDIUM] Root Detection Check identified:\n  -> Lcom/insecurebank/v2/RootDetection;->checkRootMethod1()\n[MEDIUM] Emulator Detection Check identified:\n  -> Lcom/insecurebank/v2/EmulatorDetector;->isEmulator()\n[LOW] Exported Broadcast Receiver without permissions:\n  -> MyReceiver in AndroidManifest.xml\n\nScan complete. 5 issues identified. Ready to export report.";
        }
        await Task.Delay(400);
        SaveWindowScreenshot(Path.Combine(imagesDir, "pulse_apk_analysis.png"));
    }

    private void SaveWindowScreenshot(string path)
    {
        var width = (int)Math.Max(Bounds.Width, 1160);
        var height = (int)Math.Max(Bounds.Height, 720);
        var pixelSize = new PixelSize(width, height);
        using var rtb = new RenderTargetBitmap(pixelSize, new Vector(96, 96));
        rtb.Render(this);
        rtb.Save(path);
        Console.WriteLine($"Screenshot saved to {path}");
    }
}
