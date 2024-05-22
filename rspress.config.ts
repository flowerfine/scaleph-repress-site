import * as path from 'path';
import {defineConfig} from 'rspress/config';

export default defineConfig({
    root: path.join(__dirname, 'docs'),
    base: '/scaleph-repress-site/',
    title: 'Scaleph',
    description: '开放数据平台，具备 Flink、SeaTunnel 和 Doris 管理能力',
    icon: '/scaleph-icon.png',
    logo: '/scaleph-icon.png',
    lang: 'zh',
    multiVersion: {
        default: 'dev',
        versions: ['dev', '2.0.5', '2.0.4', '2.0.3', '2.0.2'],
    },
    themeConfig: {
        lastUpdated: true,
        socialLinks: [
            {icon: 'github', mode: 'link', content: 'https://github.com/flowerfine/scaleph'},
            {icon: 'wechat', mode: 'img', content: '/wechat.jpg'},
        ],
        locales: [
            {
                lang: 'zh',
                label: '简体中文',
                editLink: {
                    docRepoBaseUrl:
                        'https://github.com/flowerfine/scaleph-repress-site/tree/main/docs',
                    text: '📝 在 GitHub 上编辑此页',
                },
                prevPageText: '上一篇',
                nextPageText: '下一篇',
                outlineTitle: '目录',
            },
            {
                lang: 'en',
                label: 'English',
                editLink: {
                    docRepoBaseUrl:
                        'https://github.com/flowerfine/scaleph-repress-site/tree/main/docs',
                    text: '📝 Edit this page on GitHub',
                },
            },
        ],
    },
    markdown: {
        checkDeadLinks: false
    }
});
