# Git Commands

git init = create a new git repo
git status = View the changes to your project code
git add = Add files to staging area
git commit = create a new commit with files from staging area (-m names)
git log = View recent commits


# ssh commands.  refer to github setup guide

run gitbash

ls -a ~/.ssh (checks if keys exist)

ssh-keygen -t rsa -b 4096 -C "email address goes here"
defaults ok
no passphrase

generated key

eval "$(ssh-agent -s)"

ssh-add ~/.ssh/id_rsa


test ssh works:
ssh -T git@github.com