const WebFramework = require('@midwayjs/web').Framework;
const web = new WebFramework().configure({
  port: 7001,
});

const { Bootstrap } = require('@midwayjs/bootstrap');
const app = Bootstrap.load(web).run();
