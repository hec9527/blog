const inquiere = require('inquirer');
const shell = require('shelljs');
const fs = require('fs');

const tags = ['html', 'css', 'javascript', 'typescript', 'webpack', '面试', 'github'];

const questions = [
  {
    type: 'input',
    name: 'docTitle',
    message: '请输入文章标题',
    validate(docTitle) {
      if (typeof docTitle !== 'string' || !docTitle) {
        return '请输入文章标题';
      }
      return true;
    },
  },
  {
    type: 'input',
    name: 'docDesc',
    message: '请简要描述文章内容',
  },
  {
    type: 'checkbox',
    name: 'docTags',
    message: '请选择文章标签',
    choices: tags,
  },
];

(async () => {
  const { docTitle, docDesc, docTags } = await inquiere.prompt(questions);
  const fullDocTitle = `${new Date().toISOString().slice(0, 10)}-${docTitle}`;

  if (!fs.existsSync(`blog/img/${fullDocTitle}`)) {
    fs.mkdirSync(`blog/img/${fullDocTitle}`);
  }

  shell.exec(`hygen blog new --path ${fullDocTitle} --title ${docTitle} --desc ${docDesc} --tags ${docTags}`);
})();
