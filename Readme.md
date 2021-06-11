find . -depth -name '.DS_Store' -exec git rm --cached '{}' \; -print

#MERGE GIT
### remote origin branch:<br /><br />
- git clone uri [git pull]
- [code]
- git branch -a
- git branch tenBranch
- git checkout tenBranch
- git add .
- find . -depth -name '.DS_Store' -exec git rm --cached '{}' \; -print
- git commit -m "commit"
- git push -u origin tenBranch

### main branch:     
-  git pull
-  git branch -a
-  git diff origin/tenBranch
-  git merge origin/tenBranch
-  [sync file async]
-  [code]
-  git add .
-  find . -depth -name '.DS_Store' -exec git rm --cached '{}' \; -print
-  git commit -m "commit"
-  git push

# Công dụng
"bcrypt": Mã hoá,<br/>
"body-parser": Send Data: Client <=> Server,<br/>
"cors": Không cần phân biệt http vs https,<br/>
"dotenv": Sử dụng đc file .env,<br/>
"nodemon": Run server liên tục,<br/>
"express": "^4.17.1",<br/>
"mysql": "^2.18.1",<br/>