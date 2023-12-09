import * as path from 'path';
import { defineConfig } from 'rspress/config';

export default defineConfig({
  root: path.join(__dirname, 'docs'),
  title: 'Scaleph',
  description: '开放数据平台，具备 Flink 和 SeaTunnel 任务管理能力',
  icon: '/scaleph-icon.png',
  logo: {
    light: '/rspress-light-logo.png',
    dark: '/rspress-dark-logo.png',
  },
  multiVersion: {
    default: '1.0.4',
    versions: ['dev', '2.0.0', '1.0.4'],
  },
  themeConfig: {
    socialLinks: [
      { icon: 'github', mode: 'link', content: 'https://github.com/flowerfine/scaleph' },
    ],
  },
});
