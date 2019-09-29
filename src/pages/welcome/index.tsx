import React from 'react';
import Iframe from 'react-iframe';
import { Icon, Tooltip } from 'antd';

import styles from './index.less';

const IconFont = Icon.createFromIconfontCN({
  scriptUrl: '//at.alicdn.com/t/font_1441055_5lpb3mp5t23.js',
});

class Welcome extends React.Component {
  state = {
    fullscreen: false
  };

  requestFullScreen = (element: any) => {
    const requestMethod = element.requestFullScreen || element.webkitRequestFullScreen || element.mozRequestFullScreen || element.msRequestFullScreen;
    if (requestMethod) {
      requestMethod.call(element);
    } else if (typeof window.ActiveXObject !== "undefined") {
      var wscript = new ActiveXObject("WScript.Shell");
      if (wscript !== null) {
        wscript.SendKeys("{F11}");
      }
    }
  }

  handleFullScreen = () => {
    const elem = document.getElementById('datavContainer');
    this.requestFullScreen(elem);
  }

  render() {
    return (
      <div className={styles.welcomeContainer}>
        <Tooltip title="全屏">
          <IconFont type="icon-quanping" className={styles.fullScreen} onClick={this.handleFullScreen} />
        </Tooltip>
        <Iframe id="datavContainer" url="http://datav.aliyuncs.com/share/6147815cc7566e58c78bdd9ed0ce5d64" width="100%" height="680px" allowFullScreen={true} />
      </div>
    );
  }
}

export default Welcome;