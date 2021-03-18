# babel-plugin-pika-import
antd import plugin for snowpack 

## usage

`npm install babel-plugin-pika-import --save-dev`

## transform

```javascript
import { Button, DatePicker } from 'antd';

      ↓ ↓ ↓ ↓ ↓ ↓

import Button from 'antd/es/button';
import 'antd/es/button/style/css.js';
import DatePicker from 'antd/es/date-picker';
import 'antd/es/date-picker/style/css.js';
```
