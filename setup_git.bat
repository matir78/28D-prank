git init > git_log.txt 2>&1
git add . >> git_log.txt 2>&1
git commit -m "Initial commit" >> git_log.txt 2>&1
git branch -M main >> git_log.txt 2>&1
git remote add origin https://github.com/matir78/28D-prank.git >> git_log.txt 2>&1
git push -u origin main >> git_log.txt 2>&1
