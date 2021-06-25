find . -depth -name '.DS_Store' -exec git rm --cached '{}' \; -print

crontab: https://crontab.guru/examples.html

template: 
- https://www.bootdey.com/snippets/view/billing-email-template

#MERGE GIT
### remote origin branch:
- [git remote set-url origin uri]
- git clone uri [git pull]
- [code] 
- git branch -a 
- git checkout main 
- git pull (pull ko dc thi  git reset --hard xong r git pull -> mat kho du lieu)
- git checkout PhuTrieu
- git merge main (keo nhung cai moi vao trong bai cua minh)
- git status
- git add .
- git commit -m "PhuTrieu Upl code sync P2"
- git push -u origin PhuTrieu

### main branch:     
-  [git remote set-url origin uri]
-  git pull
-  git branch -a
-  git diff origin/tenBranch
-  git merge origin/tenBranch,
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