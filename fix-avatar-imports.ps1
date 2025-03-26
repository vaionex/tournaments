$files = Get-ChildItem -Path src -Recurse -Filter *.js | Select-String -Pattern "import Avatar from" | Select-Object -ExpandProperty Path

foreach ($file in $files) {
    $content = Get-Content -Path $file
    $newContent = $content -replace 'import Avatar from "@/components/ui/avatar"', 'import Avatar from "@/components/ui/avatar/index"'
    $newContent | Set-Content -Path $file
    Write-Host "Updated $file"
}

Write-Host "All Avatar imports have been updated." 