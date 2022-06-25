var displaySettings = {
    pageBackground : '#ffffff'
};
var loadingSettings = {
    radius : 80,
    dotRadius : 6,
    interval : 40,
    backgroundColor : '#ffffff',
    iconColor: 'rgb(0,0,255)'
};
var loadingSettingsMini = {
    radius : 20,
    dotRadius : 2,
    interval : 40,
    backgroundColor : 'transparent',
    iconColor: 'rgb(150,150,255)'
};
var serverSettings = {
    isStreaming : true,
    isStandAlone: false, // true：スタンドアローン型 false：EC等外部サーバー連携型
    hashSaltKey: 'Zj6j7RVkiv7pA2TlzFih',
    cdnSaltKey: 'e47ec34c9cf59bca8d8eb865896b74ff88f953d3',
    otkUrl: './otk.php',
    contentsServerPath: '/stream/', // スタンドアローン型の場合要設定
    downloadApiPath: 'dl_seal.php',
};
var applicationSettings = {
    pageStuffMode : 1, // 0：ページを詰める 0以外：ページ番号により表示位置決定（偶数→奇数）
    pageUnitScroll : true,
    flickableScroll : true,
    useWaterMark: true, // ウォーターマーク利用
    waterMarkText: '', // ウォーターマーク文字列
    waterMarkStrokeColor: 'rgba(0,0,0,0.1)',
    waterMarkFillColor: 'rgba(255,255,255,0.1)',
    useInformation : true, // インフォメーション（ガイド等）の使用
    useMenu : true, // true：画面タップ時にメニュー表示 false：メニュー表示しない
    useGuide : true,
    menuDispHandleArea : {
        horizon : {
            left : 0.25,
            right : 0.75,
            top : 0,
            bottom : 0
        },
        vertical : {
            left : 0,
            right : 0,
            top : 0.25,
            bottom : 0.75
        }
    },
    usePinch: true, // true：ピンチ操作を利用 false：ピンチ操作利用しない
    useLoupe: false, // true：ルーペを利用 false：ルーペ利用しない
    useSetting: false, // true：設定ダイアログを利用 false：設定ダイアログ利用しない
    useIndex: true, // true：目次利用 false：目次利用しない
    useThumbnail: true, // true：サムネイル画像利用 false：サムネイル画像利用しない
    useKeyDownCapture: true, // true：キー操作利用 false：キー操作利用しない
    captureKeyDownIntervalThreshold: 50,
    captureKeyDownLimit: 8,
    lastPageType: 0, // 1：ビューアー内に読後ページ表示 ／ 2：確認ダイアログ→遷移 ／ 1.2以外：遷移
    lastPageUrl: '',
    blobImageMimeType: 'jpeg', // ''(png) | 'jpeg'
    blobImageJpegQuarity: 0.7 // 0～1
};

var contentsXmlParams = {
    rootElement: 'ContentInfo',
    title: 'Title',
    totalPageCount: 'TotalPageCount',
    pageViewType: 'PageViewType', // 0：右開き　1：左開き
    doublePageUseFlag: 'DoublePageUseFlag',
    samplePageList: 'SamplePageList',
    chapterPageList: 'ChapterPageList',
    indexPageList: 'IndexPageList',
    skipPageList: 'SkipPageList',
    defaultBgColor: 'DefaultBGColor',
    buyUrl: 'BuyURL',
    zeroPageFlag: 'ZeroPageFlag',
    customerId: 'CustomerID',
    contentsServerPath: 'ContentsServerPath',
    dataAccessType: 'DataAccessType',
    serverTimestamp: 'ServerTimestamp',
    availableTime: 'AvailableTime'
};
var nombreXmlParams = {
    pageElement: 'Page'
};