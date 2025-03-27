$files = Get-ChildItem -Path "src/app" -Filter "*.js" -Recurse

foreach ($file in $files) {
    $content = Get-Content -Path $file.FullName
    $updatedContent = $content -replace 'import Avatar from "@/components/ui/avatar"', 'import Avatar from "@/components/ui/avatar-proxy"'
    
    if ($content -ne $updatedContent) {
        Set-Content -Path $file.FullName -Value $updatedContent
        Write-Host "Updated: $($file.FullName)"
    }
}

Write-Host "All imports updated!" 