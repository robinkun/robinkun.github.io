rm -rf _deploy/*
if [ ! -d _deploy ]
then
  git clone git@github.com:robinkun/robinkun.github.io.git _deploy
fi

cp -r _site/* _deploy
cd _deploy
git add .
git add -u .
git commit -m "update"
git push

