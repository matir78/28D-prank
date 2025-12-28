$ErrorActionPreference = "Stop"
try {
    git init
    git add .
    git commit -m "Initial commit"
    git branch -M main
    git remote add origin https://github.com/matir78/28D-prank.git
    git push -u origin main
    "Success" | Out-File "git_success.txt"
} catch {
    $_ | Out-File "git_error.txt"
}
