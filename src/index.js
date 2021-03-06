import "babel-polyfill";
import dva from 'dva';
import './index.css';
import onError from './error';
import system from './common/systemParam';
// 1. Initialize 初始化dva
const app = dva({
	onError
});

// 2. Plugins
// app.use({});

// 3. Model 是类似vuex定义的全局状态树，并提供状态树改变的reducer方法，定义action方法
app.model(require('./models/example'));
app.model(require('./models/login'));
app.model(require('./models/system'));
app.model(require('./models/project'));
app.model(require('./models/userData'));
app.model(require('./models/safeCenter'));
app.model(require('./models/account'));

// 4. Router 定义dva的路由管理
app.router(require('./router'));

// 5. Start
app.start('#root');

export default app._store;