import { Metadata } from "next";

type UrlPath = {
  path: string,
  title?: string,
  pageTitle?: string,
  label?: string
  description?: string,
  keywords?: string,
}
export type PathInfo = {
  path: string,
  pageTitle: string,
  label: string,
  isDisabled?: boolean
}

export const urlPaths: UrlPath[] = [
  {
    path: '/',
    title: 'ワンダーウォール株式会社',
    label: 'ホーム'
  },
  {
    path: '/aboutus',
    title: 'ワンダーウォールについて',
    pageTitle: '会社概要',
    label: 'ワンダーウォールについて'
  },
  {
    path: '/aboutus/ceo',
    title: '代表者略歴',
    pageTitle: '代表者略歴',
    label: '代表者について'
  },
  {
    path: '/aboutus/company',
    title: '会社概要',
    pageTitle: '会社概要',
    label: '会社概要'
  },
  {
    path: '/aboutus/commercial',
    title: '特定商取引法に基づく表示',
    pageTitle: '特定商取引法に基づく表示',
    label: '特定商取引法に基づく表示'
  },
  {
    path: '/aboutus/privacypolicy',
    title: 'プライバシーポリシー',
    pageTitle: 'プライバシーポリシー',
    label: 'プライバシーポリシー'
  },
  {
    path: '/services',
    title: 'サービス',
    pageTitle: 'サービス',
    label: 'サービス'
  },
  {
    path: '/services/#design',
    title: 'デザイン制作',
    pageTitle: 'サービス',
    label: 'デザイン制作'
  },
  {
    path: '/services/#web',
    title: 'WEBサイト構築',
    pageTitle: 'サービス',
    label: 'WEBサイト構築'
  },
  {
    path: '/services/#dev',
    title: 'システム開発',
    pageTitle: 'サービス',
    label: 'システム開発'
  },
  {
    path: '/services/#blockchain',
    title: 'ブロックチェーン導入支援',
    pageTitle: 'サービス',
    label: 'ブロックチェーン導入支援'
  },
  {
    path: '/news',
    title: 'ニュース',
    pageTitle: 'ニュース',
    label: 'ニュース'
  },
  {
    path: '/recruitment',
    title: '採用',
    pageTitle: '採用',
    label: '採用'
  },
  {
    path: '/recruitment/carrere',
    title: '採用',
    pageTitle: 'キャリア採用',
    label: 'キャリア採用'
  },
  {
    path: '/recruitment/web-engineer',
    title: '採用 | WEBエンジニア',
    pageTitle: 'WEBエンジニア採用',
    label: 'WEBエンジニア'
  },
  {
    path: '/recruitment/unity-engineer',
    title: '採用 | Unityエンジニア',
    pageTitle: 'Unityエンジニア採用',
    label: 'Unityエンジニア'
  },
  {
    path: '/recruitment/game-designer',
    title: '採用 | ゲームプランナー',
    pageTitle: 'ゲームプランナー採用',
    label: 'ゲームプランナー'
  },
  {
    path: '/recruitment/game-ui-designer',
    title: '採用 | ゲームUIデザイナー',
    pageTitle: 'ゲームUIデザイナー採用',
    label: 'ゲームUIデザイナー'
  },
  {
    path: '/recruitment/3d-animator',
    title: '採用 | 3Dアニメーター',
    pageTitle: '3Dアニメーター採用',
    label: '3Dアニメーター'
  },
  {
    path: '/recruitment/flutter-engineer',
    title: '採用 | Flutterエンジニア',
    pageTitle: 'Flutterエンジニア採用',
    label: 'Flutterエンジニア'
  },
  {
    path: '/recruitment/blockchain-engineer',
    title: '採用 | ブロックチェーンエンジニア',
    pageTitle: 'ブロックチェーンエンジニア採用',
    label: 'ブロックチェーンエンジニア'
  },
  {
    path: '/contactus',
    title: 'お問い合わせ',
    pageTitle: 'お問い合わせ',
    label: 'お問い合わせ'
  },
  {
    path: '/projects',
    title: '運営事業',
    pageTitle: '運営事業',
    label: '運営事業'
  },
  {
    path: '/projects/golfin',
    title: 'Golfin日本代理店',
    pageTitle: '運営事業',
    label: 'Golfin日本代理店'
  }
];

export const getPathInfo = (pathName: string, isDisabled?: boolean): PathInfo => {
  const pathItem = urlPaths.find(path => path.path === pathName);
  return {
    path: pathItem?.path ?? '/',
    pageTitle: pathItem?.pageTitle ?? '',
    label: pathItem?.label ?? '',
    isDisabled: isDisabled ?? false
  };
}

export const getPathLabel = (pathName: string): string => {
  return urlPaths.find(path => path.path === pathName)?.label ?? '';
}

export const getPathPageTitle = (pathName: string): string => {
  return urlPaths.find(path => path.path === pathName)?.pageTitle ?? '';
}

export const getMetaData = (pathName: string): Metadata => {
  const pathItem = urlPaths.find(path => path.path === pathName);
  return {
    title: pathItem?.title,
    description: pathItem?.description
  }
}