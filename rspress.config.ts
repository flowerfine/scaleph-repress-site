import * as path from 'path';
import { defineConfig } from 'rspress/config';

export default defineConfig({
  root: path.join(__dirname, 'docs'),
  title: 'Scaleph',
  description: 'Open data platform based on Flink and Kubernetes, supports web-ui click-and-drop data integration with SeaTunnel backended by Flink engine, flink online sql development backended by Flink Sql Gateway, also flink jar job, where flink job runs on Kubernetes managed by Flink Kubernetes Operator.',
  icon: '/rspress-icon.png',
  logo: {
    light: '/rspress-light-logo.png',
    dark: '/rspress-dark-logo.png',
  },
  themeConfig: {
    socialLinks: [
      { icon: 'github', mode: 'link', content: 'https://github.com/web-infra-dev/rspress' },
    ],
  },
});
