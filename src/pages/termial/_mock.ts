import { parse } from 'url';
import { TableTermialItem, TableTermialParams } from './data.d';

let tableTermialDataSource: TableTermialItem[] = [];

for (let i = 0; i < 8; i += 1) {
    tableTermialDataSource.push({
      key: i,
      name: `小天竺小区${i}`,
      eui: `009569000000A46${i}`,
      model: `R7262${i}_室外环境探测器`,
      place: '华数滨江区LoRa网',
      access: 'LoRa',
      status: Math.floor(Math.random() * 10) % 3,
    });
  }

  function getRule(
    req: { url: any },
    res: {
      json: (
        arg0: {
          list: TableTermialItem[];
          pagination: { total: number; pageSize: number; current: number };
        },
      ) => void;
    },
    u: any,
  ) {
    let url = u;
    if (!url || Object.prototype.toString.call(url) !== '[object String]') {
      // eslint-disable-next-line prefer-destructuring
      url = req.url;
    }
  
    const params = (parse(url, true).query as unknown) as TableTermialParams;
  
    let dataSource = tableTermialDataSource;
  
    if (params.sorter) {
      const s = params.sorter.split('_');
      dataSource = dataSource.sort((prev, next) => {
        if (s[1] === 'descend') {
          return next[s[0]] - prev[s[0]];
        }
        return prev[s[0]] - next[s[0]];
      });
    }
  
    if (params.status) {
      const status = params.status.split(',');
      let filterDataSource: TableTermialItem[] = [];
      status.forEach((s: string) => {
        filterDataSource = filterDataSource.concat(
          dataSource.filter(item => {
            if (parseInt(`${item.status}`, 10) === parseInt(s.split('')[0], 10)) {
              return true;
            }
            return false;
          }),
        );
      });
      dataSource = filterDataSource;
    }
  
    if (params.name) {
      dataSource = dataSource.filter(data => data.name.indexOf(params.name) > -1);
    }

    if (params.eui) {
      dataSource = dataSource.filter(data => data.eui.indexOf(params.eui) > -1);
    }

    if (params.model) {
      dataSource = dataSource.filter(data => data.model.indexOf(params.model) > -1);
    }

    if (params.place) {
      dataSource = dataSource.filter(data => data.place.indexOf(params.place) > -1);
    }

    if (params.access) {
      dataSource = dataSource.filter(data => data.access.indexOf(params.access) > -1);
    }
  
    let pageSize = 10;
    if (params.pageSize) {
      pageSize = parseInt(`${params.pageSize}`, 0);
    }
  
    const result = {
      list: dataSource,
      pagination: {
        total: dataSource.length,
        pageSize,
        current: parseInt(`${params.currentPage}`, 10) || 1,
      },
    };
  
    return res.json(result);
  }

  function postRule(
    req: { url: any; body: any },
    res: { json: (arg0: { list: TableTermialItem[]; pagination: { total: number } }) => void },
    u: any,
    b: { body: any },
  ) {
    let url = u;
    if (!url || Object.prototype.toString.call(url) !== '[object String]') {
      // eslint-disable-next-line prefer-destructuring
      url = req.url;
    }
  
    const body = (b && b.body) || req.body;
    const { method, name, desc, key } = body;
  
    switch (method) {
      /* eslint no-case-declarations:0 */
      case 'delete':
        tableTermialDataSource = tableTermialDataSource.filter(item => key.indexOf(item.key) === -1);
        break;
      case 'post':
        const i = Math.ceil(Math.random() * 10000);
        tableTermialDataSource.unshift({
          key: i,
          href: 'https://ant.design',
          avatar: [
            'https://gw.alipayobjects.com/zos/rmsportal/eeHMaZBwmTvLdIwMfBpg.png',
            'https://gw.alipayobjects.com/zos/rmsportal/udxAbMEhpwthVVcjLXik.png',
          ][i % 2],
          name: `TradeCode ${i}`,
          title: `一个任务名称 ${i}`,
          owner: '曲丽丽',
          desc,
          callNo: Math.floor(Math.random() * 1000),
          status: Math.floor(Math.random() * 10) % 2,
          updatedAt: new Date(),
          createdAt: new Date(),
          progress: Math.ceil(Math.random() * 100),
        });
        break;
      case 'update':
        tableTermialDataSource = tableTermialDataSource.map(item => {
          if (item.key === key) {
            return { ...item, desc, name };
          }
          return item;
        });
        break;
      default:
        break;
    }
  
    const result = {
      list: tableTermialDataSource,
      pagination: {
        total: tableTermialDataSource.length,
      },
    };
  
    return res.json(result);
  }
  
  export default {
    'GET /api/rule': getRule,
    'POST /api/rule': postRule,
  };