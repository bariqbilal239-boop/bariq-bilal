# Saves the Hostinger email password into .env.local (which git ignores).
# Run:  powershell -ExecutionPolicy Bypass -File scripts\set-email-password.ps1

$envFile = Join-Path $PSScriptRoot "..\.env.local"
if (-not (Test-Path $envFile)) {
    Copy-Item (Join-Path $PSScriptRoot "..\.env.example") $envFile
}

$secure = Read-Host "Paste your Hostinger email password and press Enter (it stays hidden)" -AsSecureString
$bstr = [Runtime.InteropServices.Marshal]::SecureStringToBSTR($secure)
try {
    $password = [Runtime.InteropServices.Marshal]::PtrToStringBSTR($bstr)
} finally {
    [Runtime.InteropServices.Marshal]::ZeroFreeBSTR($bstr)
}

if ([string]::IsNullOrWhiteSpace($password)) {
    Write-Host "Nothing was entered, so .env.local was not changed." -ForegroundColor Yellow
    exit 1
}

# Single quotes stop Next.js from treating characters like $ specially.
$value = if ($password.Contains("'")) { '"' + $password + '"' } else { "'" + $password + "'" }

$lines = [IO.File]::ReadAllLines((Resolve-Path $envFile)) | ForEach-Object {
    if ($_ -match '^SMTP_PASS=') { "SMTP_PASS=$value" } else { $_ }
}
[IO.File]::WriteAllLines((Resolve-Path $envFile), $lines)

Write-Host "Saved. You can close this tab and tell Claude it's done." -ForegroundColor Green
